
// Import mongoose library
const { ObjectId, Binary } = require('mongodb');
const mongoose = require('mongoose');

// Create schema
const photoChunkSchema = new mongoose.Schema({
    files_id: ObjectId,
    data: {
        type: Binary
    },
});

// Export schema
module.exports = mongoose.model('cloud', photoChunkSchema, 'jobs');
