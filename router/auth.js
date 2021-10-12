const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../models/user");

router.post("/register", async (req, res) => {

  const { name, email, course, phone, address, password, confirmpassword } = req.body;
    
  if (!name || !email || !course || !phone || !address || !password || !confirmpassword){
      return res.status(422).json({error:"plz fill the field properly"});
    }
        try{
          const userexist = await User.findOne({email:email});

            if(userexist) {
                return res.status(422).json({error:"email already exist"});
            }else if(password != confirmpassword){
                return res.status(422).json({error:"password are not matching"});
            }else{
                const user = new User({name, email, course, phone, address, password, confirmpassword});
                await user.save();
    
                res.status(201).json({message:"user registered successfully"});
            }

        }catch(err){
            console.log(err);
        }
});

//-----------------------LOGIN-route--------------------//

router.post("/signin", async (req, res) => {

    try{
        let token;
        const{ email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"plz fill data"});
        }

        const userLogin = await User.findOne({ email: email });

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if(!isMatch){
                res.status(400).json({error:"invalid credentials"});
            }else{
          
            token = await userLogin.generateAuthToken();
            console.log(token);

           res.cookie("jwtoken", token, {
               expires: new Date(Date.now() + 25892000000),
               httpOnly: true
           });

                res.json({message: "user Signin Successfully"});
            }
        }else{
            res.status(400).json({error:"invalid credentials"});
        }

    }catch(e){
        console.log(e);
    }
});


//-------------------about-----------------------//
router.get("/about", authenticate, (req, res) => {
     res.send(req.rootUser);
   });


//-------------------contact & home-----------------------//
router.get("/getdata", authenticate, (req, res) => {
   res.send(req.rootUser);
 });

 //-------------------contact page-----------------------//
router.post("/contact", authenticate, async (req, res) => {
        try{
            const{name, email, phone, message} = req.body;

            if(!name || !email || !phone || !message){
                console.log("error in contact form");
                return res.json({error:"plz fill contact form"});
            }

            const userContact = await User.findOne({ _id: req.userID });

            if(userContact){
                const userMessage = await userContact.addMessage(name, email, phone, message);

                await userContact.save();
                res.status(201).json({message: "user contact successfully"});
            }
        }catch(e){
            console.log(e);

        }   
 });

//-------------------Logout-----------------------//

 router.get("/logout", (req, res) => {
    res.clearCookie("jwtoken", {path: "/"});
   res.status(200).send("user Logout");
 });

 module.exports = router;