// chartEntryModel.js

const mongoose = require('mongoose');

// Define the schema for the budget entries
const chartEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  relatedValue: {
    type: Number,
    required: true, // Value is required
  },
  color: {
    type: String,
    required: true,
    match: /^#([0-9a-f]{6})$/i, // Color must be a valid hex code
  },
});

// Create a model from the schema
const ChartEntry = mongoose.model('ChartEntry', chartEntrySchema);

// Export the model to use it in other files
module.exports = ChartEntry;
