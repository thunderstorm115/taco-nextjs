import React, { useState } from 'react';
import "../../../../obs-cocoa-react/src/index.scss";
import { TextField, Button, Paper, Grid ,FormLabel} from "@material-ui/core";
import tacologonew from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import config from "UserPoolAmplify";
import TopToolbar from "components/DashboardPage/TopToolbar";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { API } from 'aws-amplify';
import Spinner from "components/User/Spinner";
import useStyles from "./useStylesCompany";
import BackupIcon from '@material-ui/icons/Backup';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { convertBase64 } from './ConvertBase64';

export default () => {
  const history = useHistory();
  const [lambdaError,setLambdaError] = useState(false);
  const classes = useStyles();
  const [fileType, setFileType] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyReg, setCompanyReg] = useState('');
  const [companyVat, setCompanyVat] = useState('');
  const [customerKey, setCustomerKey] = useState('');
  const [chefOrgName, setChefOrgName] = useState('');
  const [companyServiceKey, setCompanyServiceKey] = useState('');
  const [organisationId, setOrganisationId] = useState('');
  const [insights_name,setinsights_name] = useState('');
  const [mspClient, setMspClient] = useState('');
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [companyEmail, setCompanyEmail] = useState('');
  const [errorOnLambda, setErrorOnLambda] = useState('Company Already Exists');

  const [uploadLabel, setUploadLabel] = useState(<><span >Drag and drop file here or</span> <span> click to upload image</span></>);
  const [errorMsg, setErrorMsg] = useState('')
  const [companyErrorMsg, setCompanyErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')


  const types = ["image/png", "image/jpeg", "image/jpg"];

  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target?.files[0];
    const base64 = convertBase64(selectedFile);

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile(base64);
        setFileType(selectedFile.type)
        setUploadLabel(<span>Image succesfully uploaded</span>)
      } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
      }
    }
  }

  const addDetails = () => {
    setLambdaError(true)
    setLoading(true);
    let newKey = customerKey.toLowerCase().replace(/ /g, "_")
    let company_details = companyName + "," + companyEmail + "," + companyReg + "," + companyVat + "," + newKey + "," + companyServiceKey + "," + organisationId + "," + mspClient + "," + file;
    (async event => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const cognitoUser = await Auth.currentAuthenticatedUser(); 
          let jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            },
            body:{
              "customerkey":newKey,
              "name":companyName,
              "regestration":companyReg,
              "email":companyEmail,
              "vat":companyVat,
              "chefOrgName":chefOrgName,
              "servicekey":companyServiceKey,
              "orgid":organisationId,
              "logo":file,
              "filetype":fileType,
              "ismsp":mspClient, 
              "insight":insights_name,
              "insert":true
            }
          } 
          
          try{
            await API.post(ApiData.name, `/company/update?company_details=${company_details}`, options).then (res => {
              setLoading(false);
              history.push("/dashboard")
            })
          }catch(err){
            console.log('run error');
            console.log(err.response.data);
            setLoading(false);
            setLambdaError(true);
            setCompanyErrorMsg(err.response.data);
          }
          
      }
      catch (err) {
        console.log('run error: ', err);
      }
    })();
    Amplify.configure({ Auth: config.AuthDetails });
  }

  console.log(lambdaError)



  return (
    <main >
      <TopToolbar />
      <img className="logo" src={tacologonew} alt="Obsidian logo" />
      {loading !== true ?
        <Paper className={classes.paperAddCo}>
          <h1 className={classes.loginTitle}>Add Company</h1>
          <Grid className={classes.addCompany}>
            <Grid item xs={12}>
              <form onSubmit={() => addDetails()}>


                <TextField fullWidth onChange={e => setCompanyName(e.target.value)} value={companyName} required label="Company Name" className={classes.textField} variant="filled" size="small" />

                <TextField fullWidth onChange={e => setCompanyEmail(e.target.value)} value={companyEmail} required label="Company Email" className={classes.textField} variant="filled" size="small" />

                <TextField fullWidth onChange={e => setCompanyReg(e.target.value)} value={companyReg} label="Company Registration No." className={classes.textField} variant="filled" size="small" />

                <TextField fullWidth onChange={e => setCompanyVat(e.target.value)} value={companyVat} label="VAT No." className={classes.textField} variant="filled" size="small" />
                { lambdaError ?
                <label className={classes.label} component="legend">{companyErrorMsg}</label> :null  }
                <TextField fullWidth onChange={e => setChefOrgName(e.target.value.toLowerCase())} required value={chefOrgName} label="Chef Organization Name" className={classes.textField} variant="filled" size="small" />

                {/* <TextField fullWidth onChange={e => setChefOrgName(e.target.value)} required value={chefOrgName} label="Chef Organization Name" className={classes.textField} variant="filled" size="small" /> */}

                <TextField fullWidth onChange={e => setCustomerKey(e.target.value)} value={customerKey} label="Customer Key" className={classes.textField} variant="filled" size="small" />
        
                <TextField fullWidth onChange={e => setCompanyServiceKey(e.target.value)} value={companyServiceKey} label="Company Service Key" className={classes.textField} variant="filled" size="small" />

                <TextField fullWidth onChange={e => setOrganisationId(e.target.value)} value={organisationId} label="Organisation ID" className={classes.textField} variant="filled" size="small" />

                <TextField fullWidth onChange={e => setinsights_name(e.target.value)} value={insights_name} label="Insights Company Name" className={classes.textField} variant="filled" size="small" />

                <FormControlLabel
                  value=""
                  control={<Checkbox className={classes.checkBox} onChange={e => setMspClient(e.target.checked)} checked={mspClient} variant="filled" size="medium" />}
                  color="primary"
                  labelPlacement="start"
                  label={<span style={{ fontSize: '18px' }}>MSP Client</span>}
                  className={classes.MSPLabel}
                />
                <div>
                  {loading || false ? <Spinner /> :
                    <main>
                       <h2 className={classes.uploadHeader}>Logo Upload</h2>
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justify="center"
                            >       
                              <div className={classes.uploadErrorMessage}>{errorMsg}</div>
                              <div className={classes.uploadSuccessMessage}>{successMsg}</div>

                              <label onClick={handleClick} className={classes.addNodeButtonInput}>
                                <BackupIcon className={classes.uploadIcon}/>
                                 <span className={classes.uploadLabel}>{uploadLabel}</span>
                              </label>

                              <input 
                                type="file"
                                accept="types"
                                ref={hiddenFileInput}
                                style={{display:'none'}}
                                onChange={handleChange}
                              />
                            </Grid>
                            <span className={classes.sizeSpan}>350px x 150px Max Size</span>

                    </main>
                  }
                </div>
                <Grid item xs={12}
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  className={classes.buttonLayout}>
                  <Grid item xs={6} className={classes.buttonLayout}>
                    <Button fullWidth variant="contained" className={classes.buttonCancel} type="button" onClick={() => { history.push("index#") }}>CANCEL</Button>
                  </Grid>
                  <Grid item xs={6} className={classes.buttonLayout}>
                    <Button fullWidth variant="contained" className={classes.buttonAddCo} type="submit" >SUBMIT</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
        : <Spinner />
      }
    </main>
  );
};