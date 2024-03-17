const Student = require("../models/Student");
// const csvtojson = require('csvtojson');

const addStudent = async (request, response) => {
    try {
        const input = request.body;
        const student = new Student(input);
        await student.save();
        response.status(201).json(student);
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const viewStudents = async (request, response) => {
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

const deleteStudent = async (request, response) => {
    try {
        const studentId = request.params.studentId;
        const student = await Student.findOne({ "studentId": studentId });
        if (student) {
            await Student.deleteOne({ "studentId": studentId });
            response.send("Student deleted successfully");
        } else {
            response.send("Student not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const viewStudentById = async (request, response) => {
    try {
        const studentId = request.params.studentId;
        const student = await Student.findOne({ "studentId": studentId });
        if (student) {
            response.json(student);
        } else {
            response.send("Student not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const updateStudent = async (request, response) => {
    try {
        const studentId = request.params.studentId;
        const { fullName, gender, department, program, semester, year, password, email, contact } = request.body;

        const student = await Student.findOne({ "studentId": studentId });
        if (!student) {
            return response.status(404).send("Student not found");
        }

        if (fullName) {
            student.fullName = fullName;
        }
        if (gender) {
            student.gender = gender;
        }
        if (department) {
            student.department = department;
        }
        if (program) {
            student.program = program;
        }
        if (semester) {
            student.semester = semester;
        }
        if (year) {
            student.year = year;
        }
        if (password) {
            student.password = password;
        }
        if (email) {
            student.email = email;
        }
        if (contact) {
            student.contact = contact;
        }

        await student.save();
        response.json(student);
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const checkStudentLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const student = await Student.findOne({ "email": email, "password": password });
        if (student) {
            response.send("Login successful");
        } else {
            response.status(401).send("Invalid email or password");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const uploadStudentCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const jsonArray = await csvtojson().fromString(req.file.buffer.toString());
        await Student.insertMany(jsonArray);
        res.json({ message: "CSV File Upload Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addStudent, viewStudents, deleteStudent, viewStudentById, updateStudent, checkStudentLogin,uploadStudentCSV };
