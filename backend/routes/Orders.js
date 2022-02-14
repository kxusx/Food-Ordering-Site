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

router.post("/updateOrder",function(req,res){
        const id = req.body._id;

        Orders.findOne({_id : id}).then(order => {
            order.status = req.body.status;

            order.save()
            .then(order => {
                res.status(200).json(order);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    })
        .catch(err => res.status(400).send(err))
        
});

router.post("/getOrder",function(req,res){
    const email = req.body.email;
    
    Orders.find({buyerEmail: email}).then(orders=>{
        res.send(orders);
    });
});

router.post("/getOrderBasedOnShop",function(req,res){
    const shopName = req.body.shopName;
    
    Orders.find({shopName:shopName}).then(orders=>{
        res.send(orders);
    });
});

module.exports = router;
