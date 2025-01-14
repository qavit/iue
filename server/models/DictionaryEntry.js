const mongoose = require('mongoose');

const dictionaryEntrySchema = new mongoose.Schema({
  word: { type: String, required: true },
  pronunciation: [{ type: String }], 
  definition: { type: String, required: true },
  // ... other fields you want to store
});

const DictionaryEntry = mongoose.model('DictionaryEntry', dictionaryEntrySchema);

module.exports = DictionaryEntry;
