import React, { useState, useEffect } from 'react';
import "../../../../obs-cocoa-react/src/index.scss";
import { TextField, Button, Paper, Grid } from "@material-ui/core";
import tacologonew from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import config from "UserPoolAmplify";
import TopToolbar from "components/DashboardPage/TopToolbar";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { API } from 'aws-amplify';
import Spinner from "components/User/Spinner";
import useStyles from "./useStylesLogin";
import BackupIcon from '@material-ui/icons/Backup';

export default () => {
    const [returnText,setReturnText] = useState('');
    const [lambdaError,setLambdaError] = useState(false);
    const [old_org_name,setOld_org_name]  = useState('');
    const [old_company_key,setOld_company_key]  = useState('');
    const [insights_name,setinsights_name] = useState('');
    const history = useHistory();
    const classes = useStyles();
    const [msp ,setMsp] = useState(true);
    const [companyName, setCompanyName] = useState('');
    const [companyReg, setCompanyReg] = useState('');
    const [companyVat, setCompanyVat] = useState('');
    const [customerKey, setCustomerKey] = useState('');
    const [companyServiceKey, setCompanyServiceKey] = useState('');
    const [organisationId, setOrganisationId] = useState('');
    const [mspClient, setMspClient] = useState('');
    const [chefOrgName, setChefOrgName] = useState('');
    const [loading, setLoading] = useState(true)
    const [roles, setRoles] = useState(["false"])
    const [errorOnLambda, setErrorOnLambda] = useState('Company Already Exists');
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [error, setError] = useState(null);
    const [companyEmail, setCompanyEmail] = useState('');

    const [uploadLabel,setUploadLabel] = useState(<><span> Click to upload image</span></>);
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const types = [".png", ".jpeg", ".jpg"];

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
          reject(error);
        }
      })
    }
    
    const handleChange = async (e) => {
      try{
        const selectedFile = e.target?.files[0];
        e.target.value = null;
        setUploadLabel(selectedFile.name);
        const base64Image = await convertBase64(selectedFile);
        setFile(base64Image);
        setFileType(selectedFile.type)
      }catch(e)
      {
        console.log(e)
      }
    
    }
    
    useEffect(() => {
      (async () => {
        try {
          const ApiData = config.APIDetails.endpoints[0]
          const cognitoUser = await Auth.currentAuthenticatedUser();
          const currentSession = await Auth.currentSession();
          cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
          const { idToken } = session;

          let jwtToken = idToken.jwtToken;
          
            const options = {
              headers: {
                Authorization: jwtToken
              }
            }
            API.get(ApiData.name, `/users/cognito-retrieve`, options).then(res => {
            console.log("result for cognito",res)
             setRoles(res.roles.split(","));
             if (res.profile === "GlobalAdmin"){
             setMsp(!msp)
             }
            }).catch(error => {
              console.log(error.response)
            })
  
          });
        } catch (err) {
          console.log(err);
        }
      })();
        (async () => {
            try {
              const ApiData = config.APIDetails.endpoints[0]
              const cognitoUser = await Auth.currentAuthenticatedUser();
              const currentSession = await Auth.currentSession();
             
              cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
                const { idToken } = session;

                let jwtToken = idToken.jwtToken;
                
                  const options = {
                    headers: {
                      Authorization: jwtToken,
                    }
                  }
                  API.get(ApiData.name, `/company/details`, options).then(res => {
                      setCustomerKey(res[0]);
                      setCompanyName(res[1])
                      setCompanyReg(res[2])
                      setCompanyVat(res[3])
                      setCompanyServiceKey(res[4])
                      setOrganisationId(res[5])
                      setMspClient(res[6])
                      setCompanyEmail(res[17])
                      setChefOrgName(res[18])
                      setOld_org_name (res[18])
                      setOld_company_key(res[0])
                      setinsights_name(res[19])


                  }).catch(error => {
                    console.log(error.response)
                  }).finally(() => {
                      setLoading(false);})
              });
              
            } catch (err) {
              console.log(err);
            }
          })();
    }, []);

    const editDetails = () => {

    setLoading(true)
    let company_details= {
      name: companyName,
      old_company_key:old_company_key,
      old_org_name : old_org_name,
      regestration: companyReg,
      email: companyEmail,
      vat: companyVat,
      chefOrgName: chefOrgName,
      customerkey: customerKey,
      servicekey: companyServiceKey,
      insight:insights_name,
      orgid: organisationId,
      ismsp: mspClient,
      logo: file,
      filetype: fileType,

    };
    

    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            },
            body:company_details
          }
            API.post(ApiData.name, `/company/update`, options).then(res => {
            setReturnText(res);
            console.log("result from upDATE",res)
            setLoading(false);
            if (lambdaError == false){
              history.push("/dashboard")
            }
          }).catch(error => {
            setLoading(false);
            setLambdaError(!lambdaError) 
            setErrorOnLambda(error.response.data)
          })
        });
      } catch (err) {
        setLoading(false);
        setLambdaError(!lambdaError) 
        console.log(error.response.data);
      }
    })();
  }
  console.log(returnText)
    return (
        <main>
            <TopToolbar />
            <img className="logo" src={tacologonew} alt="Obsidian logo" />
            {loading ? <Spinner/> :
            <Paper className={classes.paperClass}>
                <h1 className={classes.edtCompanyTitle}>Edit Company</h1>
                <h1 className={classes.edtCompanyTitle}>{returnText}</h1>
                <Grid className={classes.edtCompanyGrid}>
                        <form onSubmit={() => editDetails()}>
                          <Grid item xs={12}>
                            <TextField fullWidth onChange={e=>setCompanyName(e.target.value)} value={companyName} required  label="Company Name" className={classes.textFieldEdit} variant="filled" size="small" />

                            <TextField fullWidth onChange={e => setCompanyEmail(e.target.value)} value={companyEmail} required label="Company Email" className={classes.textFieldEdit} variant="filled" size="small" />

                            <TextField fullWidth onChange={e=>setCompanyReg(e.target.value)} value={companyReg} label="Company Registration No." className={classes.textFieldEdit} variant="filled" size="small" />

                            <TextField fullWidth onChange={e=>setCompanyVat(e.target.value)} value={companyVat} label="VAT No." className={classes.textFieldEdit} variant="filled" size="small" />

                            <TextField fullWidth onChange={e=>setCustomerKey(e.target.value)} disabled={msp} value={customerKey} label="Customer Key" className={classes.textFieldEdit} variant="filled" size="small" />

                            <TextField fullWidth onChange={e=>setinsights_name(e.target.value)} disabled={msp} value={insights_name} label="Insights Company Name" className={classes.textFieldEdit} variant="filled" size="small" />

                            { lambdaError ?
                <label className={classes.errlabel} component="legend">{errorOnLambda}</label> :null  }
                            <TextField fullWidth onChange={e => setChefOrgName(e.target.value.toLowerCase())} required value={chefOrgName} label="Chef Organization Name" className={classes.textFieldEdit} variant="filled" size="small" />                            

                            {roles[0] === "true" ? 
                              <TextField fullWidth onChange={e=>setCompanyServiceKey(e.target.value)} value={companyServiceKey} label="Company Service Key" className={classes.textFieldEdit} variant="filled" size="small" />
                              :
                              <TextField fullWidth onChange={e=>setCompanyServiceKey(e.target.value)} disabled={true} value={companyServiceKey} label="Company Service Key" className={classes.textFieldEdit} variant="filled" size="small" />
                            }
                            {roles[0] === "true"?
                              <TextField fullWidth onChange={e=>setOrganisationId(e.target.value)} value={organisationId} label="Organisation ID" className={classes.textFieldEdit} variant="filled" size="small" />
                              :
                              <TextField fullWidth onChange={e=>setOrganisationId(e.target.value)} disabled={true} value={organisationId} label="Organisation ID" className={classes.textFieldEdit} variant="filled" size="small" />
                            }

                            <FormControlLabel
                                value=""
                                control={
                                <Checkbox className={classes.checkBox} onChange={e=>setMspClient(e.target.checked)} checked={mspClient} variant="filled" size="medium" />}
                                color="primary"
                                labelPlacement="end"
                                label={<span style={{fontSize: '18px'}}>MSP Client</span>}
                                className={classes.MSPLabel}
                            />
                            </Grid>

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
                                accept={types}
                                ref={hiddenFileInput}
                                style={{display:'none'}}
                                onChange={handleChange}
                              />
                            </Grid>
                            <span className={classes.sizeSpan}>350px x 150px Max Size</span>

                            <Grid container item xs={12}
                                direction="row"
                                alignItems="center"
                                justify="center"
                                className={classes.buttonLayout}>
                                <Grid item xs={6} className={classes.buttonLayout}>
                                  <Button fullWidth variant="contained" className={classes.edtCancelBtn} type="button" onClick={() => { history.push("index#") }}>CANCEL</Button>
                                </Grid>
                                <Grid item xs={6} className={classes.buttonLayout}>
                                  <Button fullWidth variant="contained" className={classes.edtSubmitBtn} style={{margin: "0px", fontSize: "12px"}} type="submit">SAVE</Button>
                                </Grid>
                            </Grid>
                        </form>
                </Grid>
            </Paper>
            }
        </main>
    );
};