const socketio = require('socket.io');

const prompts = require('./experiments/tasks');
const interfaces = require('./experiments/interfaces');
const {mUndo,mDictate} = require('./experiments/modes')
const modes = require('./experiments/modes');
const { logger } = require('./logging')

const data = {
    prompts: [],
    interfaces,
    modes,
    currentPrompt: null,
    currentInterface: null,
    currentMode: null,

    user: {
        input: "",
        field1: "",
        transition: "",
        field2: ""
    }
}

const difficultyBreakdown = {   // number of tasks to select for each difficulty
    1: 2,
    2: 2, 
    3: 1
}

function chooseOneRandom(list){
    return Math.floor(Math.random() * list.length);
}

function getTasksByDifficulty(){
    _tasks = Object.values(prompts);
    tasksBydDifficulty = {}
    for(difficulty in difficultyBreakdown){
        tasksBydDifficulty[difficulty] = _tasks.filter(t => t.difficulty === parseInt(difficulty))
    }
    return tasksBydDifficulty;
}

function randomizeList(list){
    newList = [];

    list.forEach(item => {
        index = Math.floor(Math.random() * newList.length);
        newList.splice(index, 0, item);
    })
  
    return newList;
}

function randomizeTasks(){
    tasks1 = []; tasks2 = []; tasks3 = [];
    tasksByDifficulty = getTasksByDifficulty();

    [tasks1, tasks2, tasks3].forEach(interface => {     // For each interface
        for(let difficulty in difficultyBreakdown){     // For each difficulty level
            for(let i = difficultyBreakdown[difficulty]; i >0; i--){    // choose i tasks
                index = chooseOneRandom(tasksByDifficulty[difficulty]);
                interface.push(tasksByDifficulty[difficulty][index]);
                tasksByDifficulty[difficulty].splice(index,1);
            }
        }
    })

    return randomizeList(tasks1).concat(randomizeList(tasks2), randomizeList(tasks3));
}

const socket = (app) => {
    const io = socketio(app);

    io.on('connection', async socket => {
        const {pageType} = socket.handshake.query;
        logger.info(pageType);
        logger.info('connected');

        if (pageType == 'admin') {
            data.prompts = randomizeTasks();
            logger.info('init ' +  data.currentInterface + data.currentMode + data.currentPrompt);
            socket.emit('init', data);
        }

        if (data.currentInterface) socket.emit('interface-selection', data.currentInterface);
        if (data.currentPrompt) socket.emit('prompt-selection', data.currentPrompt);
        if (data.currentMode) socket.emit('mode-selection', data.currentMode);
        if (data.user.transition) socket.emit('transition-selection', data.user.transition);
        if (data.user.field1) socket.emit('set-field1', data.user.field1);
        if (data.user.field2) socket.emit('set-field2', data.user.field2);

        socket.on('shift-prompt', (prompt) => {
            data.currentPrompt = prompt;
            io.emit('prompt-selection', prompt);
            data.currentMode = mDictate;
            io.emit('mode-selection', mDictate);
            logger.info('Begin Prompt ' + prompt.name)
        });

        socket.on('shift-interface', (interface) => {
            data.currentInterface = interface;
            data.currentMode = data.currentInterface.modes[0];
            data.user.transition = "";
            data.user.field1 = "";
            data.user.field2 = "";
            io.emit('interface-selection', interface);
            io.emit('mode-selection', data.currentMode);
            logger.info('Begin Interface ' + interface.name)
        });

        socket.on('shift-mode', (mode) => {
            data.currentMode = mode;
            data.user.transition = null;
            data.user.field1 = "";
            data.user.field2 = "";

            if (mode.name == mUndo.name) {
                setTimeout(() => {
                    data.currentMode = mDictate;
                    io.emit('mode-selection', mDictate);
                }, 500)
            }

            io.emit('mode-selection', mode);
            io.emit('set-field1', data.user.field1);
            io.emit('set-field2', data.user.field2);
            io.emit('shift-transition', data.user.transition);
            

            // logger.info('User text: ' + data.user.input);
            logger.info('Cmd ' + mode.name)
        });

        socket.on('shift-dictate', () => {
            data.currentMode = mDictate;
            data.user.transition = null;
            data.user.field1 = "";
            data.user.field2 = "";

            logger.info('Cmd ' + data.currentMode.name)
            io.emit('mode-selection', data.currentMode);
            io.emit('set-field1', data.user.field1);
            io.emit('set-field2', data.user.field2);
            io.emit('shift-transition', data.user.transition);

            // logger.info('User text: ' + data.user.input);
        });


        /*
            Stuff inside of the user object
        */
        socket.on('shift-transition', (transition) => {
            data.user.transition = transition;
            io.emit('transition-selection', transition);
        });

        socket.on('update-field1', (text) => {
            data.user.field1 = text;
            io.emit('set-field1', text);
        });

        socket.on('update-field2', (text) => {
            data.user.field2 = text;
            io.emit('set-field2', text);
        });

        socket.on('update-input', (text) => {
            logger.info('input: ' + text);
            data.user.input = text;
            io.emit('set-input', text);
        });

        socket.on('touch', (btn) => {
            logger.info('touch: ' + btn.name);
            io.emit('touch', btn);
        });
    });
};

module.exports = socket;