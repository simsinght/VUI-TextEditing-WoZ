const actions = require('./actions');
const {aEditY, aReplaceY, aInsertY, aDeleteY, aUndoY, aChangeY, aCancelG, aResumeG, aAcceptGr, aSendGr} = actions;

const mDictate = { 
    id: 0, 
    name: 'Dictate', 
    type: 'passive', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aReplaceY, aDeleteY, aChangeY, aInsertY],
    altActions: [aUndoY], 
    bottomActions: [aSendGr],      
    cmdAcceptedField: false };

const mInsert = {
    id: 3, 
    name: 'Insert', 
    type: 'cmd', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aInsertY], 
    altActions: [aDeleteY, aReplaceY, aChangeY], 
    bottomActions: [aCancelG, aAcceptGr], 
    secondField: true,
    transitions: [{name: "at"}, {name: "before"}, {name: "after"}] };

const mReplace = {
    id: 4, 
    name: 'Replace', 
    type: 'cmd', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aReplaceY], 
    altActions: [aInsertY, aDeleteY, aChangeY], 
    bottomActions: [aCancelG, aAcceptGr], 
    secondField: true,
    transitions: [{name: "with"}] };

const mChange = {
    id: 5, 
    name: 'Change', 
    type: 'cmd', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aChangeY], 
    altActions: [aInsertY, aDeleteY, aReplaceY],
    bottomActions: [aCancelG, aAcceptGr],
    secondField: true,
    transitions: [{name: "to"}] };

const mDelete = {
    id: 5, 
    name: 'Delete', 
    type: 'cmd', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aDeleteY], 
    altActions: [aInsertY, aChangeY, aReplaceY], 
    bottomActions: [aCancelG, aAcceptGr],
    secondField: false,
    transitions: [] };

const mUndo = {
    id: 6, 
    name: 'Undo', 
    type: 'passive', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aUndoY], 
    altActions: [], 
    bottomActions: [aCancelG, aSendGr], 
    cmdAcceptedField: false };

const allModes = [mDictate, mInsert, mDelete, mReplace, mChange, mUndo]
module.exports = {mDictate, mInsert, mDelete, mReplace, mChange, mUndo, allModes};