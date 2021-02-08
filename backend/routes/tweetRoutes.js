import express from 'express';
import db from '../db.js';
import Tweet from '../models/Tweet.js';
import Hashtag from '../models/Hashtag.js';
import { isAuth, signToken } from '../utils.js';

const tweetRoutes = express.Router();
tweetRoutes.get('/', async (req, res) => {
  db.connect();
  const tweets = await Tweet.find();
  db.disconnect();
  res.send(tweets);
});
tweetRoutes.get('/users/:userName', async (req, res) => {
  db.connect();
  const tweets = await Tweet.find({
    // 'user.userName': req.params.userName,
  }).populate('user', 'userName');
  db.disconnect();
  res.send(tweets.filter((x) => x.user.userName === req.params.userName));
});

tweetRoutes.put('/:tweetId/like', isAuth, async (req, res) => {
  const tweet = await Tweet.findById(req.params.tweetId);
  if (tweet) {
    if (tweet.likes.indexOf(req.user._id) >= 0) {
      res.send({ message: 'You liked it already' });
    } else {
      tweet.numLikes += 1;
      tweet.likes.push(req.user._id);
      await tweet.save();
      res.send({ message: 'You liked it successfully' });
    }
  }
});
tweetRoutes.post('/', isAuth, async (req, res) => {
  const newTweet = new Tweet({
    text: req.body.text,
    user: req.user._id,
    image: '/images/tweet-placeholder.png',
  });
  db.connect();
  const tweet = await newTweet.save();
  // insert hashtags from tweet

  const hashtags = findHashtags(tweet.text);

  for (let hashtag of hashtags) {
    const existHashtag = await Hashtag.findOne({ name: hashtag });
    if (existHashtag) {
      existHashtag.numTweets += 1;
      existHashtag.tweets.push(tweet._id);
      await existHashtag.save();
    } else {
      const newHashtag = new Hashtag({
        name: hashtag,
        numTweets: 1,
        user: req.user._id,
        tweets: [tweet._id],
      });
      await newHashtag.save();
    }
  }
  db.disconnect();
  res.send({
    message: 'Tweet created successfully',
    tweet,
  });
});

function findHashtags(searchText) {
  const regexp = /\B\#\w\w+\b/g;
  const result = searchText.match(regexp);
  if (result) {
    // remove hashtag sign from the hashtag
    return result.map((x) => x.substring(1, x.length));
  } else {
    return [];
  }
}

export default tweetRoutes;
