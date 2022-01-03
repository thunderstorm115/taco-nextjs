import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./useStylesMonitoring";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { API } from "aws-amplify";
import config from "UserPoolAmplify";
import { Auth } from "aws-amplify";
import Spinner from "components/User/Spinner";
import { useLocation } from "react-router-dom";
import { TableRow, TablePagination } from "@material-ui/core";
import { Line, Doughnut } from "react-chartjs-2";
import TableFooter from "@material-ui/core/TableFooter";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { StackedHorizontalBarChart } from "react-stacked-horizontal-bar-chart";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./StylesDrillDown.css";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import CrossSVG from "./theExitIcon.svg";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export default () => {
  const [serviceCount, setServiceCount] = useState(0);
  const classes = useStyles();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secondLoading, setSecondLoading] = useState(true);
  const [node, setNode] = useState();
  const [graph, setGraph] = useState();
  const [, setEmptyRows] = useState();
  const [theTime, setTime] = useState(4);
  const [radialData, setRadialData] = useState([]);
  const [bottomLabel, setBottomLabel] = useState("Last 4 Hours Time");
  const location = useLocation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [clickFilter, setClickFilter] = useState("");
  const [graphErrCheck, setGraphErrCheck] = useState(false);

  //Togggle drawer
  const [service, setService] = useState();
  const [state, setState] = React.useState({
    right: false,
  });
  const [lastCheck, setLastCheck] = useState("No Data");
  const [checkIn, setCheckIn] = useState("No Data");
  const [checkAttempt, setCheckAttempt] = useState("No Data");
  const [executionTime, setExecutionTime] = useState("No Data");
  const [latency, setLatency] = useState("No Data");
  const [loading2] = useState(false);

  const toggleDrawer =
    (
      anchor,
      open,
      theLastCheck,
      nextCheckIn,
      checkAttempts,
      checkExecutionTime,
      checkLatency,
      service
    ) =>
    (event) => {
      setService(service);
      setLastCheck(theLastCheck);
      setCheckIn(nextCheckIn);
      setCheckAttempt(checkAttempts);
      setExecutionTime(checkExecutionTime);
      setLatency(checkLatency);
      setState({ ...state, [anchor]: open });
    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchMonitoringData = async () => {
    let nodeName = location.node;
    setNode(location.node);
    (async () => {
      try {
        setLoading(true);

        const ApiData = config.APIDetails.endpoints[0];
        const user = await Auth.currentAuthenticatedUser();

        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          },
        };

        const graphData = await API.get(
          ApiData.name,
          `/monitoring/graphs?node_name=${nodeName}&time=${theTime}`,
          options
        );
        setGraph(graphData);

        const radialData = await API.get(
          ApiData.name,
          `/monitoring/node?node_name=${nodeName}&time=${theTime}`,
          options
        );
        setInfo(radialData.data.allData);
        setRadialData(radialData);
        setEmptyRows(
          rowsPerPage - Math.min(rowsPerPage, info - page * rowsPerPage)
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setServiceCount(info.length);
        setSecondLoading(false);
        console.log("info", info);
        setServiceCount(info.length);
      }
    })();
  };

  useEffect(() => {
    fetchMonitoringData();
  }, []);

  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          style={{ color: "#fff" }}
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          style={{ color: "#fff" }}
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          style={{ color: "#fff" }}
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          style={{ color: "#fff" }}
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  function createLabelsLoad() {
    let dataMem = [];
    graph.data.load.map((item) => dataMem.push(dhm(item.time)));
    return dataMem;
  }

  function createDataLoad1(load) {
    let loadNormal = [];
    let loadWarning = [];
    let loadCritical = [];

    graph.data.load.map(
      (item) => (
        loadNormal.push(item.value),
        loadWarning.push(item.warn),
        loadCritical.push(item.crit)
      )
    );

    if (load === "normal") {
      return loadNormal;
    } else if (load === "warning") {
      return loadWarning;
    } else if (load === "critical") {
      return loadCritical;
    }
  }

  // function createDataLoad5(load) {
  //   let loadNormal = [];
  //   let loadWarning = [];
  //   let loadCritical = [];

  //   graph.data.load.map(
  //     (item) => (
  //       loadNormal.push(item.value[1]),
  //       loadWarning.push(item.warn[1]),
  //       loadCritical.push(item.crit[1])
  //     )
  //   );

  //   if (load === "normal") {
  //     return loadNormal;
  //   } else if (load === "warning") {
  //     return loadWarning;
  //   } else {
  //     return loadCritical;
  //   }
  // }

  // function createDataLoad15(load) {
  //   let loadNormal = [];
  //   let loadWarning = [];
  //   let loadCritical = [];

  //   graph.data.load.map(
  //     (item) => (
  //       loadNormal.push(item.value[2]),
  //       loadWarning.push(item.warn[2]),
  //       loadCritical.push(item.crit[2])
  //     )
  //   );

  //   if (load === "normal") {
  //     return loadNormal;
  //   } else if (load === "warning") {
  //     return loadWarning;
  //   } else {
  //     return loadCritical;
  //   }
  // }

  console.log(graph);

  function createDataMemory() {
    let dataMem = [];
    graph.data.memory.map((item) => dataMem.push(dhm(item.time)));
    return dataMem;
  }

  function createValuesMemory(load) {
    let memoryNormal = [];
    let memoryWarning = [];
    let memoryCritical = [];

    graph.data.memory.map(
      (item) => (
        memoryNormal.push(item.value),
        memoryWarning.push(item.warn),
        memoryCritical.push(item.crit)
      )
    );

    if (load === "normal") {
      return memoryNormal;
    } else if (load === "warning") {
      return memoryWarning;
    } else {
      return memoryCritical;
    }
  }

  function createDataSwop() {
    let dataMem = [];
    graph.data.swap.map((item) => dataMem.push(dhm(item.time)));
    return dataMem;
  }

  function createValuesSwop(value) {
    let normalVal = [];
    let warnVal = [];
    let critVal = [];

    graph.data.swap.map(
      (item) => (
        normalVal.push(item.value),
        warnVal.push(item.warn),
        critVal.push(item.crit)
      )
    );

    if (value === "normal") {
      return normalVal;
    } else if (value === "warning") {
      return warnVal;
    } else if (value === "critical") {
      return critVal;
    }
  }

  function setClickFilterFunction(item) {
    setClickFilter(item);
  }

  function resetClickFilter() {
    setClickFilter("");
  }

  function createLabelsDisk(data) {
    let dataMem = [];
    data.map((item) => dataMem.push(dhm(item.time)));
    return dataMem;
  }

  function createDataDisk(theData, value) {
    let normalLoad = [];
    let warningLoad = [];
    let critLoad = [];

    theData.map(
      (item) => (
        normalLoad.push(item.value),
        warningLoad.push(item.warn),
        critLoad.push(item.crit)
      )
    );

    if (value === "normal") {
      return normalLoad;
    } else if (value === "warning") {
      return warningLoad;
    } else if (value === "critical") {
      return critLoad;
    }
  }

  function buttonClick(timeAmnt) {
    setLoading(true);
    setSecondLoading(true);
    setTime(timeAmnt);
    if (timeAmnt === 4) {
      setBottomLabel("4 Hour Time Span");
    } else if (timeAmnt === 25) {
      setBottomLabel("25 Hour Time Span");
    } else if (timeAmnt === 7) {
      setBottomLabel("1 Week Time Span");
    } else if (timeAmnt === "31") {
      setBottomLabel("1 Month Time Span");
    } else if (timeAmnt === "6") {
      setBottomLabel("6 Month Time Span");
    } else if (timeAmnt === "1") {
      setBottomLabel("1 Year Time Span");
    }
    (async () => {
      try {
        setLoading(true);
        const ApiData = config.APIDetails.endpoints[0];
        const user = await Auth.currentAuthenticatedUser();

        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          },
        };

        const graphData = await API.get(
          ApiData.name,
          `/monitoring/graphs?node_name=${node}&time=${timeAmnt}`,
          options
        );
        setGraph(graphData);
        setServiceCount(info.length);
        setLoading(false);

        const radialData = await API.get(
          ApiData.name,
          `/monitoring/node?node_name=${node}&time=${timeAmnt}`,
          options
        );
        setInfo(radialData.data.allData);
        console.log("hello", info);
        setEmptyRows(
          rowsPerPage - Math.min(rowsPerPage, info - page * rowsPerPage)
        );
        setSecondLoading(false);
      } catch (err) {
        console.log(err);
        setSecondLoading(false);
        setGraphErrCheck(true);
      }
    })();
  }

  function dhm(t) {
    var utcSeconds = t;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    var trimmedString = d.toString().substring(4, 25);
    return trimmedString;
  }

  function reset(length) {
    resetClickFilter();
    setServiceCount(length);
  }

  function getServiceCount(service) {
    console.log("item", service);
    setServiceCount(parseInt(service.tot_okay));
    console.log("serviceCount", serviceCount);
    setClickFilterFunction(service.service_name);
  }

  const list = (anchor) =>
    loading2 ? (
      <Spinner />
    ) : (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem>
            <ListItemText align="left">
              <h1>Alert Details</h1>
            </ListItemText>
            <ListItemText align="right">
              {" "}
              <img
                onClick={() => toggleDrawer()}
                className={classes.exitsvg}
                alt="Exit"
                src={CrossSVG}
              />
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">Last Check:</ListItemText>
            <ListItemText align="right">{tryFunctionLastCheck()}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">Next Check-In:</ListItemText>
            <ListItemText align="right">{tryFunctionNextCheck()}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">Check Attempts:</ListItemText>
            <ListItemText align="right">{tryFunctionAttempt()}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">Check Execution Time:</ListItemText>
            <ListItemText align="right">{tryFunctionExecution()}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">Check Latency:</ListItemText>
            <ListItemText align="right">{tryFunctionLatency()}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">Check Interval:</ListItemText>
            <ListItemText align="right">120</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">Max Check Attempts:</ListItemText>
            <ListItemText align="right">3</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">{critType()}</ListItemText>
            <ListItemText align="right">
              {" "}
              {tryFunctionMemoryCritical()}
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText align="left">{memType()}</ListItemText>
            <ListItemText align="right">
              {tryFunctionMemoryWarning()}
            </ListItemText>
          </ListItem>
        </List>
      </div>
    );

  console.log(lastCheck);

  function tryFunctionLastCheck() {
    if (lastCheck === "No Data") {
      return "No Data";
    } else {
      try {
        let t = lastCheck;
        let date = dhm(t);
        return date;
      } catch (e) {
        return "No Data";
      }
    }
  }

  function tryFunctionNextCheck() {
    if (checkIn === "No Data") {
      return "No Data";
    } else {
      try {
        let t = checkIn;
        let date = dhm(t);
        return date;
      } catch (e) {
        return "No Data";
      }
    }
  }

  function tryFunctionAttempt() {
    if (checkAttempt === "No Data") {
      return "No Data";
    } else {
      try {
        let t = checkAttempt;
        return t;
      } catch (e) {
        return "No Data";
      }
    }
  }

  function tryFunctionExecution() {
    if (executionTime === "No Data") {
      return "No Data";
    } else {
      try {
        let t = executionTime;
        return t;
      } catch (e) {
        return "No Data";
      }
    }
  }

  function tryFunctionLatency() {
    if (latency === "No Data") {
      return "No Data";
    } else {
      try {
        let t = latency;
        return t;
      } catch (e) {
        return "No Data";
      }
    }
  }

  // function tryFunctionMaxAttempts() {
  //   try {
  //       let t = infoComp.host_max_check_attempts
  //       return t;
  //   } catch (e) { return "No Data"; }
  // }

  function tryFunctionMemoryCritical() {
    try {
      if (service.includes("Disk") === true) {
        return "5% Left";
      } else if (service.includes("disk") === true) {
        return "5% Left";
      } else if (service.includes("Memory Usage" || "Memory") === true) {
        return "98%";
      } else if (service.includes("Swap Usage" || "Swap") === true) {
        return "2";
      } else if (service.includes("Load Average" || "Load") === true) {
        return "7.5, 6, 4,5";
      } else {
        return "";
      }
    } catch (e) {
      return null;
    }
  }

  function tryFunctionMemoryWarning() {
    try {
      if (service.includes("Disk") === true) {
        return "10% Left";
      } else if (service.includes("disk") === true) {
        return "10% Left";
      } else if (service.includes("Memory Usage" || "Memory") === true) {
        return "90%";
      } else if (service.includes("Swap Usage" || "Swap") === true) {
        return "5";
      } else if (service.includes("Load Average" || "Load") === true) {
        return "5, 4, 3";
      } else {
        return "";
      }
    } catch (e) {
      return null;
    }
  }

  function memType() {
    try {
      if (service.includes("Disk") === true) {
        return "Disk Warning:";
      } else if (service.includes("disk") === true) {
        return "Disk Warning:";
      } else if (service.includes("Memory Usage" || "Memory") === true) {
        return "Memory Warning:";
      } else if (service.includes("Swap Usage" || "Swap") === true) {
        return "Swap Usage Warning:";
      } else if (service.includes("Load Average" || "Load") === true) {
        return "Load Warning:";
      } else {
        return "";
      }
    } catch (e) {
      return null;
    }
  }

  function critType() {
    try {
      if (service.includes("Disk") === true) {
        return "Disk Critical:";
      } else if (service.includes("disk") === true) {
        return "Disk Critical:";
      } else if (service.includes("Memory Usage" || "Memory") === true) {
        return "Memory Critical:";
      } else if (service.includes("Swap Usage" || "Swap") === true) {
        return "Swap Usage Critical:";
      } else if (service.includes("Load Average" || "Load") === true) {
        return "Load Critical:";
      } else {
        return "";
      }
    } catch (e) {
      return null;
    }
  }

  return loading === true ? (
    <Spinner />
  ) : (
    <main>
      <div className={classes.list}>
        {/* Drawer Component set to open on the right side*/}
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          classes={{ paper: classes.MuiDrawer }}
        >
          {list("right")}
        </Drawer>
      </div>
      <Grid>
        <h1 className={classes.headingTop}>{location.node}</h1>
      </Grid>

      <Grid container>
        <Button className={classes.button} onClick={() => buttonClick(4)}>
          4 Hours
        </Button>

        <Button className={classes.button} onClick={() => buttonClick(25)}>
          25 Hours
        </Button>

        <Button className={classes.button} onClick={() => buttonClick(7)}>
          1 Week
        </Button>

        <Button className={classes.button} onClick={() => buttonClick("31")}>
          1 Month
        </Button>

        <Button className={classes.button} onClick={() => buttonClick("6")}>
          6 Month
        </Button>

        <Button className={classes.button} onClick={() => buttonClick("1")}>
          1 Year
        </Button>
      </Grid>

      {!graphErrCheck ? (
        <div>
          <Grid //Card Grid
            container
            alignItems="center"
            justify="center"
            className={classes.GraphGrid}
          >
            <Grid item xs={11} md={6} lg={6} className={classes.NodeDrill}>
              <h4 className={classes.headingTop}>Load Average 1</h4>
              <Line
                data={{
                  labels: createLabelsLoad(),
                  datasets: [
                    {
                      label: "Normal",
                      data: createDataLoad1("normal"),
                      fill: false,
                      borderColor: "#39A627",
                    },
                    {
                      data: createDataLoad1("warning"),
                      label: "Warning",
                      borderColor: "#FF9A00",
                      fill: false,
                      hidden: true
                    },
                    {
                      data: createDataLoad1("critical"),
                      label: "Critical",
                      borderColor: "#FE5900",
                      fill: false,
                      hidden: true
                    },
                  ],
                }}
                options={{
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: bottomLabel + " for " + "Load Averages",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,

                        scaleLabel: {
                          display: true,
                          labelString: "Load",
                        },
                      },
                    ],
                  },
                  responsive: true,
                  legend: {
                    display: true,
                  },
                }}
              />
            </Grid>

            {/* <Grid item xs={11} md={6} lg={6} className={classes.NodeDrill}>
              <h4 className={classes.headingTop}>Load Average 5</h4>
              <Line
                data={{
                  labels: createLabelsLoad(),
                  datasets: [
                    {
                      data: createDataLoad5("normal"),
                      label: "Normal",
                      borderColor: "#39A627",
                      fill: false,
                    },
                    {
                      data: createDataLoad5("warning"),
                      label: "Warning",
                      borderColor: "#FF9A00",
                      fill: false,
                      hidden: true
                    },
                    {
                      data: createDataLoad5("critical"),
                      label: "Critical",
                      borderColor: "#FE5900",
                      fill: false,
                      hidden: true
                    },
                  ],
                }}
                options={{
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: bottomLabel + " for " + "Load Averages",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,

                        scaleLabel: {
                          display: true,
                          labelString: "Load",
                        },
                      },
                    ],
                  },
                  responsive: true,
                  legend: {
                    display: true,
                  },
                }}
              />
            </Grid>

            <Grid item xs={11} md={6} lg={6} className={classes.NodeDrill}>
              <h4 className={classes.headingTop}>Load Average 15</h4>
              <Line
                data={{
                  labels: createLabelsLoad(),
                  datasets: [
                    {
                      data: createDataLoad15("normal"),
                      label: "Normal",
                      borderColor: "#39A627",
                      fill: false,
                    },
                    {
                      data: createDataLoad15("warning"),
                      label: "Warning",
                      borderColor: "#FF9A00",
                      fill: false,
                      hidden: true
                    },
                    {
                      data: createDataLoad15("critical"),
                      label: "Critical",
                      borderColor: "#FE5900",
                      fill: false,
                      hidden: true
                    },
                  ],
                }}
                options={{
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: bottomLabel + " for " + "Load Averages",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,

                        scaleLabel: {
                          display: true,
                          labelString: "Load",
                        },
                      },
                    ],
                  },
                  responsive: true,
                  legend: {
                    display: true,
                  },
                }}
              />
            </Grid> */}

            <Grid item xs={11} md={6} lg={6} className={classes.NodeDrill}>
              <h4 className={classes.headingTop}>Available to Swap</h4>
              <Line
                data={{
                  labels: createDataSwop(),
                  datasets: [
                    {
                      data: createValuesSwop("normal"),
                      label: "Normal",
                      borderColor: "#39A627",
                      fill: false,
                    },
                    {
                      data: createValuesSwop("warning"),
                      label: "Warning",
                      borderColor: "#FF9A00",
                      fill: false,
                      hidden: true
                    },
                    {
                      data: createValuesSwop("critical"),
                      label: "Critical",
                      borderColor: "#FE5900",
                      fill: false,
                      hidden: true
                    },
                  ],
                }}
                options={{
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString:
                            bottomLabel + " for " + "Swap Availability",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        ticks: {
                          suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                          suggestedMax: 100,
                          beginAtZero: true, // minimum value will be 0.
                        },
                        scaleLabel: {
                          display: true,
                          labelString: "Swap (MB)",
                        },
                      },
                    ],
                  },
                  responsive: true,
                  legend: {
                    display: true,
                  },
                }}
              />
            </Grid>

            <Grid item xs={11} md={6} lg={6} className={classes.NodeDrill}>
              <h4 className={classes.headingTop}>Memory Breakdown</h4>
              <Line
                data={{
                  labels: createDataMemory(),
                  datasets: [
                    {
                      data: createValuesMemory("normal"),
                      label: "Normal",
                      borderColor: "#39A627",
                      fill: false,
                    },
                    {
                      data: createValuesMemory("warning"),
                      label: "Warning",
                      borderColor: "#FF9A00",
                      fill: false,
                      hidden: true
                    },
                    {
                      data: createValuesMemory("critical"),
                      label: "Critical",
                      borderColor: "#FE5900",
                      fill: false,
                      hidden: true
                    },
                  ],
                }}
                options={{
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString:
                            bottomLabel + " for " + "Memory Breakdown ",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        ticks: {
                          suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                          suggestedMax: 100,
                          beginAtZero: true, // minimum value will be 0.
                        },
                        scaleLabel: {
                          display: true,
                          labelString: "Memory (KB)",
                        },
                      },
                    ],
                  },
                  responsive: true,
                  legend: {
                    display: true,
                  },
                }}
              />
            </Grid>

            {graph.data.disks.map((item) =>
              item.data < 1 ? null : (
                <Grid item xs={11} md={6} lg={6} className={classes.NodeDrill}>
                  <h4 className={classes.headingTop}>
                    Usage by Device (%) / Name: {item.name}
                  </h4>
                  <Line
                    data={{
                      labels: createLabelsDisk(item.data),
                      datasets: [
                        {
                          data: createDataDisk(item.data, "normal"),
                          label: "Usage",
                          borderColor: "#39A628",
                          fill: false,
                        },
                        {
                          data: createDataDisk(item.data, "warning"),
                          label: "Warning Usage",
                          borderColor: "#FF9A00",
                          fill: false,
                          hidden: true
                        },
                        {
                          data: createDataDisk(item.data, "critical"),
                          label: "Critical Usage",
                          borderColor: "#FE5900",
                          fill: false,
                          hidden: true
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      legend: {
                        display: true,
                      },
                      scales: {
                        xAxes: [
                          {
                            display: true,
                            scaleLabel: {
                              display: true,
                              labelString: bottomLabel + " For Device",
                            },
                          },
                        ],
                        yAxes: [
                          {
                            display: true,
                            scaleLabel: {
                              display: true,
                              labelString: "%",
                            },
                          },
                        ],
                      },
                    }}
                  />
                </Grid>
              )
            )}
          </Grid>
        </div>
      ) : (
        <h2 className={classes.noData}>No Graph Data</h2>
      )}

      <div>
        <Grid //Card Grid
          container
          justify="center"
          className={classes.tableGrid}
        >
          {radialData ? (
            <Grid
              item
              sm={12}
              md={4}
              lg={4}
              className={classes.severityCardGrid}
            >
              <Grid container>
                <Grid item xs={10}>
                  <h4 className={classes.headingTop}>Sort by Severity</h4>
                </Grid>

                <Grid item xs={2}>
                  <Button
                    className={classes.resetBtn}
                    onClick={() => {
                      reset(info.length);
                    }}
                  >
                    RESET
                  </Button>
                </Grid>
              </Grid>

              {secondLoading === true ? (
                <Spinner />
              ) : (
                radialData && (
                  <Doughnut
                    data={{
                      labels: ["Up", "Warning", "Critical"],
                      datasets: [
                        {
                          label: "Points",
                          backgroundColor: ["#39A628", "#FF9A00", "#FF5900 "],
                          borderColor: "transparent",
                          data: [
                            radialData.data !== undefined
                              ? radialData.data.total_okay
                              : ["No Data"],
                            radialData.data !== undefined
                              ? radialData.data.total_warning
                              : ["No Data"],
                            radialData.data !== undefined
                              ? radialData.data.total_critical
                              : ["No Data"],
                          ],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      legend: {
                        display: true,
                        labels: {
                          fontColor: "#fff",
                          fontSize: 14,
                          usePointStyle: true,
                          padding: 20,
                        },
                        position: "top",
                        align: "center",
                      },
                    }}
                  />
                )
              )}

              {secondLoading === true ? (
                <Spinner />
              ) : (
                <div className={classes.stackedValuesLines}>
                  {radialData.data &&
                    radialData.data.service_details.map((item) => (
                      <div
                        onClick={() => getServiceCount(item)}
                        className={classes.marginLines}
                      >
                        <h4 className={classes.headingTopLines}>
                          {item.service_name}
                        </h4>
                        <StackedHorizontalBarChart
                          classes={{ borderRadius: "5em" }}
                          height="13px"
                          ranges={[
                            item.tot_okay,
                            item.tot_critical,
                            item.tot_warning,
                          ]}
                          backgroundColors={["#39A628", "#FF5900", "#FF9A00"]}
                        />
                      </div>
                    ))}
                </div>
              )}
            </Grid>
          ) : null}

          {radialData ? (
            <Grid
              item
              sm={12}
              md={7}
              lg={7}
              className={classes.NodeDrillAlerts}
            >
              {secondLoading === true ? (
                <Spinner />
              ) : (
                <Table
                  className={classes.table}
                  aria-label="custom pagination table"
                >
                  <Thead className={classes.tableHead}>
                    <Tr>
                      <Th className={classes.tableHead} align="center">
                        Alert
                      </Th>
                      <Th className={classes.tableHead} align="center">
                        Error Type
                      </Th>
                      <Th className={classes.tableHead} align="center">
                        Time
                      </Th>
                      <Th className={classes.tableHead} align="center">
                        Company
                      </Th>
                      <Th className={classes.tableHead} align="center">
                        Type Of Service
                      </Th>
                      <Th className={classes.tableHead} align="center">
                        Alert Detail
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {clickFilter === ""
                      ? rowsPerPage &&
                        info
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .filter((info) => {
                            if (info.length < 2) return true;
                            return info;
                          })
                          .map((item, index) => {
                            return (
                              <Tr
                                key={index}
                                className={classes.tableBody}
                                onClick={toggleDrawer(
                                  "right",
                                  true,
                                  item.last_check === null
                                    ? "No Data"
                                    : item.last_check,
                                  item.next_check === null
                                    ? "No Data"
                                    : item.next_check,
                                  item.max_check_attempts === null
                                    ? "No Data"
                                    : item.max_check_attempts,
                                  item.check_execution_time === null
                                    ? "No Data"
                                    : item.check_execution_time,
                                  item.check_latency === null
                                    ? "No Data"
                                    : item.check_latency,
                                  item.service_type === null
                                    ? "No Data"
                                    : item.service_type
                                )}
                              >
                                <Td
                                  className={classes.tableBody}
                                  align="right"
                                  style={{
                                    backgroundColor:
                                        item.alert_status === "3" 
                                        ? "#6C275D"
                                        : item.alert_status === "2"
                                        ? "#FF5900"
                                        : item.alert_status === "1"
                                        ? "#FF9A00"
                                        : item.alert_status === "0"
                                        ? "green"
                                        : "#39A628",
                                  }}
                                ></Td>
                                <Td className={classes.tableBody} align="center">
                                  {item.alert_status === "3" 
                                  ? "Unknown" 
                                  : item.alert_status === "2" 
                                  ? "Critical" 
                                  : item.alert_status === "1" 
                                  ? "Warning" 
                                  : item.alert_status === "0" 
                                  ? "Normal" : "Normal"}
                                </Td>

                                <Td
                                  className={classes.tableBody}
                                  align="center"
                                >
                                  {item.duration === null
                                    ? "No Data"
                                    : dhm(item.duration)}
                                </Td>
                                <Td
                                  className={classes.tableBody}
                                  align="center"
                                >
                                  {item.company}
                                </Td>
                                <Td
                                  className={classes.tableBody}
                                  align="center"
                                >
                                  {item.service_type}
                                </Td>
                                <Td
                                  className={classes.tableBodyAlert}
                                  align="center"
                                >
                                  {item.server_message}
                                </Td>
                              </Tr>
                            );
                          })
                      : null}
                  </Tbody>

                  {clickFilter !== "" ? (
                    <Tbody key={new Date().getTime()}>
                      {info.map((item, index) =>
                        item.service_type.includes(clickFilter) ? (
                          <Tr
                            key={index}
                            className={classes.tableBody}
                            onClick={toggleDrawer(
                              "right",
                              true,
                              item.last_check === null
                                ? "No Data"
                                : item.last_check,
                              item.next_check === null
                                ? "No Data"
                                : item.next_check,
                              item.max_check_attempts === null
                                ? "No Data"
                                : item.max_check_attempts,
                              item.check_execution_time === null
                                ? "No Data"
                                : item.check_execution_time,
                              item.check_latency === null
                                ? "No Data"
                                : item.check_latency,
                              item.service_type === null
                                ? "No Data"
                                : item.service_type
                            )}
                          >
                            <Td
                              style={{
                                     backgroundColor:
                                        item.alert_status === "3" 
                                        ? "#6C275D"
                                        : item.alert_status === "2"
                                        ? "#FF5900"
                                        : item.alert_status === "1"
                                        ? "#FF9A00"
                                        : item.alert_status === "0"
                                        ? "green"
                                        : "#39A628",
                              }}
                            ></Td>
                            <Td className={classes.tableBody} align="center">
                              {item.alert_status === "3" 
                              ? "Unknown" 
                              : item.alert_status === "2" 
                              ? "Critical" 
                              : item.alert_status === "1" 
                              ? "Warning" 
                              : item.alert_status === "0" 
                              ? "Normal" : "Normal"}
                            </Td>
                            <Td className={classes.tableBody} align="center">
                              {item.duration === null
                                ? "No Data"
                                : dhm(item.duration)}
                            </Td>
                            <Td className={classes.tableBody} align="center">
                              {item.company}
                            </Td>
                            <Td className={classes.tableBody} align="center">
                              {item.service_type}
                            </Td>
                            <Td
                              className={classes.tableBodyAlert}
                              align="center"
                            >
                              {item.server_message}
                            </Td>
                          </Tr>
                        ) : null
                      )}
                    </Tbody>
                  ) : null}
                  <TableFooter className={classes.tableBody}>
                    <TableRow>
                      <TablePagination
                        className={classes.tableBodyPagination}
                        align="right"
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={6}
                        count={info.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { "aria-label": "rows per page" },
                          MenuProps: {
                            classes: { paper: classes.selectDropdown },
                          },
                        }}
                        classes={{ menuItem: classes.menuItem }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              )}
            </Grid>
          ) : null}
        </Grid>
      </div>
    </main>
  );
};
