import React, { useState } from 'react';
import "../../../../obs-cocoa-react/src/index.scss";
import { TextField, Button, Paper, Grid, FormLabel} from "@material-ui/core";
import tacologonew from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesLogin";

export default ()=> {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conNewPassword, setConNewPassword] = useState("");
    const history = useHistory();
    const classes = useStyles();
    const [txfData, setTxfData] = useState(true);
    const [alertPass, setAlertPass] = useState('');
    const [alertLBL2, setAlertLBL2] = useState('');

    const validatePass = (newPassword) => {
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return re.test(String(newPassword));
    }

    const onSubmit = event =>{
        event.preventDefault();
          if(validatePass(newPassword)){
            setAlertPass(null)
                if(conNewPassword === newPassword){ 
                  
                  Auth.currentAuthenticatedUser()
                  .then(user => {
                      return Auth.changePassword(user, password, newPassword);                   
                  })
                  .then(data => {
                    setAlertLBL2("Password has been successfully changed")
                                setTimeout(function() {
                                setAlertLBL2(null)
                                history.push('/dashboard');
                                }, 4000);
                  })
                  .catch(err => {
                    if(err.code === "LimitExceededException"){
                      setAlertPass("Attempt limit exceeded, please try again later.")
                    }else{
                      setAlertPass("Error with changing password, please try again")
                      setPassword('')
                      setNewPassword('')
                      setConNewPassword('')
                                setTimeout(function() {
                                setAlertPass(null)
                                }, 4000);
                    }
                  });
              }else{
                setAlertPass("Passwords do not match");
                setNewPassword('')
                setConNewPassword('')
              };
          }else{setAlertPass("Error, new password must contain at least 6 characters with one numeric digit, one uppercase and one lowercase letter")}
    };
    if(newPassword.length>6 && txfData!==false){setTxfData(false)}
    if(newPassword.length<6 && txfData!==true){setTxfData(true)}
  return(
    <main className={classes.layout}>
        <img className="logo" src={tacologonew} alt="Obsidian logo"/>
                
                <Paper className={classes.paper}>
                  <h1 className="loginTitle">Change Password</h1>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        className={classes.changePassword}
                    >
                        <Grid item xs={12}>
                            <form onSubmit={onSubmit}>
                                <FormLabel className={classes.validation2}component="legend">{alertLBL2}</FormLabel>              
                              <TextField fullWidth required type="password" 
                                className={classes.textField} 
                                variant="filled" 
                                size="small" 
                                value={password} 
                                onChange={event => setPassword(event.target.value)} 
                                label="Old Password" />
                                <FormLabel className={classes.validation} component="legend">{alertPass}</FormLabel> 
                              <TextField fullWidth required type="password" 
                                className={classes.textField} variant="filled" 
                                size="small" 
                                value={newPassword} 
                                onChange = {event => setNewPassword(event.target.value)} 
                                label="New Password" />
                                
                              <TextField fullWidth required type="password" 
                                className={classes.textField} 
                                variant="filled" size="small" 
                                value={conNewPassword} 
                                onChange = {event => setConNewPassword(event.target.value)} 
                                label="Confirm New Password"
                                />
                                 {conNewPassword === newPassword ? null : <span className="link2" >Password's must match in-order to change a Password</span>}

                          
                              <Button 
                                fullWidth disabled={txfData || (newPassword !== conNewPassword)} variant="contained" className={classes.button} type="submit">CHANGE PASSWORD</Button>
                          </form>       
                        </Grid>
                    </Grid>
                </Paper>
     </main>
  );
};