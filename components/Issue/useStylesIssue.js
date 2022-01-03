import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  toggles: {
    marginTop: "10px"
  },
  
  buttonToggle: {
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    fontSize: "20px",
    padding: "0px",
    marginRight: "15px"
  },

  textField: {
    borderColor: "white",
    backgroundColor: "#202020",
    text: "white",
    borderRadius: "5px",
    borderStyle: "solid",
    borderWidth: "1.5px",
    fontSize: "18px",
    placeholder: "white",
    color: "white !important",
    marginRight: "15px"
  },  

  printbutton: {
    background: "#9A2849",
    color: "white",
    borderRadius: "5em"
  },

  issueHead: {
    color: "white",
  },  

  graph: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
  },

  graphTaskSort: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    margin:theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      margin:theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
  componentGridSizing: {
    width: "1650px",
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: "310px",
    },
  },
  layout2: {
    width: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: "100%",
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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

  issueHeading: {
    color: "white",
    margin: "10px",
    padding: "10px",
  },
  issueHeadingNoData: {
    color: "white",
    marginLeft: "40px",
    paddingLeft: "160px",
    paddingBottom: "0",
    paddingTop: "0px",
    marginTop: "10px",
    marginBottom: "10px",
    
  },
  
  // Card styles for empty data
  root: {
    minWidth: 275,
    backgroundColor: '#2B2B2B',
    width: "1450px",
    borderRadius: "25px",
    height: "200px",
    textAlign: "center",
    color: "White",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  spinner: {
    color: "white !important",
    marginTop: "20px"
  },

  noIssue: {
    color: "#9A2849",
    marginLeft: "40px"
  },

  timeFields: {
    marginBottom: 0,
    marginTop: 0
  }      
})); 