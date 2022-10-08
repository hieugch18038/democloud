const express = require('express')
const StudentModel = require('../models/StudentModel')
const router = express.Router()

router.get('/', (req, res) => {
  StudentModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/student
      res.render('student/index', { students: data })
    }
  })
})

module.exports = router