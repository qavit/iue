const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const DictionaryEntry = require('../models/DictionaryEntry');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB connected');
  loadData();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Load data from JSON file into MongoDB
function loadData() {
  const filePath = path.join(__dirname, '../lexicons/output_dir/Hoiliug_lexicon.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      process.exit(1);
    }
    const entries = JSON.parse(data);
    DictionaryEntry.insertMany(entries)
      .then(() => {
        console.log('Data loaded successfully');
        mongoose.disconnect();
      })
      .catch(err => {
        console.error('Error loading data:', err);
        mongoose.disconnect();
      });
  });
}
