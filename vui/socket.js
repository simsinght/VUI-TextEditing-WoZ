const socket = io({query: {pageType: 'vui'}});

socket.on('prompt-selection', (prompt) => {
    selectPrompt(prompt)
})

socket.on('interface-selection', (interface) => {
    selectInterface(interface, (mode) => chooseItem('mode', mode));
})

socket.on('mode-selection', (mode) => {
    selectMode(mode)
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