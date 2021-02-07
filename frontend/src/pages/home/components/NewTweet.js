import React from 'react';
import UseStyles from '../Styles';

import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import {
  setTweetText as setTweet,
  getHashTagList,
  useTweetDispatch,
  useTweetState,
} from '../../../context/TweetContext';
import Axios from 'axios';

const NewTweet = ({ updateTweets }) => {
  const inputFile = React.useRef();

  const { tweetText: tweet } = useTweetState();
  const tweetDispatch = useTweetDispatch();
  // const [tweet, setTweet] = React.useState();
  const [imageFile, setImageFile] = React.useState();
  const [imagePath, setImagePath] = React.useState();

  const newTweetClick = () => {
    const tweetText = tweet;
    if (!tweetText) return;

    const token = localStorage.getItem('token');
    try {
      const { data } = Axios.post(
        '/api/tweets',
        { text: tweetText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Skickad');
      updateTweets();
      setTweet(tweetDispatch, '');
      setImagePath();
      setImageFile();
      if (tweetText.includes('#')) getHashTagList(tweetDispatch);
    } catch (err) {
      toast.error('försök igen');
    }
  };

  const getImage = () => {
    if (
      localStorage.getItem('image') &&
      localStorage.getItem('image') !== 'undefined'
    )
      return localStorage.getItem('image');
    return '/images/person.png';
  };

  const onChangeImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const selectImg = () => {
    inputFile.current.click();
  };

  const classes = UseStyles();
  return (
    <div className={classes.newTweet}>
      <Grid container>
        <img
          src={getImage()}
          alt="logo"
          style={{ width: 60, height: 60, borderRadius: '50%' }}
        />
        <input
          placeholder={'label.Vad händer?'}
          className={classnames(classes.input)}
          value={tweet}
          onChange={(e) => setTweet(tweetDispatch, e.target.value)}
        />
        <input
          type={'file'}
          style={{ display: 'none' }}
          ref={inputFile}
          onChange={onChangeImg}
        />
      </Grid>
      {imagePath && (
        <div>
          <div
            style={{ backgroundImage: `url(${imagePath})` }}
            className={classes.tweetImg}
          />
        </div>
      )}
      <Grid container direction={'row-reverse'} style={{ marginTop: 16 }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.newTweetBtn}
          onClick={newTweetClick}
        >
          Tweeta
        </Button>
      </Grid>
    </div>
  );
};

export default NewTweet;
