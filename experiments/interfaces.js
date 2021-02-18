const modes = require('./modes');
const { mDictateIntegrated, mDictateClutched, mDictateGD, 
    mEditClutched, mInsert, mChange, mReplace, 
    mDelete, mUndoClutched, mUndoIntegrated } = modes;

const clutch = {id: 0, name: 'clutch', modes:[mDictateClutched, mEditClutched, mInsert, mChange, mReplace, mDelete, mUndoClutched]};
const integrated = {id: 1, name: 'integrated', modes:[mDictateIntegrated, mInsert, mChange, mReplace, mDelete, mUndoIntegrated]};
const docs = {id: 2, name: 'docs', modes:[mDictateGD]};
const dragon = {id: 3, name: 'dragon', modes:[]};

module.exports = [clutch, integrated, docs, dragon];