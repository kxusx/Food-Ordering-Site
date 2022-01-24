var express = require("express");
var router = express.Router();

// Load Food Items model
const FoodItems = require("../models/foodItems.js");

//get all food items
router.get("/", function (req, res) {
    FoodItems.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/addFoodItems", (req, res) => {
    const newFoodItems = new Buyer({
        shopName: req.body.shopName,
        price: req.body.price,
        veg: req.body.veg,
        tag: req.body.tag,
    });

    newBuyer.save()
        .then(Buyer => {
            res.status(200).json(Buyer);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});