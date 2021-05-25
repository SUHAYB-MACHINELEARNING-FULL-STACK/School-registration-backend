// Using Node.js `require()`

const mongoose = require('mongoose');

const express = require("express");
const { execFile } = require('child_process');

const app = express()

// Connect to DB

mongoose.connect('mongodb://localhost/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Define Schema and Model

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const StudentSchema = new Schema({
  Name: String,
  Birthdate: String,
  City: String,
  Email: String,
  Password: String,
});

const StudentModel = mongoose.model('Students', StudentSchema)

StudentModel.find({}).then(function (StudentsFromDB) {

    students = StudentsFromDB

})

app.get("/students", (req , res) => {
   
    res.end(JSON.stringify(students))
    console.log(req.query)

})

app.post("/students", (req , res) => {
let Newstudent = new StudentModel(req.query); // this is modal object.
Newstudent.save()
  .then((data) => {
    console.log(data);
   })
  .catch((err)=> {
    console.log(err);
  })
})
app.put("/students/:id", async (req , res) => {
    const {id} = req.params;
    const student = await StudentModel.findById(id);

    if(!student) {
        res.statusCode = 400;
        res.send("student id is not correct!");
    } else {
    console.log(req.query)
    const {Name} = req.query;

    if(Name) {
        student.Name = Name;
        student.save();
    }

    res.send(student);
}
})

app.delete("/students/:id", async (req,res) => {
    const {id} = req.params;
    const student = await StudentModel.findByIdAndDelete(id);

    if(!student) {
        res.statusCode = 400;
        res.send("student id is not correct!");
    } else {
       student.save()
    }
    res.send(`VeryGood, student id: ${id} deleted`)
})

app.listen(8081, ()=>console.log("Let's Go!!"))