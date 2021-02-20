prompts = document.getElementById("prompts");
interfaces = document.getElementById("interfaces");
modes = document.getElementById("modes");
transitions = document.getElementById("transitions");
field1 = document.getElementById("field1-container");
field2 = document.getElementById("field2-container");

promptVis = document.getElementById("prompt-vis");

currentPrompt = null;
currentInterface = null;
currentMode = null;
currentTransition = null;

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

    promptVis.innerText = newPrompt.task;
}

function selectInterface(newInterface, onModeClick) {
    currentInterface.removeAttribute('selected');
    currentInterface = document.getElementById('interface-'+newInterface.name);
    currentInterface.setAttribute('selected', true);

    setModes(newInterface.modes, onModeClick);
}

function selectMode(newMode, onTransitionClick) {
    currentMode.removeAttribute('selected');
    currentMode = document.getElementById('mode-'+newMode.name);
    currentMode.setAttribute('selected', true);

    if(newMode.type === "cmd"){
        setTransitions(newMode.transitions, onTransitionClick)
        field1.removeAttribute('hidden');
        if (newMode.secondField){
            field2.removeAttribute('hidden');
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


    promptVis = document.getElementById("prompt-vis");

    currentPrompt = prompts;
    currentInterface = interfaces;
    currentMode = modes;
    currentTransition = transitions;
}