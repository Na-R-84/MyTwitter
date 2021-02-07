import express from 'express';
import db from '../db.js';
import User from '../models/User.js';
import { signToken } from '../utils.js';

const userRoutes = express.Router();
userRoutes.get('/', async (req, res) => {
  db.connect();
  const users = await User.find();
  db.disconnect();
  res.send(users);
});

userRoutes.post('/login', async (req, res) => {
  db.connect();
  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });
  db.disconnect();
  if (user) {
    res.send({
      message: 'Success login',
      user: {
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: signToken(user),
      },
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
});

userRoutes.post('/', async (req, res) => {
  const newUser = new User({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  db.connect();
  const user = await newUser.save();
  db.disconnect();
  res.send({
    message: 'User created successfully',
    user: {
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      token: signToken(user),
    },
  });
});
export default userRoutes;
