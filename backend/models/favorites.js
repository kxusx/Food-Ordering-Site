const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
    shopName: { 
        type: [String],
        required: true,
    }, 
    foodName: {
        type:[String],
        required:true,
    },
    buyerEmail: {
        type:String,
        required:true,

    },
});

module.exports = Favorites = mongoose.model("Favorites", favoritesSchema);