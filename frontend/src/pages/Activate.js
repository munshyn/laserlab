import React, { useState } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify }) => {
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();

  const verify_account = (e) => {
    console.log(uid, token);
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main-content">
      <div className="utm-logo">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-center">
        <h1 style={{ fontSize: "50px", fontWeight: 100 }}>Verify Account</h1>
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Account Verification</h1>
          <p style={styles.description}>
            Please verify your account by clicking the button below:
          </p>
          <button style={styles.button} onClick={verify_account}>
            Verify Account
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: "32px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  description: {
    fontSize: "16px",
    marginBottom: "32px",
  },
  button: {
    backgroundColor: "#50c878",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default connect(null, { verify })(Activate);
