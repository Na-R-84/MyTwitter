import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UseStyles from '../Styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  likeTweet,
  setTweetText,
  useTweetDispatch,
} from '../../../context/TweetContext';
import { toast } from 'react-toastify';
import Axios from 'axios';

const Tweet = ({ data: tweet }) => {
  const tweetDispatch = useTweetDispatch();

  // Add this object to collect the # sign
  const renderTweet = (text) => {
    return {
      __html: text.replace(
        /#\S+/g,
        "<a href='/tags/$&' style='color:cornflowerblue'>$&</a>"
      ),
    };
  };

  const getImage = () => {
    if (tweet.user.image) return tweet.user.image;
    else return '/images/person.png';
  };

  const handleLike = async () => {
    try {
      const { data } = await Axios.put(`/api/tweets/${tweet._id}`);

      likeTweet(tweetDispatch, tweet._id);
    } catch (err) {
      toast.error('förök igen');
    }
  };

  const classes = UseStyles();
  return (
    <div className={classes.tweetItem}>
      <Grid container>
        <img
          src={getImage()}
          style={{ height: 60, width: 60, borderRadius: '50%' }}
        />
        <Grid
          item
          container
          direction={'column'}
          style={{ flex: 1, marginRight: '1rem' }}
        >
          <Grid item container>
            <Typography className={classes.tweetItemName}>
              {tweet.user.name}
            </Typography>
            <Typography className={classes.tweetItemId}>
              {tweet.user._id}
            </Typography>
          </Grid>

          <Typography
            dangerouslySetInnerHTML={renderTweet(tweet.text)}
            className={classes.tweetText}
            component={'p'}
          />
          {tweet.image && (
            <div>
              <div
                style={{ backgroundImage: `url(${tweet.image})` }}
                className={classes.tweetImg}
              ></div>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction={'row-reverse'}
        style={{ marginTop: 16 }}
        alignItems={'center'}
      >
        <IconButton className={classes.newTweetImgBtn} onClick={handleLike}>
          <FavoriteIcon />
        </IconButton>
        <Typography className={classes.likeCount}>{tweet.likes}</Typography>
      </Grid>
    </div>
  );
};

export default Tweet;
