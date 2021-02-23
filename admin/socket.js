const socket = io({query: {pageType: 'admin'}});

function chooseItem(type, choice) {
    socket.emit('shift-'+type, choice)
}

socket.on('init', (data) => {
    setPrompts(Object.values(data.prompts), (prompt) => chooseItem('prompt', prompt));
    setInterfaces(data.interfaces, (interface) => chooseItem('interface', interface));
    // setModes(data.interfaces.modes, (mode) => chooseItem('mode', mode));
    // setTransitions(data.interfaces.modes.transition, (transition) => chooseItem('transition', transition));
})

socket.on('prompt-selection', (prompt) => {
    selectPrompt(prompt)
})

socket.on('interface-selection', (interface) => {
    selectInterface(interface, (mode) => chooseItem('mode', mode));

})

socket.on('mode-selection', (mode) => {
    selectMode(mode, (transition) => chooseItem('transition', transition))
})

socket.on('transition-selection', (transition) => {
    selectTransition(transition)
})