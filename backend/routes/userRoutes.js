import express from 'express';
import db from '../db.js';
import User from '../models/User.js';

const userRoutes = express.Router();
userRoutes.get('/', async (req, res) => {
  db.connect();
  const users = await User.find();
  db.disconnect();
  res.send(users);
});
userRoutes.post('/', async (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  db.connect();
  const createdUser = await user.save();
  db.disconnect();
  res.send({ message: 'User created successfully', user: createdUser });
});
export default userRoutes;
