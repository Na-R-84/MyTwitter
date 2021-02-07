import React, { useEffect } from 'react';
import UseStyles from './Styles';
import Header from '../../components/header/Header';
import Divider from '@material-ui/core/Divider';
import NewTweet from './components/NewTweet';
import TweetList from './components/Tweet';
import { Home as HomeIcon } from '@material-ui/icons';
import {
  setTweetList,
  useTweetDispatch,
  useTweetState,
} from '../../context/TweetContext';
import { toast } from 'react-toastify';
import Axios from 'axios';

const Home = () => {
  const classes = UseStyles();

  const TweetDispatch = useTweetDispatch();
  const { tweetList: tweets } = useTweetState();

  useEffect(() => {
    UpdateTweets();
  }, []);

  const UpdateTweets = () => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get('/api/tweets');

        setTweetList(TweetDispatch, data);
      } catch (err) {
        toast.error('Fail To Fetch Tweets');
      }
    };
    fetchData();
  };

  return (
    <div className={classes.root}>
      <Header title={'Hem'} icon={<HomeIcon />} />
      <Divider className={classes.divider} />
      <NewTweet updateTweets={UpdateTweets} />
      <TweetList data={tweets} />
    </div>
  );
};

export default Home;
