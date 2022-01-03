import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    checkBox: {
        color: '#ffffff'
    },
    signUp: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        // marginTop: theme.spacing(4),
        //margin: 100px;
        minWidth: 300,
    },
    textField: {
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: 260,
    },
    button: {
        background: '#C33E37',
        color: "white",
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        width: "49%",
        fontSize: "12px"
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 300,
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        background: '#2B2B2B',
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    validation: {
        color: "red",
        fontSize: "16px",
        width: "300px",
        marginBottom: "15px",
        marginTop: "0px",
        fontFamily: 'Open Sans',
        display: 'inline-block'
    },
    checkBoxForm: {
        color: '#FFFFFF'
    },
    label: {
        color: "#FFFFFF"
    },
    label2: {
        color: "#000000"
    },
    formControl1: {
        marginTop: theme.spacing(3),
    },
    select: {
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: '99%',
        height: 46,
    },
    button2: {
        background: "#39A628",
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        width: "48%",
        fontSize: "12px"
    },
    root: {
        background: "blue",
    },
    whiteColor: {
        color: "black"
    },
    error: {
        color: 'red'
    },
}));