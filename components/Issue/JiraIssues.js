import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Button, Grid } from "@material-ui/core";
import TaskSort from 'components/Issue/TaskSort';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesIssue";

const JiraIssues = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [info, setInfo] = useState([]);
  const [supports, setSupports] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTask, setShowTask] = useState(true);
  const [showSupport, setShowSupport] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [ ,setShowResolved] = useState(true);

  const [showTaskResolved, setShowTaskResolved] = useState([]);
  const [showAlertResolved, setShowAlertResolved] = useState([]);
  const [showInfoResolved, setShowInfoResolved] = useState([]);
  const [showSupportResolved, setShowSupportResolved] = useState([]);

  const [ ,setShowUnresolved] = useState(true);
  const [ ,setResolved] = useState([]);
  const [ ,setUnresolved] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [showAll, setShowAll] = useState("");

  const [showTheSupportResolved, setShowTheSupportResolved] = useState(false);
  const [taskRes, setTaskRes] = useState(false);
  const [alertRes, setAlertRes] = useState(false);
  const [infoRes, setInfoRes] = useState(false);

  const [taskUnres, setTaskUnres] = useState(false);
  const [alertUnres, setAlertUnres] = useState(false);
  const [infoUnres, setInfoUnres] = useState(false);
  const [suppUnres, setSuppUnres] = useState(false);
  const [showTaskUnresolved, setShowTaskUnresolved] = useState([]);
  const [showAlertUnresolved, setShowAlertUnresolved] = useState([]);
  const [showInfoUnresolved, setShowInfoUnresolved] = useState([]);
  const [showSupportUnresolved, setShowSupportUnresolved] = useState([]);

  const [resolvedFilter, setResolvedFilter] = useState(false);
  const [resolvedSuppFilterButton, setResolvedSuppFilterButton] = useState(false);
  const [resolvedTaskFilterButton, setResolvedTaskFilterButton] = useState(false);
  const [resolvedAlertFilterButton, setResolvedAlertFilterButton] = useState(false);
  const [resolvedInfoFilterButton, setResolvedInfoFilterButton] = useState(false);

  const [unresolvedFilter, setUnresolvedFilter] = useState(false);

  useEffect(() => {
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

        const issueData = await API.get(ApiData.name, '/jira/sla-issue-details' , options);
        setAlerts(issueData.data.alert);
        setSupports(issueData.data.support);
        setTasks(issueData.data.task);
        setInfo(issueData.data.info);
        setResolved(issueData.data.resolved);
        setUnresolved(issueData.data.unresolved);
        setShowSupportResolved(issueData.data.resolvedSupport);
        setShowTaskResolved(issueData.data.taskResolved);
        setShowAlertResolved(issueData.data.alertResolved);
        setShowInfoResolved(issueData.data.infoResolved);
        setShowTaskUnresolved(issueData.data.taskUnresolved)
        setShowAlertUnresolved(issueData.data.alertUnresolved)
        setShowInfoUnresolved(issueData.data.infoUnresolved)
        setShowSupportUnresolved(issueData.data.supportUnresolved)
      } catch (err) {
        console.log(err);
      } finally{setLoading(false);}
    })();

  }, []);

  const toggleSupport = () => {
    if (resolvedFilter === true) {
      setShowTheSupportResolved(!showTheSupportResolved)
      setResolvedSuppFilterButton(!resolvedSuppFilterButton)
    }
    else if (unresolvedFilter === true) {
      setSuppUnres(!suppUnres)
      setResolvedSuppFilterButton(!resolvedSuppFilterButton)
    }
    else {
      setShowSupport(!showSupport)
      setShowTheSupportResolved(false)
      setInfoRes(false)
      setTaskRes(false)
      setAlertRes(false)
      setInfoUnres(false)
      setTaskUnres(false)
      setAlertUnres(false)
      setSuppUnres(false)
      setShowTheSupportResolved(false)
    }
  }

  const toggleTasks = () => {
    if (resolvedFilter === true) {
      setTaskRes(!taskRes)
      setResolvedTaskFilterButton(!resolvedTaskFilterButton)
    }
    else if (unresolvedFilter === true) {
      setTaskUnres(!taskUnres)
      setResolvedTaskFilterButton(!resolvedTaskFilterButton)

    }
    else {
      setShowTask(!showTask)
      setShowTheSupportResolved(false)
      setInfoRes(false)
      setTaskRes(false)
      setAlertRes(false)
      setInfoUnres(false)
      setTaskUnres(false)
      setAlertUnres(false)
      setSuppUnres(false)
      setTaskRes(false)
    }
  }

  const toggleAlerts = () => {
    if (resolvedFilter === true) {
      setAlertRes(!alertRes)
      setResolvedAlertFilterButton(!resolvedAlertFilterButton)
    }
    else if(unresolvedFilter === true)
    {
      setAlertUnres(!alertUnres)
      setResolvedAlertFilterButton(!resolvedAlertFilterButton)
    }
    else {
      setShowAlert(!showAlert)
      setShowTheSupportResolved(false)
      setInfoRes(false)
      setTaskRes(false)
      setAlertRes(false)
      setInfoUnres(false)
      setTaskUnres(false)
      setAlertUnres(false)
      setSuppUnres(false)
    }

  }

  const toggleInfo = () => {
    if (resolvedFilter === true) {
      setInfoRes(!infoRes)
      setResolvedInfoFilterButton(!resolvedInfoFilterButton)
    }
    else if(unresolvedFilter === true)
    {
      setInfoUnres(!infoUnres)
      setResolvedInfoFilterButton(!resolvedInfoFilterButton)
    }
    else {
      setShowInfo(!showInfo)
      setShowTheSupportResolved(false)
      setInfoRes(false)
      setTaskRes(false)
      setAlertRes(false)
      setInfoUnres(false)
      setTaskUnres(false)
      setAlertUnres(false)
      setSuppUnres(false)
    }
  }

  const toggleUnresolved = () => {
    setShowTask(false)
    setShowSupport(false)
    setShowAlert(false)
    setShowInfo(false)
    setShowResolved(false)
    setShowTheSupportResolved(false)
    setInfoRes(false)
    setTaskRes(false)
    setAlertRes(false)
    setShowUnresolved(false)
    setInfoUnres(true)
    setTaskUnres(true)
    setAlertUnres(true)
    setSuppUnres(true)

    setUnresolvedFilter(true)
    setResolvedSuppFilterButton(true)
    setResolvedTaskFilterButton(true)
    setResolvedAlertFilterButton(true)
    setResolvedInfoFilterButton(true)
    setResolvedFilter(false)
  }

  const toggleResolved = () => {
    setShowTask(false)
    setShowSupport(false)
    setShowAlert(false)
    setShowInfo(false)
    setShowResolved(false)
    setShowTheSupportResolved(true)
    setInfoRes(true)
    setTaskRes(true)
    setAlertRes(true)
    setShowUnresolved(false)
    setInfoUnres(false)
    setTaskUnres(false)
    setAlertUnres(false)
    setSuppUnres(false)

    setResolvedFilter(true)
    setResolvedSuppFilterButton(true)
    setResolvedTaskFilterButton(true)
    setResolvedAlertFilterButton(true)
    setResolvedInfoFilterButton(true)
    setUnresolvedFilter(false)
  }

  const searchFunction = (e) => {
    setSearchField(e.target.value)
    setShowTask(false)
    setShowSupport(false)
    setShowUnresolved(false)
    setShowAlert(false)
    setShowInfo(false)
    setShowResolved(false)
    setShowAll(true)
    setShowTheSupportResolved(false)
    setInfoRes(false)
    setTaskRes(false)
    setAlertRes(false)
    setInfoUnres(false)
    setTaskUnres(false)
    setAlertUnres(false)
    setSuppUnres(false)
    if (e.target.value === "") {
      setShowTask(true)
      setShowSupport(true)
      setShowUnresolved(true)
      setShowAlert(true)
      setShowInfo(true)
      setShowResolved(true)
      setShowAll(false)
      setResolvedFilter(false)
      setUnresolvedFilter(false)
      setResolvedSuppFilterButton(false)
      setResolvedTaskFilterButton(false)
      setResolvedAlertFilterButton(false)
      setResolvedInfoFilterButton(false)
    }
  }

  const resetButton = () => {
    setShowTask(true)
    setShowSupport(true)
    setShowUnresolved(true)
    setShowAlert(true)
    setShowInfo(true)
    setShowResolved(true)
    setShowAll(false)
    setShowTheSupportResolved(false)
    setInfoRes(false)
    setTaskRes(false)
    setAlertRes(false)
    setInfoUnres(false)
    setTaskUnres(false)
    setAlertUnres(false)
    setSuppUnres(false)

    setResolvedFilter(false)
    setUnresolvedFilter(false)
    setResolvedSuppFilterButton(false)
    setResolvedTaskFilterButton(false)
    setResolvedAlertFilterButton(false)
    setResolvedInfoFilterButton(false)
  }

  const mainCheckData = () => {
    if (alerts.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const supCheckData = () => {
    if (supports.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const taskCheckData = () => {
    if (tasks.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const infoCheckData = () => {
    if (info.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }

  }

  const supRes = () => {
    if (showSupportResolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const mainRes = () => {
    if (showAlertResolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const taskResolved = () => {
    if (showTaskResolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const infoResolved = () => {
    if (showInfoResolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }

  }

  const supUnRes = () => {
    if (showSupportUnresolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const mainUnRes = () => {
    if (showAlertUnresolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const taskUnRes = () => {
    if (showTaskUnresolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const infoUnRes = () => {
    if (showInfoUnresolved.length < 1) {
      return <h2 className={classes.noIssue}>No issues</h2>
    }
  }

  const allArray = [...supports, ...alerts, ...tasks, ...info]

  const filteredData = allArray.filter(allArray => (
    allArray.issueKey.toLowerCase().includes(searchField.toLowerCase())
  ))

  return (
    <main >
      <Grid
        container
        display="flex"
        direction="row"
      >
        <div className={classes.toggles}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0.5}>
            <Grid item>
              <Button style={{ 'color': showSupport === true || resolvedSuppFilterButton === true ? 'white' : '#A4A4A4' }} className={classes.buttonToggle} 
              onClick={toggleSupport}>
                Support
              </Button>

              <Button style={{ 'color': showTask === true || resolvedTaskFilterButton === true ? 'white' : '#A4A4A4' }} className={classes.buttonToggle} 
              onClick={toggleTasks}>
                Tasks
              </Button>

              <Button style={{ 'color': showAlert === true || resolvedAlertFilterButton === true ? 'white' : '#A4A4A4' }} className={classes.buttonToggle} 
              onClick={toggleAlerts}>
                Maintenance
              </Button>

              <Button style={{ 'color': showInfo === true || resolvedInfoFilterButton === true ? 'white' : '#A4A4A4' }} className={classes.buttonToggle} 
              onClick={toggleInfo}>
                Info
              </Button>

              <Button style={{ 'color': infoRes === true || resolvedFilter === true ? 'white' : '#A4A4A4' }} className={classes.buttonToggle} 
              onClick={toggleResolved}>
                Resolved
              </Button>

              <Button style={{ 'color': infoUnres === true || unresolvedFilter === true ? 'white' : '#A4A4A4' }} className={classes.buttonToggle} 
              onClick={toggleUnresolved}>
                Unresolved
              </Button>

              <Button style={{ 'color': '#A4A4A4' }} className={classes.buttonToggle} onClick={resetButton}>
                Reset
              </Button>

              <input className={classes.textField} type="search" placeholder="Search Your Issue" onChange={searchFunction} />
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid
        container
        display="flex"
        direction="row"
        justify="center"
        alignItems="center"
        justifycontent="center"
      >
        <div>
          {loading === true ? <CircularProgress className={classes.spinner} /> : ""}
        </div>

      </Grid>

      {loading === false && showSupport === true ? <h1 className={classes.issueHead}>Support</h1> : ""}
      {loading === false && showSupport === true ? supCheckData() : ""}
      {showSupport === true ? <TaskSort data={supports} /> : ""}
      {loading === false && showSupport === true ? <hr></hr> : ""}

      {loading === false && showTask === true ? <h1 className={classes.issueHead}>Tasks</h1> : ""}
      {loading === false && showTask === true ? taskCheckData() : ""}
      {showTask === true ? <TaskSort data={tasks} /> : ""}
      {loading === false && showTask === true ? <hr></hr> : ""}

      {loading === false && showAlert === true ? <h1 className={classes.issueHead}>Maintenance</h1> : ""}
      {loading === false && showAlert === true ? mainCheckData() : ""}
      {showAlert === true ? <TaskSort data={alerts} /> : ""}
      {loading === false && showAlert === true ? <hr></hr> : ""}

      {loading === false && showInfo === true ? <h1 className={classes.issueHead}>Info</h1> : ""}
      {loading === false && showInfo === true ? infoCheckData() : ""}
      {showInfo === true ? <TaskSort data={info} /> : ""}
      {loading === false && showInfo === true ? <hr></hr> : ""}

      {loading === false && showTheSupportResolved === true ? <h1 className={classes.issueHead}>Support Resolved</h1> : ""}
      {showTheSupportResolved === true ? <TaskSort data={showSupportResolved} /> : ""}
      {loading === false && showTheSupportResolved === true ? supRes() : ""}
      {loading === false && showTheSupportResolved === true ? <hr></hr> : ""}

      {loading === false && taskRes === true ? <h1 className={classes.issueHead}>Task Resolved</h1> : ""}
      {taskRes === true ? <TaskSort data={showTaskResolved} /> : ""}
      {loading === false && taskRes === true ? taskResolved() : ""}
      {loading === false && taskRes === true ? <hr></hr> : ""}

      {loading === false && alertRes === true ? <h1 className={classes.issueHead}>Maintenance Resolved</h1> : ""}
      {alertRes === true ? <TaskSort data={showAlertResolved} /> : ""}
      {loading === false && alertRes === true ? mainRes() : ""}
      {loading === false && alertRes === true ? <hr></hr> : ""}

      {loading === false && infoRes === true ? <h1 className={classes.issueHead}>Info Resolved</h1> : ""}
      {loading === false && infoRes === true ? infoResolved() : ""}
      {infoRes === true ? <TaskSort data={showInfoResolved} /> : ""}

      {/* Unresolved */}

      {loading === false && suppUnres === true ? <h1 className={classes.issueHead}>Support Unresolved</h1> : ""}
      {loading === false && suppUnres === true ? supUnRes() : ""}
      {suppUnres === true ? <TaskSort data={showSupportUnresolved} /> : ""}
      {loading === false && suppUnres === true ? <hr></hr> : ""}

      {loading === false && taskUnres === true ? <h1 className={classes.issueHead}>Task Unresolved</h1> : ""}
      {taskUnres === true ? <TaskSort data={showTaskUnresolved} /> : ""}
      {loading === false && taskUnres === true ? taskUnRes() : ""}
      {loading === false && taskUnres === true ? <hr></hr> : ""}

      {loading === false && alertUnres === true ? <h1 className={classes.issueHead}>Maintenance Unresolved</h1> : ""}
      {alertUnres === true ? <TaskSort data={showAlertUnresolved} /> : ""}
      {loading === false && alertUnres === true ? mainUnRes() : ""}
      {loading === false && alertUnres === true ? <hr></hr> : ""}

      {loading === false && infoUnres === true ? <h1 className={classes.issueHead}>Info Resolved</h1> : ""}
      {loading === false && infoUnres === true ? infoUnRes() : ""}
      {infoUnres === true ? <TaskSort data={showInfoUnresolved} /> : ""}

      {showAll === true ? <TaskSort data={filteredData} /> : ""}

    </main >
  );
};

export default JiraIssues;