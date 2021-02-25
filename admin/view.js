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

currentPrompt = null;
currentInterface = null;
currentMode = null;
currentTransition = null;

const WORD_END_CHARS = ' .;,\n":';

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
    currentMode.removeAttribute('selected');
    currentMode = document.getElementById('mode-'+newMode.name);
    currentMode.setAttribute('selected', true);

    if(newMode.type === "cmd"){
        setTransitions(newMode.transitions, onTransitionClick)
        field1.removeAttribute('hidden');
        field1Input.oninput = (e) => { 
            e.preventDefault(); 
            if(WORD_END_CHARS.includes(e.data))
                onFieldInput('field1', e.target.value); 
        };
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
    } else {
        setTransitions([], null);
        currentTransition = null;
        field1.setAttribute('hidden', true);
        field2.setAttribute('hidden', true);
    }
}

function setUserTextUpdater(updateCallback) {
    userTextBox.oninput = (e) => {
        if(WORD_END_CHARS.includes(e.data))
            updateCallback(e.target.value);
        };
            
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

function selectTransition(newTransition) {
    if(currentTransition){
        currentTransition.removeAttribute('selected');
    }
    currentTransition = document.getElementById('transition-'+newTransition.name);
    currentTransition.setAttribute('selected', true);
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

    currentPrompt = prompts;
    currentInterface = interfaces;
    currentMode = modes;
    currentTransition = transitions;
}