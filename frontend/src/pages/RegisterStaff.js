import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addStaff } from "../actions/auth";
import { Col, Row } from "react-bootstrap";

const RegisterStaff = ({ addStaff }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState("");
  const [passRef, setPassRef] = useState(false);
  const [emailRef, setEmailRef] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  useEffect(() => {
    setEmailRef(false);
    setPassRef(false);
    setPasswordNotMatch(false);
    setAccountCreated(false);
  }, [name, email, password, re_password]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === re_password) {
      const data = await addStaff(
        email,
        name,
        role,
        password,
        re_password,
        0,
        ""
      );
      console.log(data.email);

      if (data.password) {
        console.log(data.password[0]);
        setPassRef(true);
      } else if (data.email == "users with this email already exists.") {
        setEmailRef(true);
      } else {
        setAccountCreated(true);
        setTimeout(() => {
          setEmailRef("");
          setPassRef("");
          setPasswordNotMatch(false);
          setName("");
          setEmail("");
          setPassword("");
          setRePassword("");
        }, 5000);
      }
    } else {
      setPasswordNotMatch(true);
    }
  };

  function popup_box() {
    if (accountCreated) {
      return (
        <Alert variant="success">
          <p>
            Staff Successfully created. Notify your staff to check their email
            for verification.
          </p>
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
          <p>Password is too weak</p>
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
      <div className="header-img">
        <h1>Register Staff</h1>
      </div>
      <div className="content">
        <div className="center-form">
          {popup_box()}
          <Form onSubmit={(e) => onSubmit(e)}>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formBasicName">
                <Form.Label>Staff Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
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
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={re_password}
                  onChange={(e) => setRePassword(e.target.value)}
                  minLength={8}
                />
              </Form.Group>
            </Row>
            <div className="d-flex flex-row">
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="LS">Lab Staff</option>
                  <option value="D">Director</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="dark" type="submit">
                Register Staff
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addStaff })(RegisterStaff);
