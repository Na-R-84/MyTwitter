import React from 'react';
import UseStyles from '../Styles'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import classnames from 'classnames'
// import {newTwittRequest} from "../../../api/api_twitt";
import {toast} from "react-toastify";
import {
  setTwittText as setTwitt,
  updateHashTagList,
  useTwittDispatch,
  useTwittState
} from "../../../context/TwittContext";

const NewTwitt = ({updateTwitts}) => {

  const inputFile = React.useRef();

  const {twittText: twitt} = useTwittState();
  const twittDispatch = useTwittDispatch();
  // const [twitt, setTwitt] = React.useState();
  const [imageFile, setImageFile] = React.useState();
  const [imagePath, setImagePath] = React.useState();


  const newTwittClick = () => {
    const twittText = twitt;
    if (!twittText)
      return;
    const formData = new FormData();
    formData.append("text", twittText);
    if (imageFile)
      formData.append("image", imageFile);
    newTwittRequest(formData, (isOk, data) => {
      if (!isOk)
        return toast.error("försök igen");
      toast.success("Skickad");
      updateTwitts();
      setTwitt(twittDispatch, "");
      setImagePath();
      setImageFile();
      if (twittText.includes("#"))
        updateHashTagList(twittDispatch);
    })
  };

  const getImage = () => {
    if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
      return localStorage.getItem("image");
    return "/images/person.png"
  };

  const onChangeImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const selectImg = () => {
    inputFile.current.click();
  };

  const classes = UseStyles();
  return (
    <div className={classes.newTwitt}>
      <Grid container>
        <img src={getImage()} style={{width: 60, height: 60, borderRadius: '50%'}}/>
        <input placeholder={("label.Vad händer?")} className={classnames(classes.input)}
               value={twitt} onChange={e => setTwitt(twittDispatch, e.target.value)}
        />
        <input type={"file"} style={{display: 'none'}} ref={inputFile} onChange={onChangeImg}/>
      </Grid>
      {
        imagePath &&
        <div>
          <div style={{backgroundImage: `url(${imagePath})`}} className={classes.twittImg}/>
        </div>
      }
      <Grid container direction={"row-reverse"} style={{marginTop: 16}}>
        <Button variant={"contained"} color={"primary"}
                className={classes.newTwittBtn} onClick={newTwittClick}>Twitta</Button>
        <IconButton className={classes.newTwittImgBtn} onClick={selectImg}>
          <img src={"/images/twittpic.png"} className={classes.newTwittImg}/>
        </IconButton>
      </Grid>
    </div>
  );
};

export default NewTwitt;