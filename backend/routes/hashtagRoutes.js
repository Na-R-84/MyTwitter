import express from 'express';
import db from '../db.js';
import Hashtag from '../models/Hashtag.js';
import { isAuth, signToken } from '../utils.js';

const hashtagRoutes = express.Router();
hashtagRoutes.get('/', async (req, res) => {
  db.connect();
  const hashtags = await Hashtag.find().sort({ numTweets: -1 });
  db.disconnect();
  res.send(hashtags);
});

hashtagRoutes.post('/', isAuth, async (req, res) => {
  const newHashtag = new Hashtag({
    text: req.body.text,
    user: req.user._id,
    image: '/images/hashtag-placeholder.png',
  });
  db.connect();
  const hashtag = await newHashtag.save();
  db.disconnect();
  res.send({
    message: 'Hashtag created successfully',
    hashtag,
  });
});
export default hashtagRoutes;
