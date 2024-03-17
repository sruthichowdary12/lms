const facultycontroller = require("../controllers/facultycontroller")
const express = require("express")
const facultyrouter = express.Router()
const multer = require('multer');
//recruiter routes
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
facultyrouter.post('/addFaculty', facultycontroller.addFaculty);
facultyrouter.get('/viewFaculties', facultycontroller.viewFaculties);
facultyrouter.delete('/deleteFaculty/:facultyId', facultycontroller.deleteFaculty);
facultyrouter.get('/viewFaculty/:facultyId', facultycontroller.viewFacultyById);
facultyrouter.put('/updateFaculty/:facultyId', facultycontroller.updateFaculty);
facultyrouter.post('/checkFacultyLogin', facultycontroller.checkFacultyLogin);
facultyrouter.post('/uploadfaculty', upload.single('file'),facultycontroller.uploadFacultyCSV);
module.exports = facultyrouter;