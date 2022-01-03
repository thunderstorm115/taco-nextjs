import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { TextField, Button, Grid, FormControlLabel, FormControl, RadioGroup, Radio } from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);

    return (
      <form autoComplete="on" onSubmit={() => history.push('/trial/ssh-credentials')}>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          alignItems="center"
          xs={12} >

          <Grid item sm={2} xs={2} className={classes.arrowSpace2}>
            <ArrowBackIosIcon fontSize="medium" onClick={() => history.goBack()}/>
          </Grid>

          <Grid item sm={9} xs={10}>
            <h4 className="detailHead3" align="center">{state.hostingEnvironment} | {state.os}</h4>
          </Grid>
        </Grid>

        <FormControl
          style={{ color: "white", marginBottom: "20px" }}
          component="fieldset"
        >
          <RadioGroup
            aria-label="TCP"
            name="TCP"
            value={state.tcpPort}
            onChange={(e) => dispatch({type: 'SET_TCP', payload: e.target.value})}
          >
            <FormControlLabel
              value="5985"
              control={<Radio className={classes.radio} />}
              label="TCP port open: 5985"/>
              
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          className={classes.textField}
          variant="filled"
          size="small"
          value={state.winRMUsername}
          required
          onChange={(e) => dispatch({type: 'SET_WINRM_USERNAME', payload: e.target.value})}
          label="WinRM Username"
        />

        <TextField
          fullWidth
          type="password"
          className={classes.textField}
          variant="filled"
          size="small"
          required
          value={state.winRMPassword}
          onChange={(e) => dispatch({type: 'SET_WINRM_PASSWORD', payload: e.target.value})}
          label="WinRM Password"
        />

        <Grid item xs={12}>
          <Button fullWidth variant="contained" className={classes.button4} type="submit">Next</Button>
        </Grid>

      </Grid>
      </form>
    )
}

export default withTrialProgress(CompanyDetails);


