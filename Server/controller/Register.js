const Registration = require('../model/Register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, password } = req.body;
    
    // Find user by email
    const FindUser = await Registration.findOne({ email });
    if (FindUser) {
      const success = false;
      return res.json({ message: "You are already registered", success });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new registration
    const registered = new Registration({ name, email, phone, password: hashedPassword });
    const AddRegistration = await registered.save();
    const success = true;

    return res.json({ AddRegistration, success, message: "Registration successful" });
  } catch (err) {
    
    return res.status(500).send({ message: "Server error", success: false });
  }
};


const Login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const FindEmail=await Registration.findOne({email})
        if(!FindEmail){
            return res.json({ message: "Invalid Email or Password",success: false });
        }
        const ismatch = await bcrypt.compare(password, FindEmail.password)
        if(!ismatch){
            return res.json({ message: "Invalid Email or Password",success: false });
        }
        const UserId=FindEmail.id
        console.log(UserId)
        const UserToken=jwt.sign(process.env.Key,UserId)
        return res.json({ message:"Login SuccessFull",success:true,UserToken})

    }
    catch(err){
        return res.status(500).send({ message:"Server Error",success:false})
    }
}
module.exports = { Register,Login};
