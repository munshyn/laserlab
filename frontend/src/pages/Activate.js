import React, { Fragment, useState } from "react";
import "../App.css";
import utmlogo from "../assets/utm-logo.svg";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();

  const verify_account = (e) => {
    console.log(uid, token)
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <div className="main-content">
        <div className="utm-logo">
          <img src={utmlogo} alt="logo" />
        </div>
        <div className="header">
          <h1>Verify Account</h1>
        </div>
        <div className="content">
          <h1>Verify your Account:</h1>
          <button
            onClick={verify_account}
            style={{ marginTop: "50px" }}
            type="button"
            className="btn btn-primary"
          >
            Verify
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { verify })(Activate);
