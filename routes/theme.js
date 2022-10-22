var express = require('express');
const ThemeModel = require("../models/ThemeModel")
var router = express.Router();

router.get('/', function (req, res, next) {
    ThemeModel.find((err, data) => {
        if (!err) {
            res.render('theme/index', { theme: data })
        }
    })
});


//  Render add form
router.get('/add', (req, res) => {
    res.render("theme/add");
})

//  Receive and handle data sent via add form
router.post('/add', (req, res) => {
    ThemeModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add new theme successfully!')
            res.redirect("/theme")
        }
    })
})

// Delete an origin
router.get('/delete/:id', (req, res) => {
    ThemeModel.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            console.log("Theme deleted successfully !");
            res.redirect("/theme");
        }
    })
})


// Render edit form
router.get('/edit/:id', (req, res) => {
    ThemeModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("theme/edit", { theme: data })
        }
    })
})

//  Receive and handle data sent via edit form
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var origin = req.body;
    ThemeModel.findByIdAndUpdate(id, origin, (err) => {
        if (!err) {
            console.log("Theme updated successfully !")
            res.redirect("/theme")
        } else {
            console.log(err)
        }
    })
})

module.exports = router;