import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import UseStyles from './Styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import {
  setHashTagList,
  useTweetDispatch,
  useTweetState,
} from '../../context/TweetContext';
import { toast } from 'react-toastify';
import Axios from 'axios';

const RightSidebar = () => {
  const classes = UseStyles();
  const { hashTags } = useTweetState();
  const tweetDispatch = useTweetDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get('/api/hashtags');
        setHashTagList(tweetDispatch, data);
      } catch (err) {
        return toast.error('Fail to Fetch hashTags');
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Link to={'/'}>
        <Grid container direction={'row'} alignItems={'center'}>
          <Grid item>
            <img src={'/images/logo.png'} alt="logo" />
          </Grid>
          <Grid item>
            <Typography className={classes.logoType}>My Tweet</Typography>
          </Grid>
        </Grid>
      </Link>
      <Typography className={classes.hashtagTitle}>Trender Hashtag</Typography>

      <Grid container direction={'column'} alignItems={'center'}>
        {hashTags.map((item) => (
          <ButtonBase className={classes.hashtagParent}>
            <Link to={'/hashtags/' + item.text} style={{ width: '100%' }}>
              <Grid item container>
                <img src={'/images/hashtag.png'} alt="hashtag" />
                <Typography className={classes.hashtag}>{item.text}</Typography>
              </Grid>
            </Link>
          </ButtonBase>
        ))}
      </Grid>
    </div>
  );
};

export default RightSidebar;
