const mongoose = require("mongoose");

var ThemeSchema = new mongoose.Schema(
    {
        name: String,
        image: String
    },
    {
        versionKey: false
    }
)

var ThemeModel = mongoose.model("theme", ThemeSchema, "theme")
module.exports = ThemeModel