import React, { useState } from "react";
import useStyles from "./useStylesComplianceBenchmarks";
import Spinner from "components/User/Spinner";
import { Button, Grid, Checkbox } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [sec1, setSec1] = useState(true);
  const [sec2, setSec2] = useState(false);
  const [sec3, setSec3] = useState(false);
  const history = useHistory();

  const [cis, setCIS] = useState(false);
  const [obsprac, setObsprac] = useState(false);
  const [opsupdatepatch, setOpsupdatepatch] = useState(false);
  const [popi, setPopi] = useState(false);
  const [sox, setSox] = useState(false);
  const [gdpr, setGdpr] = useState(false);
  const [nist, setNist] = useState(false);
  const [pcidss, setPcidss] = useState(false);
  const [other, setOther] = useState(false);

  function submit() {
    setLoading(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {

              Authorization: jwtToken
            },
            body: {
              createbenchmarks: {
                cis: cis,
                obsprac: obsprac,
                opsupdatepatch: opsupdatepatch,
                popi: popi,
                sox: sox,
                gdpr: gdpr,
                nist: nist,
                pcidss: pcidss,
                other: other,
              }
            }
          }

          API.post(ApiData.name, `/node-config/configure-compliance-benchmarks`, options).then(res => {
          }).catch(error => {
            setLoading(false)
            console.log(error.response)
          }).finally(()=>{
            setLoading(false)
            history.push({
              pathname: "/finishedComplianceBenchmarks",
        
            })
          })
        });
      } catch (err) {
        console.log(err);
      } 
    })();
  }

  function buttonClickSec1() {
    setSec1(false)
    setSec2(true)
  
  }

  function backToSec1() {
    setSec2(false)
    setSec1(true)
  }

  function buttonClickSec2() {
    setSec2(false)
    setSec3(true)

    submit()
  }

  function section1() {
    return (
      <Grid className={classes.layout}>
        <h2 className={classes.Heading}>Compliance Frameworks Set Up</h2>
        <h3 className={classes.subHeading}>Choose out of the box benchmarks</h3>
        <h3 className={classes.altHeading}>These are automated generic benchmarks and processes that are applied to your nodes.</h3>

        <Grid container>
          <Checkbox
            inputProps={{ "aria-label": "primary checkbox" }}
            className={classes.checkBox}
            onChange={event => setCIS(event.target.checked)}
            
          />
          <h3 className={classes.checkboxLabels}>CIS</h3>
        </Grid>

        <Grid container>
          <Checkbox
            inputProps={{ "aria-label": "primary checkbox" }}
            className={classes.checkBox}
            onChange={event => setObsprac(event.target.checked)}
          />
          <h3 className={classes.checkboxLabels}>Obsidian Best Practices</h3>
        </Grid>

        <Grid container>
          <Checkbox
            inputProps={{ "aria-label": "primary checkbox" }}
            className={classes.checkBox}
            onChange={event => setOpsupdatepatch(event.target.checked)}
          />
          <h3 className={classes.checkboxLabels}>Operating System Updates and Patching</h3>
        </Grid>
        <Button className={classes.ComplianceNext} onClick={buttonClickSec1}>NEXT</Button>
      </Grid>
    )
  }

  function section2() {
    return (
      <Grid className={classes.layout}>
        <h2 className={classes.Heading}>Compliance Frameworks Set Up</h2>
        <h3 className={classes.subHeading}>Choose Configuration Based Benchmarks</h3>
        <h3 className={classes.altHeading}>
          Due to the nature of data being stored in different places and systems, we need you to complete a questionnaire in order to complete the setup. Each customer is different.
      </h3>

        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              <Checkbox
                inputProps={{ "aria-label": "primary checkbox" }}
                className={classes.checkBox}
                onChange={event => setPopi(event.target.checked)}
              />
              <h3 className={classes.checkboxLabels}>POPI</h3>
            </Grid>

            <Grid container>
              <Checkbox
                inputProps={{ "aria-label": "primary checkbox" }}
                className={classes.checkBox}
                onChange={event => setGdpr(event.target.checked)}
              />
              <h3 className={classes.checkboxLabels}>GDPR</h3>
            </Grid>

            <Grid container>
              <Checkbox
                inputProps={{ "aria-label": "primary checkbox" }}
                className={classes.checkBox}
                onChange={event => setPcidss(event.target.checked)}
              />
              <h3 className={classes.checkboxLabels}>PCI DSS</h3>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container>
              <Checkbox
                inputProps={{ "aria-label": "primary checkbox" }}
                className={classes.checkBox}
                onChange={event => setSox(event.target.checked)}
              />
              <h3 className={classes.checkboxLabels}>SOX</h3>
            </Grid>

            <Grid container>
              <Checkbox
                inputProps={{ "aria-label": "primary checkbox" }}
                className={classes.checkBox}
                onChange={event => setNist(event.target.checked)}
              />
              <h3 className={classes.checkboxLabels}>NIST</h3>
            </Grid>
          </Grid>
        </Grid>

        <h3 className={classes.subHeading}>Other</h3>
        <input className={classes.textField} type="input" placeholder="Enter here" onChange={event => setOther(event.target.value)} />

        <Grid style={{ display: 'flex' }}>
          <Button className={classes.frameworkBack} onClick={backToSec1}>BACK</Button>
          <Button className={classes.frameworkSubmit} onClick={buttonClickSec2}>SUBMIT</Button>
        </Grid>
      </Grid>
    )
  }
  function section3() {
    return (
      <Grid className={classes.layout}>
        <h2 className={classes.Heading}>Compliance Frameworks Set Up</h2>
        <h3 className={classes.altHeadingFinal}>
          Thank you. An Obsidian representative will contact you to obtain the information from you in order for us to complete your configuration.
            </h3>
        <Button className={classes.backToCompliance} onClick={() => history.push("/ComplianceBenchmarks")}>BACK TO COMPLIANCE BENCHMARKS</Button>
      </Grid>
    )
  }
  return (
    loading ? <Spinner /> :
      <div>
        <main>
          {sec1 === true ? section1() : null}
          {sec2 === true ? section2() : null}
          {sec3 === true ? section3() : null}
        </main>
      </div>
  );
};