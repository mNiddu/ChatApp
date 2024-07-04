// routes/contactRoutes.js
const { io } = require('../index'); // Import the 'io' instance
const Registration = require('../model/Register');
const AddContact = require('../model/AddContact');

const Contact = async (req, res) => {
  try {
    const { phone } = req.body;
    const FindUser = await Registration.findOne({ phone: phone });

    if (!FindUser) {
      return res.json({ message: "Entered Number not Registered to This ChatApp", success: false });
    }

    if (FindUser.id === req.admin) {
      return res.json({ message: "You Can't Add Your Own Number", success: false });
    }

    const existingContact = await AddContact.findOne({ friendId: FindUser.id, UserId: req.admin });
    if (existingContact) {
      return res.json({ message: "Contact already exists", success: false });
    }

    const UserContact = new AddContact({ friendId: FindUser.id, UserId: req.admin, status: 'pending' });
    const AddedContact = await UserContact.save();

    io.to(friendId).emit('contactRequest', {
      message: 'You have a new contact request',
      contact: newContact,
    });

    return res.json({ success: true, message: "User Added", AddedContact });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const GetContact = async (req, res) => {
  try {
    const findContact = await AddContact.find({ friendId: req.admin }).populate({ path: 'UserId' });
    if (!findContact) {
      return res.send({ message: "Request Failed", success: false });
    }
    return res.send({ message: "Request Success", success: true, findContact });
  } catch (err) {
    console.log(err);
  }
};

const GetStatus = async (req, res) => {
  try {
    const { id, value } = req.body;

   
    if (!['accepted', 'rejected'].includes(value)) {
      return res.status(400).json({ message: "Invalid status value", success: false });
    }

    const findUser = await AddContact.findById(id);
    if (!findUser) {
      return res.status(404).json({ message: "Request not found", success: false });
    }

  
    findUser.status = value;
    await findUser.save();

    if (value === 'accepted') {
      return res.json({ success: true, message: 'Contact request accepted' });
    } else {
      return res.json({ success: true, message: 'Contact request rejected' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { Contact, GetContact,GetStatus};
