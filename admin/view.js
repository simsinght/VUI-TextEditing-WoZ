prompts = document.getElementById("prompts");
interfaces = document.getElementById("interfaces");
modes = document.getElementById("modes");
transitions = document.getElementById("transitions");
field1 = document.getElementById("field1-container");
field2 = document.getElementById("field2-container");
field1Input = document.getElementById("field1");
field2Input = document.getElementById("field2");
userTextBox = document.getElementById("user-text");

promptVis = document.getElementById("prompt-vis");
userText = document.getElementById("user-text");
eventLog = document.getElementById("event-log");

currentPrompt = null;
currentInterface = null;
currentMode = null;
currentTransition = null;

const WORD_END_CHARS = ' .;,\n":';
shortcuts = {}

/*
    Cards: Interface, Prompt, Mode
*/

function newCard(type, title, onclick) {
    card = document.createElement('div');
    card.setAttribute('class', 'card');
    id = type + '-' + title;
    card.setAttribute('id', id);

    body = document.createElement('div');
    body.setAttribute('class', 'card-body');
    body.innerText = title;

    card.appendChild(body);
    card.onclick = onclick;
    card.style.marginLeft = "10px";

    return card;
}

function setCards(container, type, items, func) {
    while (container.firstChild)
        container.removeChild(container.firstChild);

    items.forEach(item => {
        card = newCard(type, item.name, () => func(item));
        container.appendChild(card);
    })
}

function setPrompts(newPrompts, func) {
    setCards(prompts, 'prompt', newPrompts, func);
}

function setInterfaces(newInterfaces, func) {
    setCards(interfaces, 'interface', newInterfaces, func);
}

function setModes(newModes, func) {
    setCards(modes, 'mode', newModes, func);

    shortcuts = {};

    for(let i = 0; i <= newModes.length; i++){
        shortcuts[i+1] = () => {func(newModes[i])};
    }
}

function setTransitions(newTransitions, func) {
    setCards(transitions, 'transition', newTransitions, func);
}

function selectPrompt(newPrompt) {
    currentPrompt.removeAttribute('selected');
    currentPrompt = document.getElementById('prompt-'+newPrompt.name);
    currentPrompt.setAttribute('selected', true);

    promptVis.innerHTML = newPrompt.endText;
    userText.value = newPrompt.startText;
}

function selectInterface(newInterface, onModeClick) {
    if(currentInterface){
        currentInterface.removeAttribute('selected');
    }
    currentInterface = document.getElementById('interface-'+newInterface.name);
    currentInterface.setAttribute('selected', true);

    setModes(newInterface.modes, onModeClick);
}

