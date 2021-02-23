const socketio = require('socket.io');

const prompts = require('./experiments/tasks');
const interfaces = require('./experiments/interfaces');
const modes = require('./experiments/modes');

const data = {
    prompts,
    interfaces,
    modes,
    currentPrompt: null,
    currentInterface: null,
    currentMode: null,
    currentTransition: null,

    user: {
        input: "",
    }
}

const socket = (app) => {
    const io = socketio(app);

    io.on('connection', async socket => {
        const {pageType} = socket.handshake.query;
        console.log(pageType);
        console.log('connected');

        if (pageType == 'admin') {
            socket.emit('init', data)
            if (data.currentPrompt) socket.emit('prompt-selection', data.currentPrompt);
            if (data.currentInterface) socket.emit('interface-selection', data.currentInterface);
            if (data.currentMode) socket.emit('mode-selection', data.currentMode);
            if (data.currentTransition) socket.emit('transition-selection', data.currentTransition);
        }

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
            data.currentTransition = null;
            io.emit('mode-selection', mode);
        });

        socket.on('shift-transition', (transition) => {
            data.currentTransition = transition;
            io.emit('transition-selection', transition);
        });
    });
};

module.exports = socket;