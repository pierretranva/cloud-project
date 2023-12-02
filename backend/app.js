
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Set the web server
const app = express();
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

// Export the app to be used in bin/www.js
// module.exports = app;
const port = 3000
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
