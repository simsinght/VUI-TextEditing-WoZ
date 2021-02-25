const socketio = require('socket.io');

const prompts = require('./experiments/tasks');
const interfaces = require('./experiments/interfaces');
const modes = require('./experiments/modes');
const tasks = require('./experiments/tasks');

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

    console.log("randomized tasks ", tasks1, tasks2, tasks3)
    return randomizeList(tasks1).concat(randomizeList(tasks2), randomizeList(tasks3));
}

const socket = (app) => {
    const io = socketio(app);

    io.on('connection', async socket => {
        const {pageType} = socket.handshake.query;
        console.log(pageType);
        console.log('connected');

        if (pageType == 'admin') {
            data.prompts = randomizeTasks();
            socket.emit('init', data)
        }

        if (data.currentPrompt) socket.emit('prompt-selection', data.currentPrompt);
        if (data.currentInterface) socket.emit('interface-selection', data.currentInterface);
        if (data.currentMode) socket.emit('mode-selection', data.currentMode);
        if (data.user.transition) socket.emit('transition-selection', data.user.transition);

        socket.on('shift-prompt', (prompt) => {
            data.currentPrompt = prompt;
            io.emit('prompt-selection', prompt);
        });

        socket.on('shift-interface', (interface) => {
            data.currentInterface = interface;
            data.currentMode = data.currentInterface.modes[0];
            io.emit('interface-selection', interface);
            io.emit('mode-selection', data.currentMode);
        });

        socket.on('shift-mode', (mode) => {
            data.currentMode = mode;
            data.user.transition = null;
            data.user.field1 = "";
            data.user.field2 = "";

            io.emit('mode-selection', mode);
            io.emit('set-field1', data.user.field1);
            io.emit('set-field2', data.user.field2);
            io.emit('shift-transition', data.user.transition);
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
            console.log('input', text);
            data.user.input = text;
            io.emit('set-input', text);
        });
    });
};

module.exports = socket;