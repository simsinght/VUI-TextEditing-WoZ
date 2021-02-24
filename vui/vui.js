promptTask = document.getElementById("prompt-task");
promptGoal = document.getElementById("goal-text");

cmdView = document.getElementById("cmd-mode-view");
dictateView = document.getElementById("dictate-mode-view");
field1Container = document.getElementById("field1-container");
field2Container = document.getElementById("field2-container");

transition = document.getElementById("transition");
field1 = document.getElementById("field1");
field2 = document.getElementById("field2");
userTextBox = document.getElementById("msg-box");

function showElem(element){
    element.removeAttribute('hidden');
}

function hideElem(element){
    element.setAttribute('hidden', true);
}

function setUserText(text) {
    userTextBox.innerHTML = text;
}

function setField1Value(text) {
    field1.innerText = text;
    if(text != ""){
        showElem(field1);
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

function selectInterface(newInterface){
    // TODO
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
        hideElem(field1);
        hideElem(transition);
        hideElem(field2);
    } else {
        cmdView.style.display = "none";
        dictateView.style.display = "block";
    }
}

function selectTransition(newTransition){
    transition.innerText = newTransition.name;
    showElem(transition);
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

    transition = document.getElementById("transition");
    field1 = document.getElementById("field1");
    field2 = document.getElementById("field2");
    userTextBox = document.getElementById("msg-box");

    promptTask.innerHTML = "Change the text to be:"
}