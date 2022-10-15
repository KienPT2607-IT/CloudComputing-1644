const express = require("express");
const ToyModel = require("../models/ToyModel")
const router = express.Router();

router.get('/', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            res.render('toy/index', { toy: data })
        }
    })
})

router.get('/detail/:id', (req, res) => {
    var toy_id = req.params.id
    ToyModel.findById(toy_id, (err, data) => {
        if (!err) {
            res.render("toy/detail", { toy: data })
        }
    })
})

module.exports = router;