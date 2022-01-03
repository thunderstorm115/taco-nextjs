import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  yesButton: {
    background: "#39A628",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    marginRight: "10px",
    marginLeft: "10px",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),

    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },
  noButton: {
    background: "#9A2849",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    marginRight: "10px",
    marginLeft: "10px",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),

    '&:hover': {
      background: "#202020",
      color: "white"
   },
   
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  textField: {
    background: "black",
    color: "#C33E37",
    border: "3px solid black",
  },

  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: '#2B2B2B',
    color: '#ffffff',
    borderRadius: "12px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
    },
  },

  textField: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: 50,
  },

  dropDown: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(3),
    minWidth: 50,
    width: "260px",
  },

  dropDownInner: {
    padding: "7px"
  },

  label:{
    color: "#ffffff",
    marginBottom: "10px"
  },

  button:{
    background: '#C33E37',
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
  '&:hover': {
    background: "#202020",
    color: "white"
 },
},
}));