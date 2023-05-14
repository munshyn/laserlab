import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import "../App.css";
import utmlogo from "../assets/utm-logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

const Register = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState("");
  const [passRef, setPassRef] = useState(false);
  const [passRefMsg, setPassRefMsg] = useState(false);
  const [emailRef, setEmailRef] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  useEffect(() => {
    setEmailRef(false);
    setPassRefMsg("");
    setPassRef(false);
    setPasswordNotMatch(false);
  }, [name, email, password, re_password]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const role = "STUDENT";

    if (password === re_password) {
      const data = await signup(email, name, role, password, re_password);

      if (data.password) {
        console.log(data.password[0]);
        setPassRefMsg(data.password[0]);
        setPassRef(true);
      } else if (data.email === "users with this email already exists.") {
        console.log(data.email);
        setEmailRef(true);
      } else {
        setAccountCreated(true);
        setEmailRef("");
        setPassRef("");
        setPasswordNotMatch(false);
      }
    } else {
      setPasswordNotMatch(true);
    }
  };

  function popup_box() {
    if (accountCreated) {
      return (
        <Alert variant="success">
          <p>Account Successfully created. Check your email for verification.</p>
        </Alert>
      );
    } else if (emailRef) {
      return (
        <Alert variant="danger">
          <p>Email is already used</p>
        </Alert>
      );
    } else if (passRef) {
      return (
        <Alert variant="danger">
          <p>{passRefMsg}</p>
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
      <div className="header">
        <h1>Registration</h1>
      </div>
      <div className="content">
        <div className="register-form">
          {popup_box()}
          <p>
            Already a user?
            <i>
              <Link
                to="/"
                style={{
                  color: "darkgreen",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Sign In here
              </Link>
            </i>{" "}
          </p>
          <Form onSubmit={(e) => onSubmit(e)}>
            <div className="form-box">
              <div>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Give me your name.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </div>
              <div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                  />
                  <Form.Text className="text-muted">
                    Password must be more than 8 letters.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Register);
