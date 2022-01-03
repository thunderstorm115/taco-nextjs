import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    supportForm: {
        display: "flex",
        justifyContent: "center",
        flexBasis: "auto",
        marginTop: theme.spacing(4),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        minWidth: 300,
      },

      textField: {
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: 260,
      },

      button: {
        display: "flex",
        justifyContent: "center",
        background: "#C33E37",
        color: "white",
        fontSize: "16px",
        fontWeight: 400,
        marginTop: theme.spacing(4),
        marginRight: theme.spacing(6),
        borderRadius: "5em",
        width: "100%",
    
        '&:hover': {
          background: "#202020",
          color: "white"
       },
      },
    
      layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        minWidth: 300,
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
          width: 800,
          marginLeft: "auto",
          marginRight: "auto",
        },
      },

      paper: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(5),
        background: "#2B2B2B",
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(1),
        },
      },

      paper2: {
        background: "#2B2B2B",
        height: "65px",
        borderRadius: "12px",
      },

      nav: {
        marginTop: theme.spacing(3),
        alignItems: "center",
        flexBasis: "auto",
        display: "flex",
        flexDirection:"row",
        justifyContent:"flex-end"
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
      
      loginTitle: {
        height: "20px",
        paddingTop: "10px",
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "24px",
        lineHeight: "40px",
        textAlign: "center",
        alignItems: "center",
        color: "#ffffff",
        [theme.breakpoints.down(700 + theme.spacing(3) * 2)]: {
          fontSize: "25px",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          displayItems: "center",
        },
        [theme.breakpoints.down(600 + theme.spacing(3) * 2)]: {
          fontSize: "16px"
        },
      },
}));    