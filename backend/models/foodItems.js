const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemsSchema = new Schema({
	shopName: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		unique: true
	},
	veg: {
		type: Number,
		required: true
	},
	tag:{
		type: [String],
		required: true
	}
});

module.exports = foodItems = mongoose.model("foodItems", foodItemsSchema);
