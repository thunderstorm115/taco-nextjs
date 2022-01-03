import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  nodeGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    display: "flex",
    [theme.breakpoints.down(1350 + theme.spacing(2) * 2)]: {
      display: "block",
    },
  },

  TitleLabel: {
    color: "#ffffff",
    marginTop: "0px",
    fontWeight: 600
  },

  textField: {
    backgroundColor: "#fff",
    text: "white",
    width: "390px",
    borderRadius: "3px",
    border: "1px solid white",
    fontSize: "18px",
    color: "white !important",
    textAlign: "left",
    marginRight: "10px",
    [theme.breakpoints.down(500 + theme.spacing(2) * 2)]: {
      width: "300px",
      fontSize: "14px",
      marginRight: "0px"
    },
  },

  completeBtn: {
    background: "#39A628",
    backgroundColor: "#39A628",
    color: "white",
    width: "160px",
    borderRadius: "5em",
    float: "right",
    marginRight: "10px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
   '&.Mui-disabled':{
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    opacity: 0.5,
   },
   [theme.breakpoints.down(960)]: {
    float: "left",
    marginTop: "10px"
  },
  },
  
  selectAllBtn: {
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    borderRadius: "5em",
    width: "160px",
    float: "right",
    marginRight: "10px",
    '&.Mui-disabled':{
      color: "white",
      opacity: 0.5,
     },
    [theme.breakpoints.down(960)]: {
      float: "left",
      marginTop: "10px"
    },
  },

  deselectBtn: {
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    borderRadius: "5em",
    width: "160px",
    float: "right",
    marginRight: "10px",
    '&.Mui-disabled':{
      color: "white",
      opacity: 0.5,
     },
    [theme.breakpoints.down(960)]: {
      float: "left",
      marginTop: "10px"
    },
  },

  table: {
    minWidth: "86vW",
    fontWeight: "normal",
    [theme.breakpoints.down(500)]: {
      minWidth: "95vW",
    },
  },
  
  tableHead: {
    fontSize: "16px",
    backgroundColor: "#9A2849",
    color: "#fff",
    fontWeight: "normal",
    paddingTop: "10px",
    paddingBottom: "10px"
  },

  completedNode:{
    color: "#fff",
    fontSize: "22px",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginBottom: "-20px"
  },

  tableBody: {
    backgroundColor: "#2b2b2b",
    color: "white",
    paddingTop: "40px",
    paddingBottom: "40px",
    paddingRight: "20px",
    textAlign: "center",
    justifyContent: "center",
  },
 
  tableCheck: {
    backgroundColor: "#2b2b2b",
    color: "white",
    padding: "20px",
    maxWidth: "100px"
  },

  checkBox: {
    color: "#ffffff"
  },

  label: {
    color: "#ffffff",
    marginBottom: "10px",
    fontWeight: 400,
    [theme.breakpoints.down(730)]: {
      fontSize: "16px",
      marginLeft: "2px"
    },
  },

  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    minWidth: "auto",
    maxWidth: "900px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down(729)]: {
      maxWidth: "auto",
    },
  },

  edtSubmitBtn: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    borderRadius: "5em",
    width: "250px",
    height: "39px",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down(730)]: {
      marginLeft: "0px",
    },
    '&:hover': {
      background: "#202020"
   },
  },
}));
