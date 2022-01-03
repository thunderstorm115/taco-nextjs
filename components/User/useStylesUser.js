import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    signUp: {
        display: "flex",
        justifyContent: "center",
        flexBasis: "auto",
        marginTop: theme.spacing(4),
        //margin: 100px;
        minWidth: "90%",
      },
      checkBox: {
        color: '#ffffff'
      },
      textField: {
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: 260 ,
      },
      textFieldTable: {
        marginTop: "30px",
        background: "white",
        color: "#C33E37",
        zIndex: 0,
        [theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
          width: "auto",
          
          marginRight: "auto",
        }
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
        minWidth: "99%",
        height: 46,
        padding: "0px 10px",
      },
      button: {
        background: "#C33E37",
        color: "white",
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        width: "48%",

        '&:hover': {
          background: "#202020",
          color: "white"
       },
      },
      button1: {
        background: "#9A2849",
        color: "white",
        borderRadius: "5em",
        zIndex: 0,
        minHeight: "36px",
        [theme.breakpoints.down(570 + theme.spacing(2) * 2)]: {
          fontSize: "12px"
        },
        [theme.breakpoints.down(480 + theme.spacing(2) * 2)]: {
          fontSize: "11px"
        },
        [theme.breakpoints.down(435)]: {
          fontSize: "10px"
        },
        [theme.breakpoints.down(400)]: {
          fontSize: "9px"
        },

        '&:hover': {
          background: "#202020",
          color: "white"
       },
      },
      button2: {
        background: "#39A628",
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        width: "49%",
        zIndex: 0,

        '&:hover': {
          background: "#202020",
          color: "white"
       },
      },
      button2Table: {
        background: "#39A628",
        color: "white",
        borderRadius: "5em",
        zIndex: 0,

        '&:hover': {
          background: "#202020",
          color: "white"
       },
      },

      button3Table: {
        background: "#333333",
        color: "white",
        borderRadius: "5em",
        zIndex: 0,

        '&:hover': {
          background: "#202020",
          color: "white"
       },
      },
      tableContainer: {
        marginTop: theme.spacing(3),
        backgroundColor: "#9A2849",
        color: "white",
      },
      tableContainer1: {
        backgroundColor: "#9A2849",
        color: "white",
      },
      table: {
        minWidth: "100%",
        fontWeight: "normal",
        marginTop:'20px'
      },
      tableHead: {
        fontSize: "17px",
        backgroundColor: "#9A2849",
        color: "#fff",
        fontWeight: "normal",
        padding: "20px",
        [theme.breakpoints.down(405 + theme.spacing(2) * 2)]: {
          fontSize:'14px',
        },
      },
      tableBody: {
        backgroundColor: "#2b2b2b",
        color: "white",
        [theme.breakpoints.down(405 + theme.spacing(2) * 2)]: {
          fontSize:'14px',
        },
      },
      tableContent:{
        padding:'10px'
      },
      activate: {
        color: "green",
        backgroundColor: "#333333",
      },
      deactivate: {
        color: "red",
        backgroundColor: "#333333",
      },
      edit: {
        backgroundColor: "#333333",
        color: "white",
      },
      btnSpacing: {
        marginTop: theme.spacing(2)
      },
      layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(5),
        minWidth: 300,
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
          width: 800,
          marginLeft: "5px",
          marginRight: "5px",
        },
      },
      layoutIndex: {
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
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        background: '#2B2B2B',
        borderRadius: "12px",
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
      },
      root: {
        background: "blue",
      },
      whiteColor: {
        color: "black",
      },
      paper2: {
        background: "#2B2B2B",
        height: "65px",
        borderRadius: "12px",
      },
      }));