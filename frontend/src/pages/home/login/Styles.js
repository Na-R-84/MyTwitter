import { Directions } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const UseStyles = makeStyles((theme) => ({
  container: {
    background: "#00334d",
    width: "30rem",
    margin: "10rem auto",
    display: "flex",
    flexDirection: "column",
  },
  headerText: {
    margin: "1rem",
    alignSelf: "center",
    color: "#557591",
  },
  tab: {
    flex: 1,
    color: "#557591",
  },
  TextField: {
    color: "#557591",
  },

  containerInput: {
    padding: "1rem 0.8rem",
    display: "flex",
    flexDirection: "column",
    color: "#557591",
  },
  label: {},

  type: {
    background: "#446e88",
   
  },
}));

export default UseStyles;
