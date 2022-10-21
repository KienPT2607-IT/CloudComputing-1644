const express = require("express");
const ToyModel = require("../models/ToyModel")
const router = express.Router();

// Shop index - User
router.get('/', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            res.render('toy/index', { toy: data })
        }
    })
})

// Toy admin index
router.get('/admin', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            res.render('toy/admin', { toy: data })
        }
    })
})

// Example
// Cách lấy nhiều collection https://stackoverflow.com/questions/61943706/better-way-to-find-multiple-collections-with-mongoose-for-one-render
// router.get('/admin', (req, res) => {
//     Category.find((err1, data1) => {
//         ToyModel.find((err2, data2) => {
//             res.render('toy/admin', { toy: data2, cate: data1 })
//         })
//     })
// })

//  Render add form
router.get('/add', (req, res) => {
    res.render("toy/add");
})


//  Receive and handle data sent via form
router.post('/add', (req, res) => {
    ToyModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add new toy successfully!')
            res.redirect("/admin")
        }
    })
})

// Toy detail
router.get('/detail/:id', (req, res) => {
    var toy_id = req.params.id
    ToyModel.findById(toy_id, (err, data) => {
        if (!err) {
            res.render("toy/detail", { toy: data })
        }
    })
})

module.exports = router;