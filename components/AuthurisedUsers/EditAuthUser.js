import React, { useState } from "react";
import {TextField,Button,Paper,Grid,Select,MenuItem,FormLabel} from "@material-ui/core";
import Spinner from "components/User/Spinner";
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesAuthUsers";

function EditAuthUser({ user,close,index}) {
  
const classes = useStyles();
const [loading, setLoading] = useState(false);
const [name, setName] = useState(user[index]['firstName']);
const [surname, setSurname] = useState(user[index]['surname'])
const [cellNumber, setCellNumber] = useState(user[index]['cellNumber']);
const [email, setEmail] = useState(user[index]['email']);
const [object_key] = useState(user[index]['object_key']);
const [alertLBL, setAlertLBL] = useState('');
const [office_number, setOfficeNumber] = useState(user[index]['office_number']);
const [designation, setDesignation] = useState(user[index]['designation']);
const [contactable, setContactable] = useState('Yes');
const [ ,authorized_contact] = useState('Yes');

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const onSubmit = async (event) => {
  event.preventDefault();

  if (validateEmail(email)){
    try {
      const ApiData = config.APIDetails.endpoints[0]
      const user = await Auth.currentAuthenticatedUser();

      let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
           body : {
            objectTypeId: "30",
            objectSchemaId: "3",
            name: name,
            surname: surname,
            phone: cellNumber,
            email: email,
            object_key: object_key,
            contactable: contactable,
            authorized_contact: authorized_contact,
            office_number: office_number,
            designation: designation,

        },
          response: true,
          headers: {
            Authorization: jwtToken,
          }
        }
        await API.put(ApiData.name, "/taco-update-insights", options);
        close();
        window.location.reload();
     } catch(e){
       console.error(e);
     } finally {
      setLoading(false);
     }
} else {
  setAlertLBL("Error, email address is not correct Format")
}
}  
  
return (
  <main className={classes.layoutCreateAuth}>
    <Grid container direction="row" className={classes.nav}>
        <Grid item xs={10} md={11}>
        </Grid>
        <Grid item xs={2} md={1}>
        </Grid>
      </Grid>
      <Paper className={classes.paper2}>
          <h3 className="loginTitle2"> User Info </h3>
      </Paper>
      {loading ? <Spinner /> :
    <Paper className={classes.paperCreateAuth}>
          <form onSubmit={onSubmit}>
          <h6 className="detailHead2">First Name</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              placeholder="First Name"
            />
            <h6 className="detailHead2">Last Name</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={surname}
              onChange={(e)=>setSurname(e.target.value)}
              placeholder="Last Name"
  
            />
            <h6 className="detailHead2">Title/Designation</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={designation}
              onChange={(e)=>setDesignation(e.target.value)}
              placeholder="Title/Designation"
  
            />
            <h6 className="detailHead2">Email Address</h6>
            <FormLabel className={classes.validationSignup} component="legend">{alertLBL}</FormLabel>  
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <h6 className="detailHead2">Cell Number</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={cellNumber}
              onChange={e => setCellNumber(e.target.value)}
              placeholder="Cell Number"
            />
            <h6 className="detailHead2">Office Number</h6>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={office_number}
              onChange={(e)=>setOfficeNumber(e.target.value)}
              placeholder="Office Number"
            />
          <h6 className="detailHead2">Contactable</h6>
          <Select
            value={contactable}
            className={classes.select}
            onChange= {(e)=>setContactable(e.target.value)}
            label="contactable">
              <MenuItem value='Yes'>Yes</MenuItem>
              <MenuItem value='No'>No</MenuItem>
          </Select>
            <Button fullWidth variant="contained" className={classes.buttonEditAuth} onClick={close}>CANCEL</Button>
            <Button fullWidth variant="contained" className={classes.button1EditAuth} type="submit">SAVE</Button>
          </form>
    </Paper>
}
  </main>
);
}
export default EditAuthUser;