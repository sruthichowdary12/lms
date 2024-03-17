//admin routes
const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter  = express.Router()


adminrouter.post("/addstudent",admincontroller.addstudent)
adminrouter.get("/viewstudent",admincontroller.viewstudents)
adminrouter.delete("/deletestudent/:username",admincontroller.deletestudent)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
module.exports = adminrouter