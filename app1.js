const express = require('express');
const st = require('./controller/student');
const th = require('./controller/teacher');
const cu = require('./controller/course');

const app = express();
const port = 5000;

app.use(express.json());

app.get('/getdata', st.getstudentdata);
app.get('/getteachers', th.getteacherdata);
app.get('/getcourses', cu.getcoursedata);

app.post('/addstudent', st.insertstudentdata);

app.post('/addteacher', (req, res) => {
  res.json({
    message: 'Teacher added successfully',
    data: req.body
  });
});

app.post('/addcourse', (req, res) => {
  res.json({
    message: 'Course added successfully',
    data: req.body
  });
});
app.put('/updatestudent/:id', (req, res) => {
  res.json({
    message: 'Student updated successfully',
    data: req.body,
    rollno: req.params.id
  });
});

app.put('/updateteacher/:id', (req, res) => {
  res.json({
    message: 'Teacher updated successfully',
    data: req.body,
    id: req.params.id
  });
});

app.put('/updatecourse/:id', (req, res) => {
  res.json({
    message: 'Course updated successfully',
    data: req.body,
    id: req.params.id
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});