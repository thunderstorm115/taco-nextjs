import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    about: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        minWidth: 300,
      },
      nav: {
        marginTop: theme.spacing(3),
        alignItems: 'center',
        flexBasis: 'auto',
        display: 'flex'
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    textField:{
      background: "white",
      color: "#C33E37",
    },
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      background: '#2B2B2B',
      color: '#ffffff',
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
    

}));