import React, { useEffect } from 'react';
import UseStyles from '../home/Styles';
import Header from '../../components/header/Header';
import Divider from '@material-ui/core/Divider';
import TweetList from '../home/components/TweetList';
import { Home as HomeIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';
import {
  setTweetList,
  useTweetDispatch,
  useTweetState,
} from '../../context/TweetContext';
import Axios from 'axios';

const TweetByHashTag = (props) => {
  const { hashtag } = props.match.params;
  const { tweetList } = useTweetState();
  const tweetDispatch = useTweetDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(`/api/hashtags/${hashtag}/tweets`);
        setTweetList(tweetDispatch, data);
      } catch (err) {
        toast.error('skickades ej');
      }
    };
    fetchData();
  }, [hashtag]);

  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.hashtag} icon={<HomeIcon />} />
      <Divider className={classes.divider} />
      <TweetList data={tweetList} />
    </div>
  );
};

export default TweetByHashTag;
