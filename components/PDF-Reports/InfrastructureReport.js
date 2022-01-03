import React, { useRef, useState} from "react";
import ReactToPrint from "react-to-print";
import { Button } from "@material-ui/core";
import { lastCheckin, convertSecond } from "../../../../obs-cocoa-react/src/__helpers__/helpers";
import logo from "../../../../obs-cocoa-react/src/assets/ObsPDF.png";
import { PieChart } from 'react-minimal-pie-chart';
import moment from 'moment';
import {Auth, API} from 'aws-amplify';
import config from "UserPoolAmplify";

export default ({ missing, failed, success }) => {
  const componentRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchReportData = async () => {

      try {
        setLoading(true);
        const ApiData = config.APIDetails.endpoints[0]

        return Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            }
          }
          
         return API.get(ApiData.name, "/infra/export?type=json", options).then(res => {
            setNodes(res.sort());
          }).catch(error => {
            console.log(error)
          }).finally(() => setLoading(false))

        });
      } catch (err) {
        console.log(err);
      }
  };

  const DownloadComponent = () => {
    if (isLoading) return <div className="lds-dual-ring" />

    return (
      <div>
        <Button style={{ color: "white",
        border: "2px solid #9A2849",
        borderRadius: "20px"        
      }}>
          DOWNLOAD PDF
        </Button>
      </div>)
  }
  return (
    <div>
      <ReactToPrint
        documentTitle="."
        copyStyles={true}
        onBeforeGetContent={async () => await fetchReportData()}
        trigger={() => (DownloadComponent())}
        content={() => componentRef.current}
      />
      <div
        className="hidden-until-print"
        style={{ padding: "12px" }}
        ref={(el) => (componentRef.current = el)}
      >
        <div className="report-wrapper">
          <header className="report-heading">
            <div className="report-name">
              <img className="logo3" src={logo} alt="obs logo" />
              <h3>TACO Infrastructure Report</h3>
              <sub>{moment().format('YYYY-MM-DD HH:MM:SS')}</sub>
            </div>
            <div className="report-overview">
              <div className="report-overview-section">
                {/* Pie chart */}
                <PieChart
                  className="graph"
                  legend={false}
                  width={150}
                  height={150}
                  data={[
                    { title: 'Missing', value: missing, color: 'orange' },
                    { title: 'Success', value: success, color: 'green' },
                    { title: 'Failed', value: failed, color: 'red' },
                  ]}
                />
              </div>
              <div className="report-overview-section">
              <div className="report-overview-item">
                  <h5>Successful Nodes</h5>
                  <span>{success}</span>
                </div>
                <div className="report-overview-item">
                  <h5>Missing Nodes</h5>
                  <span>{missing}</span>
                </div>
                <div className="report-overview-item">
                  <h5>Failed Node</h5>
                  <span>{failed}</span>
                </div>
              </div>

            </div>
          </header>
          <main>
            <table className="report-table">

              {nodes.filter((node) => {return node.status === '"failure"'}).length > 1 &&
                <tr className="report-table-headingred">
                  <td style={{ fontWeight: 'bold'}}>Node Name</td>
                  <td style={{ fontWeight: 'bold'}}>Check-in</td>
                  <td style={{ fontWeight: 'bold'}}>Uptime</td>
                  <td style={{ fontWeight: 'bold'}}>Platform</td>
                  <td style={{ fontWeight: 'bold'}}>Environment</td>
                </tr>
                }
              {nodes.filter((node) => { return (node.status === '"failure"') })
                .map((node) => (
                  <tr className="report-table-row">
                    <td className="report-table-col-check-in">{node[0].replace('"', "").replace('"', "")}</td>
                    <td className="report-table-col-time">{lastCheckin(node[5].replace('"', "").replace('"', ""))}{" "}</td>
                    <td className="report-table-col-time">{convertSecond(Number.parseInt(node[21].replace('"', "").replace('"', "")))}{" "}</td>
                    <td className="report-table-col-time3">{node[2].replace('"', "").replace('"', "")}</td>
                    <td className="report-table-col-time3">{node[3].replace('"', "").replace('"', "")} </td>
                  </tr>
                ))}
            </table>

            <table className="report-table">
              {nodes.filter((node) => { return node.status === '"success"' }).length > 1 &&
                <tr className="report-table-heading">
                  <td style={{ fontWeight: 'bold'}}>Node Name</td>
                  <td style={{ fontWeight: 'bold'}}>Check-in</td>
                  <td style={{ fontWeight: 'bold'}}>Uptime</td>
                  <td style={{ fontWeight: 'bold'}}>Platform</td>
                  <td style={{ fontWeight: 'bold'}}>Environment</td>
                </tr>
                }
              {nodes.filter((node) => { return node.status === '"success"' })
                .map((node) => (
                  <tr className="report-table-row">
                    <td className="report-table-col-check-in">{node[0].replace('"', "").replace('"', "")}</td>
                    <td className="report-table-col-time">{lastCheckin(node[5].replace('"', "").replace('"', ""))}{" "}</td>
                    <td className="report-table-col-time">{convertSecond(Number.parseInt(node[21].replace('"', "").replace('"', "")))}{" "}</td>
                    <td className="report-table-col-time3">{node[2].replace('"', "").replace('"', "")}</td>
                    <td className="report-table-col-time3">{node[3].replace('"', "").replace('"', "")} </td>
                  </tr>
                ))}
            </table>

            <table className="report-table">
              {nodes.filter((node) => { return node.status=== '"missing"' }).length > 1 &&
                <tr className="report-table-headingorange">
                  <td style={{ fontWeight: 'bold'}}>Node Name</td>
                  <td style={{ fontWeight: 'bold'}}>Check-in</td>
                  <td style={{ fontWeight: 'bold'}}>Uptime</td>
                  <td style={{ fontWeight: 'bold'}}>Platform</td>
                  <td style={{ fontWeight: 'bold'}}>Environment</td>
                </tr>
                }
              {nodes.filter((node) => { return node.status === '"missing"' })
                .map((node) => (
                  <tr className="report-table-row">
                    <td className="report-table-col-check-in">{node[0].replace('"', "").replace('"', "")}</td>
                    <td className="report-table-col-time">{lastCheckin(node[5].replace('"', "").replace('"', ""))}{" "}</td>
                    <td className="report-table-col-time">{convertSecond(Number.parseInt(node[21].replace('"', "").replace('"', "")))}{" "}</td>
                    <td className="report-table-col-time3">{node[2].replace('"', "").replace('"', "")}</td>
                    <td className="report-table-col-time3">{node[3].replace('"', "").replace('"', "")} </td>
                  </tr>
                ))}
            </table>

          </main>
        </div>
      </div>
    </div>
  );
};