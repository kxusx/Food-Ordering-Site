var express = require("express");
var router = express.Router();

// Load Buyer model
const Buyer = require("../models/buyers.js");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Buyer.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a Buyer to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contactNo: req.body.contactNo,
        age: req.body.age,
        batchName: req.body.batchName,
        wallet : 0
    });

    newBuyer.save()
        .then(Buyer => {
            res.status(200).json(Buyer);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/changeProfile", (req,res)=>{
    const email = req.body.email;

    Buyer.findOne({ email }).then(buyer => {
        buyer.email = req.body.email;
        buyer.name = req.body.name;
        buyer.password = req.body.password;
        buyer.contactNo = req.body.contactNo;
        buyer.age = req.body.age;
        buyer.batchName = req.body.batchName;
        buyer.save();
        res.send(buyer);
    });
});

router.get("/getUser",(req,res)=>{
    const id = req.body._id;
    Buyer.findOne({_id: id }).then(buyer => {
        //res.json(buyer);
        res.send(buyer);
        return buyer; 
    });
});

router.post("/getWallet",(req,res)=>{
    const email = req.body.email;
    Buyer.findOne({email: email}).then(buyer => {
        res.send(buyer);
        return buyer; 
    });
});

router.post("/addToWallet",(req,res)=>{
    const email = req.body.email;
    const wallet = req.body.wallet;

    Buyer.findOne({ email }).then(buyer => {
        buyer.wallet = parseInt(buyer.wallet)+parseInt(wallet);
        buyer.save();
        res.send(buyer);
    });
});

router.post("/setWallet",(req,res)=>{
    const email = req.body.email;
    const wallet = req.body.wallet;

    Buyer.findOne({ email }).then(buyer => {
        buyer.wallet = wallet;
        buyer.save();
        res.send(buyer);
    });
});


//POST request 
//Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find Buyer by email
    Buyer.findOne({ email,password }).then(buyer => {
        // Check if Buyer email exists
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send(buyer);
            return buyer;
        }
    });
});
module.exports = router;

