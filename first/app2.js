const express = require('express');
const Joi = require('joi')
const app= express();
const port = process.env.PORT || 3000;
 students = [
    {id: 1, name : 'student1'},
    {id:2, name : 'student2'},

    {id:3,name : 'student3'}
];
app.use(express.json());
const studentValidation_schema= Joi.object({
    name : Joi.string().min(4).max(20).required()
});
app.post('/api/students', (req, res) => {
   let results = studentValidation_schema.validate(req.body);
   if(results.error)
       res.status(400).send(results.error.details[0].message);
   else {

       let student = {
           id :students.length +1,
           name : req.body.name
       }
       students.push(student);
       res.status(201).send(student);
   }
});

app.get('/api/students',(req,res) => {
    res.send(students);
})
app.get('/api/students/:id',(req,res) => {
   const student = students.find(cd => cd.id === parseInt(req.params.id));
   if(!student) res.status(404).send('The student with given ID was not found ');
   res.send(student);
});
app.put('/api/students/:id',(req, res) =>  {
    const student = students.find(cd => cd.id === parseInt(req.params.id));
    if(!student) res.status(404).send('The student with given ID was not found ');
    student.name= req.body.name;
    res.send(student);
});
app.get('/hello', (req, res) => {
  res.send('hello');
});
//delete
app.delete('/api/students/:id',(req,res) => {
    const student = students.find(cd => cd.id === parseInt(req.params.id));
    if(!student) res.status(404).send('The student with given ID was not found ');
     students = students.filter(cd => cd.id !== parseInt(req.params.id));
    res.send(students);
});

const validation_shema= Joi.object({
    id : Joi.number(),
    name : Joi.string().max(20).min(1).required(),
});

app.listen(port,() =>console.log('our app port') )