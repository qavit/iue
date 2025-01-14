const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const path = require('path');

// Mongoose Data Model
const DictionaryEntry = require('../models/DictionaryEntry'); 

// MongoDB Connection
mongoose
.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Function to process a single CSV file
  async function processCSVFile(filePath) {
    const results = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          // Data Transformation
          const dictionaryEntries = results.map((row) => ({
            word: row.word,
            definition: row.definition,
            pronunciation: row.pronunciations ? row.pronunciations.split(',') : [],
            // other fields ... (e.g., accent if needed)
          }));

          // Data Insertion
          DictionaryEntry.insertMany(dictionaryEntries)
            .then(() => {
              console.log(`Data from ${filePath} inserted successfully!`);
              resolve(); 
            })
            .catch((err) => {
              console.error(`Error inserting data from ${filePath}:`, err);
              reject(err); 
            });
        });
    });
  }

  // Get a list of all CSV files in the 'lexicons' directory
  const lexiconsDir = path.join(__dirname, '../lexicons'); 
  const csvFiles = fs.readdirSync(lexiconsDir).filter((file) => file.endsWith('.csv'));

  // Process each CSV file sequentially
  async function populateDatabase() {
    for (const file of csvFiles) {
      const filePath = path.join(lexiconsDir, file);
      try {
        await processCSVFile(filePath);
      } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
      }
    }

    console.log('Database population completed!');
    db.close(); 
  }

  // Start the population process
  populateDatabase(); 
});
