import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import Footer from "../components/Footer";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState("");
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [passwordNotMatch, setPasswordNotMatch] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  useEffect(() => {
    setPasswordNotMatch(false);
    setRequestSent("");
  }, [password, re_password]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      reset_password_confirm(uid, token, password, re_password);
      setRequestSent(true);
      setPasswordNotMatch(false);
    } else {
      setPasswordNotMatch(true);
    }
  };

  if (requestSent) {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }

  function popup_box() {
    if (requestSent && !passwordNotMatch) {
      return (
        <Alert variant="success">
          <Alert.Heading>Password Successfully Reset.</Alert.Heading>
          <p>You will be redirect to login page.</p>
        </Alert>
      );
    } else if (passwordNotMatch) {
      return (
        <Alert variant="danger">
          <p>Password not match</p>
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
        <h1>Password Reset Confirmation</h1>
      </div>
      <div className="content">
        <div className="center-form">
          {popup_box()}
          <p>Change your password here</p>
          <Form onSubmit={(e) => onSubmit(e)}>
            <div className="form-box">
              <div style={{ width: "20vw" }}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                  />
                  <Form.Text className="text-muted">
                    New Password must be more than 8 letters.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm New Password"
                    value={re_password}
                    onChange={(e) => setRePassword(e.target.value)}
                    minLength={8}
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
