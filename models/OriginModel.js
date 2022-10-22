const mongoose = require("mongoose");

var OriginSchema = new mongoose.Schema(
    {
        name: String,
        image: String
    },
    {
        versionKey: false
    }
)

var ThemeModel = mongoose.model("origin", OriginSchema, "origin")
module.exports = ThemeModel