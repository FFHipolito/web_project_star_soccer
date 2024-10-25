const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} E-mail inválido!`,
    },
  },
  phone: {
    type: Number,
    required: true,
    minLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      const err = new Error("Password or e-mail incorrect");
      err.statusCode = 400;
      if (!user) {
        return Promise.reject(err);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(err);
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
