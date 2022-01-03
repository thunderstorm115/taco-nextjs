import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  nav: {
    marginTop: theme.spacing(3),
    alignItems: "center",
    flexBasis: "auto",
    display: "flex",
  },
  infrastructure: {
    display: "flex",
    flexBasis: "auto",
    flexDirection: "row",
    minWidth: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
  layout: {
    width: "auto",
    marginLeft: "0px",
    maxWidth: "1200px"
  },
  layoutNode: {
    width: 'auto',
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  layoutNodeList: {
    width: "auto",
  },
  layoutSumm: {
    width: "auto",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  heading: {
    color: "#FA336C",
    [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(2),
    },
  },
  nodeSingleData:{
    marginBottom: "25px",
    marginTop: "-10px",
    [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(2),
    },
  },
  title: {
    marginLeft: theme.spacing(3),
  },
  textField: {
    background: "white",
    color: "#C33E37",
  },
  textFieldNodeList: {
    background: "white",
    color: "#C33E37",
    marginBottom: "10px",
    marginLeft: theme.spacing(1)
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    background: "#2B2B2B",
    color: "#ffffff",
    [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  paperNode: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    background: '#2B2B2B',
    color: '#ffffff',
    borderRadius: "12px",
    minWidth: 350,
    width: "100%",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: '310px',

    },
  },
  layout2: {
    width: "auto",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),

    heading: {
      color: "red",
    },
    nav: {
      marginTop: theme.spacing(3),
      alignItems: "center",
      flexBasis: "auto",
      display: "flex",

    },
  },
  paperSumm: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),

  },
  graphTaskSort: {
    display: "flex",
    justifyContent: "center",
  },
  gridSpacing: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),

  },
  graph: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    minWidth: 300,
  },
  button: {
    background: "#9A2849",
    color: "white",
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
  },

  NodeList: {},

  noNode: {
    textAlign: "left",
    color: "white"
  },
  Node: {
    display: "inline-block",
    marginTop: "10px",
    marginRight: "10px",
    background: " #2b2b2b",
    padding: "20px",
    width: "350px",
    height: "auto",
    maxHeight: "650px",
    borderRadius: "12px",
    [theme.breakpoints.down(500 + theme.spacing(3) * 2)]: {
      width: "300px",
      padding: "10px",
      marginLeft: theme.spacing(2)
    },
  },
  whiteText: {
    color: "#fff",
    [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(2),
    },
  },
  space: {
    wordWrap: "break-word",
    marginRight: theme.spacing(1),
  },
  spaceSumm: {
    paddingLeft: theme.spacing(3),
  },
  data2: {
    fontSize: "21px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0px",
  },
  data: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down(1000 + theme.spacing(3) * 2)]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  buttons: {
    marginRight: "10px",
    display: "flex",
    flexDirection: "row",
    color: "white",
    backgroundColor: "#9A2849",
    borderRadius: "20px",
  },

  theButtons: {
    display: "flex",
    justifyContent: "flex-start",
  },
  buttonClass: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "20px",
  }

}));