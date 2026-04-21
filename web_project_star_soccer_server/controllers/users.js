require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { NODE_ENV, JWT_SECRET } = process.env;

async function getUserInfo(req, res, next) {
  const { user } = req;
  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: user._id },
    });

    if (!foundUser) {
      const err = new Error("User not found!");
      err.statusCode = 404;
      throw err;
    }

    foundUser.password = undefined;
    res.send({ data: foundUser });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      const err = new Error("Missing data...");
      err.statusCode = 400;
      throw err;
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: bcrypt.hashSync(password, 10),
      },
    });

    if (!newUser) {
      const err = new Error("Error creating user!");
      err.statusCode = 404;
      throw err;
    }

    const token = jwt.sign(
      { _id: newUser.id },
      NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
      { expiresIn: "7d" }
    );

    res.send({ token });
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error("E-mail already in use");
      err.statusCode = 409;
      return next(err);
    }
    next(error);
  }
}

async function updateUserProfile(req, res, next) {
  const { name, email, phone, password } = req.body;
  const userId = req.user._id;

  if (!name && !email && !phone && !password) {
    return res.status(400).send({ error: "Invalid data..." });
  }

  let userUpdated = {};

  if (name) userUpdated.name = name;
  if (email) userUpdated.email = email;
  if (phone) userUpdated.phone = phone;
  if (password) userUpdated.password = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: userUpdated,
    });

    user.password = undefined;
    res.send({ data: user, message: "Profile updated successfully!" });
  } catch (error) {
    if (error.code === 'P2025') {
      const err = new Error("User not found!");
      err.statusCode = 404;
      return next(err);
    }
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      const err = new Error("Invalid data...");
      err.statusCode = 400;
      throw err;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const err = new Error("Password or e-mail incorrect");
      err.statusCode = 400;
      throw err;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      const err = new Error("Password or e-mail incorrect");
      err.statusCode = 400;
      throw err;
    }

    const token = jwt.sign(
      { _id: user.id },
      NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
      { expiresIn: "7d" }
    );

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserInfo,
  createUser,
  updateUserProfile,
  login,
};
