import React from "react";
import { Account } from 'components/LoginPage/Accounts';
import Settings from 'components/LoginPage/Settings';
import {Paper} from "@material-ui/core";
import TopToolbar from "components/DashboardPage/TopToolbar";
import useStyles from './useStylesSettings';

export default () => {
  const classes = useStyles();
  return (
    <div>
      <TopToolbar />
        <main className={classes.layout}>
            <Paper className={classes.paper2}>
                <h3 className="loginTitle2"> Profile Settings </h3> 
            </Paper>
                <Account>  
                    <Settings />
                </Account>
        </main>
    </div>
  );
};