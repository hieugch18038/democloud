const express = require('express')
const StudentModel = require('../models/StudentModel')
const router = express.Router()

//view all: select * from student
router.get('/', (req, res) => {
    StudentModel.find((err, data) => {
        if (!err) {
            res.json(data)
        }
    })
})

//view by id : select * from student where _id = 'id'
router.get('/:id', (req, res) => {
    StudentModel.findById(req.params.id,(err,data) => {
        if (!err) {
            res.json(data)
        }
    })
})

//delete: delete from student where _id = 'id'
router.get('/delete/:id', (req, res) => {
    StudentModel.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            res.json({"message" : "delete student success"})
        }
    })
})

module.exports = router