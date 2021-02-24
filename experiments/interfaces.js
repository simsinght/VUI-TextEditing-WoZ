const modes = require('./modes');
const { allModes } = modes;

const iVoiceVisTouch = {id: 0, name: 'voice + vis + touch', modes: allModes, touch: true, visFeedback: true};
const iVoiceVis = {id: 1, name: 'voice + vis', modes: allModes, touch: false, visFeedback: true};
const iVoice = {id: 2, name: 'voice', modes: allModes, touch: false, visFeedback: false};

module.exports = [iVoice, iVoiceVisTouch, iVoiceVis];