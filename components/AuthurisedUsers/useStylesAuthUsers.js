import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({ 
  btnSpacing: {
    marginTop: theme.spacing(2),
  },

  editBtn: {
    background: "#333333",
    color: "white",
    borderRadius: "5em",
    fontSize: "14px",
    marginBottom: "10px",
    '&:hover': {
      background: "#202020",
      color: "white"
    },
  },

  downloadPDFBtn: {
    background: "#9A2849",
    color: "white",
    borderRadius: "5em",
    fontSize: "14px",
    '&:hover': {
      background: "#202020",
      color: "white"
    },
  },

  addBtn: {
    background: "#39A628",
    color: "white",
    borderRadius: "5em",
    fontSize: "14px",
    marginBottom: "10px",
    '&:hover': {
      background: "#202020",
      color: "white"
    },
  },

  button4: {
    color: "white",
    fontSize: "12px",
    background: "#9A2849",
    borderRadius: "5em",
    [theme.breakpoints.down(500 + theme.spacing(2) * 2)]: {
      width: "100%",
      marginRight: "auto",
      fontSize: "9px",
    },
    '&:hover': {
      background: "#202020",
      color: "white"
    },
  },

  tableContainer: {
    marginTop: theme.spacing(2),
    backgroundColor: "#9A2849",
    color: "white",
    marginBottom: theme.spacing(15),
  },

  table: {
    minWidth: "85vW",
  },  

  signUp: {
    display: 'flex',
    justifyContent: 'center',
    flexBasis: 'auto',
    marginTop: theme.spacing(4),
    minWidth: "90%"
  },  

  buttonCreateAuth:{
    background: '#9A2849',
    color: "white",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    width: "49%",
    '&:hover': {
      background: "#202020",
      color: "white"
    },
  },

  button1CreatAuth:{
    backgroundColor: "#39A628",
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    width: "48%",
    '&:hover': {
      background: "#202020",
      color: "white"
       },
      },

      buttonEditAuth: {
        background: "#9A2849",
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
      
      button1EditAuth: {
        backgroundColor: "#39A628",
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        width: "48%",
        '&:hover': {
          background: "#202020",
          color: "white"
       },
      },

      select:{
        background: "white",
        color: "black",
        marginBottom: theme.spacing(2),
        minWidth: '99%',
        height: 46,
        padding: "0px 10px",
      },

      label:{
        color: "#ffffff"
      },

      label2:{
        color: "#000000"
      },
      
      pageTitle: {
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
      tableContainer1: {
        backgroundColor: "#9A2849",
        color: "white",
        marginBottom: theme.spacing(3)
      },
      
      TableHead: {
        fontSize: "21px",
        color: "white",
      },

      checkBox: {
        color: "white",
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

      textField:{
        background: "white",
        color: "#9A2849",
        marginBottom: theme.spacing(2),
        minWidth: 260,
      },

      paperCreateAuth: {
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

      paper2: {
        background: "#2B2B2B",
        height: "65px",
        borderRadius: "12px",
      },

      layoutCreateAuth: {
        width: 'auto',
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        minWidth: 300,
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
      },

      validationSignup:{
        color: "red",
        fontSize: "16px",
        width: "330px",
        marginBottom: "15px",
        marginTop: "0px",
        fontFamily: 'Open Sans',
        display: 'inline-block'
    },
    }));