import React, { createContext, useEffect, useState } from 'react'
import Spinner from "../User/Spinner";
import { Button, TableContainer, Paper, Grid, Typography,
 TablePagination, Checkbox, TableCell} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditAuthUser from "./EditAuthUser";
import App from "./CreateAuthUser";
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesAuthUsers";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Styles from "components/AuthurisedUsers/AuthorisedStyles.css";
export const AppContext = createContext({});

export default function AuthirisedUsers() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [,setSelectedUser] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState( 20);
  const [checked, setChecked] = useState([]);
  const [off, setOff] = useState( true);
  const [num, setNum] = useState(0)
  const [searchUser] = useState('');
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    (Auth.currentUserPoolUser().then(data => {
      setAdmin(data.attributes["profile"])
    }))
      .catch(e => {
        console.error(e);
      })
  }, []);

  if (admin === "User" && off === false) {
    setOff(true);
  }

  const fetchAuthUsers = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          }
        }
        const ApiData = config.APIDetails.endpoints[0];
        const fetchedAuthorized = await API.post(ApiData.name, "/taco-jira-insights", options);
        const useData = fetchedAuthorized.data;
        const arrayData = [...useData];
        setRowData(arrayData);
      } catch(e) {
        console.error(e)
      } finally {
        setLoading(false);
      }
      
  } 

  useEffect(() => {
    fetchAuthUsers();
    return () => {
      fetchAuthUsers();
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const checkRow = (index) => {
    if (checked === null) {
      setNum(0)
    } else { setNum(2) }
    if (!checked.includes(index)) {
      setChecked(checked.concat(index));
    } else {
      let newArr = checked;
      let remove = newArr.indexOf(index);
      newArr.splice(remove, 1);
      setNum(0);
    }
    num === 0 ? setOff(false) : setOff(true)
  };

  const StyledTableCell = withStyles(theme => ({
    head: {
      color: theme.palette.common.white,
      fontSize: 15
    },

  }))(TableCell);

  const closeEdit = () => {
    setEdit(false);
    setCreate(false)
    fetchAuthUsers();
  }
  checked.forEach((index) => {
  });
  if (edit) {
    return (<EditAuthUser user={rowData} close={closeEdit} index={checked} />);
  };

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

  const createUser = () => {
    setCreate(true);
  };

  if (create) {
    return (<App close={closeEdit} />);
  };

  return (
    <AppContext.Provider value={setRowData}>
        <main>
          <Grid
            container
            fullWidth
            direction="row"
            alignItems="flex-end"
            justify="flex-end"
            spacing={1}
            className={classes.btnSpacing}
          >
            <Grid item>
              <Button fullWidth variant="contained" className={classes.editBtn} disabled={off} onClick={editUser}>Edit User</Button>
            </Grid>

            <Grid item>
              <Button fullWidth variant="contained" className={classes.addBtn} onClick={createUser}>Add User</Button>
            </Grid>
          </Grid>

          {loading ? <Spinner /> :
            <div>
              <Table className={Styles} className={classes.table}>
              <Thead className={classes.tableHead}>
                  <Tr>
                    <Th align="center"  className={classes.theHead}></Th>
                    <Th  className={classes.theHead}>NAME</Th>
                    <Th  className={classes.theHead}>EMAIL ADDRESS</Th>
                    <Th  className={classes.theHead}>CELL NUMBER</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {rowData &&
                    rowData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .filter((user) => {
                        if (searchUser.length < 2) return true
                        return (
                          user.name.includes(searchUser)
                        );
                      }).map((user, index) => {
                        if  (!user.Stanby_Number){
                        return (
                          <Tr key={index}>
                            <Td align="left" className={classes.tableBody}>
                              <Checkbox
                                inputProps={{ "aria-label": "primary checkbox" }}
                                checked={checked.indexOf(index) !== -1}
                                onClick={() => {
                                  checkRow(index);
                                }}
                                className={classes.checkBox}
                              />
                            </Td>
                            <Td align="left" className={classes.tableBody}>
                              <Typography>
                                {user.name}
                              </Typography>
                            </Td>
                            <Td align="left" className={classes.tableBody}>
                              <Typography>
                                {user.email}
                              </Typography>
                            </Td>
                            <Td align="left" className={classes.tableBody}>
                              <Typography>
                                {user.cellNumber === "" ? "N/A" : user.cellNumber}
                              </Typography>
                            </Td>
                          </Tr>
                        );}
                      })}
                </Tbody>
              </Table>
              <TablePagination
                className={classes.tableContainer1}
                rowsPerPageOptions={[20, 30, 50]}
                component="div"
                count={rowData.length-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          }
        </main>
    </AppContext.Provider>)
}