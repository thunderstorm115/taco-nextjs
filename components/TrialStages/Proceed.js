import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { Button, Grid } from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);

    const handleNo = () => {
      dispatch({type: 'CLEAR_SECURITY_DETAILS'});
      history.push('/trial/confirm');
    }

    return (
      <div classname="detailStyle">
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
      <h4 style={{ color: "white" }}>Do you want to proceed to provide your node security access details?</h4>
      </Grid>
      </Grid>

      <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
             >
          <Grid item xs={6}>
          <Button fullWidth variant="contained" className={classes.button} type="submit"  onClick={handleNo}>No</Button>
          </Grid>
          <Grid item xs={6}>
          <Button fullWidth variant="contained" className={classes.button1} onClick={() => history.push('/trial/service-account')}> Yes</Button>
          </Grid>
          
          </Grid>
    </div>
    )
}

export default withTrialProgress(CompanyDetails);


