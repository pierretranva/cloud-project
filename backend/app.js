
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const User = require('./models/user');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Set the web server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) =>
    res.send('<h1>Cloud Project Backend</h1>') // Home web page
);

// Connect to MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://cloud:cloud@cluster0.fdxyg7y.mongodb.net/cloud?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

// Create routes for database access
const jobSchema = require("./models/job");
const router = express.Router();
app.use('/db', router);
router.route('/jobs').get( (req, res) => {
  jobSchema.find().then(function(items) {
        // console.log(items);
        //find all items are returns
      res.json(items);
    }
  );
});

const requireAuth = jwt({
  secret: 'SECRET_KEY', 
  algorithms: ['HS256'],
  userProperty: 'auth'
});

// Example of a protected route
app.get('/protected', requireAuth, (req, res) => {
  res.send('This is a protected route');
});


// Added support for post requests. A document is found based on its id. The id is the value of _id property of the document.
router.route('/update/:id').post( (req, res) => {
    // console.log(req.body)
  jobSchema.findById(req.params.id).then(function(items) {
    //add logic here later
    // items.title = req.body.newTitle
    items.save().then(items => {
      res.json('Items updated!');
    })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
  
  });
})

router.get('/profile/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        res.json(profile);
    } catch (error) {
        res.status(404).send("Profile not found");
    }
});

router.post('/profile', async (req, res) => {
    const newProfile = new Profile(req.body);
    try {
        await newProfile.save();
        res.status(201).send(newProfile);
    } catch (error) {
        res.status(400).send("Error saving profile");
    }
});

router.put('/profile/:id', async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(profile);
    } catch (error) {
        res.status(400).send("Error updating profile");
    }
});

// Export the app to be used in bin/www.js
// module.exports = app;
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
