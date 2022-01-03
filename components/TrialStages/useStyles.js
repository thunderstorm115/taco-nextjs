import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    colorPrimary: {
      backgroundColor: '#6F2622',
    },
    barColorPrimary: {

      backgroundColor: '#C33E37',
    },
    percentage:{
      color: '#C33E37',
    },
    resetPassword: {
      display: "flex",
      justifyContent: "center",
      flexBasis: "auto",
      marginTop: theme.spacing(3),
      minWidth: 300,
    },
    label: {
      color: "#ffffff",
    },
    label2: {
      color: "#000000",
    },
    formControl1: {
      marginTop: theme.spacing(3),
    },
    select: {
      background: "white",
      color: "#C33E37",
      marginBottom: theme.spacing(2),
      height: 46,
      width: "300px",
      padding: "0px 10px",
    },
    textField: {
      background: "white",
      color: "#C33E37",
      marginBottom: theme.spacing(2),
      minWidth: 240,
    },
    textField1: {
      background: "white",
      color: "#C33E37",
      marginBottom: theme.spacing(2),
      minWidth: "320px",
    },

    textFieldml: {
      background: "white",
      color: "#C33E37",
      marginBottom: theme.spacing(2),
      minWidth: 350,
    },
    button: {
      background: "#C33E37",
      color: "white",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderRadius: "5em",
      align: "right",
    },
    button1: {
      background: "#39A628",
      color: "white",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderRadius: "5em",
    },
    button2: {
      background: "#C33E37",
      color: "white",
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: "46%",
      borderRadius: "5em",
    },
    button4: {
      background: "#C33E37",
      color: "white",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: "100%",
      borderRadius: "5em",
      align: "right",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
        width: 800,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      background: "#2B2B2B",
      borderRadius: "12px",
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },

    paper3: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      backgroundColor: '#2B2B2B',
      borderRadius: "12px",
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },

      [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
       marginLeft:'15px',
       marginRight:'23px',
      },
     
    },

    paper2: {
      background: "#2B2B2B",
      height: "110px",
      borderRadius: "12px",
      
    },
    checkBoxForm: {
      color: "#ffffff",
    },
    checkBox: {
      color: "#ffffff",
    },
    radio: {
      color: "#ffffff",
    },
    root: {
      background: "blue",
    },
    root2: {
      marginLeft: theme.spacing(2),
      width: "100%",
    },
    whiteColor: {
      color: "black",
    },
    arrowSpace:{
      paddingBottom: "20px",
      marginTop: "12px",
      color: "#ffff",
      "&:hover": {
        cursor: "pointer"
      }
    },
    arrowSpace2:{
      paddingBottom: "35px",
      marginTop: "12px",
      color: "#ffff",
      "&:hover": {
        cursor: "pointer"
      }
    },
    popup: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      position: 'fixed',
      zIndex: 2,
      height: '100%',
      width: '100%',
      overflowX: 'hidden',
      backgroundColor: '#2B2B2B'
    },

    popup2: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      position: 'fixed',
      zIndex: 2,
      height: '100%',
      width: '100%',
      overflowX: 'hidden',
      backgroundColor: 'black',
    }
  }));
