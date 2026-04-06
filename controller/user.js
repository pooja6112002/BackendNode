const database = require('../database/db');
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";


const getuserdata = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('user');
    const result = await collection.find({}).toArray();

    res.json({
      message: 'User records retrieved successfully',
      data: result
    });

  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const db = await database();
    const collection = db.collection('user');

    const user = await collection.findOne({
      username: req.body.username,
      password: req.body.password
    });

    if (user) {
      const token = jwt.sign(
        { username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({
        success: true,
        message: "Login successful",
        tokenval: token
      });

    } else {
      res.json({
        success: false,
        message: "Invalid username or password"
      });
    }

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  
  if (!authHeader) {
    return res.status(403).json({
      message: "Token required"
    });
  }


  const token = authHeader.split(" ")[0];

  if (!token) {
    return res.status(401).json({
      message: "Token missing"
    });
  }

  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("JWT Error:", err.message); // debug
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    req.user = decoded;
    console.log("Decoded token:", decoded);
    next();
  });
};

module.exports = {
  getuserdata,
  loginUser,
  verifyToken
};

// const database = require('../database/db');
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "mysecretkey"; 
// const getuserdata = async (req, res) => {
//   try {
//     const db = await database();
//     const collection = db.collection('user');
//     const result = await collection.find({}).toArray();

//     res.json({
//       message: 'User records retrieved successfully',
//       data: result
//     });
//   }
//   catch(err){
//     console.error('Error fetching user data:', err);
//     res.status(500).json({ message: 'Internal Server Error' });  
//   } 
// }
// const loginUser = async (req, res) => {
//   try {
//     const db = await database();
//     const collection = db.collection('user');
//     const user = await collection.findOne({
//       username: req.body.username,
//       password: req.body.password
//     });

//     if (user) {
//            const token = jwt.sign(
//       {username: user.username },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//       res.json({
//         success: true,
//         message: "Login successful",
//         tokenval:token
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Invalid username or password"
//       });
//     }

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


// const verifyToken = (req, res, next) => {
//   const token =  req.headers["authorization"];

//   if (!token) {
//     return res.status(403).json({
//       message: "Token required"
//     });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({
//         message: "Invalid token"
//       });
//     }

//     req.user = decoded;
//     console.log("Decoded token:", decoded);
//     next();
//   });
// };
// module.exports = {
//   getuserdata,loginUser,verifyToken 
// };

