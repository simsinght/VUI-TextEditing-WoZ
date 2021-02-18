const socket = io({query: {pageType: 'admin'}});

function chooseItem(type, choice) {
    socket.emit('shift-'+type, choice)
}

socket.on('init', (data) => {
    setPrompts(data.prompts, (prompt) => chooseItem('prompt', prompt));
    setInterfaces(data.interfaces, (interface) => chooseItem('interface', interface));
    // setModes(data.interfaces.modes, (mode) => chooseItem('mode', mode));
})

socket.on('prompt-selection', (prompt) => {
    selectPrompt(prompt)
})

socket.on('interface-selection', (interface) => {
    selectInterface(interface, (mode) => chooseItem('mode', mode));

})

socket.on('mode-selection', (mode) => {
    selectMode(mode)
})