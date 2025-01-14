const mongoose = require('mongoose');

const dictionaryEntrySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, 
  term: { type: String, required: true },
  partOfSpeech: { type: String },
  termIndexes: [{ type: String }], 
  pronunciation: {
    standardPronunciation: { type: String },
    pronunciationNotes: { type: String }
  },
  definitions: { type: String }, 
  examples: [{ type: String }], 
  similarTerms: [{ type: String }],
  oppositeTerms: { type: String },
  audioFileName: { type: String }
});

const DictionaryEntry = mongoose.model('DictionaryEntry', dictionaryEntrySchema);

module.exports = DictionaryEntry;
