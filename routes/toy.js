const express = require("express");
const ToyModel = require("../models/ToyModel")
const ThemeModel = require("../models/ThemeModel")
const OriginModel = require("../models/OriginModel")
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
    ThemeModel.find((err, theme_data) => {
        if (!err) {
            OriginModel.find((err, origin_data) => {
                if (!err) {
                    res.render("toy/add", {
                        theme: theme_data,
                        origin: origin_data
                    });
                }
            })
        }
    })
})


//  Receive and handle data sent via add form
router.post('/add', (req, res) => {
    ToyModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add new toy successfully!')
            res.redirect("/toy")
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

// Toy detail - admin
router.get('/ad-detail/:id', (req, res) => {
    var toy_id = req.params.id
    ToyModel.findById(toy_id, (err, data) => {
        if (!err) {
            res.render("toy/ad-detail", { toy: data })
        }
    })
})

// Render edit form
router.get('/edit/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, data) => {
        if (!err) {
            ThemeModel.find((err, theme_data) => {
                if (!err) {
                    OriginModel.find((err, origin_data) => {
                        if (!err) {
                            res.render("toy/edit", {
                                toy: data,
                                theme: theme_data,
                                origin: origin_data
                            })
                        }
                    })
                }
            })
        }
    })
})

//  Receive and handle data sent via edit form
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var toy = req.body;
    ToyModel.findByIdAndUpdate(id, toy, (err) => {
        if (!err) {
            console.log("Toy updated successfully !")
            res.redirect("/toy/admin")
        } else {
            console.log(err)
        }
    })
})

// Delete a toy
router.get('/delete/:id', (req, res) => {
    ToyModel.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            console.log("Toy deleted successfully !");
            res.redirect("/toy/admin");
        }
    })
})


module.exports = router;