import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Spinner from "./Spinner";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import useStyles from "./useStylesUser";
import { useHistory } from 'react-router-dom';

function EditUser({ user, close }) {
  const classes = useStyles();
  const history = useHistory();
  const [userRights, setUserRights] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [companyKey, setCompanyKey] = useState("");
  const [userAdminRights, setUserAdminRights] = useState("");
  const [userCompanies, setUserCompanies] = useState([]);
  const [mspRole, setMspRole] = useState(false);
  const [infraRole, setInfraRole] = useState(false);
  const [compRole, setCompRole] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleChange = (event) => {
    if (event.target.name === "MSP") {
      setMspRole(!mspRole);
    }
    if (event.target.name === "Infra") {
      setInfraRole(!infraRole);
    }
    if (event.target.name === "Compliance") {
      setCompRole(!compRole);
    }
  };

  const listUsers = async() =>{
    // setChecked([]);
    // setOff(true);
    try {
      const ApiData = config.APIDetails.endpoints[0]
      const user = await Auth.currentAuthenticatedUser();
      let jwtToken = user.signInUserSession.idToken.jwtToken;
      // setAuth(jwtToken);
      const options = {
        response: true,
        headers: {
          Authorization: jwtToken
        }
      }
      const userData = await API.get(ApiData.name, "/list-users", options);
      setUserData(userData.data)
      // setRowData(userData.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userData)

  useEffect(() => {
    (async () => {
      try {
        listUsers();
        setLoading(true);
        const ApiData = config.APIDetails.endpoints[0];
        const user = await Auth.currentAuthenticatedUser();
        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          },
        };
        const results = await API.get(ApiData.name, "/list-companies", options);
        console.log(results)
        let company_names = []
        results.data.map((res) => {
          console.log("res",res)
          company_names.push(res.id)
            setCompanyKey(res.project);
            console.log(company_names);
          })
        setUserCompanies(company_names)
      } catch (err) {
        console.log(err);
      }
    })().finally(() => {
      setLoading(false);
    });;

    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        cognitoUser.refreshSession(
          currentSession.refreshToken,
          (err, session) => {
            const { idToken } = session;
            let jwtToken = idToken.jwtToken;
            const options = {
              headers: {
                Authorization: jwtToken,
              },
            };
            API.get(ApiData.name, `/users/cognito-retrieve`, options)
              .then((res) => {
                setUserAdminRights(res.profile);
                setUserRights(user.profile);
                setCompanyName(user.Company_Name);
                let userroles = user.User_Roles.split(",");
                if (userroles[0] === "true") {
                  setMspRole(true);
                }
                if (userroles[1] === "true") {
                  setInfraRole(true);
                }
                if (userroles[2] === "true") {
                  setCompRole(true);
                }
              })
              .catch((error) => {
                console.log(error.response);
              })
          }
        );
      } catch (error) {
        console.log(error.response);
      }
    })()
  }, [user.Admin_Rights, user.Company_Name, user.User_Roles]);

