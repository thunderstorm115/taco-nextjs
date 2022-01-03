import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { Button, Grid, Paper} from "@material-ui/core";

import useStyles from './useStyles';

const CompanyDetails = ({email}) => {
    const classes = useStyles();
    const history = useHistory();

    const handleClose = async () => {
        try {
            history.push("/login");
        } catch(err) {  
            console.error(err);
        }
    }

    return (
        <div className={classes.popup2}>
           <div className={classes.layout}>

           <Grid item xs={12}>
                <Paper className={classes.paper3}  >
                    <p style={{ color: "white" ,textAlign: 'center' } }> 
                    Thank you for your trial signup and welcome to the TACO team! We happy to have you onboard. Your demo environment set up as per your selected preferences are now running in the background.</p>
                    <p style={{ color: "white" ,textAlign: 'center' } }> You will first get an email to verify your email account before you will be able to login. So please look out for that email to verify your account before attempting to login.</p>
                    <p style={{ color: "white" ,textAlign: 'center' } }> Once the setup of your selected environments are done, we will notify you via email once complete. You can then login and view your environments and their compliance status.</p>
                    <Button fullWidth variant="contained" className={classes.button4} onClick={handleClose}>BACK TO LOGIN</Button>
                </Paper>
            </Grid>

           </div> 
      </div>
    )
}

export default withTrialProgress(CompanyDetails);


