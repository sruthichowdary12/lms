const Faculty = require("../models/Faculty");
const csvtojson = require('csvtojson');
const addFaculty = async (request, response) => {
    try {
        const input = request.body;
        const faculty = new Faculty(input);
        await faculty.save();
        response.status(201).json(faculty);
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const viewFaculties = async (request, response) => {
    try {
        const faculties = await Faculty.find();
        if (faculties.length === 0) {
            response.send("No faculties found");
        } else {
            response.json(faculties);
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const deleteFaculty = async (request, response) => {
    try {
        const facultyId = request.params.facultyId;
        const faculty = await Faculty.findOne({ "faculty_id": facultyId });
        if (faculty) {
            await Faculty.deleteOne({ "faculty_id": facultyId });
            response.send("Faculty deleted successfully");
        } else {
            response.send("Faculty not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const viewFacultyById = async (request, response) => {
    try {
        const facultyId = request.params.facultyId;
        const faculty = await Faculty.findOne({ "facultyId": facultyId });
        if (faculty) {
            response.json(faculty);
        } else {
            response.send("Faculty not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const updateFaculty = async (request, response) => {
    try {
        const facultyId = request.params.facultyId;
        const { facultyName, department, qualification, designation, email, password } = request.body;

        const faculty = await Faculty.findOne({ "facultyId": facultyId });
        if (!faculty) {
            return response.status(404).send("Faculty not found");
        }

        if (facultyName) {
            faculty.facultyName = facultyName;
        }
        if (department) {
            faculty.department = department;
        }
        if (qualification) {
            faculty.qualification = qualification;
        }
        if (designation) {
            faculty.designation = designation;
        }
        if (email) {
            faculty.email = email;
        }
        if (password) {
            faculty.password = password;
        }

        await faculty.save();
        response.json(faculty);
    } catch (error) {
        response.status(500).send(error.message);
    }
};
const checkFacultyLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const faculty = await Faculty.findOne({ "email": email, "password": password });
        if (faculty) {
            response.send("Login successful");
        } else {
            response.status(401).send("Invalid email or password");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};
const uploadFacultyCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const jsonArray = await csvtojson().fromString(req.file.buffer.toString());
        await Course.insertMany(jsonArray);
        res.json({ message: "CSV File Upload Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addFaculty, viewFaculties, deleteFaculty, viewFacultyById, updateFaculty,checkFacultyLogin,uploadFacultyCSV };
