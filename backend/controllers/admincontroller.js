const Admin = require("../models/Admin");
const Student = require("../models/Student");

const addstudent = async (request, response) => {
    try {
        const input = request.body;
        // Validate input data before creating the student
        // Ensure required fields are present and meet constraints
        const student = new Student(input);
        await student.save();
        response.send('Student added successfully');
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const viewstudents = async (request, response) => {
    try {
        const students = await Student.find();
        if (students.length === 0) {
            response.send("No students found");
        } else {
            response.json(students);
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const deletestudent = async (request, response) => {
    try {
        const uname = request.params.username;
        const student = await Student.findOne({ "username": uname });
        if (student) {
            await Student.deleteOne({ "username": uname });
            response.send("Student deleted successfully");
        } else {
            response.send("Username not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const checkadminlogin = async (request, response) => {
    try {
        const input = request.body;
        const admin = await Admin.findOne(input);
        if (admin) {
            response.json(admin);
        } else {
            response.status(401).send('Invalid credentials'); // Unauthorized
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};


module.exports = { addstudent, viewstudents, deletestudent, checkadminlogin };
