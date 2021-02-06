import React, {useEffect, useRef, useState} from 'react';
import UseStyles from './Styles'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import {Link} from "react-router-dom";
// import {getUsers} from "../../api/api_twitt";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {uploadUserPhoto} from "../../api/api_auth";
import {toast} from "react-toastify";

export const Twitter = ({name, id, img}) => {
  const classes = UseStyles();

  const getImage = () => {
    if (img)
      return img;
    return "/images/person.png"
  }

  return (
  <ButtonBase style={{width: "100%"}}><Grid container direction={"row"} className={classes.twitterParent}>
    <img src={getImage()} className={classes.twitterImg}/>
    <Grid item container direction={"column"} style={{width: 'max-content'}} alignItems={"flex-start"}
        className={classes.twitterNameParent}>
      <Typography className={classes.profileName}>{name}</Typography>
      <Typography className={classes.profileId}>{id}</Typography>
    </Grid>
  </Grid></ButtonBase>)
}


const LeftSidebar = () => {
  const [users, setUsers] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imagePath, setImagePath] = useState();
  const [anchorMenu, setAnchorMenu] = useState();
  const inputRef = useRef();

  useEffect(() => {
    getUsers((isOk, data) => {
      if (!isOk)
        return toast.error("Hittades ej");
      setUsers(data);
    })
  }, []);

  const handleToggleMenu = (e) => {
    if (anchorMenu)
      setAnchorMenu(null);
    else
      setAnchorMenu(e.currentTarget);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      uploadUserPhoto(formData, (isOk, data) => {
        if (!isOk)
          return toast.error("försök igen");
        toast.success("Ny bild")
        localStorage.setItem("image", data.imagePath);
      })
    }
  };

 
  const getImage = () => {
    if (imagePath)
      return imagePath;
    if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
      return localStorage.getItem("image");
    return "/images/user-profiles.png"
  };

  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Grid container direction={"row-reverse"} onClick={handleToggleMenu} style={{cursor: 'pointer'}}>
        <img src={getImage()} style={{width: 50, height: 50, borderRadius: '50%'}}/>
        <Grid item container direction={"column"} style={{width: 'max-content'}} className={classes.profileText}>
          <Typography className={classes.profileName}>{localStorage.getItem("name")}</Typography>
          <Typography className={classes.profileId}>{localStorage.getItem("username")}</Typography>
        </Grid>
        <input ref={inputRef} type={'file'} style={{display: 'none'}} onChange={handleAvatarChange}/>
      </Grid>
      <Grid item container direction={"column"} className={classes.twitterRoot}>
        <Typography className={classes.twitterTitle}>
        populära twittrare
        </Typography>
        <Divider style={{marginLeft: -24, marginRight: -24}}/>
        {
          users.map((item, index) => {
            return (<Link to={`/users/${item._id}/${item.name}`} style={{width: "100%"}}>
              <Twitter name={item.name} id={item.username} img={item.image}/>
              {index !== users.length - 1 &&
              <Divider style={{marginLeft: -24, marginRight: -24}}/>
              }
            </Link>)
          })
        }
      </Grid>
      <Menu open={Boolean(anchorMenu)} onClose={() => setAnchorMenu(null)} anchorEl={anchorMenu}>
        <MenuItem onClick={() => {
          inputRef.current.click();
        }}>Profil bild</MenuItem>
        
        <MenuItem onClick={() => {
          localStorage.clear();
          window.location.reload()
        }}>loggar ut</MenuItem>
      </Menu>
    </div>
  );
};

export default LeftSidebar;