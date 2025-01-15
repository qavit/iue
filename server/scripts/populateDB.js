const fs = require('fs');
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
  
  // Function to process a single JSON file
  async function processJSONFile(filePath) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Assuming your JSON data is an array of objects
      const dictionaryEntries = data.map((entry) => ({
          word: entry.word,
          definition: entry.definition,
          pronunciation: entry.pronunciations || [], // Handle missing pronunciations
          // ... other fields from your JSON structure
      }));
      
      await DictionaryEntry.insertMany(dictionaryEntries);
      console.log(`Data from ${filePath} inserted successfully!`);
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err);
      throw err; // Re-throw the error to be handled in the calling function
    }
  }
  
  // Get a list of all JSON files in the 'lexicons/output_dir' directory
  const lexiconsDir = path.join(__dirname, '../lexicons/output_dir');
  const jsonFiles = fs.readdirSync(lexiconsDir).filter((file) => file.endsWith('.json'));
  
  // Process each JSON file sequentially
  async function populateDatabase() {
    for (const file of jsonFiles) {
      const filePath = path.join(lexiconsDir, file);
      try {
        await processJSONFile(filePath);
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
