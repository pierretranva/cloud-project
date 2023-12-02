const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    location: String,
    age: Number,
    height: String,
    weight: String,
    bio: String,
    image: String,
    tags: [String],
    jobs: [
        {
            title: String,
            year: String,
            description: String
        }
    ]
});

module.exports = mongoose.model('Profile', profileSchema);