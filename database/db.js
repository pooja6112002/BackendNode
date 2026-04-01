const { MongoClient } = require('mongodb');

// MongoDB connection URL (Compass se copy karo)
//const url = 'mongodb://127.0.0.1:27017';
const url="mongodb+srv://admin123:admin123@cluster0.f0iz8bs.mongodb.net/?appName=Cluster0"
// Database name
const dbName = 'sample_mflix';

// Create client
const client = new MongoClient(url);

async function connectDB() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');

    // Select database
    const db = client.db(dbName);
 return db; // Return the database object for use in other modules
   
     

  } catch (err) {
    console.error('❌ Connection Error:', err);
  } 
}

module.exports = connectDB; // Export the connectDB function for use in other modules