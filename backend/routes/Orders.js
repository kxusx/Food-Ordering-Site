var express = require("express");
var router = express.Router();

// Load Buyer model
const Orders = require("../models/orders.js");

router.get("/", function (req, res) {
    Orders.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    }) 
});

router.post("/addOrder",function(req,res){
    const newOrder = new Orders({
        buyerEmail: req.body.buyerEmail,
        foodName: req.body.foodName,
        shopName: req.body.shopName,       
        price: req.body.price,
        veg: req.body.veg,
        status: req.body.status,
        quantity: req.body.quantity,
        addOns: req.body.addOns,
        rating: req.body.rating,
    });

    newOrder.save()
        .then(Orders => {
            res.status(200).json(Orders);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/getOrder",function(req,res){
    const email = req.body.email;
    
    Orders.find({buyerEmail: email}).then(orders=>{
        res.send(orders);
    });
});

module.exports = router;
