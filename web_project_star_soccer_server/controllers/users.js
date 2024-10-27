require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;

function getUserInfo(req, res, next) {
  const { user } = req;
  return User.findById(user._id)
    .orFail(() => {
      const err = new Error("User not found!");
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      // hide password propriety before sending
      user.password = undefined;
      res.send({ data: user });
    })
    .catch(next);
}

async function createUser(req, res, next) {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      const err = new Error("Missing data...");
      err.statusCode = 400;
      throw err;
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
    });

    if (!newUser) {
      const err = new Error("Error creating user!");
      err.statusCode = 404;
      throw err;
    }

    const token = jwt.sign(
      { _id: newUser._id },
      NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
      { expiresIn: "7d" }
    );

    if (!token) {
      const err = new Error("Invalid token...");
      err.statusCode = 401;
      throw err;
    }

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

function updateUserProfile(req, res, next) {
  const { name, email, phone, password } = req.body;
  const userId = req.user._id;
  let userUpdated = {};

  if (name) {
    userUpdated.name = name;
  }
  if (email) {
    userUpdated.email = email;
  }
  if (phone) {
    userUpdated.phone = phone;
  }
  if (password) {
    userUpdated.password = bcrypt.hashSync(password, 10);
  }

  if (!name && !email && !phone && !password) {
    return res.status(400).send({ error: "Invalid data..." });
  }

  return User.findByIdAndUpdate(userId, userUpdated, {
    new: true,
  })
    .orFail(() => {
      const err = new Error("User not found!");
      err.status = 404;
      throw err;
    })
    .then((user) => {
      // hide password propriety before sending
      user.password = undefined;
      res.send({ data: user, message: "Profile updated successfully!" });
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      const err = new Error("Invalid data...");
      err.statusCode = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
        {
          expiresIn: "7d",
        }
      );
      if (!token) {
        const err = new Error("Invalid token...");
        err.statusCode = 401;
        throw err;
      }
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  getUserInfo,
  createUser,
  updateUserProfile,
  login,
};
