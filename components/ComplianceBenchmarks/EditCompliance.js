import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./useStylesComplianceBenchmarks";
import Spinner from "components/User/Spinner";
import { Button, Grid, Checkbox } from "@material-ui/core";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});

  const [cis, setCIS] = useState(false);
  const [obsprac, setObsprac] = useState(false);
  const [opsupdatepatch, setOpsupdatepatch] = useState(false);
  const [popi, setPopi] = useState(false);
  const [sox, setSox] = useState(false);
  const [gdpr, setGdpr] = useState(false);
  const [nist, setNist] = useState(false);
  const [pcidss, setPcidss] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            },
          };
          API.get(ApiData.name, "/node-config/get-compliance-benchmarks", options)
            .then((res) => {
              setCIS(res.data.cis)
              setObsprac(res.data.obsidianbestpractice)
              setOpsupdatepatch(res.data.operatingsystemupdatesandpatching)
              setPopi(res.data.popi)
              setSox(res.data.sox)
              setGdpr(res.data.gdpr)
              setNist(res.data.nist)
              setPcidss(res.data.pcidss)

              let oldValues = {
                "cis": res.data.cis,
                "obsprac": res.data.obsidianbestpractice,
                "opsupdatepatch": res.data.operatingsystemupdatesandpatching,
                "popi": res.data.popi,
                "sox": res.data.sox,
                "gdpr": res.data.gdpr,
                "nist": res.data.nist,
                "pcidss": res.data.pcidss,
              }
              setValues(oldValues)
            })
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => setLoading(false));
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function submit() {
    setLoading(true);

    let deleteDict = {}
    let updateDict = {}

    if (cis !== values["cis"]) {
      if (cis) { updateDict["cis"] = true }
      else { deleteDict["cis"] = true }
    }

    if (obsprac !== values["obsprac"]) {
      if (obsprac) { updateDict["obsprac"] = true }
      else { deleteDict["obsprac"] = true }
    }

    if (opsupdatepatch !== values["opsupdatepatch"]) {
      if (opsupdatepatch) { updateDict["opsupdatepatch"] = true }
      else { deleteDict["opsupdatepatch"] = true }
    }

    if (popi !== values["popi"]) {
      if (popi) { updateDict["popi"] = true }
      else { deleteDict["popi"] = true }
    }

    if (sox !== values["sox"]) {
      if (sox) { updateDict["sox"] = true }
      else { deleteDict["sox"] = true }
    }

    if (gdpr !== values["gdpr"]) {
      if (gdpr) { updateDict["gdpr"] = true }
      else { deleteDict["gdpr"] = true }
    }

    if (nist !== values["nist"]) {
      if (nist) { updateDict["nist"] = true }
      else { deleteDict["nist"] = true }
    }
    if (pcidss !== values["pcidss"]) {
      if (pcidss) { updateDict["pcidss"] = true }
      else { deleteDict["pcidss"] = true }
    }

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
              "deletebenchmarks": deleteDict,
              "updatebenchmarks": updateDict,
            }
          }
          API.post(ApiData.name, `/node-config/configure-compliance-benchmarks`, options).then(res => {
        
          }).catch(error => {
            setLoading(false)
            console.log(error.response)
          }).finally(() => {
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
  return (
    loading ? <Spinner /> :
      <div>
        <main className={classes.mainGrid}>
          <Grid items xs={7}>
            <h1>Edit Configured Compliance</h1>
          </Grid>

          <Grid container>
            <Grid items xs={12} style={{ textAlign: 'right' }}>
              <Button className={classes.edtBackBtn} onClick={() => history.push("/ComplianceBenchmarks")}>BACK</Button>
            </Grid>
            <Grid items xs={12} style={{ textAlign: 'right' }}>
              <Button className={classes.edtSubmitBtn} onClick={submit}>SUBMIT</Button>
            </Grid>
          </Grid>
          <Grid>
            <Grid container className={classes.editGrid}>
              <Grid items ms={8} className={classes.firstGrid}>
                <h3>Out of the box benchmarks</h3>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={cis}
                    onChange={() => setCIS(!cis)}
                  />
                  <h3 className={classes.checkboxLabels}>CIS</h3>
                </Grid>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={obsprac}
                    onChange={() => setObsprac(!obsprac)}
                  />
                  <h3 className={classes.checkboxLabels}>Obsidian Best Practices</h3>
                </Grid>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={opsupdatepatch}
                    onChange={() => setOpsupdatepatch(!opsupdatepatch)}
                  />
                  <h3 className={classes.checkboxLabels}>Operating System Updates and Patching</h3>
                </Grid>
              </Grid>

              <Grid items ms={6} className={classes.secondGrid}>
                <h3>Configuration Based Benchmarks</h3>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={popi}
                    onChange={() => setPopi(!popi)}
                  />
                  <h3 className={classes.checkboxLabels}>POPI</h3>
                </Grid>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={gdpr}
                    onChange={() => setGdpr(!gdpr)}
                  />
                  <h3 className={classes.checkboxLabels}>GDPR</h3>
                </Grid>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={pcidss}
                    onChange={() => setPcidss(!pcidss)}
                  />
                  <h3 className={classes.checkboxLabels}>PCI DSS</h3>
                </Grid>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={sox}
                    onChange={() => setSox(!sox)}
                  />
                  <h3 className={classes.checkboxLabels}>SOX</h3>
                </Grid>
                <Grid container>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.checkBox}
                    checked={nist}
                    onChange={() => setNist(!nist)}
                  />
                  <h3 className={classes.checkboxLabels}>NIST</h3>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </main>
      </div>
  );
};