/*
    Selection and setting of modes, fields, "transitions"
*/
function selectMode(newMode, onTransitionClick, onFieldInput) {
    console.log(newMode);
    if(!modes){
        return;
    }
    
    if(currentMode){
        currentMode.removeAttribute('selected');
    }
    currentMode = document.getElementById('mode-'+newMode.name);
    currentMode.setAttribute('selected', true);

    delete shortcuts[9];
    delete shortcuts[0];

    if(newMode.type === "cmd"){
        setTransitions(newMode.transitions, onTransitionClick)
        field1.removeAttribute('hidden');
        field1Input.oninput = (e) => { 
            e.preventDefault(); 
            if(WORD_END_CHARS.includes(e.data))
                onFieldInput('field1', e.target.value); 
        };
        defField1OnBlur = (e) => {e.preventDefault(); onFieldInput('field1', e.target.value);}
        defField2OnBlur = (e) => {e.preventDefault(); onFieldInput('field2', e.target.value);}
        if (newMode.secondField){
            field2.removeAttribute('hidden');
            field2Input.oninput = (e) => { 
                e.preventDefault(); 
                if(WORD_END_CHARS.includes(e.data))
                    onFieldInput('field2', e.target.value); 
            };
        } else {
            field2.setAttribute('hidden', true);
        }

        console.log("type of mode:",newMode.name);
        switch(newMode.name) {
            case "Insert": 
                field1Input.focus();
                shortcuts[9] = () => onTransitionClick(newMode.transitions[0]);
                shortcuts[0] = () => onTransitionClick(newMode.transitions[1]);
                field1Input.onblur = (e) => {
                    defField1OnBlur(e);
                };
                field2Input.onblur = (e) => {
                    defField2OnBlur(e);
                    idx = userText.value.indexOf(field2Input.value);
                    if (idx != -1) {
                        before = userText.value.slice(0,idx).trim();
                        after = userText.value.slice(idx+field2Input.value.length).trim();;
                        if (document.getElementById('transition-before').attributes.selected) {
                            userText.value = before + ' ' + field1Input.value.trim() + ' ' + field2Input.value + ' ' + after;
                        } else {
                            userText.value = before + ' ' + field2Input.value.trim() + ' ' + field1Input.value + ' ' + after;
                            userText.value = userText.value.trim();
                        }
                    }

                };
                break;
            case "Delete":
                field1Input.focus();
                field1Input.onblur = (e) => {
                    defField1OnBlur(e);
                    userText.value = userText.value.replace(field1Input.value,'');
                }
                break;
            case "Replace": 
            case "Change":
                field1Input.focus();
                field1Input.onblur = (e) => {
                    defField1OnBlur(e);
                    onTransitionClick(newMode.transitions[0]);
                    transitions.firstChild.setAttribute('selected', 'true');
                }
                field2Input.onblur = (e) => {
                    defField2OnBlur(e);
                    console.log(userText);
                    userText.value = userText.value.replace(field1Input.value,field2Input.value);
                    console.log(userText);
                }
                break;
            default:
                break;
        }
    } else {
        setTransitions([], null);
        currentTransition = null;
        field1.setAttribute('hidden', true);
        field2.setAttribute('hidden', true);
    }
}

function setUserTextUpdater(updateCallback, shiftToDictate) {
    userTextBox.oninput = (e) => {
        if(WORD_END_CHARS.includes(e.data))
            updateCallback(e.target.value);
        };
        userTextBox.onblur = (e) => {e.preventDefault(); updateCallback(e.target.value); }
}

function setField1Value(text) {
    console.log(text);
    if (text == "") {
        field1Input.value = text;
    }
}

function setField2Value(text) {
    console.log(text);
    if (text == "") {
        field2Input.value = text;
    }
}

function setUserText(text) {
    console.log(text);
    // userTextBox.value = text;
}

function setUserTextUndo(text) {
    console.log(text);
    userTextBox.value = text;
}

function selectTransition(newTransition) {
    if(currentTransition){
        currentTransition.removeAttribute('selected');
    }
    currentTransition = document.getElementById('transition-'+newTransition.name);
    currentTransition.setAttribute('selected', true);
}

function logEvent(msg) {
    eventLog.innerText += msg + '\n';
    eventLog.scrollTop = eventLog.scrollHeight;
}

window.onload = () => {
    prompts = document.getElementById("prompts");
    interfaces = document.getElementById("interfaces");
    modes = document.getElementById("modes");
    transitions = document.getElementById("transitions");

    field1 = document.getElementById("field1-container");
    field2 = document.getElementById("field2-container");
    field1Input = document.getElementById("field1");
    field2Input = document.getElementById("field2");
    userTextBox = document.getElementById("user-text");

    promptVis = document.getElementById("prompt-vis");
    userText = document.getElementById("user-text");
    eventLog = document.getElementById("event-log");

    currentPrompt = prompts;
    currentInterface = interfaces;
    currentMode = modes;
    currentTransition = transitions;

    document.addEventListener('keypress', (e) => {
        if (e.key in shortcuts){
            e.preventDefault();
            shortcuts[e.key]();
        }
      });
}