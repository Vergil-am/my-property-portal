const mongoose = require("mongoose");


const JoinFormSchema = new mongoose.Schema(
    {
        FirstName: {type: String, required: true},
        LastName: {type: String, required: true},
        Email: {type: String, required: true, unique: true},
        Phone: {type: String},
    }, {timestamps: true}
);

module.exports = mongoose.model("JoinFrom", JoinFormSchema)