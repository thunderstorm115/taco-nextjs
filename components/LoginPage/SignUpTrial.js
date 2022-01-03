import React, {useState} from 'react';
import {makeStyles, TextField, Button, Paper, Grid, FormLabel} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import tacologonew from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import { validateEmail, validatePass} from '__helpers__/helpers';
import { Context } from 'components/TrialSignup/trialStore';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  textFieldSignupTrial:{
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: 260,
  },

  button:{
    background: '#C33E37',
    color: "white",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    width: "49%",
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
        width: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },

  paper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      background: '#2B2B2B',
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
      },
  },

  validation:{
    color: "red",
    fontSize: "16px",
    width: "300px",
    marginBottom: "15px",
    marginTop: "0px",
    fontFamily: 'Open Sans',
    display: 'inline-block'
  },

  checkBoxForm:{
    color: '#FFFFFF'
  },

  checkBox:{
    color: '#FFFFFF'
  },

  label:{
    color: "#FFFFFF"
  },

  label2:{
    color: "#000000"
  },

  formControl1: {
    marginTop: theme.spacing(3),
    },

  select:{
    background: "white",
    color: "#C33E37",
    marginBottom: theme.spacing(2),
    minWidth: '99%',
    height: 46,
  },

  button2:{
    background: '#C33E37',
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: "5em",
    width: "48%",
  }, 

root: {
  background: "blue",
},
whiteColor: {
  color: "black"
}
}));

export default () => {
  
  const [state, dispatch] = React.useContext(Context);
    const history = useHistory();
    const classes = useStyles();
    const [ ,emailAlert] = useState(''); 
    const [ ,alertPass] = useState('');
    const [validEmail, setValidEmail ] = useState(false);
    const [validPassword, setValidPassword ] = useState(false);
    
    // TODO: the sign-up needs to be moved over to the last submit of the company flow.
    React.useEffect(() => {
      if(validateEmail(state.email)){
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }, [state.email]);

    React.useEffect(() => {
      if(validatePass(state.password)){
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    }, [state.password]);

    async function signIn() {
      try {
          await Auth.signIn(state.email, state.password);
          return true
      } catch (error) {
          return false
      }
  }

  const onSubmit = event => {
    signIn().then(data =>{
      if(data){
      setValidEmail(false);
    }
      else{
      event.preventDefault();
      history.push('/trial/company-details');
      }
    })
    };

    const handleCancel = async () => {
      try {
        await dispatch({type: 'CLEAR_STATE'})
        history.push('/login');
      } catch(error) {
        console.error(error)
      }
    }
    
    return (
    <main className={classes.layout}>
        <img className="logo" src={tacologonew} alt="Obsidian logo"/>
        <Paper className={classes.paper}>
                <h1 className="loginTitle">Trial Sign-up</h1>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        className={classes.signUpTrial}>
            <Grid item xs={12}>

              <form onSubmit ={onSubmit}>
                <TextField fullWidth type="email" required className={classes.textFieldSignupTrial} variant="filled" size="small" value={state.email}
                onChange= {event => dispatch({type: 'SET_EMAIL', payload: event.target.value})}
                label="Email" />

                <TextField fullWidth type="password" required className={classes.textFieldSignupTrial} variant="filled" size="small" value={state.password}
                  onChange= {event => dispatch({type: 'SET_PASSWORD', payload: event.target.value})}
                  label="Password" />
                <FormLabel className={classes.validation} component="legend">{emailAlert}</FormLabel>
                <FormLabel className={classes.validation} component="legend">{alertPass}</FormLabel>
                
                <Button fullWidth variant="contained" className={classes.button} onClick={handleCancel}>Back</Button>
                <Button  fullWidth variant="contained" disabled={!validEmail || !validPassword} className={classes.button2} type="submit">Next</Button>
              </form>
           </Grid>
           </Grid>
        </Paper>
    </main>
  );
}