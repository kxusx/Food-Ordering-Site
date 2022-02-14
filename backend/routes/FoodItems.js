var express = require("express");
//const foodItems = require("../models/foodItems.js");
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
    console.log(req.body);
    const newFoodItems = new FoodItems({
        shopName: req.body.shopName,
        price: req.body.price,
        foodName: req.body.foodName,
        veg: req.body.veg,
        tag: req.body.tag,
        addOns: req.body.addOns,
        // addOnsName: req.body.addOnsName,
        //addOnsPrice: req.body.addOnsPrice,
        rating: req.body.rating,
    });
    console.log(newFoodItems);
    newFoodItems.save()
        .then(FoodItems => {
            res.status(200).json(FoodItems);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/updateFoodItem", (req, res) => {
    const id = req.body._id;
    const foodName = req.body.foodName;
    const price = req.body.price;
    const veg = req.body.veg;
    const tag = req.body.tag;
    const addOns = req.body.addOns;
    const rating = req.body.rating;
    const shopName = req.body.shopName;

    FoodItems.findOne({ _id: id }).then(foodItem => {
        foodItem.foodName = foodName;
        foodItem.price = price;
        foodItem.veg = veg;
        foodItem.tag = tag;
        foodItem.addOns = addOns;
        // foodItem.addOnsName = addOnsName;
        // foodItem.addOnsPrice = addOnsPrice;
        foodItem.rating = rating;
        foodItem.shopName = shopName;
        foodItem.save()
            .then(foodItem => {
                res.status(200).json(buyer);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
        .catch(err => res.status(400).send(err))
});

router.post("/getFoodItems", (req, res) => {
    const shopName = req.body.shopName;
    FoodItems.find({ shopName: shopName }).then(foodItems => {
        res.send(foodItems);
        return foodItems;
    });
});

router.post("/deleteFoodItem",(req,res)=>{
    const id = req.body._id;
    FoodItems.findOneAndDelete({_id:id}).then(foodItem=>{
        res.send(foodItem);
    }
    ).catch(err=>{
        res.status(400).send(err);
    })
});


router.post("/getFoodItemBasedOnID", (req, res) => {
    const id = req.body._id;
    FoodItems.findOne({ _id: id }).then(foodItems => {
        res.send(foodItems);
        return foodItems;
    });
});

router.post("/addAddOns", (req, res) => {
    const foodName = req.body.foodName;
    const addOns = req.body.addOns;
    FoodItems.findOne({ foodName: foodName }).then(foodItems => {
        foodItems.addOns = addOns;
        foodItems.save();
        res.send(foodItems);
    });
});

router.post("/delete", (req, res) => {
    const id = req.body.id;
    FoodItems.deleteOne({ _id: id }).then(item => {
        console.log("Item deleted");
    });
});
module.exports = router;