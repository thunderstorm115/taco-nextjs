import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import useStyles from "./useStylesLogin";
import { API } from "aws-amplify";
import config from "UserPoolAmplify";
import { Auth } from "aws-amplify";
import Spinner from "components/User/Spinner";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const classes = useStyles();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [, setButtonStyle] = useState("2px solid #9A2849");
  const [pdfLoader, setPDFLoader] = useState(false);
  const handleMenuClose = () => {
    setPDFLoader(false);
    setMenuOpen(false);
  };

  const handleClickOpen = () => {
    setMenuOpen(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const user = await Auth.currentAuthenticatedUser();
        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          },
        };
        const data = await API.get(
          ApiData.name,
          "/monthly-reports/get-list",
          options
        );
        setInfo(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const downloadPDF = (file) => {
    setButtonStyle("none");
    setLoadingPDF(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken,
            },
          };
          API.get(
            ApiData.name,
            `/monthly-reports/get-report?filename=${file}`,
            options
          )
            .then((res) => {
              window.open(res.signed_url, "_blank");
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setLoadingPDF(false);
              setButtonStyle("2px solid #9A2849");
            });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const generatePDF = () => {
    setButtonStyle("none");
    setMenuOpen(true);
    handleClickOpen();
    setPDFLoader(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken,
            },
          };
          API.get(ApiData.name, "/jira/overview-pdf", options)
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => {
              setPDFLoader(false);
              setButtonStyle("2px solid #9A2849");
            });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return loading === true ? (
    <Spinner />
  ) : (
    <div className={classes.layoutTable}>
      {info.length > 0 ? (
        <div>
          <Button
            className={classes.reportsButton}
            onClick={() => generatePDF()}
          >
            {pdfLoader ? (
              <div className="lds-dual-ring2"></div>
            ) : (
              "GET CURRENT MONTH REPORT"
            )}
          </Button>
          <div>
            <Table
              style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
              className={classes.table}
              aria-label="customized table"
            >
              <Thead className={classes.tableHead}>
                <Tr>
                  <Th className={classes.theHead} align="center">
                    Report Name
                  </Th>
                  <Th className={classes.theHead} align="center">
                    Month
                  </Th>
                  <Th className={classes.theHead} align="center">
                    Download
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {info.map((item) => (
                  <Tr className={classes.data} style={{ cursor: "pointer" }}>
                    <Td
                      style={{
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                      className={classes.tableBody}
                      align="left"
                    >
                      {item.filename}
                    </Td>
                    <Td
                      style={{
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                      className={classes.tableBody}
                      align="left"
                    >
                      {item.month}
                    </Td>
                    <Td
                      style={{
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                      className={classes.tableBody}
                      align="center"
                    >
                      <Button
                        className={classes.downloadPDFBtnTable}
                        onClick={() => downloadPDF(item.filename)}
                      >
                          <div>DOWNLOAD</div>
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Dialog
              open={menuOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => handleMenuClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              className={classes.dialog}
              PaperProps={{
                style: {
                  backgroundColor: "#2B2B2B",
                  color: "#fff",
                  boxShadow: "none",
                  padding: "20px",
                  minWidth: "auto",
                  overflow: "hidden",
                },
              }}
            >
              <DialogTitle
                style={{ padding: "0px", textAlign: "center", fontWeight: 700 }}
                id="alert-dialog-slide-title"
              >
                {"Generating your report"}
              </DialogTitle>
              <hr className={classes.hrLine}></hr>
              <h4 className={classes.subHeading}>
                Your requested report is currently being generated.
                <br />
                An email will be sent soon.
              </h4>

              <Grid container>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    className={classes.confirmButton}
                    onClick={handleMenuClose}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className={classes.noDataDiv}>
          <Button
            className={classes.reportsButtonNoData}
            onClick={() => generatePDF()}
          >
            GET CURRENT MONTH REPORT
          </Button>

          <Table style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }} className={classes.table} aria-label="customized table">
                            <Thead className={classes.tableHead}>
                                <Tr>
                                    <Th className={classes.theHead} align="center">Report Name</Th>
                                    <Th className={classes.theHead} align="center">Month</Th>
                                    <Th className={classes.theHead} align="center">Download</Th>
                                </Tr>
                            </Thead>
                            <Tbody/>
                        </Table>
          <h2 style={{ color: "white", paddingLeft: "10px" }}>No Data</h2>
        </div>
      )}
    </div>
  );
};
