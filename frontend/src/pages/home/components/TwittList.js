import React from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import UseStyles from '../Styles'
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {likeTwitt, setTwittText, useTwittDispatch} from "../../../context/TwittContext";
import {toast} from "react-toastify";
// import { likeTwittRequest } from '../../../api/api_twitt';

const Twitt = ({data}) => {

  const twittDispatch = useTwittDispatch();

// Add this object to collect the # sign
  const renderTwitt = (text) => {
    return {__html: text.replace(/#\S+/g, "<a href='/tags/$&' style='color:cornflowerblue'>$&</a>")};
  };

  const getImage = () => {
    if (data.user.image)
      return data.user.image;
    else return "/images/person.png";
  };

  const handleLike = () => {
    likeTwittRequest(data._id, (isOk, data) => {
      if (!isOk)
        return toast.error("förök igen");
      likeTwitt(twittDispatch, data._id);
    });
  }
  const retwittClick = () => {
    setTwittText(twittDispatch, data.text);
  }

  const classes = UseStyles();
  return (
    <div className={classes.twittItem}>
      <Grid container>
        <img src={getImage()} style={{height: 60, width: 60, borderRadius: '50%'}}/>
        <Grid item container direction={"column"} style={{flex: 1, marginRight: '1rem'}}>
          <Grid item container>
            <Typography className={classes.twittItemName}>{data.user.name}</Typography>
            <Typography className={classes.twittItemId}>{data.user.id}</Typography>
          </Grid>

           {/*  Add <p> by using coponent={"p"} for tacke the # sign/ dangerouslySetInnerHTML for use innerHtml */}
          <Typography dangerouslySetInnerHTML={renderTwitt(data.text)} className={classes.twittText} component={"p"}/>
          {
            data.image &&
            <div>
              <div style={{backgroundImage: `url(${data.image})`}} className={classes.twittImg}></div>
            </div>
          }
        </Grid>
      </Grid>
      <Grid container direction={"row-reverse"} style={{marginTop: 16}} alignItems={'center'}>
        <IconButton className={classes.newTwittImgBtn} onClick={retwittClick}>
          <img src={"/images/retwitt.png"} className={classes.newTwittImg}/>
        </IconButton>
        <IconButton className={classes.newTwittImgBtn} onClick={handleLike}>
          <FavoriteIcon/>
        </IconButton>
        <Typography className={classes.likeCount}>{data.likes}</Typography>
        
      </Grid>
      
    </div>
  );
};

export default Twitt;