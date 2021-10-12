const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    course:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    confirmpassword:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type: String,
                required:true
            },
            email:{
                type: String,
                required:true
            },
            phone:{
                type: Number,
                required:true
            },
            message:{
                type: String,
                required:true
            }

        }],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


//-------------hashing the password-------//

userSchema.pre("save", async function(next) {
    console.log("bcrypt");
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
    }
    next();
})

//------------generating token jwt----------//
userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}
//------------store the message----------//

userSchema.methods.addMessage = async function(name, email, phone, message) {
    try{
        this.messages = this.messages.concat({name, email, phone, message});
        await this.save();
        return this.messages;
    }catch(e){
            console.log(e);
    }

}

const User = mongoose.model("USER", userSchema);

module.exports = User;