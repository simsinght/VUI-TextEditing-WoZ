const modes = require('./modes');
const { mDictateIntegrated, mDictateClutched, mDictateGD, 
    mEditClutched, mInsert, mChange, mReplace, 
    mDelete, mUndoClutched, mUndoIntegrated } = modes;

const clutch = {id: 0, name: 'multi-modal', modes:[mDictateClutched, mEditClutched, mInsert, mChange, mReplace, mDelete, mUndoClutched]};
const integrated = {id: 1, name: 'vis feedback', modes:[mDictateIntegrated, mInsert, mChange, mReplace, mDelete, mUndoIntegrated]};
const docs = {id: 2, name: 'dictate', modes:[mDictateGD]};
// const dragon = {id: 3, name: 'dragon', modes:[]};

module.exports = [docs, clutch, integrated];