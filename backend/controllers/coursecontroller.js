const Course = require("../models/Courses");

const csvtojson = require('csvtojson');
const addCourse = async (request, response) => {
    try {
        const input = request.body;
        const course = new Course(input);
        await course.save();
        response.send('Course added successfully');
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const viewCourses = async (request, response) => {
    try {
        const courses = await Course.find();
        if (courses.length === 0) {
            response.send("No courses found");
        } else {
            response.json(courses);
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const deleteCourse = async (request, response) => {
    try {
        const courseCode = request.params.coursecode;
        const course = await Course.findOne({ "coursecode": courseCode });
        if (course) {
            await Course.deleteOne({ "coursecode": courseCode });
            response.send("Course deleted successfully");
        } else {
            response.send("Course not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};
const viewCourseByCode = async (request, response) => {
    try {
        const courseCode = request.params.coursecode;
        const course = await Course.findOne({ "coursecode": courseCode });
        if (course) {
            response.json(course);
        } else {
            response.send("Course not found");
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};
const updateCourse = async (request, response) => {
    try {
        const courseCode = request.params.coursecode;
        const { coursename, year } = request.body;

        const course = await Course.findOne({ "coursecode": courseCode });
        if (!course) {
            return response.status(404).send("Course not found");
        }

        if (coursename) {
            course.coursename = coursename;
        }
        if (year) {
            course.year = year;
        }

        await course.save();
        response.json(course);
    } catch (error) {
        response.status(500).send(error.message);
    }
};

const uploadFile = async (req, res) => {
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

module.exports = { addCourse, viewCourses, deleteCourse ,viewCourseByCode,updateCourse,uploadFile};