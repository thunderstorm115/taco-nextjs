import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import {validateEmail, validatePass} from '__helpers__/helpers';
import { TextField, Button, Grid } from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);

    if(!validateEmail(state.email) || !validatePass(state.password)) {
        history.goBack();
        return null;
      }

    return (
        <div classname="detailStyle">
            <form autoComplete="on" onSubmit={() => history.push('/trial/hosting-environment')}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"  
                    >
                        <Grid item sm={3} xs={2} className={classes.arrowSpace}>
                            <ArrowBackIosIcon fontSize="medium" onClick={() => history.goBack()}/>
                        </Grid>

                        <Grid item sm={9} xs={10}>
                            <h6 className="detailHead2">
                                Company Details for Node Registration
                            </h6>
                        </Grid>
                    </Grid>

                    <Grid
                    container
                    direction="column"
                    alignItems="center"    
                    >
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="filled"
                            size="small"
                            value={state.companyName}
                            onChange={(event) => dispatch({type: 'SET_COMPANY_NAME', payload: event.target.value})}
                            label="Company Name"
                        />
                        <TextField
                            fullWidth
                            className={classes.textField}
                            variant="filled"
                            size="small"
                            value={state.companyRegNo}
                            onChange={(event) => dispatch({type: 'SET_COMPANY_REG', payload: event.target.value})}
                            label="Company Registration No."
                        />
                        <TextField
                            fullWidth
                            id="standard-error-helper-text"
                            className={classes.textField}
                            variant="filled"
                            size="small"
                            value={state.companyVatNo}
                            onChange={(event) => dispatch({type: 'SET_COMPANY_VAT', payload: event.target.value})}
                            label="VAT No."
                        />
                    </Grid>

            <Grid item xs={12}>
                <Button fullWidth variant="contained" className={classes.button4} type="submit" >Next</Button>
            </Grid>
        </form>
        </div>
    )
}

export default withTrialProgress(CompanyDetails);


