promptTask = document.getElementById("prompt-task");
promptGoal = document.getElementById("goal-text");

cmdView = document.getElementById("cmd-mode-view");
dictateView = document.getElementById("dictate-mode-view");
dictateCmdsView = document.getElementById("dictate-cmds-view");
dictateCommands = document.getElementById("dictate-mode-commands");

field1Container = document.getElementById("field1-container");
field2Container = document.getElementById("field2-container");

currModeButton = document.getElementById('curr-mode-button');
transitions = document.getElementById("transitions");
field1 = document.getElementById("field1");
field2 = document.getElementById("field2");
userTextBox = document.getElementById("msg-box");

acceptButton = document.getElementById('accept-cmd-button');
cancelButton = document.getElementById('cancel-cmd-button');

currentInterface = null;
currentModes = [];

function selectInterface(interface, onModeSelect) {
    console.log("set interface called")
    currentInterface = interface;
    interface.modes.shift();
    modes = interface.modes;
    if (currentInterface.visFeedback) {
        console.log("not dictate only");
        dictateView.style.display = "none";
        dictateCmdsView.style.display = "flex";
    } else {
        dictateView.style.display = "flex";
        dictateCmdsView.style.display = "none";
        console.log("changed displays?")
        return;
    }

    setModes(onModeSelect);
}

function setModes(onModeSelect) {
    console.log('setModes called');
    while (dictateCommands.firstChild)
        dictateCommands.removeChild(dictateCommands.firstChild);
    modes.forEach(mode => {
        button = document.createElement('button');
        button.innerHTML = mode.name;
        if (onModeSelect) 
            button.onclick = () => onModeSelect(mode);
        button.setAttribute('class', 'btn button-outline-orange btn-lg btn-sim');
        button.setAttribute('id', 'btn-mode-'+mode.name)
        dictateCommands.appendChild(button);
    });
}

function showElem(element){
    element.removeAttribute('hidden');
}

function hideElem(element){
    element.setAttribute('hidden', true);
}

/*
    Cards: Transitions, Buttons
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

function setUserText(text) {
    userTextBox.innerHTML = text;
}

function setField1Value(text) {
    field1.innerText = text;
    if(text != ""){
        showElem(field1);
        showElem(transitions);
    }
}

function setField2Value(text) {
    field2.innerText = text;
    if(text != ""){
        showElem(field2);
    }
}

function selectPrompt(prompt) {
    // promptTask.innerHTML = prompt.task;
    promptGoal.innerHTML = prompt.endText;
    userTextBox.innerHTML = prompt.startText;
}

function selectMode(newMode, transitionFunc) {
    if (currentInterface && currentInterface.touch) {
        _i = 0;
        if (newMode.bottomActions.length == 2) {
            cancelButton.style.display = "inline-block";
            cancelButton.innerHTML = newMode.bottomActions[_i].name;
            _i += 1;
        } else {
            cancelButton.style.display = "none";
        }
        acceptButton.style.display = "inline-block";
        acceptButton.innerHTML = newMode.bottomActions[_i].name;
    } else {
        cancelButton.style.display = "none";
        acceptButton.style.display = "none";
    }

    if(newMode.type === "cmd"){
        modes.forEach(mode => {document.getElementById('btn-mode-'+mode.name).style.display = "none"})
        newMode.altActions.forEach(mode => {document.getElementById('btn-mode-'+mode.name).style.display = "inline-block"})

        cmdView.style.display = "block";
        currModeButton.innerHTML = newMode.name;
        
        // dictateView.style.display = "none";
        if (newMode.secondField){
            field2Container.style.display = "flex";
        } else {
            field2Container.style.display = "none";
        }
        // hideElem(field1);
        // hideElem(transitions);
        hideElem(field2);

        

        setCards(transitions, 'transition', newMode.transitions, transitionFunc)
    } else {
        modes.forEach(mode => {document.getElementById('btn-mode-'+mode.name).style.display = "inline-block"})
        cmdView.style.display = "none";
    }
    // } else {
    //     cmdView.style.display = "none";
    //     dictateView.style.display = "block";
    // }
}

function selectTransition(newTransition){
    setCards(transitions, 'transition', [newTransition], null)
    card = document.getElementById('transition-'+newTransition.name);
    card.setAttribute('selected', true);
}

window.onload = () => {
    userTextBox = document.getElementById("msg-box");

    promptTask = document.getElementById("prompt-task");
    promptGoal = document.getElementById("goal-text");

    cmdView = document.getElementById("cmd-mode-view");
    dictateView = document.getElementById("dictate-mode-view");
    dictateCmdsView = document.getElementById("dictate-cmds-view");
    dictateCommands = document.getElementById("dictate-mode-commands");
    field1Container = document.getElementById("field1-container");
    field2Container = document.getElementById("field2-container");

    cmdView.style.display = "none";
    dictateView.style.display = "none";

    currModeButton = document.getElementById('curr-mode-button');
    transitions = document.getElementById("transitions");
    field1 = document.getElementById("field1");
    field2 = document.getElementById("field2");
    userTextBox = document.getElementById("msg-box");

    acceptButton = document.getElementById('accept-cmd-button');
    cancelButton = document.getElementById('cancel-cmd-button');

    promptTask.innerHTML = "Change the text to be:"
}