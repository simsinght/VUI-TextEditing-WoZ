prompts = document.getElementById("prompts");
interfaces = document.getElementById("interfaces");
modes = document.getElementById("modes");

currentPrompt = null;
currentInterface = null;
currentMode = null;

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

function selectPrompt(newPrompt) {
    currentPrompt.removeAttribute('selected');
    currentPrompt = document.getElementById('prompt-'+newPrompt.name);
    currentPrompt.setAttribute('selected', true);
}

function selectInterface(newInterface) {
    currentInterface.removeAttribute('selected');
    currentInterface = document.getElementById('interface-'+newInterface.name);
    currentInterface.setAttribute('selected', true);
}

function selectMode(newMode) {
    currentMode.removeAttribute('selected');
    currentMode = document.getElementById('mode-'+newMode.name);
    currentMode.setAttribute('selected', true);
}


window.onload = () => {
    prompts = document.getElementById("prompts");
    interfaces = document.getElementById("interfaces");
    modes = document.getElementById("modes");

    currentPrompt = prompts;
    currentInterface = interfaces;
    currentMode = modes;
}