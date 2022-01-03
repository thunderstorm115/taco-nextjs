import React, {useState, useEffect} from 'react';
import { TextField, Button, Paper, Select, MenuItem } from "@material-ui/core";
import Amplify, { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesAuthUsers";

function App({close}) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [firstName, setName] = useState('');
  const [lastName, setSurname] = useState('');
  const [, setLoading] = useState(true);
  const [setUserCompany] = useState([]);
  const [designation, setDesignation] = useState('');
  const [contactable, setContactbale] = useState('Yes');
  const [cellNumber, setCellNumber] = useState('');
  const [office_number, setOfficeNumber] = useState('');
 
  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            }
          }
          API.get(ApiData.name, "/list-companies", options).then(res => {
            setUserCompany(res.data.body)
          }).catch(error => {
            console.log(error.response)
          }).finally(() => setLoading(false))

        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setLoading, setUserCompany]);

  Amplify.configure({Auth: config.AuthDetails});
    const onSubmit = event => {
      event.preventDefault();
      setLoading(true);
      try {
        const ApiData = config.APIDetails.endpoints[0]
        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
             body : {
              name: firstName,
              surname: lastName,
              phone: cellNumber,
              email: email,
              contactable: contactable,
              office_number: office_number,
              designation: designation,
              objectSchemaId: "3",
          },
            response: true,
            headers: {
              Authorization: jwtToken,
            }
          }
          API.put(ApiData.name, "/taco-create-insights", options).then(res => {
            close();
            setLoading(false);
          }).catch(error => {
            setLoading(false);
            console.log(error.response)
          }).finally(() => setLoading(false))
        });
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div>
    <main className={classes.layoutCreateAuth}> 
      <Paper className={classes.paper2}>
        <h3 className="loginTitle2">Create Authorised User</h3>
      </Paper>     
        
    <Paper className={classes.paperCreateAuth}>
          <form onSubmit={onSubmit}>
          <h6 className="detailHead2">First Name</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={firstName}
              onChange={(e)=> setName(e.target.value)}
              placeholder="First Name"
            />
            <h6 className="detailHead2">Last Name</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={lastName}
              onChange={(e)=> setSurname(e.target.value)}
              placeholder="Last Name"
            />
            <h6 className="detailHead2">Title/Designation</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={designation}
              onChange={(e)=> setDesignation(e.target.value)}
              placeholder="Title/Designation"
            />
            <h6 className="detailHead2">Email Address</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <h6 className="detailHead2">Cell Number</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={cellNumber}
              onChange={(e)=> setCellNumber(e.target.value)}
              placeholder="Cell Number"
            />
            <h6 className="detailHead2">Office Number</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={office_number}
              onChange={(e)=> setOfficeNumber(e.target.value)}
              placeholder="Office Number"
            />
          <h6 className="detailHead2">Contactable</h6>

          <Select
            value={contactable}
            className={classes.select}
            onChange={(e)=> setContactbale(e.target.value)}
            label="contactable">
              <MenuItem value='Yes'>Yes</MenuItem>
              <MenuItem value='No'>No</MenuItem> 
          </Select> 
            
                <Button fullWidth variant="contained" className={classes.buttonCreateAuth} onClick={close} >CANCEL</Button>                              
                <Button fullWidth variant="contained" className={classes.button1CreatAuth} type="submit">CREATE USER</Button>
              </form>                      
        </Paper> 
    </main>
    </div> 
  );
}

export default App;