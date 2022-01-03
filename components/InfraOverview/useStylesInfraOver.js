import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  graph: {
    display: "flex",
    flexBasis: "auto",
    width:"86vW"
  },

  paperCompliance: {
    marginTop: "12px",
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    cursor: "pointer",
    flex: "1" | "0"| "100%",
    marginRight: "0.5%",
    minHeight: '445px',
    [theme.breakpoints.down(1280)]: {
      marginRight: "0px",
    },
    '&:hover': {
      background: "#3A3A3A",
   },
  },

  paperNode: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: "#2B2B2B",
    color: "#ffffff",
    borderRadius: "12px",
    cursor: "pointer",
    flex: "1" | "0"| "100%",
    marginLeft: "1%",
    minHeight: '445px',
    [theme.breakpoints.down(1280)]: {
      marginLeft: "0px",
    },
    '&:hover': {
      background: "#3A3A3A",
   },
  },

  layoutNode: {
    width: "auto",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  totalDiv: {
    margin: "auto",
    marginLeft: "0",
    marginRight: "80px",
    [theme.breakpoints.down(500 + theme.spacing(2) * 2)]: {
      margin: "auto",
      paddingRight: "10px",
    },
  },

  signalIcon: {
    fontSize: 47,
    fill: "white",
    marginTop: "38px",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      marginTop: "28px",
    },
  },

  statisticsContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(2),
  },

  statistics: {
    display: "flex",
    flexDirection: "row",
  },

  space: {
    paddingLeft: theme.spacing(3)
  },

  heading1: {
    color: "#fff",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize: "20px",
    },
  },

  statisticHeading: {
    color: "#FA336C",
    alignSelf: "right",
    marginBottom: theme.spacing(-1),
    textAlign: "left",
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize: "20px",
    },
  },

  nodeHeading: {
    textAlign: "center",
  },

  theButtons: {
    marginTop: "10px",
    color: "white",
  },

  buttonClass: {
    display: "flex",
    justifyContent: "flex-end",
     [theme.breakpoints.down(1280)]: {
      marginRight: "130px",
    },
    [theme.breakpoints.down(1250)]: {
      marginRight: "120px",
    },
    [theme.breakpoints.down(1200)]: {
      marginRight: "110px",
    },
    [theme.breakpoints.down(1150)]: {
      marginRight: "100px",
    },
    [theme.breakpoints.down(1100)]: {
      marginRight: "90px",
    },
    [theme.breakpoints.down(1060)]: {
      marginRight: "80px",
    },
    [theme.breakpoints.down(1030)]: {
      marginRight: "70px",
    },
    [theme.breakpoints.down(975)]: {
      marginRight: "60px",
    },
    [theme.breakpoints.down(925)]: {
      marginRight: "50px",
    },
    [theme.breakpoints.down(865)]: {
      marginRight: "40px",
    },
    [theme.breakpoints.down(825)]: {
      marginRight: "30px",
    },
    [theme.breakpoints.down(790)]: {
      marginRight: "25px",
    },
   
    [theme.breakpoints.down(720)]: {
      marginRight: "5px",
    },
  },
}));
