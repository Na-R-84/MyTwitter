import React, {useEffect, useState} from 'react';
import UseStyles from './Styles'
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import NewTwitt from "./components/NewTwitt";
import TwittList from "./components/TwittList";
import {Home as HomeIcon} from "@material-ui/icons";
// import {getAllTwitts} from "../../api/api_twitt";
import {setTwittList, useTwittDispatch, useTwittState} from "../../context/TwittContext";
import {toast} from "react-toastify";

const Home = () => {
  const classes = UseStyles();

  const TwittDispatch = useTwittDispatch();
  const {twittList : twitts} = useTwittState();
  // const [twittts, setTwitts] = useState([]);

  useEffect(() => {
    UpdateTwitts();
  }, []);

  const UpdateTwitts = () => {
    getAllTwitts((isOk, data) => {
      if (!isOk)
        return toast.error("Fail To Fetch Twitts");
      setTwittList(TwittDispatch,data);
    })
  }

  return (
    <div className={classes.root}>
      <Header title={"Hem"} icon={<HomeIcon/>}/>
      <Divider className={classes.divider}/>
      <NewTwitt updateTwitts={UpdateTwitts}/>
      <TwittList data={twitts}/>
    </div>
  );
};

export default Home;