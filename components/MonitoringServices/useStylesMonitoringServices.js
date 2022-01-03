import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  indexMain: {
    display: "flex",
    [theme.breakpoints.down(1250 + theme.spacing(1) * 1)]: {
      display: "block",
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
  activeMain: {
    display: "flex",
    marginTop: "10px",
    [theme.breakpoints.down(1100)]: {
      display: "block",
    },
  },
  activeSub: {
    display: "flex",
    [theme.breakpoints.down(800)]: {
      display: "block",
    },
  },
  btnDiv: {
    textAlign: "right",
    [theme.breakpoints.down(800)]: {
      textAlign: "left",
      marginTop: "20px"
    },
  },
  activeBtnDiv: {
    textAlign: "right",
    [theme.breakpoints.down(800)]: {
      textAlign: "left",
      marginTop: "20px",
    },
  },
  ActivateServices: {
    maxWidth: "470px",
    minWidth: "470px",
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    cursor: "pointer",
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    paddingTop: "80px",
    paddingBottom: "80px",
    paddingLeft: "100px",
    paddingRight: "30px",
    display: "flex",
    textAlign: "center",
    minHeight: 175,
    [theme.breakpoints.down(1000)]: {
      minWidth: "10px",
      minHeight: "auto",
    },
    [theme.breakpoints.down(730)]: {
      paddingLeft: "20px",
      marginRight: "none",
      paddingRight: "20px",
      margin: theme.spacing(2),
    },
  },

  Icon: {
    fontSize: "150px",
    paddingRight: "80px",
    [theme.breakpoints.down(900)]: {
      paddingRight: "10px",
      fontSize: "100px",
    },
  },

  IconBuild: {
    fontSize: "150px",
    paddingRight: "80px",
    [theme.breakpoints.down(900)]: {
      paddingRight: "40px",
      fontSize: "100px",
    },
  },

  label: {
    color: "white",
    margin: "0px",
    [theme.breakpoints.down(600)]: {
      fontSize: "20px"
    },
  },

  ServicesLabel: {
    color: "white",
    marginTop: "20px",
    [theme.breakpoints.down(600)]: {
      fontSize: "20px"
    },
  },  

  EditServices: {
    maxWidth: "470px",
    minWidth: "470px",
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    cursor: "pointer",
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    paddingTop: "80px",
    paddingBottom: "80px",
    paddingLeft: "100px",
    paddingRight: "30px",
    display: "flex",
    textAlign: "center",
    minHeight: 175,
    [theme.breakpoints.down(1000)]: {
      minWidth: "10px",
      minHeight: "auto",
    },
    [theme.breakpoints.down(730)]: {
      paddingLeft: "20px",
      marginRight: "none",
      paddingRight: "20px",
      margin: theme.spacing(2),
    },
  },

  textField: {
    backgroundColor: "#fff",
    text: "white",
    width: "390px",
    borderRadius: "5px",
    border: "1px solid white",
    fontSize: "18px",
    color: "white !important",
    height: "36px",
    paddingTop: "5px",
    paddingLeft: "10px",
    marginTop: "50px",
    [theme.breakpoints.down(1100)]: {
      marginTop: "20px",
    },
    [theme.breakpoints.down(500)]: {
      width: "auto"
    },
  },

  searchActivateServices: {
    backgroundColor: "#fff",
    text: "white",
    width: "390px",
    borderRadius: "5px",
    border: "1px solid white",
    fontSize: "18px",
    color: "white !important",
    height: "36px",
    paddingTop: "5px",
    paddingLeft: "10px",
    marginRight: "15px",
    marginTop: "50px",
    [theme.breakpoints.down(1100)]: {
      marginTop: "20px",
    },
    [theme.breakpoints.down(500)]: {
      width: "270px"
    },
  },
  selectBtn: {
    background: "#39A628",
    marginRight: "10px",
    width: "135px",
    color: "white",
    borderRadius: "5em",
    marginTop: "5px",
    [theme.breakpoints.down(500)]: {
      marginBottom: "15px",
    },
  },

  deselectBtn: {
    background: "#2B2B2B",
    width: "135px",
    color: "white",
    borderRadius: "5em",
    marginTop: "5px",
    [theme.breakpoints.down(500)]: {
      marginBottom: "10px",
    },
  },

  nextBtn: {
    background: "#9A2849",
    width: "280px",
    color: "white",
    borderRadius: "5em",
    marginTop: "10px",
    [theme.breakpoints.down(450)]: {
      width: "135px",
    },
  },

  table: {
    minWidth: "86vW",
    fontWeight: "normal",
    [theme.breakpoints.down(460)]: {
      fontSize: "14px",
    },
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

  checkBox: {
    color: "#ffffff",
  },

  submitMainBtn: {
    background: "#9A2849",
    width: "225px",
    color: "white",
    borderRadius: "5em",
    [theme.breakpoints.down(500)]: {
      width: "150px",
    },
  },

  deleteBtn: {
    background: "#9A2849",
    width: "224px",
    color: "white",
    borderRadius: "5em",
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.down(500)]: {
      width: "150px",
    },
  },

  grid: {
    minWidth: "87vW"
  },

  block: {
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    display: "flex",
    margin: "10px",
    width: "257px",
    height: "160px",
    textAlign: "left"
  },

  closeIcon: {
    fontSize: 30,
    fill: "white",
    marginTop: "17px",
  },

  blockEdit: {
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    display: "flex",
    margin: "10px",
    minWidth: "250px",
    minHeight: "180px",
    maxWidth: "250px",
    maxHeight: "180px",
    textAlign: "left",
  },

  blockEdit2: {
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    display: "block",
    margin: "10px",
    minWidth: "250px",
    minHeight: "150px",
    maxWidth: "250px",
    maxHeight: "180px",
    textAlign: "left",
  },

  subCheckBox: {
    color: "#ffffff",
    marginRight: "5px",
    height: "25px",
    marginTop: "16px",
  },

  width: "350",
  backgroundColor: "#2B2B2B",
  color: "white",
  margin: theme.spacing(2),
  [theme.breakpoints.down(400 + theme.spacing(3) * 2)]: {
    width: "300px",
  },

  MuiDrawer: {
    backgroundColor: "#2B2B2B",
  },

  blockSubmit: {
    background: "#9A2849",
    color: "white",
    width: "100%",
    borderRadius: "5em",
    marginTop: theme.spacing(4),
  },

  drawerTextField: {
    backgroundColor: "#fff",
    text: "white",
    width: "100%",
    borderRadius: "5px",
    color: "white !important",
    fontSize: "18px",
    marginTop: theme.spacing(1),
  },

  drawerCheckBox: {
    color: "#ffffff",
    marginRight: "15px",
    padding: "0px",
  },

  csvAdd: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    width: "140px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    marginRight: "10px",
    padding: theme.spacing(1),
    float: "right",
  },

  edtNode: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    width: "125px",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: "5em",
    padding: theme.spacing(0.7),
  },

  editServicesBtn: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    width: "200px",
    borderRadius: "5em",
    marginLeft: "25px",
     [theme.breakpoints.down(400)]: {
      width: "150px",
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
  },

  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: "auto",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },

  editTextField: {
    backgroundColor: "#fff",
    text: "white",
    width: "220px",
    marginTop: theme.spacing(1),
    borderRadius: "5px",
    border: "1px solid white",
    fontSize: "18px",
    color: "white !important",
    height: "36px",
    padding: "0px",
    [theme.breakpoints.down(500)]: {
      width: "150px",
    },
  },

  backBtn: {
    background: "#2B2B2B",
    width: "225px",
    color: "white",
    borderRadius: "5em",
    [theme.breakpoints.down(500)]: {
      width: "150px",
    },
  },

  closeSvg: {
    float: "right",
    width: "35px",
    height: "35px",
    cursor: "pointer",
  },
}));
