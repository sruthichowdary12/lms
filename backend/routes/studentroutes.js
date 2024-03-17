const studentcontroller = require("../controllers/studentcontroller")
const express = require("express")
const studentrouter = express.Router()
const multer = require('multer');
//recruiter routes
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
studentrouter.post('/addStudent', studentcontroller.addStudent);
studentrouter.get('/viewStudent', studentcontroller.viewStudents);
studentrouter.delete('/deleteStudent/:studentId', studentcontroller.deleteStudent);
studentrouter.get('/viewStudent/:studentId', studentcontroller.viewStudentById);
studentrouter.put('/updateStudent/:studentId', studentcontroller.updateStudent);
studentrouter.post('/checkStudentLogin', studentcontroller.checkStudentLogin);
studentrouter.post('/uploadstudent', upload.single('file'),studentcontroller.uploadStudentCSV);
module.exports = studentrouter;