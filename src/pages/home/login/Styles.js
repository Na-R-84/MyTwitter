import { Directions } from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";

const UseStyles = makeStyles(theme => ({
  container: {
    background: "white",
    width: "30rem",
    margin: "10rem auto",
    display: "flex",
    flexDirection: "column"
  },
  headerText: {
    margin: '1rem',
    alignSelf: 'center',
  },
  tab: {
    flex: 1,
    
  },
  containerInput: {
    padding: '1rem 0.8rem',
    display :'flex',
    flexDirection : 'column',
    Directions:'rtl'
  },
  label:{
    direction: 'ltr'
  }
}));


export default UseStyles;