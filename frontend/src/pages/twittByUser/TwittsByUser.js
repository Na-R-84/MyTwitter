import React, {useEffect, useState} from 'react';
import UseStyles from "../home/Styles";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import TwittList from "../home/components/TwittList";
import PersonIcon from '@material-ui/icons/Person';
// import {getTwittsByUserRequest} from "../../api/api_twitt";
import {useLocation} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

const TwittsByUser = (props) => {

  const [twitts, setTwitts] = useState([]);
  const location = useLocation();
  useEffect(() => {
    
    getTwittsByUserRequest(props.match.params.id, (isOk, data) => {
      if (!isOk)
        return alert(data.message);
      else setTwitts(data);
    });
  }, [location]);

  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.name} icon={<PersonIcon/>}/>
      <Divider className={classes.divider}/>
      {twitts.length === 0 &&
      <Typography>Hittades inga twitt</Typography>
      }
      <TwittList data={twitts}/>
    </div>
  );
};

export default TwittsByUser;