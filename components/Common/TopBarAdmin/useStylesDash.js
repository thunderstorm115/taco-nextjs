import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    appBarTopTool: {
        background: '#73233A',
        marginTop: theme.spacing(0),
        height: "80px",
        width: "100%",
        [theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
            height: "70px"
        }
    },
    
    appBarLogoTopTool: {
        width: "130px",
        height: "65px",
        marginTop: "auto",
        marginBottom: "auto",
        [theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
            width: "110px",
            height: "55px"
        }
    },

    IconTopTool: {
        marginLeft: theme.spacing(-3),
        cursor: 'pointer'
    },

    titleTopTool: {
        color: "white",
        fontSize: "30px",
        fontWeight: 600,
        textDecoration: "none",
        textDecorationLine: "none",
        textDecorationColor: "none",
        [theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
            fontSize: "27px"
        },
        cursor: 'pointer'
    },

    navButton: {
        color: "white !important",
        fontSize: "20px",
        fontWeight: 400,
        [theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
            fontSize: "18px"
        }
    },

    version: {
        color: "#73233A"
    },
    
    toggle:{
        zIndex: 1
    }
}));