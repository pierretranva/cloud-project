
// Import mongoose library
const mongoose = require('mongoose');

// Create schema
const jobSchema = new mongoose.Schema({
    title: String,
    location: String,
    dangerLevel: String,
    description: String,
    roles:
    {
        type: Array,
        items:{
            Object,
            properties:{
                title: String,
                description: String
            }
        }
    },
    date: String,
    contact: String
});

// Export schema
module.exports = mongoose.model('jobs', jobSchema);
