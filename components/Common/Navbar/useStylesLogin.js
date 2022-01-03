import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    changePassword: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        marginTop: theme.spacing(4),
        minWidth: 300,
      },
      editCompany: {
        display: "flex",
        margin: "auto",
        marginTop: theme.spacing(4),
        minWidth: 300,
        width: "90%"
      },
      loginForm: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        marginTop: theme.spacing(4),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        minWidth: 300,
      },
      compliance: {
        display: "flex",
        justifyContent: "center",
        flexBasis: "auto",
        minWidth: 300,
      },
      signUp: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        marginTop: theme.spacing(4),
        minWidth: "90%",
      },
      signUpTrial: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        marginTop: theme.spacing(4),
        minWidth: 300,
      },
      textField:{
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: 50,
      },
      textFieldLogin:{
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: 260,
      },
      textFieldSignUp:{
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: 260,
      },
      button:{
        background: '#C33E37',
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em"
      },
      buttonEditCo: {
        background: '#C33E37',
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        marginRight: "10px",
        marginLeft: "10px",
      },
      buttonSignup:{
        background: '#C33E37',
        color: "white",
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        width: "49%",
      },
      button1Signup:{
        background: '#C33E37',
        color: "white",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        borderRadius: "5em",
        width: "48%",
      },
      buttonSLA: {
        background: "#9A2849",
        color: "white",
        borderRadius: "5em",
        position: "relative",
        marginRight: "20px",
        paddingLeft: "15px",
        paddingRight: "15px",
        marginTop: theme.spacing(),
        [theme.breakpoints.down(1450 + theme.spacing(2) * 2)]: {
          paddingLeft: "6px",
          paddingRight: "6px",
          position: "relative",
        },
      },
      buttonPosition: {
        display: "flex",
        flexDirection: "flex-end",
      },
      button2Status: {
        display: 'flex',
        justifyContent: 'center',
        flexBasis: 'auto',
        marginTop: theme.spacing(2),
        minWidth: 300,
        borderRadius: "12px",
      },

      editButton: {
        background: "#9A2849",
        color: "white",
        borderRadius: "3em",
        paddingLeft: "15px",
        paddingRight: "15px"
      },

      componentGridSizing:{
        width: "100%"
      },

      componentGridSizingStatus: {
        width: "99%",
      },

      select:{
        background: "white",
        color: "#C33E37",
        marginBottom: theme.spacing(2),
        minWidth: '99%',
        height: 46,
        padding: "0px 10px",
      },

      issueDetails:{
        marginLeft: theme.spacing(10),
      },
      issueContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        marginTop:theme.spacing(-7),
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          marginTop: theme.spacing(2),
        },
      },
      issueContainerSub:{
        display:"flex",
        flexDirection:"row",
      },
      statistics: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(-2),
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
      },
      statisticsSLA: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(-2),
      },
      statisticsContent: {
        display: "flex",
        flexDirection: "column",
        marginLeft: theme.spacing(2),
      },
      icon:{
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          width:"130px",
        },
      },
      layout: {
          width: 'auto',
          marginLeft: theme.spacing(0),
          marginRight: theme.spacing(0),
          minWidth: 200,
          [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
              width: 800,
              marginLeft: 'auto',
              marginRight: 'auto',
          },
      },

      layoutLogin: {
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

      layoutOverview: {
        width: "auto",
        marginLeft: theme.spacing(16),
        marginRight: theme.spacing(16),
        [theme.breakpoints.down(1500 + theme.spacing(2) * 2)]: {
          marginLeft: theme.spacing(9),
          marginRight: theme.spacing(9),
        },
        [theme.breakpoints.down(1000 + theme.spacing(2) * 2)]: {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
        [theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
          marginLeft: "10px",
          marginRight: "10px",
        },
      },

      layoutSLA: {
        width: "auto",
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
      },

      layoutStatus: {
        width: "auto",
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        [theme.breakpoints.up(1570 + theme.spacing(1) * 2)]: {
          width: "1500px", 
        },
      },   
      
    paper: {
      marginTop: theme.spacing(4),
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
    paperEditCo: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        background: '#2B2B2B',
        color: '#ffffff',
        borderRadius: "12px",
        width: 'auto',
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        minWidth: 300,
        [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paperLogin: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        background: '#2B2B2B',
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    paperSignup: {
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
    paper2Signup: {
      background: "#2B2B2B",
      height: "65px",
      borderRadius: "12px",
    },
    graphGrid:{
        width:"35%",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          width:"100%",
          marginTop:"20px",
        },
    },
    graphGrid2:{
        width:"35%",
        marginLeft:"-5%",
        marginRight:"3%",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          width:"100%",
          marginTop:"20px",
          marginLeft:"0%",
          marginRight:"0%",
        },
    },
    graphGridSLA: {
        width: "35%",
        [theme.breakpoints.down(1024 + theme.spacing(2) * 2)]: {
          width: "100%",
          marginTop: "20px",
        },
    },
    graphGrid2SLA: {
        width: "35%",
        marginLeft: "-5%",
        marginRight: "3%",
        [theme.breakpoints.down(1024 + theme.spacing(2) * 2)]: {
          width: "100%",
          marginTop: "20px",
          marginLeft: "0%",
          marginRight: "0%",
        },
    },
    graphNode: {
        display: "flex",
        flexDirection: "column",
        width: "1400px",
        marginLeft: "10px",
        marginRight: "10px",
        background: "#2b2b2b",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "50px",
        marginTop: "20px",
        [theme.breakpoints.down(1550 + theme.spacing(2) * 2)]: {
          width: "1200px",
          marginLeft: "10px",
          marginRight: "10px",
        },
        [theme.breakpoints.down(1366 + theme.spacing(2) * 2)]: {
          width: "1060px",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "20px",
        },
        [theme.breakpoints.down(1250 + theme.spacing(2) * 2)]: {
          width: "850px",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "20px",
        },
        [theme.breakpoints.down(1000 + theme.spacing(2) * 2)]: {
          width: "500px",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "20px",
        },
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          width: "290px",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "20px",
        },
    },

    root: {
        background: "blue",
    },

    whiteColor: {
        color: "black"
    },

    heading:{
        color:"#fff",
        textAlign:"left",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          textAlign:"center",
        },
    },

    heading2:{
        color:"#fff",
        fontSize:"50px",
        textAlign:"center",
    },

    heading3:{
      color:"#fff",
      fontSize: "30px",
      fontWeight: "600"
    },

    heading3SLA: {
      color: "#fff",
    },

    heading4SLA: {
        color: "#fff",
        textAlign: "left",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          fontSize: "15px",
        },
    },
    headingStatus: {
        color: "#fff",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          fontSize: "20px",
        },
    },

    heading2Status: {
        color: "#fff",
    },
    
    heading3Status: {
        color: "#fff",
        [theme.breakpoints.down(1370 + theme.spacing(2) * 2)]: {
          marginLeft: theme.spacing(15),
        },
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          marginLeft: theme.spacing(0),
        },
    },
    statisticHeadingStatus: {
        color: "#FA336C",
        alignSelf: "right",
        marginBottom: theme.spacing(-1),
        textAlign: "center",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          fontSize: "20px",
        },
      },
    statisticHeading:{
        color: "#FA336C",
        alignSelf:"right",
        marginBottom: theme.spacing(-1),
        textAlign:"center",
    },
    statisticHeading2:{
        color: "#FA336C",
        alignSelf:"right",
        marginBottom: theme.spacing(-1),
        textAlign:"center",
        marginTop:theme.spacing(-4),
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          marginTop: theme.spacing(3),
        },
    },
    gridSpacing: {
        marginBottom: theme.spacing(-1),
    },
    graph: {
        display: "flex",
        justifyContent: "center",
        flexBasis: "auto",
        minWidth: 300,
    },
    graphContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        [theme.breakpoints.down(1024 + theme.spacing(2) * 2)]: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
    nav: {
        marginTop: theme.spacing(3),
        alignItems: "center",
        flexBasis: "auto",
        display: "flex",
    },
    buttonLayout: {
        display: "flex",
        margin: "auto",
        width: "auto"
    },
    checkBox: {
        color: "white",  
    },
    arrow: {
        border: "solid #fff",
        borderWidth: "0 3px 3px 0",
        display: "inline-block",
        padding: "3px",
        transform:" rotate(135deg)",
        marginRight:theme.spacing(2),
      },
    padding: {
        padding: theme.spacing(1),
    },
    accessIcon: {
        fontSize: 50,
        fill: "white",
        marginTop: "35px",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          marginTop: "25px",
        }
    },
    pcIcon: {
        fontSize: 45,
        fill: "white",
        marginTop: "38px",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          marginTop: "28px",
        }
    },
    signalIcon: {
        fontSize: 47,
        fill: "white",
        marginTop: "38px",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          marginTop: "28px",
        }
    },
    breadcrumbStyle:{
        color:"#fff",
        textAlign:"left",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          fontSize:"13px",
        },
    },
    linkStyle:{
        color:"#fff",
        cursor:"pointer",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          fontSize:"13px",
        },
      },
    nodes: {
        height: "260px",
        marginTop: "20px",
        marginRight: "20px",
        background: "#2b2b2b",
        padding: "20px",
        width: "680px",
        borderRadius: "12px",
        cursor: "pointer",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          height:"470px",
          width:"280px",
          marginRight:"20px",
        },
        [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
          marginRight:"0px",
        },
    },
    nodesSLA: {
        height: "260px",
        marginTop: "20px",
        marginLeft: "10px",
        marginRight: "10px",
        background: "#2b2b2b",
        padding: "20px",
        width: "670px",
        borderRadius: "12px",
        cursor: "pointer",
        [theme.breakpoints.down(1550 + theme.spacing(2) * 2)]: {
          width: "570px",
          marginLeft: "10px",
          marginRight: "10px",
        },
        [theme.breakpoints.down(1366 + theme.spacing(2) * 2)]: {
          width: "500px",
          marginLeft: "10px",
          marginRight: "10px",
        },
        [theme.breakpoints.down(1024 + theme.spacing(2) * 2)]: {
          width: "500px",
          marginLeft: "15px",
          marginRight: "15px",
          height: "260px"
        },
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          height: "450px",
          width: "280px",
          marginLeft: "15px",
          marginRight: "15px",
        },
        [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
          height: "500px",
          marginLeft: "15px",
          marginRight: "15px",
        },
    },
    Node: {
        marginTop: "20px",
        marginRight: "20px",
        background: "#2b2b2b",
        padding: "20px",
        width: "315px",
        borderRadius: "12px",
        cursor: "pointer",
        [theme.breakpoints.down(1000 + theme.spacing(2) * 2)]: {
          width: "280px",
          marginRight: "15px",
        },
        [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
          width: "85%",
          marginRight: "15px",
        },
    },
    gridContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        [theme.breakpoints.down(1400 + theme.spacing(2) * 2)]: {
          justifyContent: "center",
          alignItems: "center",
        },
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
    },
    icons:{
        fontSize: 175,
        fill: "white",
        [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
          fontSize: 150,
        },
    },
    label:{
        color: "#ffffff"
    },
    label2:{
        color: "#000000"
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
      width: '80vw',
      marginBottom: "15px",
      marginTop: "0px",
      fontFamily: 'Open Sans',
      display: 'inline-block'
    },
    validationLogin:{
        color: "red",
        fontSize: "16px",
        marginBottom: "15px",
        marginTop: "0px",
        fontFamily: 'Open Sans',
        display: 'inline-block'
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
    validation2Signup:{
        color: "white",
        fontSize: "18px",
        width: "330px",
        marginBottom: "15px",
        marginTop: "0px",
        fontFamily: 'Open Sans',
        display: 'inline-block'
    }
    }));