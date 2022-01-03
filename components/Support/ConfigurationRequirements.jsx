import React from "react";
import Amplify, { Auth } from 'aws-amplify';
import config from "UserPoolAmplify";

const url = "https://jira.obsidian.co.za/s/c9a3ccd810da47dad462213ef8e337dd-T/-dsuuup/808001/6411e0087192541a09d88223fb51a6a0/4.0.0/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=7088bcd0";

export default () => {
    React.useEffect(() => {
      (Auth.currentUserPoolUser().then(data =>{
        const script = document.createElement("script");
    
        script.src = url;
        script.async = true;
    
        document.body.appendChild(script);
        window.ATL_JQ_PAGE_PROPS = {
          triggerFunction: function (showCollectorDialog) {
            showCollectorDialog();
          },
          fieldValues: {
            fullname : '',
            email :  data.attributes["email"]
         }
        };
      }))
      .catch(e => {
                   console.error(e);
                })
    }, []);
    
    React.useEffect(() => {
      console.log(window.ATL_JQ_PAGE_PROPS)
    })
    return null;
  };