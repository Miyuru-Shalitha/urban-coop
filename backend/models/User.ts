const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Add method to generate auth token to the user schema
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: '7d' }
  );
  return token;
};
const User = mongoose.model("user",userSchema);
// Define validation function
const validateUser = (data:any) => {
  const schema = joi.object({
    firstName: joi.string().required().label('First Name'),
    lastName: joi.string().required().label('Last Name'),
    email: joi.string().email().required().label('Email'),
    password: joi.string().required().label('Password')
  });
  return schema.validate(data);
};

module.exports={User,validateUser}
