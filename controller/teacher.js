 const database=require('../database/db');
const getteacherdata= async(req, res) => {
   try {
   const db=await database();
    const collection= db.collection('teacher');
    const result=await collection.find({}).toArray();
     res.json({
    message: 'Teacher records retrieved successfully',
    data: result
  });
}
catch(err){
    console.error('Error fetching teacher data:', err);
    res.status(500).json({ message: 'Internal Server Error' });  
} 
}
const insertteacherdata= (req, res) => {
 res.json({
    message: 'Teacher added successfully',
    data: req.body
  });
}

const updateteacherdata= (req, res) => {
 res.json({
    message: 'Teacher update successfully',
    data: req.body,
    id: req.query.id
  });
}

const deleteteacherdata= (req, res) => {
 res.json({
    message: 'Teacher deleted successfully',
    data: req.body,
    id: req.query.id
  });
}
module.exports = {
  getteacherdata,insertteacherdata,updateteacherdata,deleteteacherdata
}

// const fs = require('fs');
// const getteacherdata= (req, res) => {
//   fs.readFile('teacher.json', 'utf-8', (err, data) => {
//     if (err) {
//       res.status(500).send('Error reading data');
//     } else {
//       const mydata = JSON.parse(data);
//       res.json(mydata);
//     }

//   });
// }


// const insertteacherdata= (req, res) => {
//  res.json({
//     message: 'Teacher added successfully',
//     data: req.body
//   });
// }

// const updateteacherdata= (req, res) => {
//  res.json({
//     message: 'Teacher update successfully',
//     data: req.body,
//     id: req.query.id
//   });
// }

// const deleteteacherdata= (req, res) => {
//  res.json({
//     message: 'Teacher deleted successfully',
//     data: req.body,
//     id: req.query.id
//   });
// }
// module.exports = {
//   getteacherdata,insertteacherdata,updateteacherdata,deleteteacherdata
// }