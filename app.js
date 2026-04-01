const express = require('express');
const app = express();
const cors = require('cors');
const indexRouter=require('./Router/index')
const port = 5000;

app.use(cors())
app.use(express.json());
app.set('view engine', 'ejs');
app.use("/",indexRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// const express = require('express');
// const st = require('./controller/student');
// const cr = require('./controller/course');
// const tr = require('./controller/teacher');

// const app = express();
// const port = 5000;

// app.use(express.json());


// app.get('/getstudents', st.getstudentdata);
// app.post('/addstudents', st.insertstudentdata);
// app.put('/updatestudents', st.updatestudentdata);
// app.delete('/deletestudents', st.deletestudentdata);


// app.get('/getcourses', cr.getcoursedata);
// app.post('/addcourses', cr.insertcoursedata);
// app.put('/updatecourses', cr.updatecoursedata);
// app.delete('/deletecourses', cr.deletecoursedata);


// app.get('/getteachers', tr.getteacherdata);
// app.post('/addteachers', tr.insertteacherdata);
// app.put('/updateteachers', tr.updateteacherdata);
// app.delete('/deleteteachers', tr.deleteteacherdata);

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });