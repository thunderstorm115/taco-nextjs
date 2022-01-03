import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";
import useStyles from "./useStylesLogin";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import Amplify, { Auth } from 'aws-amplify';
import Spinner from "components/User/Spinner";
import { useHistory } from "react-router-dom";

export default () => {
    const classes = useStyles();
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();



    useEffect(() => {

        (async () => {
            try {
                setLoading(true);
                const ApiData = config.APIDetails.endpoints[0]

                Auth.currentAuthenticatedUser().then((user) => {
                    // setCompany(user)
                    let jwtToken = user.signInUserSession.idToken.jwtToken;
                    const options = {
                        response: true,
                        headers: {
                            Authorization: jwtToken
                        }
                    }

                    API.get(ApiData.name, `/get-slas-breached`, options).then(res => {
                        setInfo(res);
                        
                        setLoading(false);
                    }).catch(error => {

                        console.log(error.response)
                    })
                });
            } catch (err) {
                console.log(err);
            }
        })();
    },);

    function timeSpent(first, date) {
      var d1 = new Date(date.slice(0, 19));
      var d2 = new Date(first.slice(0, 19));
      var date = new Date(d2-d1);
      var hour = date.getUTCHours();
      var min = date.getUTCMinutes();
      var sec = date.getUTCSeconds();
      var day = date.getUTCDate() - 1;
    
        return   hour + " Hrs " + min + " Min"
      }
    
 
    function msToHMS( millisec ) {

      var seconds = (millisec / 1000).toFixed(0);
      var minutes = Math.floor(seconds / 60);
      var hours = "";
      if (minutes > 59) {
          hours = Math.floor(minutes / 60);
          hours = (hours >= 10) ? hours : "0" + hours;
          minutes = minutes - (hours * 60);
          minutes = (minutes >= 10) ? minutes : "0" + minutes;
      }
      else{
        hours = 0
      }
  
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : "0" + seconds;
      if (hours !== "") {
          return hours + " Hrs " + minutes + " Min";
      }
      return hours + " Hrs " + minutes +" Min "+ seconds + " Sec";
  }


    function dhm(t) {
        var utcSeconds = t;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        var trimmedString = d.toString().substring(4, 25);
        return trimmedString;
    }


    return (
    
      <Grid //Gloal grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.layout2}
      >

        <Grid //Card Grid
          container
          display="flex"
          alignItems="stretch"
          className={classes.graphTaskSort}
        >

        

        </Grid>
      </Grid>

   
  );
};
