const express = require('express');
const courserouter = express.Router();
const courseController = require('../controllers/coursecontroller');
const multer = require('multer');
// Routes for courses
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
courserouter.post('/addcourses', courseController.addCourse);
courserouter.get('/viewcourses', courseController.viewCourses);
courserouter.delete('/deletecourses/:coursecode', courseController.deleteCourse);
courserouter.get('/viewcoursebycode/:coursecode', courseController.viewCourseByCode);
courserouter.put('/updatecourse/:coursecode',courseController.updateCourse);
courserouter.post('/uploadfaculty', upload.single('file'),courseController.uploadFile);

module.exports = courserouter;