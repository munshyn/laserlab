import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import Footer from "../components/Footer";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRequestSent("");
  }, [email]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (email != "") {
      reset_password(email);
      setRequestSent(true);
    } else {
      setRequestSent(false);
    }
  };

  if (requestSent) {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }

  function popup_box() {
    if (requestSent && email != "") {
      return (
        <Alert variant="success">
          <Alert.Heading>Request Successfully Sent.</Alert.Heading>
          <p>
            Check your email for further process. You will be redirect to login
            page.
          </p>
        </Alert>
      );
    } else return <p></p>;
  }

  return (
    <div className="main-content">
      <div className="utm-logo">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-center">
        <h1>Password Reset</h1>
      </div>
      <div className="content">
        <div className="center-form">
          {popup_box()}
          <p>Provide us your email to change your current password</p>
          <Form onSubmit={(e) => onSubmit(e)}>
            <div className="form-box">
              <div style={{ width: "20vw" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
