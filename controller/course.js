const database = require('../database/db');

const getcoursedata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('course');

    const result = await collection.find({}).toArray();

    res.json({
      message: 'Course records retrieved successfully',
      data: result
    });

  } catch (err) {
    console.error('Error fetching course data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const insertcoursedata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('course');

    const data = req.body;

   
    if (Array.isArray(data)) {
      const ids = data.map(item => item.id);

      const existing = await collection.find({ id: { $in: ids } }).toArray();

      if (existing.length > 0) {
        return res.json({
          message: "Some courses already exist",
          existing: existing
        });
      }

      const result = await collection.insertMany(data);

      return res.status(201).json({
        message: 'Courses added successfully',
        data: result
      });
    }

    
    const existing = await collection.findOne({ id: data.id });

    if (existing) {
      return res.json({
        message: "Course already exists with this ID"
      });
    }

    const result = await collection.insertOne(data);

    res.status(201).json({
      message: 'Course added successfully',
      data: result
    });

  } catch (err) {
    console.error('Error inserting course:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updatecoursedata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('course');

    const id = Number(req.params.id);

    const result = await collection.updateOne(
      { id: id },
      { $set: req.body }
    );

    if (result.modifiedCount > 0) {
      res.json({
        message: 'Course updated successfully',
        data: result
      });
    } else {
      res.status(404).json({
        message: 'Course not found or no changes made'
      });
    }

  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletecoursedata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('course');

    const id = Number(req.params.id);

    const result = await collection.deleteOne({ id: id });

    if (result.deletedCount > 0) {
      res.json({
        message: 'Course deleted successfully',
        data: result
      });
    } else {
      res.status(404).json({
        message: 'Course not found'
      });
    }

  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getcoursedata,
  insertcoursedata,
  updatecoursedata,
  deletecoursedata
};



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