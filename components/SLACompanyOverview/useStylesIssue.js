import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  noBold:{
    fontWeight: "normal"
  },

  layoutSLA:{
    width: "86vW"
  },

  buttonSLA1: {
    color: "#fff",
    fontSize: "18px",
    padding: "0px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },

  buttonSLA2: {
    color: "#fff",
    marginLeft: "20px",
    fontSize: "18px",
    padding: "0px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },
  
  headingSLA: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "0px"
  },
  
  noData:{
    color: "#9A2849",
    textAlign: "left",
  },
  
  paperSLA: {
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    marginLeft: "0px",
    cursor: "pointer",
    margin:theme.spacing(3),
    padding: theme.spacing(3),
  },
  
  cardTitle: {
    margin: "0px",
    fontWeight: 700
  },  

  centerDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    marginTop: theme.spacing(4)
  },

  NoDataText: {
    fontWeight: "normal",
    color: "#fff"
  },
}));
