import React from "react";
import axios from "axios";

import PositionsTable from "../components/PositionsTable";
// import testGraph from "../images/test-graph.png";

class Positions extends React.Component {
  state = {
    primaryViewType: 0,
    selectionMade: false,
    tableData: [],
  };

  choosePrimaryVT(selection) {
    this.setState({ primaryViewType: selection }, () => {
      console.log("primaryViewType: ", this.state.primaryViewType);
    });
  }

  getApiData(callType) {
    this.setState({ selectionMade: true, tableData: [] });

    axios.defaults.baseURL = "http://localhost:8000/";
    axios.defaults.auth = {
      username: "su",
      password: "su",
    };

    if (callType === "all") {
      axios
        .get("all_positions/")
        .then((response) => {
          this.setState({ tableData: response.data });
          console.log("tableData: ", this.state.tableData);
        })
        .catch((error) => {
          console.log(error);
          alert("Error: Failed to load all positions table.", error);
        });
    }

    if (callType === "current") {
      axios
        .get("api/positions/filter/date/?start=2020-08-08&end=2020-08-11")
        .then((response) => {
          this.setState({ tableData: response.data });
          console.log("tableData: ", this.state.tableData);
        })
        .catch((error) => {
          console.log(error);
          alert("Error: Failed to load current positions table.", error);
        });
    }
  }

  getDateToday() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    return date;
  }

  render() {
    return (
      <div className="pane-split-container">
        <div className="left-col">
          <div className="pane-top">
            <h3 className="pane-header">Positions</h3>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
              >
                Primary View Type
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <span
                  className="dropdown-item"
                  onClick={() => this.choosePrimaryVT("by_date")}
                >
                  By Date (Point-in-Time Snapshot)
                </span>
                <span
                  className="dropdown-item"
                  onClick={() => this.choosePrimaryVT(2)}
                >
                  History by Stock (Time Series View)
                </span>
                <span
                  className="dropdown-item"
                  onClick={() => this.choosePrimaryVT(3)}
                >
                  History by Industry (Time Series View)
                </span>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
              >
                Secondary View Type
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="http://www.fixme.com/">
                  $ Positions by Stock
                </a>
                <a className="dropdown-item" href="http://www.fixme.com/">
                  % Positions by Stock
                </a>
                <a className="dropdown-item" href="http://www.fixme.com/">
                  $ Positions vs. Benchmark by Stock
                </a>
                <a className="dropdown-item" href="http://www.fixme.com/">
                  % Positions vs. Benchmark by Stock
                </a>
                <a className="dropdown-item" href="http://www.fixme.com/">
                  $ Positions by Industry
                </a>
                <a className="dropdown-item" href="http://www.fixme.com/">
                  % Positions by Industry
                </a>
                <a className="dropdown-item" href="http://www.fixme.com/">
                  $ Positions vs. Benchmark by Industry
                </a>
                <a className="dropdown-item" href="http://www.fixme.com/">
                  % Positions vs. Benchmark by Industry
                </a>
              </div>
            </div>
          </div>
          {/* <span onClick={() => this.getDateToday()}>Get Today's Date</span> */}
          {/* EXPANDS FROM PRIMARY VIEW TYPE */}
          {this.state.primaryViewType === "by_date" && (
            <>
              <span onClick={() => this.getApiData("all")}>
                Show All Positions
              </span>
              <br />
              <span onClick={() => this.getApiData("current")}>
                Show Current Positions
              </span>
            </>
          )}
          <hr />
          {this.state.selectionMade && (
            <PositionsTable data={this.state.tableData} />
          )}
        </div>
        {/* <div className="right-col">
          <img src={testGraph} alt="/" className="positions-graph" />
        </div> */}
      </div>
    );
  }
}

export default Positions;