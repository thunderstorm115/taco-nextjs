import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { TextField, Button, Grid } from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);

    return (
      <div classname="detailStyle">
        <form autoComplete="on" onSubmit={() => history.push('/trial/confirm')}>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              alignItems="center"
              xs={12} 
            >

              <Grid item sm={2} xs={2} className={classes.arrowSpace2}>
                <ArrowBackIosIcon fontSize="medium" onClick={() => history.goBack()}/>
              </Grid>

              <Grid item sm={9} xs={10}>
                <h4 className="detailHead3" align="center">{state.hostingEnvironment} | {state.os}</h4>
              </Grid>
            </Grid>

            <h4 className="detailHead">SSH Credentials</h4>

            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              required
              value={state.SSHUsername}
              onChange={(event) => dispatch({type: 'SET_SSH_USERNAME', payload: event.target.value})}
              label="SSH Username"
            />

            <TextField
              fullWidth
              type="password"
              className={classes.textField}
              variant="filled"
              size="small"
              required
              value={state.SSHPassword}
              onChange={(event) => dispatch({type: 'SET_SSH_PASSWORD', payload: event.target.value})}
              label="SSH Password"
            />

            <TextField
              multiline
              rowsMax={16}
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              required
              value={state.publicKey}
              onChange={(event) => dispatch({type: 'SET_PUBLIC_KEY', payload: event.target.value})}
              label="Public Key"
            />

            <TextField
              fullWidth
              type="password"
              className={classes.textField}
              variant="filled"
              size="small"
              value={state.sudoPassword}
              onChange={(event) => dispatch({type: 'SET_SUDO_PASSWORD', payload: event.target.value})}
              label="Sudo Password"
            />

            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              required
              value={state.sudoOptions}
              onChange={(event) => dispatch({type: 'SET_SUDO_OPTIONS', payload: event.target.value})}
              label="Sudo Options"
            />

            <TextField
              fullWidth
              type="password"
              className={classes.textField}
              variant="filled"
              size="small"
              value={state.rootPassword}
              onChange={(event) => dispatch({type: 'SET_ROOT_PASSWORD', payload: event.target.value})}
              label="Root Password"
            />

            <Grid item xs={12}>
              <Button fullWidth variant="contained" className={classes.button4} type="submit">Next</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    )
}

export default withTrialProgress(CompanyDetails);


