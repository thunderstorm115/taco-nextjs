import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    resetPassword: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        marginTop: theme.spacing(4),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        //margin: 100px;
        minWidth: 300,
      },
      textField:{
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(1),
      },
      button:{
        background: '#C33E37',
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        
      },
      button2:{
        backgroundColor: "#39A628",
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        background: '#2B2B2B',
        borderRadius: "12px",
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    validation:{
      color: "red",
      fontSize: "16px",
      width: '80vw',
      marginBottom: "15px",
      marginTop: "0px",
      fontFamily: 'Open Sans',
      display: 'inline-block'
    },
    validation2:{
      color: "white",
      fontSize: "18px",
      width: 'auto',
      marginBottom: "15px",
      marginTop: "0px",
      fontFamily: 'Open Sans',
      display: 'inline-block',
    },
    text: {
      color: "white",

    }

})); 