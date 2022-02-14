const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const buyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	},
	contactNo:{
		type: Number,
		required: true
	},
	age:{
		type: Number,
		required: true
	},
	batchName:{
		type: String,
		required: true
	},
	wallet:{
		type: Number,
		required: true
	}
});

module.exports = Buyer = mongoose.model("Buyers", buyerSchema);
