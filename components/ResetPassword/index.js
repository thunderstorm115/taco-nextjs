import React, { useState } from "react";
import "../../../../obs-cocoa-react/src/index.scss";
import {TextField, Button, Paper, Grid, FormLabel} from "@material-ui/core";
import logo from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import { useHistory } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import config from "UserPoolAmplify";
import useStyles from "./useStylesReset";

export default () => {
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertLBL, setAlertLBL] = useState('');
  const [alertLBL2, setAlertLBL2] = useState('');
  const [alertPass, setAlertPass] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
  } 

  const sendCode = event => {
    event.preventDefault();

       Auth.forgotPassword(email.toLowerCase().trim())
        .then(data => {
          setAlertLBL2("An email has been sent. Please check you email for your verification code")
              setTimeout(function() {
                setAlertLBL2(null)
                setStage(2)
                }, 5000);
        })
        .catch(err => {setAlertLBL('Attempt limit exceeded, please try again later.');});
  };
  const resetPassword = event => {
    event.preventDefault();

    if(password !== confirmPassword){
      setAlertPass('Error, new passwords do not match');
      setConfirmPassword('');
    }else{
      setAlertPass(null)

        Auth.forgotPasswordSubmit(email, code, password)
           .then(data => {
             //console.log(data)
            setAlertLBL2("Password has been successfully changed")
                     setTimeout(function() {
                     setAlertLBL2(null)
                     history.push('/login');
                     }, 4000);
           })
           .catch(err => {
             //console.log(err.code)
            if(!validatePass(password)){setAlertPass("Error, password is not correct length or format")}
            if(code.length!==6){setAlertPass("Error, verification code is not correct length")}
            if(err.code === "CodeMismatchException"){setAlertPass("Error, please check verification code")}
            else{
              setAlertLBL2("Password has been successfully changed")
                     setTimeout(function() {
                     setAlertLBL2(null)
                     history.push('/login');
                     }, 4000);
            }
            });
      }
  };

  return (
    <div>
      {stage === 1 &&(
        <main className={classes.layout}>
          <img className="logo" src={logo} alt="Obsidian logo"/>
                <h1 className="loginTitle">Reset Password</h1>
                <Paper className={classes.paper}>
                <h3 align="center" className={classes.text}>Please Enter The Required Information In Order To Reset Your Password</h3>
                            <form onSubmit={sendCode}>
                            <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        spacing={2}
                        className={classes.resetPassword}>
                           
                        <Grid item xs={12}>
                                  <FormLabel className={classes.validation2}component="legend">{alertLBL2}</FormLabel>           
                              <TextField fullWidth type="email" required className={classes.textField} variant="filled" size="small" value={email}
                                onChange={event => setEmail(event.target.value)} 
                                label="Enter Email"/>
                                  <FormLabel className={classes.validation}component="legend">{alertLBL}</FormLabel>
                              </Grid>
                              <Grid item xs={6}>
                              <Button fullWidth variant="contained" className={classes.button} onClick={() => history.push('/login')} >CANCEL</Button>
                              </Grid>
                              <Grid item xs={6}>
                              <Button fullWidth variant="contained" className={classes.button2} type="submit">SUBMIT EMAIL</Button>
                              </Grid>
                      </Grid>
                          </form>       
                        
                  </Paper>
          </main>
      )}
      
      {stage === 2 &&(
        <main className={classes.layout}>
          <img className="logo" src={logo} alt="Obsidian logo"/>
                <h1 className="loginTitle">Reset Password</h1>
                <Paper className={classes.paper}>
                <h3 align="center" className={classes.text}>Please Enter The Required Information In Order To Reset Your Password</h3>
                          <form onSubmit={resetPassword}>
                        <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        spacing={2}
                        className={classes.resetPassword}>

                        <Grid item xs={12}>
                          <FormLabel className={classes.validation2}component="legend">{alertLBL2}</FormLabel>          
                            <TextField fullWidth type="number" required className={classes.textField} variant="filled" size="small" value={code}
                              onChange={event => setCode(event.target.value)} 
                              label="Enter Code"/>
                                <FormLabel fullWidth className={classes.validation} component="legend">{alertPass}</FormLabel>
                            
                              <TextField fullWidth type="password" required className={classes.textField} variant="filled" size="small" value={password}
                              onChange={event => setPassword(event.target.value)} 
                              label="New Password"/>
                              

                              <TextField fullWidth type="password" required className={classes.textField} variant="filled" size="small" value={confirmPassword}
                              onChange={event => setConfirmPassword(event.target.value)} 
                              label="Confirm Password"/>
                          </Grid>
                            <Grid item xs={6}>  
                            <Button fullWidth variant="contained" className={classes.button} onClick={() => history.push('/login')} >BACK</Button>
                            </Grid>
                            <Grid item xs={6}>
                            <Button fullWidth variant="contained" className={classes.button2} type="submit">SUBMIT</Button>
                            </Grid>
                            </Grid>
                          </form>         
                          
                </Paper>
        </main>
      )}
      
    </div>
  );
};
