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

    user: {
        input: "",
        field1: "",
        transition: "",
        field2: ""
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
            if (data.user.transition) socket.emit('transition-selection', data.user.transition);
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