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
        foodName : req.body.foodName,
        veg: req.body.veg,
        tag: req.body.tag,
        addOns: req.body.addOns,
        addOnsName:req.body.addOnsName,
        addOnsPrice:req.body.addOnsPrice,
        rating: req.body.rating,
    });
    console.log(newFoodItems);
    newFoodItems.save()
        .then(FoodItems => {
            res.status(200).json(FoodItems );
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/getFoodItems",(req,res)=>{
    const shopName = req.body.shopName;
    FoodItems.find({shopName:shopName}).then(foodItems=>{
        res.send(foodItems);
        return foodItems;
    });
});

router.post("/addAddOns",(req,res)=>{
    const foodName = req.body.foodName;
    const addOns = req.body.addOns;
    FoodItems.findOne({foodName: foodName}).then(foodItems=>{
        foodItems.addOns = addOns;
        foodItems.save();
        res.send(foodItems);
    });
});

router.post("/delete",(req,res)=>{
    const id = req.body.id;
    FoodItems.deleteOne({_id:id}).then(item=>{
        console.log("Item deleted");
    });
});
module.exports = router;