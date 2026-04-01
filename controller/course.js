 const database=require('../database/db');
const getcoursedata= async(req, res) => {
   try {
   const db=await database();
    const collection= db.collection('course');
    const result=await collection.find({}).toArray();
     res.json({
    message: 'Course records retrieved successfully',
    data: result
  });
}
catch(err){
    console.error('Error fetching course data:', err);
    res.status(500).json({ message: 'Internal Server Error' });  
} 
}
const insertcoursedata= async(req, res) => {

 const db=await database();
    const collection= db.collection('course');
    const result=await collection.insertOne(req.body);
    if(result.acknowledged==true){
     res.json({
    message: 'Course added successfully',
    data: result
  });
}
else
{
    res.status(500).json({ message: 'Failed to add course' });
}
}


const updatecoursedata= async(req, res) => {
  
 const db=await database();
    const collection= db.collection('course');
    let prmid=parseInt(req.params.id)
    const result=await collection.updateOne({ id: prmid }, { $set: req.body });
    if(result.modifiedCount>0){
     res.json({
    message: 'Course update successfully',
    data: result
  });
}
else
{
    res.status(500).json({ message: 'Failed to add course' });
}
}

const deletecoursedata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('course');

    let prmid = parseInt(req.params.id);

    const result = await collection.deleteOne({ id: prmid });

    if (result.deletedCount > 0) {
      res.json({
        message: 'Course deleted successfully',
        data: result
      });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getcoursedata,insertcoursedata,updatecoursedata,deletecoursedata
}



// const fs = require('fs');
// const getcoursedata= (req, res) => {
//   fs.readFile('course.json', 'utf-8', (err, data) => {
//     if (err) {
//       res.status(500).send('Error reading data');
//     } else {
//       const mydata = JSON.parse(data);
//       res.json(mydata);
//     }

//   });
// }


// const insertcoursedata= (req, res) => {
//  res.json({
//     message: 'Course added successfully',
//     data: req.body
//   });
// }

// const updatecoursedata= (req, res) => {
//  res.json({
//     message: 'Course update successfully',
//     data: req.body,
//     id: req.query.id
//   });
// }

// const deletecoursedata= (req, res) => {
//  res.json({
//     message: 'Course deleted successfully',
//     data: req.body,
//     id: req.query.id
//   });
// }
// module.exports = {
//   getcoursedata,insertcoursedata,updatecoursedata,deletecoursedata
// }