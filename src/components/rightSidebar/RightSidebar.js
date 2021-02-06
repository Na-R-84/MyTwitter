import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import UseStyles from "./Styles";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from "react-router-dom";
// import { getHashTags } from "../../api/api_twitt";
import {
  setHashTagList,
  useTwittDispatch,
  useTwittState,
} from "../../context/TwittContext";
import { toast } from "react-toastify";

const RightSidebar = () => {
  const classes = UseStyles();
  const { hashTags } = useTwittState();
  const twittDispatch = useTwittDispatch();
  useEffect(() => {
    getHashTags((isOk, data) => {
      if (!isOk) return toast.error("Fail to Fetch hashTags");
      setHashTagList(twittDispatch, data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Link to={"/"}>
        <Grid container direction={"row"} alignItems={"center"}>
          <Grid item>
            <img src={"/images/logo.png"} />
          </Grid>
          <Grid item>
            <Typography className={classes.logoType}>My Twitt</Typography>
          </Grid>
        </Grid>
      </Link>
      <Typography className={classes.hashtagTitle}>
      Trender Hashtag
      </Typography>

      <Grid container direction={"column"} alignItems={"center"}>
        {hashTags.map((item) => (
          <ButtonBase className={classes.hashtagParent}>
            <Link to={"/hashtags/" + item.text} style={{ width: "100%" }}>
              <Grid item container>
                <img src={"/images/hashtag.png"} />
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
