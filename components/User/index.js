import React from "react";
import Table from "components/User/Table";
import TopToolbar from "components/DashboardPage/TopToolbar";
import useStyles from "./useStylesUser";

export default () => {
  const classes = useStyles();
  return (
    <div>
      <TopToolbar />
      <main className={classes.layoutIndex}>
        <Table />   
      </main>
    </div>
  );
};
