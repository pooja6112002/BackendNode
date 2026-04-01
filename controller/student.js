const database=require('../database/db');
const getstudentdata= async(req, res) => {
   try {
   const db=await database();
    const collection= db.collection('student');
    const result=await collection.find({}).toArray();
     res.json({
    message: 'Student records retrieved successfully',
    data: result
  });
}
catch(err){
    console.error('Error fetching student data:', err);
    res.status(500).json({ message: 'Internal Server Error' });  
} 
}
const insertstudentdata= (req, res) => {
 res.json({
    message: 'Student added successfully',
    data: req.body
  });
}

const updatestudentdata= (req, res) => {
 res.json({
    message: 'Student update successfully',
    data: req.body,
    id: req.query.id
  });
}

const deletestudentdata= (req, res) => {
 res.json({
    message: 'Student deleted successfully',
    data: req.body,
    id: req.query.id
  });
}
module.exports = {
  getstudentdata,insertstudentdata,updatestudentdata,deletestudentdata
}