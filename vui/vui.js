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
field1Input = document.getElementById("field1");
field2Input = document.getElementById("field2");
userTextBox = document.getElementById("msg-box");

currentInterface = null;
currentModes = [];

function selectInterface(interface) {
    currentInterface = interface;
    modes = interface.modes;
    console.log(currentInterface.modes, currentInterface.modes.length);
    if (currentInterface.modes.length != 1) {
        console.log("not dictate only");
        dictateView.style.display = "none";
        dictateCmdsView.style.display = "flex";
    } else {
        dictateView.style.display = "flex";
        dictateCmdsView.style.display = "none";
        return;
    }


    setModes();
}

function setModes() {
    while (dictateCommands.firstChild)
        dictateCommands.removeChild(dictateCommands.firstChild);
    for (i=0;i<modes.length;i++){
        button = document.createElement('button');
        button.innerHTML = modes[i].name;
        button.setAttribute('class', 'btn btn-outline-primary btn-sm btn-sim');
        dictateCommands.appendChild(button);
    }
}

function setUserText(text) {
    userTextBox.innerHTML = text;
}

function setField1Value(text) {
    field1Input.value = text;
}

function setField2Value(text) {
    field2Input.value = text;
}

function selectPrompt(prompt) {
    // promptTask.innerHTML = prompt.task;
    promptGoal.innerHTML = prompt.endText;
    userTextBox.innerHTML = prompt.startText;
}

function selectMode(newMode) {
    if(newMode.type === "cmd"){
        cmdView.style.display = "block";
        currModeButton.innerHTML = newMode.name;
        
        // dictateView.style.display = "none";
        if (newMode.secondField){
            field2Container.style.display = "flex";
        } else {
            field2Container.style.display = "none";
        }
    } else {
        cmdView.style.display = "none";
    }
    // } else {
    //     cmdView.style.display = "none";
    //     dictateView.style.display = "block";
    // }
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
    field1Input = document.getElementById("field1");
    field2Input = document.getElementById("field2");
    userTextBox = document.getElementById("msg-box");

    promptTask.innerHTML = "Change the text to be:"
}