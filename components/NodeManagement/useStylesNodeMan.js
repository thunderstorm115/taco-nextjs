import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  closeIcon: {
    fontSize: 30,
    fill: "white",
    cursor: "pointer",
    margin: "0px"
  },

  textField: {
    backgroundColor: "#fff",
    text: "white",
    marginRight: "12px",
    width: "390px",
    borderRadius: "3px",
    border: "1px solid white",
    fontSize: "18px",
    color: "white !important",
    textAlign: "left",
    [theme.breakpoints.down(500 + theme.spacing(2) * 2)]: {
      width: "320px",
      marginRight: "0px",
      fontSize: "14px",
    },
    [theme.breakpoints.down(330 + theme.spacing(2) * 2)]: {
      width: "auto",
    },
  },

  refreshBtn: {
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    borderRadius: "5em",
    width: "160px",
    float: "right",
    [theme.breakpoints.down(1280)]: {
      float: "left",
      marginRight: "10px",
      marginTop: "10px"
    },
  },  

  btnGridTxt:{
    margin: "0px",
    [theme.breakpoints.down(1350 + theme.spacing(2) * 2)]: {
      textAlign: "left",
    },
  },

  btnGridDel: {
    marginTop: "12px",
    textAlign: "right"
  },

  btnGridText: {
    margin: "0px",
    textAlign: "left"
  },

  downloadExcel: {
    background: "#333333",
    backgroundColor: "#333333",
    color: "white",
    borderRadius: "5em",
    width: "160px",
    float: "right",
    marginRight: "10px",
    [theme.breakpoints.down(1280)]: {
      float: "left",
      marginTop: "10px"
    },
  },

  addNodeButton: {
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
   [theme.breakpoints.down(1280)]: {
    float: "left",
    marginTop: "10px"
  },
  },

  csvAdd: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    width: "160px",
    borderRadius: "5em",
    float: "right",
    marginRight: "10px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
   [theme.breakpoints.down(1280)]: {
    float: "left",
    marginTop: "10px"
  },
  },

  deleteBtn: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    borderRadius: "5em",
    width: "160px",
    float: "right",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },

  edtNode: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    width: "110px",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: "5em",
    padding: theme.spacing(0.7),
  },

  uploadIcon: {
    width: "15%",
    height: "15%",
    justifySelf: "center",
    alignSelf: "center",
  },
radioColumns: {
  display: "grid",
  gridTemplateColumns:"1fr 1fr",

  [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
    width: "auto",
    display: 'gird',
    gridTemplateColumns:"1fr",
  },

},
  uploadLabel: {
    justifySelf: "center",
    alignSelf: "center",
  },
  uploadErrorMessage: {
    color: "red",
    fontFamily: "Open Sans",
  },
  uploadSuccessMessage: {
    color: "green",
    fontFamily: "Open Sans",
  },
  formHead: {
    color: "white"
  },
  formBody: {
    padding: "10px"
  },

  addNodeButtonInput: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    background: "#363636",
    color: "white",
    width: "80%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginRight: "10px",
    marginLeft: "10px",
    padding: theme.spacing(3),
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
      width: "auto",
      marginLeft: 'auto',
      marginRight: 'auto',
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
      background: "#202020"
   },
  },

  homeButton: {
    background: "#9A2849",
    color: "white",
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    marginRight: "10px",
    marginLeft: "10px",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    '&:hover': {
      background: "#202020"
   },
  },

  gridTextField: {
    backgroundColor: "#fff",
    text: "white",
    width: "100%",
    borderRadius: "5px",
    color: "white !important",
    fontSize: "18px",
    marginTop: theme.spacing(1),
  },

  table: {
    minWidth: "86vW",
    fontWeight: "normal",
    [theme.breakpoints.down(1700)]: {
      minWidth: "88vW",
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
    padding: "20px"
  },

  tableBody: {
    backgroundColor: "#2b2b2b",
    color: "white",
    padding: "20px",
    wordBreak: "break-word"
  },

  checkBox: {
    color: "#ffffff",
    fill: "white"
  },

  dialougeButton: {
    background: "#39A628",
    borderRadius: "5em",
    color: "#fff",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginLeft: theme.spacing(2),
    '&:hover': {
      background: "#202020"
    },
  },

  submitButton: {
    background: "#39A628",
    borderRadius: "5em",
    color: "#fff",
    '&:hover': {
      background: "#202020"
    },    
  },

  drawerCheckBox: {
    color: "#ffffff",
    padding: "10px",
  },
  
  hr: {
    width: "95%"
  },

  dialogueCancel: {
    background: "#9A2849",
    color: "white",
    borderRadius: "5em",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginRight: theme.spacing(2)
  },

  label: {
    color: "#ffffff",
    marginBottom: "10px",
    [theme.breakpoints.down(730)]: {
      fontSize: "16px",
      marginLeft: "2px"
    },
  },

  button: {
    background: "#C33E37",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    '&:hover': {
      background: "#202020"
   },
  },

  dropDown: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(3),
    minWidth: 50,
    width: "85%"
  },

  dropDownInner: {
    padding: "7px",
  },

  nodataDiv: {
    color: "white",
  },

  noData: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  MuiDrawer: {
    backgroundColor: "#2B2B2B",
    color: "white",
    overflowY: "scroll",
    padding: "20px",
    maxWidth: "400px"

  },

  buttonToggle: {
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    fontSize: "20px",
    marginLeft: "17px",
  },
  
  dialog: {
    margin: theme.spacing(10)
  },

  containerLabel: {
    margin: "0px",
    marginBottom: "10px"
  },

  SSHLabel: {
    margin: "0px",
    marginTop: "10px"
  },
  
}));
