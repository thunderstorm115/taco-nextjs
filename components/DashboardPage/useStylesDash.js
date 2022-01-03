import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    appBar:{
        background: '#9A2849',
        marginTop: theme.spacing(0),
       },
       appBarTopTool: {
        background: '#73233A',
        marginTop: theme.spacing(0),
        height: "80px",
        width: "100%",
    },
    appBarLogo:{
        width:"50%",
        height:"50%",
        marginTop:"auto",
        marginBottom:"auto",
    },

    appBarLogoTopTool: {
        width: "50%",
        height: "50%",
        marginTop: "auto",
        marginBottom: "auto",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
            width: "30%",
            height: "30%",
        },
    },

    root: {
        flexGrow: 1,
    },

    root1: {},

    Icon: {
        marginRight: theme.spacing(-17),
        marginLeft: theme.spacing(1)
    },

    IconTopTool: {
        marginRight: theme.spacing(-17),
        marginLeft: theme.spacing(0),
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
            marginRight: theme.spacing(-24),
            marginLeft: theme.spacing(1),
        },
    },

    title: {
        flexGrow: 1,
    },

    titleTopTool: {
        color: "white",
        textDecoration: "none",
        textDecorationLine: "none",
        textDecorationColor: "none",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
            fontSize: "27px",
            marginLeft: "40px",
        },
        [theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
            fontSize: "27px",
            marginLeft: "60px",
        },
    },

    navButton: {
        color: "white !important",
        fontSize: "18px"
    },

    version: {
        color: "#73233A"
    },

    toggle:{
        zIndex: 1
    }
}));
