const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
	shopName: {
		type: String,
		required: true, 
	},
    foodName: {
        type:String,
        required:true,
    },
	price: {
		type: Number,
		required: true,
	},
	veg: {
		type: Boolean,
		required: true
	},
    buyerEmail:{
        type: String,
		required: true
    },
    status:{
        type: String,   
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    addOns:{
        type: [String],
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min:0,
        max:5,
    }
},{
    timestamps: true
});

module.exports = Orders = mongoose.model("Orders", ordersSchema);
