
// Import mongoose library
const mongoose = require('mongoose');

// Create schema
const tableSchema = new mongoose.Schema({
    filename: String,
    
});

// Export schema
module.exports = mongoose.model('cloud', tableSchema, 'jobs');
