import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./useStylesNodeMan";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import * as XLSX from 'xlsx';
import { Paper, Grid } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import Spinner from '../User/Spinner'

export default () => {
  const [ ,setColumns] = useState([]);
  const [ ,setData] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const [uploadLabel,setUploadLabel] = useState('Upload a file');
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]"(?:(?:[^"]"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]"(?:(?:[^"]"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]
        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken,
              Accept: "application/json"
            },
            body: {
              csvData: list
            }
          }
          API.post(ApiData.name, '/node-config/upload?action=create', options).then(res => {
            if(res !== 'success'){
              setErrorMsg(res)
            }
            else{
              setErrorMsg('')
              setSuccessMsg('Success')
              history.push("/finishednodeadd") 
            }
            
          }).catch(error => {
            console.log(error.response)
          }).finally(() => {setLoading(false)})
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }

  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  // handle file upload
  const handleFileUpload = e => {
    setLoading(true);
    const file = e.target.files[0];
    e.target.value = null;
    setUploadLabel(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }
  return (
    <div>
     {loading ? <Spinner/> :
    <main className={classes.layout}>
   
      <Paper className={classes.paper}>
        <h1 align="center">Upload CSV</h1>
      </Paper>

      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <h3 style={{fontWeight:400}} align="center">Please upload a CSV file in order to add your nodes</h3>
          
          <div className={classes.uploadErrorMessage}>{errorMsg}</div>
          <div className={classes.uploadSuccessMessage}>{successMsg}</div>
          <label onClick={handleClick} className={classes.addNodeButtonInput}>
            <BackupIcon className={classes.uploadIcon}/>
            <span className={classes.uploadLabel}>{uploadLabel}</span>
          </label>
          <input 
            type="file"
            accept=".csv"
            ref={hiddenFileInput}
            style={{display:'none'}}
            onChange={handleFileUpload}
          />

          <Button className={classes.homeButton} onClick={() => { history.push("/nodeManagement") }}>DONE</Button>
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </Paper>

    </main>
  }
  </div>
  );
};
