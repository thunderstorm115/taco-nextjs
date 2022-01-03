import React, { useState, useEffect, } from "react";
import { Grid,TextField} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import useStyles from "./useStylesInfra";
import { useHistory } from "react-router-dom";

export default function NodeList({ data, fetchData, total, click }) {
  const [selected, setSelected] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [searchNode, setSearchNode] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoad, setDataLoad] = useState(true);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (data) {
      if (data.length > total || data.length === total) {
        setHasMore(false);
      }
    } else setHasMore(true);
  }, [total, data.length, data]);

  useEffect(() => {
    if (selected) {
      setHasMore(false);
    } else {
      if (data.length > total || data.length === total) {
        setHasMore(false);
      } else {
        setHasMore(false); //Set to false on 2 Feb to fix loop (Incase data loading breaks)
      }
    }
  }, [selected, data.length, total]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={classes.layoutNodeList}>
      <Grid container
        display="flex"
        direction="row"
        justify="center"
        alignItems="center"
        justifycontent="center">
          
        <Grid item xs={12} md={12}>
          <TextField
            variant="filled"
            size="small"
            className={classes.textFieldNodeList}
            label="Search"
            disabled={loading}
            onChange={(event) => setSearchNode(event.target.value)}
          />
        </Grid>
      </Grid>

      <div >
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}

          loader={data.includes(searchNode) < 1 || data.includes(searchNode) === null ? <div className={classes.noNode}><h1>There is no more data to load </h1></div> : <div className="lds-dual-ring" align="center"></div>}
          endMessage={!data.includes(searchNode) && dataLoad ? <div className={classes.noNode}><h1 className={classes.noNode}>There is no more data to load  </h1> </div> : null}
        >
          {!selected &&
            data.filter((node) =>
              node.name.includes(searchNode)
            ).map((node, index) => {
              return (
                  <div align="center"
                    className={classes.Node}
                    onClick={() => {
                      setDataLoad(false);
                      setSelected(data);
                      setLoading(true);
                      history.push(`/infrastructure/overview/nodes/${data[index]["name"]+"_"+data[index]["id"]}`)
                    }}
                  >
                    <div className="NodeTitle">
                      <h2>
                        <Grid item xs={12} className={classes.whiteText}>
                          {node.name}
                        </Grid>

                      </h2>
                    </div>

                      <div className={classes.space}>
                        <h3 className={classes.heading} align="left">Last Checkin</h3>
                        <p className={classes.whiteText} align="left">{lastCheckin(data[index]["checkin"])}ago</p>
                        <h3 className={classes.heading} align="left">Environment</h3>
                        <p className={classes.whiteText} align="left">{data[index]["environment"]}</p>
                        <h3 className={classes.heading} align="left">Chef infra Client Version</h3>
                        <p className={classes.whiteText} align="left">{data[index]["chef_version"]}</p>
                        <h3 className={classes.heading} align="left">FQDN</h3>
                        <p className={classes.whiteText} align="left">{data[index]["fqdn"]}</p>
                        <h3 className={classes.heading} align="left">IP Address</h3>
                        <p className={classes.whiteText} align="left">{data[index]["ipaddress"]}</p>
                        <h3 className={classes.heading} align="left">Platform</h3>
                        <p className={classes.whiteText} align="left">{data[index]["platform"]}</p>
                      </div>
                    
                  </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </main>
  );
}

function convertSecond(timestamp) {
  let days = Math.floor(timestamp / 60 / 60 / 24);
  let hours = Math.floor(timestamp / 60 / 60) - days * 24;
  let minutes = Math.floor(timestamp / 60) - (days * 24 * 60 + hours * 60);
  let seconds = Math.round(timestamp % 60, 0);
  if (days > 0) {
    let formatted =
      days +
      " days " +
      hours +
      " hours " +
      minutes +
      " minutes " +
      seconds +
      " seconds ";

    return formatted;
  } else if (hours > 0) {
    let formatted =
      hours + " hours " + minutes + " minutes " + seconds + " seconds ";

    return formatted;
  } else {
    let formatted = minutes + " minutes " + seconds + " seconds ";

    return formatted;
  }
}
function lastCheckin(check) {
  let now = new Date();

  return convertSecond((now - Date.parse(check)) / 1000);
}