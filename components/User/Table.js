import React, { useEffect, useState } from "react";
import { Button, TableContainer, Paper, Grid, Typography, TableHead, TableRow, 
  TableBody, Chip, TableCell, TablePagination, Checkbox, TextField, } from "@material-ui/core";
import EditUser from "./EditUser";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";
import UserPool from "UserPool";
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "./useStylesUser";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function App({ userdata }) {
  const history = useHistory();
  const classes = useStyles();
  const [rowData, setRowData] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [edit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [checked, setChecked] = useState([]);
  const [off, setOff] = useState(true);
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [ ,setAuth] = useState("");
    // TODO: Warning (Indicated below)S
  const userID = UserPool['userPoolId'];


  const listUsers = async() =>{
    setChecked([]);
    setOff(true);
    try {
      const ApiData = config.APIDetails.endpoints[0]
      const user = await Auth.currentAuthenticatedUser();
      let jwtToken = user.signInUserSession.idToken.jwtToken;
      setAuth(jwtToken);
      const options = {
        response: true,
        headers: {
          Authorization: jwtToken
        }
      }
      const userData = await API.get(ApiData.name, "/list-users", options);
      setRowData(userData.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await listUsers()
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const checkRow = (index) => {
    let selectedCount = 0;
    if (!checked.includes(index)) {
      setChecked([...checked,index]);
      selectedCount = checked.length+1
    } else {
  
      let newArr = checked;
      let remove = newArr.indexOf(index);
      setNum(0);

      newArr.splice(remove, 1);
      setChecked([...newArr]);
      selectedCount = newArr.length
    }

    if (selectedCount === 1) {
      setOff(false)
    } else 
    { 
      setOff(true)
    }
  };

  function addUser() {
    history.push("/SignUp");
  }

  const editUser = () => {
    checked.forEach((index) => {
      setSelectedUser(rowData.filter((user) => {
        if (searchUser.length < 2) return true
        return (
          user.Email.includes(searchUser)
        );
      })[index]);
    });
    setEdit(true);
  };

  const bulkDisable = () => {
    setLoading(true);
    let users = [];
    let userData = {};

    checked.forEach((index) => {
      userData = {
        'userEmail': rowData[index].Email,
        'userStatus': rowData[index].Enabled
      }
      users.push(userData);
    });

      (async () => {
        try {
          const ApiData = config.APIDetails.endpoints[0]
          const user = await Auth.currentAuthenticatedUser();
          let jwtToken = user.signInUserSession.idToken.jwtToken;
            const options = {
              body:{
                'data': users,
              },
              headers: {
                Authorization: jwtToken,
              }
            }
          await API.put(ApiData.name, `/users/cognito-update?changeStatus=update`, options);
          await listUsers();
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
  };

  const closeEdit = () => {
    setEdit(false);
    setSearchUser("");
  }

  checked.forEach((index) => {});
  if (edit) {
    return (<EditUser user={selectedUser} close={closeEdit} />);
  };

  return (
    <main className={classes.layout}>
      <div>
        <Grid>
          <Grid container xs={12} direction="row" className={classes.nav}>
            <Grid item xs={10} md={11}>
              <TextField
                variant="filled"
                size="small"
                className={classes.textFieldTable}
                label="Search"
                onChange={(event) => setSearchUser(event.target.value)}
              />
            </Grid>
          </Grid>

          <Paper className={classes.paper2}>
            <h3 className="loginTitle2"> User Info </h3>
          </Paper>

          <Grid
            container
            direction="row"
            alignItems="flex-end"
            justify="flex-end"
            //spacing="1"
            className={classes.btnSpacing}
          >
            <Grid item xs={4} lg={4}>
              <Button fullWidth variant="contained" className={classes.button1} onClick={bulkDisable}>ACTIVATE/DEACTIVATE</Button>
            </Grid>

            <Grid item xs={4} lg={4}>
              <Button fullWidth variant="contained" className={classes.button2Table} disabled={off} onClick={editUser}>EDIT</Button>
            </Grid>

            <Grid item xs={4} lg={4}>
              <Button fullWidth variant="contained" className={classes.button3Table} onClick={addUser}>(+)</Button>
            </Grid>
          </Grid>

          {loading ? <Spinner /> :
            // <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table}>

                <Thead>
                  <Tr className={classes.tableHead}>
                    <Th align="center" className={classes.tableContent}>Selected</Th>
                    <Th align="left" className={classes.tableContent}>Email</Th>
                    <Th align="center" className={classes.tableContent}>Status</Th>
                  </Tr>
                </Thead>

                <Tbody className={classes.tableBody}>
                  {rowData &&
                    rowData.filter((user) => {
                      if (searchUser.length < 2) return true
                      return (
                        user.Email.includes(searchUser)
                      );
                    })

                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {

                      return (
                          <Tr key={index} className={classes.tableBody}>
                            <Td className={classes.tableContent} align="center">
                              <Checkbox
                                inputProps={{ "aria-label": "primary checkbox" }}
                                checked={checked.indexOf(index) !== -1}
                                onClick={() => {
                                  checkRow(index);
                                }}
                                className={classes.checkBox}
                              />
                            </Td>

                            <Td className={classes.tableContent}>
                              <Typography className={classes.tableBody}>
                                {user.Email}
                              </Typography>
                            </Td>

                            <Td align="center" className={classes.tableContent}>
                              {user.Enabled ? (
                                <Chip
                                  variant="outlined"
                                  label="active"
                                  className={classes.activate}
                                />
                              ) : (
                                  <Chip
                                    variant="outlined"
                                    label="deactive"
                                    className={classes.deactivate}
                                  />
                                )}
                            </Td>

                          </Tr>
                        );
                      })}
                </Tbody>
              </Table>}
        </Grid>
      </div>
    </main>
  );
}

export default App;
