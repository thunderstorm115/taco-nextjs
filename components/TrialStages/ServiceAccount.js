import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { TextField, Button, Grid, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);

    return (
      <div classname="detailStyle">
        <Grid item xs={12}>
        <Grid
              container
              direction="row"
              alignItems="center"
              xs={12} >
              <Grid item xs={2} className={classes.arrowSpace2}>
                <ArrowBackIosIcon fontSize="medium" onClick={() => history.goBack()}/>
              </Grid>
              <Grid item xs={10}>
                <h4 className="detailHead33" align="center">{state.hostingEnvironment} | {state.os}</h4>
              </Grid>
            </Grid>
            <form autoComplete="on" onSubmit={() => history.push('/trial/environment-security')}>
            {state.hostingEnvironment === "GCP" && (
                    <div >
                    <TextField
                        multiline
                        rowsMax={16}
                        fullWidth
                        className={classes.textField1}
                        variant="filled"
                        size="small"
                        required
                        value={state.serviceAccount}
                        onChange={(event) =>
                            dispatch({type: 'SET_SERVICE_ACCOUNT', payload: event.target.value})
                        }
                        label="Service Account"
                    />
                    </div>
                )}
                {state.hostingEnvironment === "AZURE" && (<>
                    <TextField
                        fullWidth
                        className={classes.textField}
                        variant="filled"
                        size="small"
                        required
                        value={state.tenantID}
                        onChange={(event) => dispatch({type: 'SET_TENANT_ID', payload: event.target.value})}
                        label="Tenant ID"
                    />

                    <TextField
                        multiline
                        rowsMax={14}
                        fullWidth
                        className={classes.textField}
                        variant="filled"
                        size="small"
                        required
                        value={state.clientSecret}
                        onChange={(event) => dispatch({type: 'SET_CLIENT_SECRET', payload: event.target.value})
                        }
                        label="Client Secret"
                    /></>
                )}
 {state.hostingEnvironment === "AWS" && (<>
            <FormControl
              style={{ color: "white" }}
              component="fieldset"
            >
              <FormLabel
                style={{ color: "white", fontSize: "20px" }}
                component="legend"
              >
                Service Type:
              </FormLabel>
              <RadioGroup
                aria-label="ServiceType"
                name="ServiceType"
                value={state.serviceType}
                onChange={(e) => dispatch({type: 'SET_SERVICE_TYPE', payload: e.target.value})}
              >
                <FormControlLabel
                  value="API"
                  control={<Radio className={classes.radio} />}
                  label="API"
                />
                <FormControlLabel
                  value="ECS"
                  control={<Radio className={classes.radio} />}
                  label="ECS"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              required
              value={state.awsAccessKeyId}
              onChange={(e) => dispatch({type: 'SET_ACCESS_KEY_ID', payload: e.target.value})}
              label="AWS access key ID"
            />

            <TextField
              multiline
              rowsMax={16}
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              required
              value={state.awsSecreteAccessKey}
              onChange={(e) => dispatch({type: 'SET_AWS_SECRET_ACCESS_KEY', payload: e.target.value})}
              label="AWS Secret Access Key"
            />
            </>
        )}

                <Grid item xs={12}>
                <Button fullWidth variant="contained" className={classes.button4}
                    type="submit"
                // onClick={nextPage}
                >Next</Button>
            </Grid>
            </form>

      </Grid>
      </div>
    )
}

export default withTrialProgress(CompanyDetails);


