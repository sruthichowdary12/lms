const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser')
const dburl = "mongodb://localhost:27017/lmss14"
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
});


const app = express() 
app.use(cors())
app.use(express.json())  // to parse JSON data
app.use(bodyParser.json())
const adminrouter = require("./routes/adminroutes")
const courserouter = require("./routes/courseroutes")
const studentrouter = require("./routes/studentroutes")
const facultyrouter = require("./routes/facultyroutes")
app.use("",adminrouter) // to include all admin routes
app.use("",studentrouter) //to include all student routes
app.use("",courserouter)
app.use("",facultyrouter)
const port= 2014
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})