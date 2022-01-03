import React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AccountContext } from './Accounts';
import { TextField, Button, Paper, Grid, FormLabel } from "@material-ui/core";
import finalLogo from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import { validateEmail, validatePass } from '__helpers__/helpers';
import Amplify from 'aws-amplify';
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import axios from 'axios'
import useStyles from "./useStylesLogin";

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticate } = useContext(AccountContext);
  const [alertLBL, setAlertLBL] = useState('');
  const [alertPass, setAlertPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [passEdit, setPassEdit] = useState(false);

  const onSubmit = async event => {
    //setPassEdit(true)
    event.preventDefault();
    if (validateEmail(email)) {
      setPassEdit(true)
      setAlertLBL(null)
      setAlertPass(null)
      setLoading(true);

      try {
        await authenticate(email.toLowerCase().trim(), password.trim())
        setLoading(false)
      } catch (error) {
        setLoading(false)

        if (error.message === "User is disabled.") {
          setPassEdit(false)
          setAlertPass("Error, please check email and password")

          const options = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            response: true,
            body: email
          }


          try {
            const ApiData = config.APIDetails.endpoints[0];
            await API.post(
              ApiData.name,
              '/taco-deactivate-email',
              options
            );
          } catch (e) {
            console.log(e)
          }


        } else {

          if (validatePass(password)) {
            setAlertPass("Error, please check email and password")
            setPassEdit(false)
          }

          else {
            setAlertPass("Error, password is not correct length or format")
            setPassEdit(false)
          }
        }
      }
    } else {
      setAlertLBL("Error, email is not correct format")
    }
  };

  return (
    <main className={classes.layoutLogin}>
      <img className="logo" src={finalLogo} alt="Obsidian logo" />
      <h1 className="loginTitle3">-TACO-</h1>
      <Paper className={classes.paperLogin}>
        <h4 className="loginTitle">Login Page</h4>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.loginForm}>
          <Grid item xs={12}>
            <form onSubmit={onSubmit}>
              <TextField fullWidth type="email" required className={classes.textFieldLogin} disabled={passEdit} variant="filled" size="small" value={email} onChange={event => setEmail(event.target.value)} label="Email" />
              <TextField fullWidth type="password" required autoComplete="current-password" disabled={passEdit} className={classes.textFieldLogin} variant="filled" size="small" value={password} onChange={event => setPassword(event.target.value)} label="Password" />
              <FormLabel className={classes.validationLogin} component="legend">{alertLBL}</FormLabel>
              <FormLabel className={classes.validationLogin} component="legend">{alertPass}</FormLabel>
              <span className="link" onClick={() => history.push('/reset')} >Forgot Password?</span>
              <Button fullWidth disabled={loading} variant="contained" className={classes.button} type='submit'>{loading ? "Loading..." : "LOGIN"}</Button>
            </form>
          </Grid>
        </Grid>
        <span className="link2" onClick={() => history.push('/trial')}>Sign-up For Trial</span>
      </Paper>
    </main>
  );
}
export default Login;