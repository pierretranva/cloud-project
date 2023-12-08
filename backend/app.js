
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require ('bcrypt');

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

router.route('/jobs/update/:id').post((req, res) => {
    jobSchema.findById(req.params.id).then((item) =>{

        //need to add in the code here later to update the entry
        
        item.save().then(item =>{
            res.json
        })
        .catch(err =>{
            res.status(400).send("Update not possible")
        })

    })
})

router.route('/jobs/create').post((req, res) => {
    console.log(req.body)
    jobSchema.create(req.body).then(
        (item) =>{
            jobSchema.find().then(function(items) {
                // console.log(items);
                //find all items are returns
              res.json(items);
            })
        }
    )

})


const profileSchema = require("./models/profile")
const userSchema = require("./models/user");

function newProfile(username, password){
    profileSchema.create({}).then((item) =>{
        return {username: username, password: password, profile: item._id}
    })
}

router.route('/user/register').post( (req, res) => {
    // console.log(req.body)

    let options = {upsert: true, new: true, setDefaultsOnInsert: true};

    // userSchema.findOneAndUpdate({username: req.body.username},newProfile(req.body.username, bcrypt.hash(req.body.password, 10)), options).then(
    //     (items) =>{
    //         console.log(items)
    //         res.send(items)
    //     }
    // )
    userSchema.find({username: req.body.username}).then((item) => {
        if(item.length !=0){

            res.status(401).json("Username already used")
            console.log("trying to duplicate thing")
            res.end()
            return;
        }
        else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                profileSchema.create({}).then((item) =>{
                    userSchema.create({username: req.body.username, password: hash, profile: item._id}).then(
                        (item) =>{res.json(item)}
                    )
                });
              });
        }
    })
    
   
  });

router.route('/user/login').post( (req, res) => {
    
    userSchema.findOne({username: req.body.username}).then(
        (items) => 
        {
            if(items){
                bcrypt.compare(req.body.password, items.password, function(err, result) {

                    if (result) {
                        res.json(items)
                    }
                    else {
                        res.status(401).send("invalid password");
                    }
                  });
            }
            else{
                res.status(401).send("invalid username");
            }
        }
    )
  });

  router.route('/profile/update/:id').post( (req, res) => {
    // console.log(req.body)
  profileSchema.findById(req.params.id).then(function(items) {
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


router.route('/profile/update/:id').put((req, res) => {
  const profileId = req.params.id;
  const updateData = req.body;

  profileSchema.findByIdAndUpdate(profileId, updateData, { new: true })
    .then(updatedProfile => {
      res.json(updatedProfile);
    })
    .catch(err => {
      res.status(400).send("Update not possible");
    });
});


// Export the app to be used in bin/www.js
// module.exports = app;
const port = 3000
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
