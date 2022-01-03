import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(5),
  },

  table: {
    color: "white",
    width: "85vW"
  },

  list: {
    width: 380,
    backgroundColor: "#2B2B2B",
    color: "white",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    [theme.breakpoints.down(700 + theme.spacing(2) * 2)]: {
      width: 350,
      backgroundColor: "#2B2B2B",
      color: "white",
      margin: theme.spacing(0),
    },
  },

  listHeader: {
    padding: '16px',
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
    marginBottom: "10px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },

  resetFilterBtn: {
    borderRadius: "5em",
    color: "white",
    fontSize: "12px",
    background: "#9A2849",
    float: "right",
    margin: "0px",
    [theme.breakpoints.down(700 + theme.spacing(2) * 2)]: {
      float: "none",
      marginBottom: "10px"
    },
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },

  nodataDiv: {
    color: "white",
    textAlign: "left"
  },

  noData: {
    color: "#fff",
    marginBottom: theme.spacing(8),
  },

  data: {
    backgroundColor: "#2B2B2B",
    color: "#fff"
  },

  thehead:{
    backgroundColor: "#2B2B2B",
    color: "#fff",
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
    padding: "20px",
  }, 

  theHead:{
    padding: "10px"
  },
  exitsvg:{
    cursor: 'pointer',
    width: '25px',
    alignItems: 'center',
    marginTop: "7px"
  },
  theListItemIndv:{
    marginBottom: theme.spacing(1.5)
  },
  theListItemHead:{
    fontWeight: "bold"
  }
})); 