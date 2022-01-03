import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import TopToolbar from "components/DashboardPage/TopToolbar";
import Spinner from "components/User/Spinner";
import useStyles from "./useStylesLogin";
import { FormatListBulletedSharp } from "@material-ui/icons";

function App() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [company, setCompany] = useState();
  const [rights, setRights] = useState();

  const [alertLBL, setAlertLBL] = useState("");
  const [alertLBL2, setAlertLBL2] = useState("");
  const [alertPass, setAlertPass] = useState("");
  const [attError, setAttError] = useState(false);
  const [adminRights, setAdminRights] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userCompany, setUserCompany] = useState([]);

  const [role, setRole] = React.useState({
    MSP: false,
    Infra: false,
    Compliance: false,
  });

  const handleChange = (event) => {
    setRole({ ...role, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            },
          };
          API.get(ApiData.name, "/list-companies", options)
            .then((res) => {
              setUserCompany(res.data);
            })
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => setLoading(false));
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    Auth.currentUserPoolUser()
      .then((data) => {
        setCompanyName(data.attributes["custom:company_name"]);
        setAdminRights(data.attributes["profile"]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Original format below
    //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  };
  const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/;
    return re.test(String(password));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(email)
    // console.log(password)
    // console.log(role)
    // console.log(company)
    // console.log(rights)
    if (!email | !password | !role | !company) {
      setAttError(true);
    } else {
      if (validateEmail(email)) {
        setAlertLBL(null);
        setAlertPass(null);
        signUpTrial(email, password, role, company, rights);
      } else {
        setAlertLBL("Error, email address is not correct Format");
      }
    }
  };

  async function signUpTrial(username, password, role, company, rights) {
    try {
      setLoading(true);
      await Auth.signUp({
        username,
        password,
        attributes: {
          profile: rights,
          //phone_number: "",
          //name: company,
          "custom:organization_name": company,

          //'custom:roles': role,
          "custom:company_key": company.toLowerCase().replace(/ /g, "_"),

          "custom:roles": `${role["MSP"]},${role["Infra"]},${role["Compliance"]}`,
          //  //"custom:groups": admin,
          //  'custom:signup_details': `${company}, ${role}`
          //family_name: role,
          //middle_name:"none"
          "custom:Trial": "",
        },
      });
      setAlertLBL2("User has been added successfully");
      setAlertLBL2(null);
      setLoading(false);
      history.push("/user");
    } catch (error) {
      setLoading(false);
      if (validatePass(password)) {
        setAlertPass("Error, please check email and password");
      } else {
        setAlertPass("Error, password is not correct length or format");
      }

    }
  }

  function backBtn() {
    history.push("/user");
  }

  return (
    <div>
      <TopToolbar />
      <main className={classes.layout}>
        <Paper className={classes.paper2Signup}>
          <h3 className="loginTitle2">Create User</h3>
        </Paper>
        {loading ? (
          <Spinner />
        ) : (
          <Paper className={classes.paperSignup}>
            {attError ? (
              <h3 className="loginTitleErr">
                Please Ensure All Fields Are Completed
              </h3>
            ) : null}

            <form onSubmit={onSubmit}>
              <FormLabel
                className={classes.validation2Signup}
                component="legend"
              >
                {alertLBL2}
              </FormLabel>
              <TextField
                fullWidth
                type="email"
                required
                className={classes.textFieldSignUp}
                variant="filled"
                size="small"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                label="Email"
              />
              <FormLabel
                className={classes.validationSignup}
                component="legend"
              >
                {alertLBL}
              </FormLabel>

              <TextField
                fullWidth
                type="password"
                required
                className={classes.textFieldSignUp}
                variant="filled"
                size="small"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                label="Password"
              />
              <FormLabel
                className={classes.validationSignup}
                component="legend"
              >
                {alertPass}
              </FormLabel>

              <h6 className="detailHead2">Admin Rights</h6>

              <Select
                id="adminRights"
                value={rights}
                required
                className={classes.select}
                classes={{
                  root: classes.whiteColor,
                  icon: classes.whiteColor,
                }}
                // onChange={changeGroup}
                onChange={(event) => setRights(event.target.value)}
                label="adminRights"
                inputProps={{
                  group2: "group2",
                  id: "outlined-age-native-simple",
                }}
              >
                <MenuItem aria-label="None" value={rights} />
                {adminRights === "GlobalAdmin" ? (
                  <MenuItem className={classes.label2} value="GlobalAdmin">
                    Global Admin
                  </MenuItem>
                ) : null}
                s
                <MenuItem className={classes.label2} value="CompanyAdmin">
                  Company Admin
                </MenuItem>
                <MenuItem className={classes.label2} value="User">
                  User
                </MenuItem>
              </Select>

              <h6 className="detailHead2"> Company </h6>
              <Select
                id="companyNode"
                value={company}
                required
                className={classes.select}
                classes={{
                  root: classes.whiteColor,
                  icon: classes.whiteColor,
                }}
                // onChange={changeGroup}
                onChange={(event) => setCompany(event.target.value)}
                label="companyNode"
                inputProps={{
                  group: "group",
                  id: "outlined-age-native-simple",
                }}
              >
                <MenuItem aria-label="None" value={company} />
                {adminRights === "GlobalAdmin" ||
                adminRights === "CompanyAdmin" ? (
                  userCompany.map((res) => (
                    <MenuItem className={classes.label2} value={res.id}>
                      {res.id}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem className={classes.label2} value={companyName}>
                    {companyName}
                  </MenuItem>
                )}
              </Select>

              <h6 className="detailHead2">Role</h6>
              <div>
                <FormControlLabel
                  className={classes.checkBox}
                  control={
                    <Checkbox
                      className={classes.checkBox}
                      checked={role.MSP}
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
                      checked={role.Infra}
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
                      checked={role.Compliance}
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
                className={classes.buttonSignup}
                onClick={backBtn}
              >
                CANCEL
              </Button>
              <Button
                fullWidth
                variant="contained"
                className={classes.button1Signup}
                type="submit"
              >
                SIGN-UP
              </Button>
            </form>
          </Paper>
        )}
      </main>
    </div>
  );
}

export default App;
