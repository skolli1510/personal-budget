// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ChartEntry = require('./ChartEntrySchema'); // Import the schema model

const app = express();
const port = 3000; // Define your server port

app.use(cors());
app.use(express.static('public')); // Serve static files
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodb_demo');


// Endpoint to get all budget entries
app.get('/budget', async (req, res) => {
  try {
    const budgetData = await ChartEntry.find({}); // Fetch all entries from the chart
    res.json({ myBudget: budgetData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/data', async (req, res) => {
    try {
      const newEntry = new ChartEntry(req.body);
      const savedEntry = await newEntry.save();
      res.status(201).json(savedEntry);
    } catch (error) {
      console.error('Error saving data:', error.message);  // Log the error
      res.status(400).json({ error: error.message });  // Send the error message back
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
