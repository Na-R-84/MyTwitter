import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import UseStyles from './Styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {
  setHashTagList,
  useTweetDispatch,
  useTweetState,
} from '../../context/TweetContext';
import { toast } from 'react-toastify';
import Axios from 'axios';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, Tooltip } from '@material-ui/core';

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
            <img src={'/images/logo.png'} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item>
            <Typography className={classes.logoType}>My Twitter</Typography>
          </Grid>
        </Grid>
      </Link>
      <Divider className={classes.Divider} />
      <Typography className={classes.hashtagTitle}>Trender Hashtag</Typography>
      <List>
        {hashTags.map((item) => (
          <ListItem>
            <Tooltip arrow title={`${item.numTweets} tweets`}>
              <Link to={'/hashtags/' + item.name}>
                <Typography className={classes.hashtag}>
                  #{item.name}
                </Typography>
              </Link>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RightSidebar;
