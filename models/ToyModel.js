const mongoose = require("mongoose")

var ToySchema = new mongoose.Schema(
    {
        name: String,
        theme: String,
        itemCode: Number,
        price: Number,
        origin: String,
        pieces: Number,
        quantity: Number,
        image1: String,
        image2: String,
        image3: String,
        age: String
    },
    {
        versionKey: false
    }
)

var ToyModel = mongoose.model("toy", ToySchema, "toy")
module.exports = ToyModel