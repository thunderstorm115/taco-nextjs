import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { TextField, Button, Grid, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl } from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);

    if(!state.hostingEnvironment) {
      history.goBack();
      return null;
    }

    return (
      <div classname="detailStyle">
        <Grid
          container
          direction="row"
          alignItems="center"
          xs={12}>

          <Grid item xs={2} className={classes.arrowSpace2}>
            <ArrowBackIosIcon fontSize="medium" onClick={() => history.goBack()}/>
          </Grid>

          <Grid item xs={10}>
            <h4 className="detailHead3" align="center">
              {state.environment}
            </h4>
          </Grid>
        </Grid>

        <form onSubmit={() => history.push('/trial/node-info')}>

          <FormControl
            style={{ color: "white", marginBottom: "20px" }}
            component="fieldset"
          >
            <FormLabel
              style={{
                color: "white",
                fontSize: "20px",
                marginBottom: "10px",
                marginTop: "0px"
              }}
              component="legend">
              Operating System:
            </FormLabel>
                    
            <RadioGroup
              aria-label="accountDetails"
              name="accountDetails"
              value={state.os ? state.os : "Redhat"}
              required
              onChange={(e) => dispatch({type: "SET_OS", payload: e.target.value})}
            >
            
              <FormControlLabel
                value="Redhat"
                control={<Radio className={classes.radio} />}
                label="Redhat"
              />

              <FormControlLabel
                value="SUSE"
                control={<Radio className={classes.radio} />}
                label="SUSE"
              />

              <FormControlLabel
                value="AWSLinux"
                control={<Radio className={classes.radio} />}
                label="AWS Linux"
              />

              <FormControlLabel
                value="MWS"
                control={<Radio className={classes.radio} />}
                label="Microsoft Windows Server"
              />

              <FormControlLabel
                value="AIX"
                control={<Radio className={classes.radio} />}
                label="AIX"
              />

              <FormControlLabel
                value="UNIX"
                control={<Radio className={classes.radio} />}
                label="UNIX"
              />

              <FormControlLabel
                value="OTHER"
                control={<Radio className={classes.radio} />}
                label="Other"
              />
            </RadioGroup>       
          </FormControl>

          <TextField
            fullWidth
            id="standard-error-helper-text"
            className={classes.textField}
            variant="filled"
            size="small"
            value={state.osVersion}
            required
            onChange={(event) => dispatch({type: 'SET_OS_VERSION', payload: event.target.value})}
            label="Version"
          />

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" className={classes.button4} >Next</Button>
          </Grid>
        </form>
      </div>
    )
}

export default withTrialProgress(CompanyDetails);


