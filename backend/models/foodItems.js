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
		// unique:true
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
	}
});

module.exports = FoodItems = mongoose.model("FoodItems", foodItemsSchema);
