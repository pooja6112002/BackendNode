const express = require('express');
const router = express.Router();
const st = require('../controller/student');
const te = require('../controller/teacher');
const co = require('../controller/course');
const usr=require('../controller/user');
router.get('/getstudentmarks', (req, res) => {
  const users = [
  { name: "Pooja", age: 22 },
  { name: "Riya", age: 21 },
  { name: "Neha", age: 23 }
];

   res.render('home', { users });
});
router.get('/getdata',usr.verifyToken, st.getstudentdata);
router.post('/addstudent', st.insertstudentdata);
router.put('/updatestudent', st.updatestudentdata);
router.delete('/deletestudent',st.deletestudentdata);

router.get('/getTeachers', te.getteacherdata);
router.post('/addTeacher', te.insertteacherdata);
router.put('/updateTeacher', te.updateteacherdata);
router.delete('/deleteTeacher',te.deleteteacherdata);

router.get('/getCourse', co.getcoursedata);
router.post('/addCourse', co.insertcoursedata);
router.put('/updateCourse/:id', co.updatecoursedata);
router.delete('/deleteCourse/:id',co.deletecoursedata);

router.get('/getUser', require('../controller/user').getuserdata);
router.post('/login', usr.loginUser);

module.exports=router;