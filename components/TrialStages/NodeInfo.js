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

    if(!state.os) {
      history.goBack();
      return null;
    }

    return (
      <div classname="detailStyle">
        <form onSubmit={() => history.push('/trial/proceed')}>
          <Grid
                container
                direction="row"
                alignItems="center"
                 >
                <Grid item sm={2} xs={2} className={classes.arrowSpace2}>
                  <ArrowBackIosIcon fontSize="medium" onClick={() => history.goBack()}/>
                </Grid>
                <Grid item sm={9} xs={10}>
                <h4 className="detailHead3" align="center">{state.hostingEnvironment} | {state.os}</h4>
                </Grid>
                </Grid>
              
                <Grid
                container
                direction="column"
                alignItems="center"
                 >
              <Grid item xs={12}>
          <h5 className="detailHead">Node Information</h5>
          <TextField
            fullWidth
            className={classes.textField}
            variant="filled"
            size="small"
            required
            value={state.ipAddress}
            onChange={(event) => dispatch({type: 'SET_IP_ADDRESS', payload: event.target.value})}
            label="IP address"
          />
          <TextField
            fullWidth
            className={classes.textField}
            variant="filled"
            size="small"
            required
            value={state.hostname}
            onChange={(event) => dispatch({type: 'SET_HOSTNAME', payload: event.target.value})}
            label="Host name"
          />
          
                <Button type="submit" fullWidth variant="contained" className={classes.button4}>Next</Button>
            </Grid>
            </Grid>
        </form>
      </div>
    )
}

export default withTrialProgress(CompanyDetails);


