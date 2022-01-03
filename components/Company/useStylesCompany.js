import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  paperAddCo: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    background: '#2B2B2B',
    color: '#ffffff',
    borderRadius: "12px",
    width: 'auto',
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    minWidth: 300,
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },  
  
  loginTitle:{
    margin: "0px",
    marginBottom: "10px",
    textAlign: "center"
  },
  errlabel: {
    color: "red",
    fontSize: "16px",
    fontFamily: "Open Sans",
    margin: "0px",
    marginBottom: "10px",
    textAlign: "center"
  },

    clientLogo: {
      position: "absolute",
      width: "232px",
      height: "54px",
      maginLeft: "218px",
      margingTop: "356px",
      paddingLeft: "8px",

      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "27px",
      textAlign: "center",
      color: "#162542",

      [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        // paddingLeft: "128px",
        textAlign: "center",
        paddingLeft: "12px",

       },
    },

    uploadLogoPaper: {
      paddingRight: "32px",
      paddingLeft: "32px",
      paddingTop: "32px",
      paddingBottom: "64px",
      background: "#F3F3F3",
      border: "3px dashed #9A2849",
      boxSizing: "border-box",
      rotate: 90,
      [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {

      paddingRight: "32px",
      paddingLeft: "200px",
      paddingTop: "32px",
      paddingBottom: "64px",
      rotate: 90,
    
      background: "#F3F3F3",
      border: "3px dashed #9A2849",
      boxSizing: "border-box",
      },
    },

    uploadLogoPaperEdit: {
      paddingRight: "32px",
      paddingLeft: "32px",
      paddingTop: "32px",
      paddingBottom: "64px",
      background: "#F3F3F3",
      border: "3px dashed #9A2849",
      boxSizing: "border-box",
      rotate: 90,
      [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {

      paddingRight: "32px",
      paddingLeft: "236px",
      paddingTop: "32px",
      paddingBottom: "64px",
      rotate: 90,
    
      background: "#F3F3F3",
      border: "3px dashed #9A2849",
      boxSizing: "border-box",
      },
    },
    logoClass: {
      justifySelf: "center",
      alignSelf: "center",
      paddingRight: "32px",
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

  addCompany: {
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(2),
    minWidth: 300,
    width: "90%"
  },



  textField: {
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: 50,
  },

  checkBox: {
    color: "white",
  },

  buttonLayout: {
    display: "flex",
    margin: "auto",
    width: "auto"
  },

  MSPLabel: {
    margin: "0px"
  },

  buttonCancel:{
    backgroundColor: "#9A2849",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    marginRight: "10px",
    marginLeft: "10px",
    fontSize: "12px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },

  buttonAddCo: {
    backgroundColor: "#39A628",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "5em",
    marginLeft: "10px",
    fontSize: "12px",
    '&:hover': {
      background: "#202020",
      color: "white"
   },
  },
  uploadHeader: {
    marginTop: "5px",
    marginBottom: "5px"
  },

  uploadErrorMessage: {
    color: "#9A2849",
    fontFamily: "Open Sans",
  },

  uploadSuccessMessage: {
    color: "#39A628",
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
    '&:hover': {
      background: "#202020",
      color: "white"
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
    marginTop: theme.spacing(2)
  },

  label: {
    color: "red",
    fontSize: "16px",
    fontFamily: "Open Sans",
    margin: "0px",
    marginBottom: "10px",
    textAlign: "center"
  }

}));