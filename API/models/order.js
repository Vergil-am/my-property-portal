const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        UserId: {type: String, required: true},
        PropertyId: {type: String, required: true},
        PropertyTitle: {type: String, required: true},
        FirstName: {type: String, required: true},
        LastName: {type: String, required: true},
        Email: {type: String, required: true},
        Phone: {type: String, required: true},
        
        Status : {type: String, default: "pending"},
    }, {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema)