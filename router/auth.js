const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send(`Hello from the server router js`);
});

//Using promises

// router.post('/register',(req,res)=>{
//     console.log(req.body);

//     // res.send({message:req.body});

//     const {name,email,phone,work,password,cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword)
//     {
//         return res.status(422).json({error:`Please fill the field properly!`});
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"email alreday exists"});
//         }

//         const user = new User({name,email,phone,work,password,cpassword});

//         user.save().then(()=>{
//         res.status(201).json({message:`User registered successfully`});
//         }).catch((err)=>res.status(500).json({error:"Failed to register"}));

//     }).catch(err=> {console.log(err);})
// });

//Using async await

router.post("/register", async (req, res) => {
  console.log(req.body);

  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: `Please fill the field properly!` });
  }

  try {
    const userExist = await User.findOne({ email: email }); //TO check if the same email already exists

    if (userExist) {
      return res.status(422).json({ error: "email alreday exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password does not match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //pre(save) will be executed here
      await user.save();
      res.status(201).json({ message: `User registered successfully` });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

// login route

router.post("/signin", async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: `Please fill the data` });
    }
    const userLogin = await User.findOne({ email: email });
    //userLogin gets the value of the document in which the email matches
    //(if the email matches with any email in the collection)
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken(); //lec #15
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json("user signin successfully");
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// About us ka page

router.get("/about", authenticate, (req, res) => {
  console.log(`Logging from the About Page!`);
  res.send(req.rootUser);
});

// get user data for home and contact

router.get("/getdata", authenticate, (req, res) => {
  console.log(`Logging from the About Page!`);
  res.send(req.rootUser);
});

// Logout page

router.get("/logout", (req, res) => {
  console.log(`Hello from the logout page!`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

//contact us ka page

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "please fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res
        .status(201)
        .json({ message: "Contact form details saved successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
