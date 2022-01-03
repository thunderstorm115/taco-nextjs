import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  layout: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      flexDirection: "column",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  list: {
    width: "350",
    backgroundColor: "#2B2B2B",
    color: "white",
    margin: theme.spacing(2),
    [theme.breakpoints.down(400 + theme.spacing(3) * 2)]: {
      width: "300px",
    },
  },

  fullList: {
    width: 'auto',
    minWidth: "800px",
  },

  MuiDrawer: {
    backgroundColor: "#2B2B2B"
  },

  buttonToggle: {
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    fontSize: "16px",
    fontWeight: "600",
    marginRight: "17px",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "0px"
  },

  resetFilterBtn: {
    borderRadius: "5em",
    color: "white",
    fontSize: "12px",
    background: "#9A2849",
    margin: "0px",
    float: "right"
  },

  noData:{
    color: "#fff",
  },

  thehead:{
    backgroundColor: "#2B2B2B",
    color: "#fff",
  },

  table: {
    minWidth: "86vW",
    minHeight: "100%",
    fontWeight: "normal"
  },

  tableContainer: {
    marginTop: theme.spacing(2),
    backgroundColor: "#9A2849",
    color: "white",
  },

 
  tableHead: {
    fontSize: "17px",
    backgroundColor: "#9A2849",
    color: "#fff",
    fontWeight: "normal",
    padding: "20px",
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      padding: "10px",
      backgroundColor: "transparent",
    },
  },

  tableBody: {
    backgroundColor: "#2b2b2b",
    color: "white",
    padding: "10px",
    [theme.breakpoints.down(405 + theme.spacing(2) * 2)]: {
      fontSize:'14px',
    },
  },

  theHead:{
    padding: "10px",
    [theme.breakpoints.down(1200 + theme.spacing(2) * 2)]: {
      padding: "5px",
    },
  },
  exitsvg:{
    cursor: 'pointer',
    width: '25px',
    alignItems: 'center',
    marginTop: "7px"
  }

})); 