const AddContact = require('../model/AddContact');
const Registration = require('../model/Register');
const Contact=async(req,res)=>{
 try{
    console.log(req.body);
    const {phone} = req.body;
    const FindUser = await Registration.findOne({phone:phone})

    if(!FindUser){
        return res.json({message:"Entered Number Registered to This ChatApp",success:false});
    }

    if(FindUser.id==req.admin){
      return res.json({message:"You Cant Add Your Number",success:false});

    }
    const existingContact = await AddContact.findOne({ friendId: FindUser.id, UserId: req.admin});
    if (existingContact) {
        return res.json({ message: "Contact already exists", success: false });
    }
    const UserContact = await AddContact({friendId:FindUser.id,UserId:req.admin,status:'pending'})
    const AddedContact=await UserContact.save()

    return res.json({success:true,message:"User Added",AddedContact})
 }
 catch(err){
    return res.status(404).json({success:false,message:"Server Error"})
 }
}

module.exports = {Contact}