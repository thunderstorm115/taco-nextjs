import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  compliance: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    minWidth: 300,
  },
  // compButtons:{
  //   [theme.breakpoints.down(500 + theme.spacing(2) * 2)]: {
  //     margin: theme.spacing(1)
  //   },
  // },

  layout: {
    width: "100%",
    graph: {
      minWidth: 350,
    },
    [theme.breakpoints.down(1250 + theme.spacing(2) * 2)]: {
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  paperNode: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    minWidth: 300,
    minHeight: 500,
    flex: 1,
    wordBreak: "break-word",
    heading: {
      color: "red",
    },
    // [theme.breakpoints.down(1000 + theme.spacing(3) * 2)]: {
    //   minWidth: 100,
    //   marginRight: theme.spacing(0),
    //   marginLeft: theme.spacing(0),
    // },
  },

  layoutBottom: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  },

  items: {
    marginTop: 0,
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(0),
  },

  textField: {
    background: "white",
    color: "#C33E37",
  },

  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
  
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(2),
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      marginRight: "10px",
      marginLeft: "10px",
      padding: theme.spacing(2),
    },
  },

  paper2Left: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    marginRight: "10px",
    marginLeft: "10px",
    height: "500px",
    [theme.breakpoints.down(1280 + theme.spacing(2) * 2)]: {
      height: "250px"
    },
  },

  failedControlsPaper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    marginRight: "10px",
    marginLeft: "10px",
    height: "500px",
    cursor: "pointer",
    [theme.breakpoints.down(1280 + theme.spacing(2) * 2)]: {
      height: "250px"
    },
  },

  paper2: {
    marginTop: "10px",
    overflowY: "scroll",
    maxHeight: "400px",
    [theme.breakpoints.down(1280 + theme.spacing(2) * 2)]: {
      height: "150px"
    },
  },

  space: {
    paddingLeft: theme.spacing(3),
  },

  heading: {
    color: "#fff",
    marginLeft: "20px",
  },

  secondCardHead: {
    color: "#FA336C",
    marginBottom: "30px",
  },

  layoutNode: {
    width: "auto",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  heading2: {
    color: "#fff",
    wordWrap: "break-word",
    marginLeft: "10px",
    [theme.breakpoints.up(1200 + theme.spacing(3) * 2)]: {
      wordWrap: "break-word",
      paddingRight: "0px",
    },
  },

  heading3: {
    color: "#fff",
    fontSize: "26",
    fontWeight: "semibold",
    wordWrap: "break-word",
    [theme.breakpoints.up(1200 + theme.spacing(3) * 2)]: {
      wordWrap: "break-word",
    },
  },

  typo: {
    display: "flex",
    justifyContent: "flex-end",
  },

  buttonClass: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "15px",
    [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(1)
    },
  },

  buttonfont: {
    fontSize: "12px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },
  nodesHeading:{
   
      color: "#FA336C",
      fontSize: "24",
      fontWeight: "semibold",
      wordWrap: "break-word",
      // marginLeft: theme.spacing(2.5),
      [theme.breakpoints.up(1200 + theme.spacing(3) * 2)]: {
        wordWrap: "break-word",
        marginLeft: theme.spacing(2.5),
      },
   
  },
  nodeDate:{
    wordWrap: "break-word",
    fontWeight: "200",
    // marginLeft: theme.spacing(2.5),
    [theme.breakpoints.up(1200 + theme.spacing(3) * 2)]: {
      wordWrap: "break-word",
      marginLeft: theme.spacing(2.5),
    },
  }
}));
