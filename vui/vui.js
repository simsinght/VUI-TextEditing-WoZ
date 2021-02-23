promptTask = document.getElementById("prompt-task");
promptGoal = document.getElementById("goal-text");

cmdView = document.getElementById("cmd-mode-view");
dictateView = document.getElementById("dictate-mode-view");
field1Container = document.getElementById("field1-container");
field2Container = document.getElementById("field2-container");

transitions = document.getElementById("transitions");
field1Input = document.getElementById("field1");
field2Input = document.getElementById("field2");
userTextBox = document.getElementById("msg-box");

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
    promptTask.innerHTML = prompt.task;
    promptGoal.innerHTML = prompt.goalText;
    userTextBox.innerHTML = prompt.startText;
}

function selectMode(newMode) {
    if(newMode.type === "cmd"){
        cmdView.style.display = "block";
        dictateView.style.display = "none";
        if (newMode.secondField){
            field2Container.style.display = "flex";
        } else {
            field2Container.style.display = "none";
        }
    } else {
        cmdView.style.display = "none";
        dictateView.style.display = "block";
    }
}

window.onload = () => {
    userTextBox = document.getElementById("msg-box");

    promptTask = document.getElementById("prompt-task");
    promptGoal = document.getElementById("goal-text");

    cmdView = document.getElementById("cmd-mode-view");
    dictateView = document.getElementById("dictate-mode-view");
    field1Container = document.getElementById("field1-container");
    field2Container = document.getElementById("field2-container");

    cmdView.style.display = "none";

    transitions = document.getElementById("transitions");
    field1Input = document.getElementById("field1");
    field2Input = document.getElementById("field2");
    userTextBox = document.getElementById("msg-box");
}