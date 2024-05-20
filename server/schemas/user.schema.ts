import { Schema, model } from "mongoose";
import { isEmail, isMobilePhone } from 'validator';

const PasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]).{6,}$/;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "User already exists"],
    validate: {
      validator: isEmail,
      message: 'Invalid email address'
    }
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Usser already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  type: {
    type: String,
    required: [true, "type is required"],
    enum: {
        values: ['seller', 'buyer'],
        message: 'Type must be either seller or buyer',
    },
  },
  token: {
    type: String,
  }
});

export const UserModel = model("User", UserSchema);
