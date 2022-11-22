
const mongoose = require("mongoose");


const PropertySchema = new mongoose.Schema(
    {
        Title: {type: String, required: true},
        Description: {type: String, required: true},
        Image: {type: String, required: true},
        Bedrooms: {type: Number, required: true , default: 0},
        Bathrooms: {type: Number, required: true, default: 0},
        Garages: {type: Number, required: true, default: 0},
        LandSize: {type: Number,},
        Width: {type: Number,},
        Frontage: {type: String,},
        Location: {type: String, required: true, default: ""},
        Price: {type: Number, required: true},
        Size: {type: Number, required: true},
        Type: {type: String, required: true, default: ""},
        Available :{type: Boolean},
    }, {timestamps: true}
);

module.exports = mongoose.model("Property", PropertySchema)