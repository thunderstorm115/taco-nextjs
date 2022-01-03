import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    gridIndex:{
        width: '70vW',
        justifySelf: "center",
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down(500)]: {
            width: "auto",
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },

    title: {
        color: "white"
    },

    textField: {
        background: "white",
        color: "#C33E37",
        width: "320px",
        padding: "0px",
        fontSize: "12px",
        borderRadius: "5px",
        [theme.breakpoints.down(500)]: {
            width: "280px"
        },
    },

    table: {
        fontWeight: "normal",
        marginTop:'20px',
        minWidth: "70vW",
        [theme.breakpoints.down(500)]: {
            minWidth: "90vW"
        },
    },

    tableHead: {
        fontSize: "17px",
        backgroundColor: "#9A2849",
        color: "#fff",
        fontWeight: "normal"
    },

    tableBody: {
        backgroundColor: "#2b2b2b",
        color: "white",
    },

    tableContent:{
        padding:'10px'
    },

    edtBtn: {
        background: "#9A2849",
        color: "white",
        borderRadius: "5em",
        width: "150px",
    [theme.breakpoints.down(400)]: {
        width: "120px"
    },
    '&:hover': {
        background: "#202020",
        color: "white"
    },
    },  
}));