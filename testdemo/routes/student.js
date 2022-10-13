const express = require('express')
const { render } = require('../app')
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

router.get('/detail/:id', (req, res) => {
  StudentModel.findById(req.params.id, (err, student) => {
    if (!err) {
      res.render('student/info', {student : student})
    }
  })
})

router.get('/api', (req, res) => {
  StudentModel.find((err, data) => {
    if (!err) {
      //res.send(data)
      //render ra trang index ở thư mục views/student
      res.json(data)
    }
  })
})
//da khai bao router student tu app.js
router.get('/delete/:id', (req, res) => {
  //var id123 = req.params.id  //params => truyen theo duong dan; body => chuyen theo form
  StudentModel.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err)
    }else{
      console.log("delete success");
      //var message = "Delete student success"
      // redirect ve trang /student
      res.redirect("/student")
    }
  })
})
//render ra form Add
router.get('/add', (req, res) => {
  res.render("student/new")
})

//nhận &xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
  var student = new StudentModel(req.body) ;
  student.save((err) => {
    if (!err) {
      console.log("Add success")
      res.redirect("/student")
    }
  })
})

//render ra form Edit
router.get('/edit/:id', (req, res) => {
  StudentModel.findById(req.params.id, (err, data) => {
    if (!err) {
      //render ra file: update.hbs (trong thư mục views/student)
      //gửi kèm dữ liệu của object student để load vào form edit
      //student (tên) , data (dữ liệu)
      res.render("student/update", {student: data})
    }
  })
})
//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
  StudentModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (!err) {
      console.log ("Update success")
      res.redirect("/student")
    }
  })
})


module.exports = router