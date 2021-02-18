const socketio = require('socket.io');

const prompts = require('./experiments/prompts');
const interfaces = require('./experiments/interfaces');
const modes = require('./experiments/modes');

const data = {
    prompts,
    interfaces,
    modes,
    currentPrompt: null,
    currentInterface: null,
    currentMode: null
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
        }

        socket.on('shift-prompt', (prompt) => {
            data.currentPrompt = prompt;
            io.emit('prompt-selection', prompt);
        });

        socket.on('shift-interface', (interface) => {
            data.currentInterface = interface;
            io.emit('interface-selection', interface);
        });

        socket.on('shift-mode', (mode) => {
            data.currentMode = mode;
            io.emit('mode-selection', mode);
        });
    });
};

module.exports = socket;