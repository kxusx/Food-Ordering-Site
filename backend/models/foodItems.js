const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemsSchema = new Schema({
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
	tag:{ 
		type: [String],
		required: true
	},
	addOns:{
		type:[{
			addOnName: {
				type: String,
				required: true
			},
			addOnPrice: {
				type: Number,
				required: true
			}
		}],
		required: true
	},
	addOnsName:{
		type: [String],
		required: true
	},
	addOnsPrice:{
		type: [Number],
		required: true
	},
	rating:{
		type: Number,
		required: true,
	}
});

module.exports = FoodItems = mongoose.model("FoodItems", foodItemsSchema);