console.log(userRights);



  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();

        cognitoUser.refreshSession(
          currentSession.refreshToken,
          (err, session) => {
            const { idToken } = session;
            let jwtToken = idToken.jwtToken;
            const options = {
              body: {
                "custom:company_name": companyName,
                "custom:company_key": companyKey,
                profile: userRights,
                "custom:organization_name": companyName
                  .toLowerCase()
                  .replace(/ /g, "_"),
                "custom:roles": `${mspRole},${infraRole},${compRole}`,
                currentRights: userRights,
              },
              headers: {
                Authorization: jwtToken,
              },
            };

            API.put(
              ApiData.name,
              `/users/cognito-update?email=${user.Email}`,
              options
            )
              .catch((error) => {
                console.log(error.response);
              })
              .finally(() => {
                setLoading(false);
                window.location.reload();
              });
          }
        );
      } catch (err) {
        console.log(err);
      } finally {
        
        history.push("/settings");
        history.push("/user");
      }
    })();
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper2}>
        <h3 className="loginTitle2"> User Info </h3>
      </Paper>

      {loading ? (
        <Spinner />
      ) : (
        <Paper className={classes.paper}>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              className={classes.textField}
              variant="filled"
              size="small"
              value={user.Email}
              placeholder="Email"
              disabled="true"
            />
            <h6 className="detailHead2">Admin Rights</h6>
            {userRights !== "GlobalAdmin" ? (
              <Select
                id="right"
                value={userRights === "" ? user.Admin_Rights : userRights}
                className={classes.select}
                classes={{
                  root: classes.whiteColor,
                  icon: classes.whiteColor,
                }}
                onChange={(e) => setUserRights(e.target.value)}
                label="right"
                inputProps={{
                  group: "group",
                  id: "outlined-age-native-simple",
                }}
              >
                {userAdminRights === "GlobalAdmin" && (
                  <MenuItem className={classes.label2} value="GlobalAdmin">
                    Global Admin
                  </MenuItem>
                )}
                <MenuItem className={classes.label2} value="CompanyAdmin">
                  Company Admin
                </MenuItem>
                <MenuItem className={classes.label2} value="User">
                  User
                </MenuItem>
              </Select>
            ) : (
              <TextField
                fullWidth
                className={classes.textField}
                variant="filled"
                size="small"
                value="Global Admin"
                disabled="false"
              />
            )}
            <h6 className="detailHead2">Company</h6>
            {/* {userData.map((res) => (
                  res.Email === user.Email ? 
                    <Select
                    id="company"
                    value={res.Company_Name}
                    className={classes.select}
                    classes={{ root: classes.whiteColor, icon: classes.whiteColor }}
                    onChange={(e) => setCompanyName(e.target.value)}
                    label="company"
                    inputProps={{
                      group2: "group2",
                      id: "outlined-age-native-simple2",
                    }}
                  >
                    {userAdminRights === "GlobalAdmin" || userAdminRights === "CompanyAdmin"
                      ? userCompanies
                        ? userCompanies.map((res) => (
                            <MenuItem className={classes.label2} value={res}>
                              {res}
                            </MenuItem>
                          ))
                        : null
                      : null}
                  </Select>
            :null))} */}
            <Select
              id="company"
              value={companyName}
              className={classes.select}
              classes={{ root: classes.whiteColor, icon: classes.whiteColor }}
              onChange={(e) => setCompanyName(e.target.value)}
              label="company"
              inputProps={{
                group2: "group2",
                id: "outlined-age-native-simple2",
              }}
            >
              {userAdminRights === "GlobalAdmin" || userAdminRights === "CompanyAdmin"
                ? userCompanies
                  ? userCompanies.map((res) => (
                      <MenuItem className={classes.label2} value={res}>
                        {res}
                      </MenuItem>
                    ))
                  : null
                : null}
            </Select>

            <h6 className="detailHead2">Role</h6>

            <div>
              <FormControlLabel
                className={classes.checkBox}
                control={
                  <Checkbox
                    className={classes.checkBox}
                    checked={mspRole}
                    onChange={handleChange}
                    name="MSP"
                  />
                }
                label="MSP"
              />
              <FormControlLabel
                className={classes.checkBox}
                control={
                  <Checkbox
                    className={classes.checkBox}
                    checked={infraRole}
                    onChange={handleChange}
                    name="Infra"
                  />
                }
                label="Infrastructure"
              />
              <FormControlLabel
                className={classes.checkBox}
                control={
                  <Checkbox
                    className={classes.checkBox}
                    checked={compRole}
                    onChange={handleChange}
                    name="Compliance"
                  />
                }
                label="Compliance"
              />
            </div>

            <Button
              fullWidth
              variant="contained"
              className={classes.button}
              onClick={close}
            >
              CANCEL
            </Button>

            <Button
              fullWidth
              variant="contained"
              className={classes.button2}
              type="submit"
            >
              SAVE
            </Button>
          </form>
        </Paper>
      )}
    </main>
  );
}
export default EditUser;
