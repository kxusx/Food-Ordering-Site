var express = require("express");
var router = express.Router();

// Load Vendor model
const Vendor = require("../models/vendors.js");
 
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a Vendor to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        managerName: req.body.managerName,
        shopName: req.body.shopName,
        email: req.body.email,
        password: req.body.password,
        contactNo: req.body.contactNo,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime
    });

    newVendor.save()
        .then(Vendor => {
            res.status(200).json(Vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/getVendor", (req, res) => {
    const email = req.body.email;
    Vendor.findOne({ email }).then(vendor => {
        //res.json(buyer);
        res.send(vendor);
        return vendor;
    });

});

//POST request 
//Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find Vendor by email
    Vendor.findOne({ email,password }).then(vendor => {
        // Check if Vendor email exists
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send(vendor);
            return vendor;
        }
    });
});
module.exports = router;

router.post("/changeProfile", (req,res)=>{
    const email = req.body.email;

    Vendor.findOne({ email }).then(vendor => {
        vendor.managerName = req.body.managerName;
        vendor.shopName = req.body.shopName;
        vendor.email = req.body.email;
        vendor.password = req.body.password;
        vendor.contactNo = req.body.contactNo;
        vendor.openingTime = req.body.openingTime;
        vendor.closingTime = req.body.closingTime;
        vendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
    .catch(err => res.status(400).send(err))

});