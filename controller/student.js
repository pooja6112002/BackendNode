const database = require('../database/db');


const getstudentdata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('student');

    const result = await collection.find({}).toArray();

    res.json({
      message: 'Student records retrieved successfully',
      data: result
    });

  } catch (err) {
    console.error('Error fetching student data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const insertstudentdata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('student');

    const data = req.body;

    let result;

    if (Array.isArray(data)) {
    
      result = await collection.insertMany(data);
    } else {
     
      result = await collection.insertOne(data);
    }

    res.json({
      message: 'Student added successfully',
      data: result
    });

  } catch (err) {
    console.error('Error inserting student data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updatestudentdata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('student');

    const id = parseInt(req.query.id); 
    const updatedData = req.body;

    const result = await collection.updateOne(
      { id: id },
      { $set: updatedData }
    );

    res.json({
      message: 'Student updated successfully',
      data: result
    });

  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deletestudentdata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('student');

    const id = parseInt(req.query.id); 

    const result = await collection.deleteOne({ id: id });

    res.json({
      message: 'Student deleted successfully',
      data: result
    });

  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getstudentdata,
  insertstudentdata,
  updatestudentdata,
  deletestudentdata
};

// const database=require('../database/db');
// const getstudentdata= async(req, res) => {
//    try {
//    const db=await database();
//     const collection= db.collection('student');
//     const result=await collection.find({}).toArray();
//      res.json({
//     message: 'Student records retrieved successfully',
//     data: result
//   });
// }
// catch(err){
//     console.error('Error fetching student data:', err);
//     res.status(500).json({ message: 'Internal Server Error' });  
// } 
// }
// const insertstudentdata= (req, res) => {
//  res.json({
//     message: 'Student added successfully',
//     data: req.body
//   });
// }

// const updatestudentdata= (req, res) => {
//  res.json({
//     message: 'Student update successfully',
//     data: req.body,
//     id: req.query.id
//   });
// }

// const deletestudentdata= (req, res) => {
//  res.json({
//     message: 'Student deleted successfully',
//     data: req.body,
//     id: req.query.id
//   });
// }
// module.exports = {
//   getstudentdata,insertstudentdata,updatestudentdata,deletestudentdata
// }