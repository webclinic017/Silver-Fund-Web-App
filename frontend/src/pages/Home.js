import React, { useState } from "react";

import sfLogo from "../images/sf-logo.png";
import ErrorMsg from "../components/ErrorMsg";
import SuccessMsg from "../components/SuccessMsg";
import ChangePassword from "../components/Home/ChangePassword";

export default function Home(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  return (
    <>
      <ErrorMsg errorMsg={errorMsg} />
      <SuccessMsg successMsg={successMsg} />
      <div className="content">
        <div className="left-col">
          <h3>{props.username}, Welcome to the Silver Fund Web App!</h3>
          <a
            className="btn m-4 home-btn"
            href="https://byu.sharepoint.com/sites/silverfund-wiki"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            className="btn m-4 contactus-btn home-btn"
            href="mailto:silverfund@byu?subject=Question about Web App" // FIXME - Add valid email address
          >
            Contact Us
          </a>
          <ChangePassword
            username={props.username}
            password={props.password}
            setChangePwdError={(value) => setErrorMsg(value)}
            setChangePwdSuccess={(value) => setSuccessMsg(value)}
          />
        </div>
        <img
          src={sfLogo}
          className="home-logo"
          alt=""
          style={{ width: "600px" }}
        />
      </div>
    </>
  );
}
