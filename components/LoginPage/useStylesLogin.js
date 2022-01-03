import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  errlabel: {
    color: "red",
    fontSize: "16px",
    fontFamily: "Open Sans",
    margin: "0px",
    marginBottom: "10px",
    textAlign: "center",
  },

  changePassword: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    marginTop: theme.spacing(4),
    minWidth: 300,
  },

  loginForm: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    marginTop: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    minWidth: 300,
  },
  uploadIconLogo: {
    width: "15%",
    height: "15%",
    // padding: "32px",
    justifySelf: "center",
    alignSelf: "center",
  },
  uploadLabelLogo: {
    // padding: "64px",
    justifySelf: "center",
    alignSelf: "center",
  },
  paperLogo: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: "#ffffff",
    color: "#2B2B2B",
    borderRadius: "12px",
  },

  compliance: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    minWidth: 300,
  },

  signUp: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    marginTop: theme.spacing(4),
    minWidth: "90%",
  },

  signUpTrial: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    marginTop: theme.spacing(4),
    minWidth: 300,
  },

  textField: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: 50,
  },

  confirmErroMsg: {
    textColor: "red",
    margin: "0px",
    backgroundColor: "red",
  },

  textFieldLogin: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: 260,
  },

  textFieldSignUp: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: 260,
  },

  button: {
    background: "#9A2849",
    color: "white",
    fontSize: "12px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    "&:hover": {
      background: "#202020",
    },
  },

  loginTitle: {
    margin: "0px",
    textAlign: "center",
  },

  buttonLayout: {
    display: "flex",
    margin: "auto",
    width: "auto",
  },

  buttonEditCo: {
    backgroundColor: "#9A2849",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    marginRight: "10px",
    marginLeft: "10px",
    fontSize: "12px",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  btnGrid: {
    margin: "0px",
    textAlign: "right",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginTop: "20px",
      textAlign: "left",
    },
  },

  refreshCompanies: {
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    borderRadius: "5em",
    width: "120px",
    marginRight: "10px",
    [theme.breakpoints.down(471 + theme.spacing(2) * 2)]: {
      marginBottom: theme.spacing(1),
    },

    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  addCompanyButton: {
    background: "#39A628",
    backgroundColor: "#39A628",
    color: "white",
    width: "120px",
    borderRadius: "5em",
    marginRight: "17px",
    [theme.breakpoints.down(1050 + theme.spacing(2) * 2)]: {
      marginRight: "0px",
    },
    [theme.breakpoints.down(471 + theme.spacing(2) * 2)]: {
      marginBottom: theme.spacing(1),
    },
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  buttonCancel: {
    backgroundColor: "#9A2849",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    marginRight: "10px",
    marginLeft: "10px",

    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  buttonAddCo: {
    backgroundColor: "#39A628",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    marginRight: "10px",
    marginLeft: "10px",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  buttonSignup: {
    background: "#C33E37",
    color: "white",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    width: "49%",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  button1Signup: {
    background: "#39A628",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    width: "48%",

    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  button2Status: {
    display: "flex",
    justifyContent: "center",
    flexBasis: "auto",
    marginTop: theme.spacing(2),
    borderRadius: "12px",
  },

  editButton: {
    margin: "0px",
    background: "#9A2849",
    backgroundColor: "#9A2849",
    color: "white",
    borderRadius: "2em",
    fontSize: "12px",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  componentGridSizing: {
    width: "1450px",
    [theme.breakpoints.down(1370 + theme.spacing(2) * 2)]: {
      width: "1300px",
    },
    [theme.breakpoints.down(1024 + theme.spacing(2) * 2)]: {
      width: "980px",
    },
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      width: "650px",
    },
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      width: "310px",
    },
  },

  componentGridSizingStatus: {
    width: "99%",
  },

  select: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: "99%",
    height: 46,
    padding: "0px 10px",
  },

  issueDetails: {
    marginLeft: theme.spacing(11),
  },

  statistics: {
    display: "flex",
    flexDirection: "row",
  },

  statisticsSLA: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(-2),
  },

  statisticsContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(2),
  },

  icon: {
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      width: "130px",
    },
  },

  layout: {
    width: "auto",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    minWidth: 300,
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  layoutTable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(5),
  },

  layoutLogin: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  layoutOverview: {
    width: "auto",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  },

  layoutStatus: {
    width: "auto",
    marginBottom: theme.spacing(3),
  },

  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  paperEditCo: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    width: "auto",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    minWidth: 300,
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paperLogin: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  paperSignup: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    background: "#2B2B2B",
    borderRadius: "12px",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  paper2Signup: {
    background: "#2B2B2B",
    height: "65px",
    borderRadius: "12px",
  },
  graphGrid: {
    width: "35%",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      width: "100%",
      marginTop: "20px",
    },
  },
  graphGrid2: {
    width: "35%",
    marginLeft: "-5%",
    marginRight: "3%",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      width: "100%",
      marginTop: "20px",
      marginLeft: "0%",
      marginRight: "0%",
    },
  },

  root: {
    background: "blue",
  },
  whiteColor: {
    color: "black",
  },

  heading: {
    color: "#fff",
    textAlign: "right",
    margin: "0px",
    fontWeight: "normal",
  },
  monitoredHeading: {
    color: "#fff",
    textAlign: "center",
  },
  heading3: {
    color: "#fff",
    fontSize: "26",
    fontWeight: "semibold",
    [theme.breakpoints.down(1370 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(6),
    },
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(4),
    },
  },

  headingStatus: {
    color: "#fff",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize: "20px",
    },
  },

  heading2Status: {
    color: "#fff",
    margin: "0px",
    fontWeight: 600,
  },

  heading3Status: {
    color: "#fff",
    [theme.breakpoints.down(1370 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(15),
    },
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginLeft: theme.spacing(0),
    },
  },

  statisticHeadingStatus: {
    color: "#FA336C",
    alignSelf: "right",
    marginBottom: theme.spacing(-1),
    textAlign: "center",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize: "20px",
    },
  },

  gridSpacing: {
    marginBottom: theme.spacing(-1),
  },

  //////// Client SLA
  downloadPDFBtn: {
    background: "#9A2849",
    color: "white",
    borderRadius: "5em",
    position: "relative",
    float: "right",
    marginRight: "10px",
    marginBottom: "10px",
    fontSize: "12px",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  checkboxClass: {
    maxWidth: "15px",
    backgroundColor: "#2b2b2b",
    color: "white",
    [theme.breakpoints.down(405 + theme.spacing(2) * 2)]: {
      fontSize: "14px",
    },
  },

  authGrid: {
    display: "flex",
    flexFlow: "wrap",
    marginTop: "10px",
    [theme.breakpoints.down(930 + theme.spacing(2) * 2)]: {
      display: "block",
    },
  },

  authContactsGrid: {
    flex: "1" | "0" | "100%",
    marginRight: "0.5%",
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
    height: "280px",
    [theme.breakpoints.down(928 + theme.spacing(2) * 2)]: {
      marginRight: "0px",
      marginBottom: "10px",
    },
  },

  issueDetailsGrid: {
    flex: "1" | "0" | "100%",
    marginLeft: "0.5%",
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
    height: "280px",
    [theme.breakpoints.down(928 + theme.spacing(2) * 2)]: {
      marginLeft: "0px",
    },
  },

  headingAuth: {
    color: "#fff",
    margin: "0px",
  },

  icons: {
    fontSize: 225,
    fill: "white",
    [theme.breakpoints.down(1200 + theme.spacing(2) * 2)]: {
      fontSize: 185,
    },
    [theme.breakpoints.down(570 + theme.spacing(2) * 2)]: {
      fontSize: 175,
    },
    [theme.breakpoints.down(450 + theme.spacing(2) * 2)]: {
      fontSize: 150,
    },
  },

  statisticHeading: {
    color: "#FA336C",
    margin: "0px",
    textAlign: "center",
  },

  issueContainerSub: {
    display: "flex",
    flexDirection: "row",
  },

  statisticHeading2: {
    color: "#FA336C",
    margin: "0px",
    textAlign: "center",
  },

  statisticHeading2_status: {
    color: "#FA336C",
    margin: "0px",
    textAlign: "center",
  },

  heading2: {
    color: "#fff",
    fontSize: "56px",
    textAlign: "center",
  },

  graphNode: {
    display: "flex",
    flexDirection: "column",
    width: "90vW",
    marginTop: "20px",
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: theme.spacing(2),
  },

  heading3SLA: {
    color: "#fff",
  },

  heading4SLA: {
    color: "#fff",
    textAlign: "left",
  },

  moreInfoBtn: {
    background: "#9A2849",
    color: "white",
    borderRadius: "5em",

    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  graphGridSLA: {
    width: "100%",
  },

  paperSLA: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
  },

  lineSLA: {
    width: "100%",
  },

  buttonSLA: {
    color: "#fff",
    marginRight: "17px",
    fontSize: "18px",
    padding: "0px",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  headingSLA: {
    color: "#fff",
  },
  /////////////

  ///Reports Page
  reportsButton: {
    background: "#9A2849",
    color: "white",
    borderRadius: "5em",
    position: "relative",
    float: "right",
    fontSize: "12px",
    marginBottom: theme.spacing(2),
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  reportsButtonNoData:{
    background: "#9A2849",
    color: "white",
    borderRadius: "5em",
    position: "relative",
    float: "right",
    fontSize: "12px",
    marginBottom: theme.spacing(2),
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  // noDataDiv:{
  //   width: 'auto',
  //   float:'right',
  //   alignItems:"right"
  // },

  downloadPDFBtnTable: {
    background: "#9A2849",
    color: "white",
    borderRadius: "5em",
    position: "relative",
    fontSize: "12px",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  table: {
    minWidth: "87vw",
    fontWeight: "normal",
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
    [theme.breakpoints.down(405 + theme.spacing(2) * 2)]: {
      fontSize: "14px",
    },
  },

  dialog: {
    margin: theme.spacing(10),
    borderRadius: "15px",
  },

  hrLine: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
  },

  confirmButton: {
    background: "#39A628",
    color: "white",
    borderRadius: "5em",
    position: "relative",
    fontSize: "12px",
    marginTop: "10px",
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  subHeading: {
    fontWeight: 400,
    margin: "0px",
  },
  /////

  nav: {
    marginTop: theme.spacing(3),
    alignItems: "center",
    flexBasis: "auto",
    display: "flex",
  },
  checkBox: {
    color: "white",
  },

  arrow: {
    border: "solid #fff",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    transform: " rotate(135deg)",
    marginRight: theme.spacing(2),
  },

  padding: {
    padding: theme.spacing(1),
  },

  accessIcon: {
    fontSize: 50,
    fill: "white",
    marginTop: "35px",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginTop: "25px",
    },
  },

  pcIcon: {
    fontSize: 45,
    fill: "white",
    marginTop: "38px",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginTop: "28px",
    },
  },

  signalIcon: {
    fontSize: 47,
    fill: "white",
    marginTop: "38px",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginTop: "28px",
    },
  },

  breadcrumbStyle: {
    color: "#fff",
    textAlign: "left",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize: "13px",
    },
  },

  linkStyle: {
    color: "#fff",
    cursor: "pointer",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize: "13px",
    },
  },

  nodes: {
    height: "260px",
    marginTop: "20px",
    marginRight: "20px",
    background: "#2b2b2b",
    padding: "20px",
    width: "680px",
    borderRadius: "12px",
    cursor: "pointer",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      height: "470px",
      width: "280px",
      marginRight: "20px",
    },
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      marginRight: "0px",
    },
  },

  NodeBox: {
    marginTop: "20px",
    marginRight: "20px",
    background: "#2b2b2b",
    padding: "20px",
    width: "352px",
    borderRadius: "12px",
    cursor: "pointer",
    [theme.breakpoints.down(769 + theme.spacing(2) * 2)]: {
      marginRight: "0px",
    },
    [theme.breakpoints.down(380 + theme.spacing(2) * 2)]: {
      width: "280px",
    },
  },

  Node: {
    paddingTop: "0px",
    paddingBottom: "5px",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    [theme.breakpoints.down(600 + theme.spacing(2))]: {
      width: "90%",
    },
  },

  nodesSLA: {
    height: "280px",
    margin: "10px",
    background: "#2b2b2b",
    padding: "20px",
    width: "651px",
    borderRadius: "12px",
    cursor: "pointer",
    [theme.breakpoints.down(770 + theme.spacing(2) * 2)]: {
      width: "450px",
    },
    [theme.breakpoints.down(570 + theme.spacing(2) * 2)]: {
      maxWidth: "300px",
    },
  },

  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.down(1400 + theme.spacing(2) * 2)]: {
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  label: {
    color: "#ffffff",
  },

  label2: {
    color: "#000000",
  },

  validation: {
    color: "red",
    fontSize: "16px",
    width: "80vw",
    marginBottom: "15px",
    marginTop: "0px",
    fontFamily: "Open Sans",
    display: "inline-block",
  },
  validation2: {
    color: "white",
    fontSize: "18px",
    width: "80vw",
    marginBottom: "15px",
    marginTop: "0px",
    fontFamily: "Open Sans",
    display: "inline-block",
  },
  validationLogin: {
    color: "red",
    fontSize: "16px",
    marginBottom: "15px",
    marginTop: "0px",
    fontFamily: "Open Sans",
    display: "inline-block",
  },
  validationSignup: {
    color: "red",
    fontSize: "16px",
    width: "330px",
    marginBottom: "15px",
    marginTop: "0px",
    fontFamily: "Open Sans",
    display: "inline-block",
  },
  validation2Signup: {
    color: "white",
    fontSize: "18px",
    width: "330px",
    marginBottom: "15px",
    marginTop: "0px",
    fontFamily: "Open Sans",
    display: "inline-block",
  },
  largeIcon: {
    width: 35,
    height: 35,
  },
  iconText: {
    fontSize: "24px",
    color: "#39A628",
    margin: "0px",
  },
  iconText2: {
    fontSize: "24px",
    color: "#FF5900",
    margin: "0px",
  },
  iconTextWhite: {
    fontSize: "24px",
    color: "white",
  },
  iconUp: {
    fontSize: "17px",
    color: "#39A628",
    marginTop: "5px",
    marginLeft: "25px",
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      fontSize: "14px",
    },
  },
  iconWarning: {
    fontSize: "17px",
    color: "#FF9A00",
    marginTop: "5px",
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      fontSize: "14px",
    },
  },
  iconCritical: {
    fontSize: "17px",
    color: "#FF5900",
    marginTop: "5px",
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      fontSize: "14px",
    },
  },
  usages: {
    fontSize: "17px",
    color: "white",
    marginTop: "10px",
    fontWeight: "normal",
  },
  usagesHeading: {
    fontSize: "17px",
    color: "white",
    marginTop: "15px",
    marginLeft: "10px",
    fontWeight: "normal",
  },
  usagesPercent: {
    fontSize: "20px",
    color: "white",
    marginTop: "10px",
    marginRight: "10px",
    fontWeight: "600",
  },
  nodeSpacingUsage: {
    marginBottom: theme.spacing(2),
  },
  ButtonGroupStyle: {
    background: "#9A2849",
    color: "white",
    borderRadius: "2em",
    fontSize: "15px",

    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },
  ButtonGroupWhole: {
    boxShadow: "none",

    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },
  textGreen: {
    fontSize: "25px",
    color: "#39A628",
    margin: "0px",
  },
  textOrange: {
    fontSize: "25px",
    color: "#FF5900",
    margin: "0px",
  },
  issueHeadingNoData: {
    color: "white",
    paddingBottom: "0",
    paddingTop: "0px",
    marginTop: "10px",
    marginBottom: "10px",
  },

  spinner: {
    color: "white !important",
    marginTop: "20px",
  },

  line: {
    width: "100%",
  },

  noData: {
    color: "#9A2849",
    marginBottom: theme.spacing(8),
  },

  noBold: {
    fontWeight: "normal",
  },

  centerDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },

  NoDataText: {
    fontWeight: "normal",
    color: "#fff",
  },

  theHead: {
    padding: "10px",
    [theme.breakpoints.down(1050 + theme.spacing(2) * 2)]: {
      padding: "5px",
    },
  },

  //EditCompany start
  paperClass: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "5px",
    maxWidth: 600,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 280,
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  edtCompanyGrid: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },

  edtCompanyTitle: {
    margin: "0px",
    marginBottom: "10px",
    textAlign: "center",
  },

  editCompanyGrid: {
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(3),
    minWidth: 280,
    width: "90%",
  },

  textFieldEdit: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    minWidth: 50,
  },

  MSPLabel: {
    margin: "0px",
  },

  uploadHeader: {
    marginTop: "5px",
    marginBottom: "5px",
  },

  uploadErrorMessage: {
    color: "red",
    fontFamily: "Open Sans",
  },

  uploadSuccessMessage: {
    color: "green",
    fontFamily: "Open Sans",
  },

  addNodeButtonInput: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    background: "#363636",
    color: "white",
    width: "95%",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  uploadLabel: {
    justifySelf: "center",
    alignSelf: "center",
  },

  uploadIcon: {
    width: "15%",
    height: "15%",
    justifySelf: "center",
    alignSelf: "center",
  },

  sizeSpan: {
    marginTop: theme.spacing(2),
  },

  edtCancelBtn: {
    backgroundColor: "#9A2849",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    marginRight: "10px",
    fontSize: "12px",
    minWidth: 130,
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  edtSubmitBtn: {
    backgroundColor: "#39A628",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    marginLeft: "10px",
    fontSize: "12px",
    minWidth: 130,
    "&:hover": {
      background: "#202020",
      color: "white",
    },
  },

  //EditCompany end
}));
