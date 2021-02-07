import express from 'express';
import db from '../db.js';
import Tweet from '../models/Tweet.js';
import { isAuth, signToken } from '../utils.js';

const tweetRoutes = express.Router();
tweetRoutes.get('/', async (req, res) => {
  db.connect();
  const tweets = await Tweet.find();
  db.disconnect();
  res.send(tweets);
});

tweetRoutes.post('/', isAuth, async (req, res) => {
  const newTweet = new Tweet({
    text: req.body.text,
    user: req.user._id,
    image: '/images/tweet-placeholder.png',
  });
  db.connect();
  const tweet = await newTweet.save();
  db.disconnect();
  res.send({
    message: 'Tweet created successfully',
    tweet,
  });
});
export default tweetRoutes;
