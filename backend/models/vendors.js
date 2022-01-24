const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const vendorSchema = new Schema({
	managerName: {
		type: String,
		required: true
	},
	shopName: {
		type: String,
		required: true
	},
	email:{
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
	openingTime:{
		type: Number,
		required: true
	},
    closingTime:{
        type: Number,
		required: true
    }
});

module.exports = Vendor = mongoose.model("Vendors", vendorSchema);
