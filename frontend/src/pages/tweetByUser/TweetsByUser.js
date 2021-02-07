import React, { useEffect, useState } from 'react';
import UseStyles from '../home/Styles';
import Header from '../../components/header/Header';
import Divider from '@material-ui/core/Divider';
import TweetList from '../home/components/Tweet';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import { toast } from 'react-toastify';

const TweetsByUser = (props) => {
  const userId = props.match.params.id;
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(`/api/tweets/users/${userId}`);
        setTweets(data);
      } catch (err) {
        toast.error('försök igen');
      }
    };
    fetchData();
  }, [userId]);

  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.name} icon={<PersonIcon />} />
      <Divider className={classes.divider} />
      {tweets.length === 0 && <Typography>Hittades inga tweet</Typography>}
      <TweetList data={tweets} />
    </div>
  );
};

export default TweetsByUser;
