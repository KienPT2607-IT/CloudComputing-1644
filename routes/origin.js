var express = require('express');
const OriginModel = require("../models/OriginModel")
var router = express.Router();

router.get('/', function (req, res, next) {
    OriginModel.find((err, data) => {
        if (!err) {
            res.render('origin/index', { origin: data })
        }
    })
});

//  Render add form
router.get('/add', (req, res) => {
    res.render("origin/add");
})

//  Receive and handle data sent via add form
router.post('/add', (req, res) => {
    OriginModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add new origin successfully!')
            res.redirect("/origin")
        }
    })
})

// Delete an origin
router.get('/delete/:id', (req, res) => {
    OriginModel.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            console.log("Origin deleted successfully !");
            res.redirect("/origin");
        }
    })
})


// Render edit form
router.get('/edit/:id', (req, res) => {
    OriginModel.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render("origin/edit", {
                origin: data
            })
        }
    })
})

//  Receive and handle data sent via edit form
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var origin = req.body;
    OriginModel.findByIdAndUpdate(id, origin, (err) => {
        if (!err) {
            console.log("Origin updated successfully !")
            res.redirect("/origin")
        } else {
            console.log(err)
        }
    })
})



module.exports = router;