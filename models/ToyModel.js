const mongoose = require("mongoose")

var ToySchema = new mongoose.Schema(
    {
        name: String,
        codeOfProduct: Number,
        price: Number,
        origin: String,
        concept: String,
        brand: String,
        quantity: Number,
        image1: String,
        image2: String,
        image3: String,
        gender: String,
        age: Number
    },
    {
        versionKey: false
    }
)

var ToyModel = mongoose.model("toy", ToySchema, "toy")
module.exports = ToyModel