import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import Footer from "../components/Footer";
import { Col, Row } from "react-bootstrap";

const Register = ({ signup }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState("");
  const [passRef, setPassRef] = useState(false);
  const [emailRef, setEmailRef] = useState(false);
  const [matrixNumNotValid, setMatrixNumNotValid] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [matrixNum, setMatrixNum] = useState("");

  const regexPattern = /^[A-Z]\d{2}[A-Z]{2}\d{4}$/;

  useEffect(() => {
    setEmailRef(false);
    setPassRef(false);
    setPasswordNotMatch(false);
    setMatrixNumNotValid(false);
    setAccountCreated(false);
  }, [name, email, password, re_password, matrixNum]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isStudent) {
      if (regexPattern.test(matrixNum)) {
        const role = "C";

        if (password === re_password) {
          const data = await signup(
            email,
            name,
            role,
            password,
            re_password,
            isStudent,
            matrixNum
          );
          console.log(data[0]);

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
              setMatrixNumNotValid(false);
              setName("");
              setEmail("");
              setPassword("");
              setRePassword("");
              setIsStudent(false);
              setMatrixNum("");
            }, 3000);
          }
        } else {
          setPasswordNotMatch(true);
        }
      } else {
        setMatrixNumNotValid(true);
      }
    } else {
      const role = "C";

      if (password === re_password) {
        const data = await signup(
          email,
          name,
          role,
          password,
          re_password,
          isStudent,
          matrixNum
        );
        console.log(data[0]);

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
            setMatrixNumNotValid(false);
            setName("");
            setEmail("");
            setPassword("");
            setRePassword("");
            setIsStudent(false);
            setMatrixNum("");
          }, 3000);
        }
      } else {
        setPasswordNotMatch(true);
      }
    }
  };

  function popup_box() {
    if (accountCreated) {
      return (
        <Alert variant="success">
          <p>
            Account Successfully created. Check your email for verification.
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
    } else if (matrixNumNotValid) {
      return (
        <Alert variant="danger">
          <p>Matrix Number is not in correct form</p>
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
        <h1>Registration</h1>
      </div>
      <div className="content">
        <div className="center-form">
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
            <Row>
              <Col xs={12} sm={12} md={6}>
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
              </Col>
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
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
            </Row>
            <Row>
              <Col xs={12} sm={12} md={6}>
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
              </Col>
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
              <Form.Group className="mb-3 me-5">
                <Form.Label>UTM Student ?</Form.Label>
                <div>
                  <Form.Check
                    className="d-inline-flex me-3"
                    type="radio"
                    name="isStudent"
                    label="Yes"
                    value="true"
                    checked={isStudent}
                    onChange={(e) => setIsStudent(e.target.value === "true")}
                  />
                  <Form.Check
                    className="d-inline-flex"
                    type="radio"
                    name="isStudent"
                    label="No"
                    value="false"
                    checked={!isStudent}
                    onChange={(e) => setIsStudent(e.target.value === "true")}
                  />
                </div>
              </Form.Group>
              {isStudent && (
                <Form.Group className="mb-3">
                  <Form.Label>Matrix Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Matrix Number"
                    value={matrixNum}
                    onChange={(e) => setMatrixNum(e.target.value)}
                    minLength={9}
                  />
                </Form.Group>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="dark" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(null, { signup })(Register);
