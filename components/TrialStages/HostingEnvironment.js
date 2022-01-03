import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { Button, Grid, Select, MenuItem, FormControlLabel, Checkbox } from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);

    if(!state.companyName) {
      history.goBack();
      return null;
    }

    return (
      <div classname="detailStyle">
        <form autoComplete="on" onSubmit={() => history.push('/trial/operating-system')}>
            <Grid item xs={12}>

            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              xs={12} >

                <Grid item xs={2} className={classes.arrowSpace2}>
                  <ArrowBackIosIcon fontSize="medium" onClick={history.goBack}/>
                </Grid>

                <Grid item xs={10}>
                  <h6 className="detailHead6">Hosting Environment</h6>
                </Grid>

                <Select
                  style={{width: "100%"}}
                  fullWidth
                  value={state.hostingEnvironment}
                  className={classes.select}
                  label="Hosting envir"
                  onChange={(e) => dispatch({type: 'SET_HOSTING_ENVIRONMENT', payload: e.target.value})}
                  classes={{
                    root: classes.whiteColor,
                    icon: classes.whiteColor,
                  }}
                  inputProps={{
                    envir: "envir",
                    id: "outlined-age-native-simple",
                  }}>

                  <MenuItem className={classes.label2} value="ON-PREM">
                    On-prem
                  </MenuItem>

                  <MenuItem className={classes.label2} value="GCP">
                    Google cloud platform
                  </MenuItem>

                  <MenuItem className={classes.label2} value="AZURE">
                    Azure
                  </MenuItem>

                  <MenuItem className={classes.label2} value="AWS">
                    AWS
                  </MenuItem>

                </Select>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                className={classes.checkBoxForm}
                control={
                  <Checkbox
                    className={classes.checkBox}
                    onChange={() => dispatch({type: 'SET_TCP_CHECKED', payload: !state.tcpCheck})}
                    checked={state.tcpCheck}
                  />
                }
                label="TCP port open: 335"
                labelPlacement="end"
                />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" className={classes.button4}>Next</Button>
            </Grid>

            </Grid>
        </form>
      </div>
    )
}

export default withTrialProgress(CompanyDetails);


