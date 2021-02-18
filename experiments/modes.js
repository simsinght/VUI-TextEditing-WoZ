const actions = require('./actions');
const {aEditY, aReplaceY, aInsertY, aDeleteY, aUndoY, aChangeY, aCancelG, aResumeG, aAcceptGr, aSendGr} = actions;

const mDictateIntegrated = { 
    id: 0, 
    name: 'Dictate', 
    type: 'passive', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aReplaceY, aDeleteY, aChangeY, aInsertY],
    altActions: [aUndoY], 
    bottomActions: [aCancelG, aSendGr],      
    cmdAcceptedField: false };

const mDictateClutched = { 
    id: 1, 
    name: 'Dictate', 
    type: 'passive', 
    micColor: 'blue', 
    color: 'blue', 
    topActions: [aEditY, aUndoY], 
    altActions: [], 
    bottomActions: [aCancelG, aSendGr],
    cmdAcceptedField: false };

const mDictateGD = { 
    id: 2, 
    name: 'Dictate', 
    type: 'passive', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [], 
    altActions: [], 
    bottomActions: [], 
    cmdAcceptedField: true };

const mEditClutched = {
    id: 8, 
    name: 'Edit', 
    type: 'passive', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aReplaceY, aDeleteY, aChangeY, aInsertY], 
    altActions: [], 
    bottomActions: [aCancelG, aSendGr], 
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
    transitions: ["at", "before", "after"] };

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
    transitions: ["with"] };

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
    transitions: ["to"] };

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

const mUndoIntegrated = {
    id: 6, 
    name: 'Undo', 
    type: 'passive', 
    micColor: 'yellow', 
    color: 'yellow', 
    topActions: [aUndoY], 
    altActions: [], 
    bottomActions: [aCancelG, aSendGr], 
    cmdAcceptedField: false };

const mUndoClutched = {
    id: 7, 
    name: 'Undo', 
    type: 'passive', 
    micColor: 'blue', 
    color: 'blue', 
    topActions: [aUndoY], 
    altActions: [], 
    bottomActions: [aResumeG, aSendGr], 
    cmdAcceptedField: false };

module.exports = {mDictateIntegrated, mDictateClutched, mDictateGD, mEditClutched, mInsert, mChange, mReplace, mDelete, mUndoClutched, mUndoIntegrated};