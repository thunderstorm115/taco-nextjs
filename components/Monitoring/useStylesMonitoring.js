import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  globalGrid: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down(800 + theme.spacing(1) * 1)]: {
      flexDirection: "column",
      marginLeft: "auto",
      marginRight: "auto"
    },
  },

  textField: {
    backgroundColor: "#fff",
    text: "white",
    marginRight: "12px",
    width: "320px",
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

  editBtn: {
    backgroundColor: "#9A2849",
    color: "white",
    borderRadius: "5em",
    width: "100px",
    marginRight: "40px",
    fontSize: "12px",
    [theme.breakpoints.down(1300 + theme.spacing(1) * 1)]: {
      marginRight: "15px",
    },
  },

  cardGrid: {
    display: "flex",
    justifyContent: "center"
  },

  gridContainerDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  cardBlock: {
    marginTop: "20px",
    marginRight: "10px",
    marginLeft: "10px",
    padding: "20px",
    background: "#2b2b2b",
    width: "450px",
    borderRadius: "12px",
    cursor: "pointer",
    [theme.breakpoints.down(500 + theme.spacing(1) * 1)]: {
      width: "auto",
      padding: "10px",
      marginBottom: "15px"
    },
  },

  line: {
    width: "100%",
    marginTop: "15px",
    marginBottom: "15px",
    maxHeight: "3px"
  },

  firstGridHeading: {
    color: "white",
    margin: "0px",
    fontWeight: "normal"
  },

  largeIcon: {
    width: 28,
    height: 28,
  },
  iconText: {
    fontSize: "24px",
    color: "#39A628",
    margin: "0px",
    marginBottom: "3px"
  },
  iconText2: {
    fontSize: "24px",
    color: "#FF5900",
    margin: "0px",
    marginBottom: "6px"
  },

  passedControlsText: {
    fontSize: "24px",
    color: "white",
    margin: "0px",
    marginTop: "7.5px",
    fontWeight: "normal"
  },

  monitoringHeading: {
    color: "white",
    margin: "0px",
    fontWeight: "normal"
  },

  monitoringHealthGrid: {
    marginTop: "20px"
  },

  monitoringIcon: {
    width: 35,
    height: 35
  },

  iconUp: {
    fontSize: "17px",
    color: "#39A628",
    margin: "0px",
    marginRight: "7px"
  },
  iconWarning: {
    fontSize: "17px",
    color: "#FF9A00",
    margin: "0px",
    marginRight: "7px"
  },
  iconCritical: {
    fontSize: "17px",
    color: "#FF5900",
    margin: "0px",
    marginRight: "7px"
  },
  iconWhite: {
    fontSize: "17px",
    color: "#ffff",
    margin: "0px",
    marginRight: "7px"
  },

  usages: {
    fontSize: "18px",
    color: "white",
    margin: "0px",
    fontWeight: "normal"
  },

  headingHealthDisk: {
    color: "white",
    margin: "0px",
    fontWeight: "normal"
  },

  noDiskData: {
    color: 'white',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5)
  },

  GraphGrid: {
    display: "flex",
    flexFlow: "wrap",
    marginTop: "10px"
  },

  NodeDrill: {
    flex: "1" | "0"| "100%",
    marginRight: "0.5%",
    marginBottom: "0.5%",
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
    minWidth: "550px",
    minHeight: "330px",
    [theme.breakpoints.down(600)]: {
      minWidth: "auto",
      minHeight: "auto",
    },
  },

  headingTop: {
    color: "#fff",
    fontSize: "21px",
    margin: "0px",
    marginBottom: "10px",
    [theme.breakpoints.down(900 + theme.spacing(2) * 2)]: {
      fontSize: "14px",
    },
  },

  tableGrid: {
    width: "85vW",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down(960 + theme.spacing(2) * 2)]: {
      width: "auto",
      marginLeft: theme.spacing(3.5),
      marginRight: theme.spacing(3.5),
      // marginBottom: theme.spacing(1),
    },
  },
  
  severityCardGrid: {
    background: "#2b2b2b",
    margin: "0px",
    flex: "1" | "0"| "100%",
    marginRight: "1%",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
    minWidth: "500px",
    height: "950px",
    [theme.breakpoints.down(600)]: {
      minWidth: "auto"
    },
    [theme.breakpoints.down(960 + theme.spacing(2) * 2)]: {
      marginBottom: theme.spacing(2)
    },
  },

  severityCardGrid2: {
    background: "#2b2b2b",
    margin: "0px",
    flex: "1" | "0"| "100%",
    marginRight: "1%",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
    minWidth: "500px",
    [theme.breakpoints.down(600)]: {
      minWidth: "auto"
    },
  },

  resetBtn: {
    color: "white",
    background: "#9A2849",
    borderRadius: "20px",
    float: "right",
    '&:hover': {
      background: "#202020"
   },
  },

  stackedValuesLines: {
    margin: "0px",
    padding: "10px",
    color: "#fff",
    justifyContent: "center",
    maxHeight: "600px",
    overflowY: "scroll",
    [theme.breakpoints.down(1000 + theme.spacing(2) * 2)]: {
      maxHeight: "430px",
    },
  },

  marginLines: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  },

  headingTopLines: {
    color: "#fff",
    fontSize: "20px",
    margin: "0px",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      textAlign: "center",
      fontSize: "22px"
    },
  },

  table: {
    fontWeight: "normal"
  },

  tableContainer: {
    backgroundColor: "#9A2849",
    color: "white",
  },

  tableContainer1: {
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
    [theme.breakpoints.down(1000 + theme.spacing(2) * 2)]: {
      fontSize: '14px',
    },
  },

  tableBodyAlert:{
    [theme.breakpoints.down(1750 + theme.spacing(2) * 2)]: {
      maxWidth: "200px",
      minWidth: "100px",
      overflowWrap: "break-word",
    },
    [theme.breakpoints.down(1450 + theme.spacing(2) * 2)]: {
      maxWidth: "130px",
      minWidth: "100px",
      overflowWrap: "break-word",
    },
  },

  tableBodyPagination: {
    backgroundColor: "#2b2b2b",
    color: "white",
    [theme.breakpoints.down(1000 + theme.spacing(2) * 2)]: {
      fontSize: '14px',
    },
  },

  NodeDrillAlerts: {
    margin: "0px",
    borderRadius: "12px",
    cursor: "pointer",
    [theme.breakpoints.down(1700)]: {
      maxWidth: "700px",
      display: "flex",
      justifyContent: "left",
      alignItems: "left",
    },
  },

  NodeDrillTable: {
    marginTop: "20px",
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
  },

  layout: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  gridSpacingButton: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down(1000 + theme.spacing(2) * 2)]: {
      paddingLeft: "30px",
      marginTop: theme.spacing(1),
    },
  },
  heading2: {
    color: "#fff",
    marginRight: "20px"
  },
  buttonWhite: {
    color: "#fff",
    borderColor: "#9A2849",
    fontSize: "14px"
  },
  buttonGroup: {
    marginTop: theme.spacing(0.5),
  },
  gridContainer: {

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  nodeSpacing: {
    // paddingLeft: theme.spacing(3)
  },
  heading: {
    color: "white"
  },
  headingHealth: {
    color: "white",
    marginTop: "35px",
  },
  graphTaskSort: {
    justifyContent: "center",
  },
  iconTextWhite: {
    fontSize: "24px",
    color: "white"
  },
  nodeSpacingUsage: {
    marginBottom: theme.spacing(5)
  },
  ButtonGroupStyle: {
    background: "#9A2849",
    color: "white",
    borderRadius: "2em",
    fontSize: "15px",
  },
  ButtonGroupWhole: {
    boxShadow: "none"
  },
  statusMargin: {
    marginTop: "0px"
  },
  button: {
    color: "white",
    fontSize: "16px"
  },
  btnGrid: {
    margin: "0px",
    textAlign: "right",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginTop: "20px",
      textAlign: "left",
    },
  },
  total: {
    color: "#fff"
  },

  noData: {
    color: "#fff",
    marginLeft: theme.spacing(1),
  },

  stackedValues: {
    color: "#fff",
    background: "#2b2b2b",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: "flex",
    alignItems: "center"
  },

  horizontalBar: {
    borderRadius: "5em",
  },
  paper: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",

  },
  paperTable: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    background: "#2B2B2B",
    color: "#fff",
    borderRadius: "12px",

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
  headingsNodeDrill: {
    marginLeft: theme.spacing(5.5)
  },
  center: {
    justifyContent: "center",
    alignAtems: "center",
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
  exitsvg:{
    cursor: 'pointer',
    width: '25px',
    alignItems: 'center',
    marginTop: "7px"
  }

})); 