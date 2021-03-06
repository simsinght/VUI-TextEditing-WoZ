const socket = io({query: {pageType: 'vui'}});

// Fire event to change which card is selected
function chooseItem(type, choice) {
    socket.emit('shift-'+type, choice);
    socket.emit('touch', choice);
}

socket.on('prompt-selection', (prompt) => {
    selectPrompt(prompt)
})

socket.on('interface-selection', (interface) => {
    selectInterface(interface, (mode) => {if (interface.touch) chooseItem('mode', mode)});
})

socket.on('mode-selection', (mode) => {
    selectMode(
        mode, 
        (transition) => chooseItem('transition', transition),
        () => chooseItem('dictate', {name: 'cancel'})
    )
})

socket.on('transition-selection', (transition) => {
    selectTransition(transition)
})

socket.on('set-field1', (text) => {
    console.log("setting field1");
    setField1Value(text);
})

socket.on('set-field2', (text) => {
    setField2Value(text);
})

socket.on('set-input', (text) => {
    setUserText(text);
})