import React, { useEffect } from 'react';
import UseStyles from '../home/Styles';
import Header from '../../components/header/Header';
import Divider from '@material-ui/core/Divider';
import TweetList from '../home/components/Tweet';
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
        const { data } = await Axios.get(`/api/tweets/hashtags/${hashtag}`);
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
      <Header
        title={props.match.params.hashtag}
        icon={<img src={'/images/hashtag.png'} />}
      />
      <Divider className={classes.divider} />
      <TweetList data={tweetList} />
    </div>
  );
};

export default TweetByHashTag;
