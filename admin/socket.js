const socket = io({query: {pageType: 'admin'}});

// Fire event to change which card is selected
function chooseItem(type, choice) {
    socket.emit('shift-'+type, choice);
}

// Update text for fields, user text box
// Both params should be strings
function updateText(type, value) {
    socket.emit('update-'+type, value);
}

socket.on('init', (data) => {
    setPrompts(data.prompts, (prompt) => chooseItem('prompt', prompt));
    setInterfaces(data.interfaces, (interface) => chooseItem('interface', interface));
    setUserTextUpdater((text) => updateText('input', text), () => chooseItem('dictate',{name: 'dictate'}));
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
    selectMode(mode, (transition) => chooseItem('transition', transition), updateText)
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

socket.on('touch', (btn) =>{
    logEvent('User touched ' + btn.name);
});