import React, { useRef} from "react";
import ReactToPrint from "react-to-print";
import {Button} from "@material-ui/core";
import logo from "../../../../obs-cocoa-react/src/assets/ObsPDF.png";
import moment from 'moment';
import { PieChart } from 'react-minimal-pie-chart';

export default ({ skipped, waived, failed, success, controls }) => {
  const componentRef = useRef();
  return (
    <div>
      <ReactToPrint
        documentTitle="."
        copyStyles={true}
        trigger={() => (
          <Button style={{ color: "white",
          border: "2px solid #9A2849",
          borderRadius: "20px"        
        }}>
            DOWNLOAD PDF
          </Button>
        )}
        content={() => componentRef.current}
      />
      <div
        className="hidden-until-print"
        style={{ padding:"12px" }}
        ref={(el) => (componentRef.current = el)}
      >
        <div className="report-wrapper">
           <header className="report-heading">
                <div className="report-name">
                    <img className="logo3" src={logo} alt="obs logo" />
                    <h3>TACO Compliance Report</h3>
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
                                { title: 'Skipped', value: skipped, color: 'grey' },
                                { title: 'Success', value: success, color: 'green' },
                                { title: 'Waived', value: waived, color: 'orange' },
                                { title: 'Failed', value: failed, color: 'red' },
                              ]}
                            />
                            
                    </div>
                    <div className="report-overview-section">
                    <div className="report-overview-item">
                            <h5>Passed Controls</h5>
                            <span>{success}</span>
                        </div>
                        <div className="report-overview-item">
                            <h5>Waived Controls</h5>
                            <span>{waived}</span>
                        </div>
                        <div className="report-overview-item">
                            <h5>Failed Controls</h5>
                            <span>{failed}</span>
                        </div>
                        <div className="report-overview-item">
                            <h5>Skipped Controls</h5>
                            <span>{skipped}</span>
                        </div>
                    </div>

                </div>
           </header>
            <main>
                <table className="report-table">
                <tbody>
                    <tr className="report-table-headingred">
                        
                        <td style={{ fontWeight: 'bold'}}>Profile Name</td>
                        <td style={{ fontWeight: 'bold'}}>Control Name</td>
                        <td style={{ fontWeight: 'bold'}}>Last Scanned</td>
                        <td style={{ fontWeight: 'bold'}}>Affected Nodes</td>
                    </tr>
                    </tbody>
                    {controls.filter((control) => control.control_summary.failed.total > 0)
                        .map((control) => (
                          
                          <tbody>
                            <tr className="report-table-row">
                                
                                <td className="report-table-col-check-in">{control.profile.title}</td>
                                <td className="report-table-col-check-in2">{control.id}</td>
                                <td className="report-table-col-time2">{moment(control.end_time).format('YYYY-MM-DD HH:MM')}</td>
                                <td className="report-table-col-time2">{control.control_summary.failed.total} Failed</td>
                            </tr>
                            </tbody>
                            
                        ))}
                </table>

                
            </main>
       </div>
      </div>
    </div>
  );
};

