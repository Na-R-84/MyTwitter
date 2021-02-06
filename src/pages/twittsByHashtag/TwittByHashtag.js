import React, {useEffect} from 'react';
import UseStyles from "../home/Styles";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TwittList from "../home/components/TwittList";
// import {getTwittsByHashTagRequest} from "../../api/api_twitt";
import {toast} from "react-toastify";
import {setTwittList, useTwittDispatch, useTwittState} from "../../context/TwittContext";
import {useLocation} from 'react-router-dom';

const TwittByHashTag = (props) => {

  const location = useLocation();
  const {twittList} = useTwittState();
  const twittDispatch = useTwittDispatch();
  
  useEffect(() => {
    getTwittsByHashTagRequest(props.match.params.hashtag, (isOk, data) => {
      if (!isOk)
        return toast.error("skickades ej");
      setTwittList(twittDispatch, data);
    })
  }, [location]);

  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.hashtag} icon={<img src={"/images/hashtag.png"}/>}/>
      <Divider className={classes.divider}/>
      <TwittList data={twittList}/>
    </div>
  );
};

export default TwittByHashTag;