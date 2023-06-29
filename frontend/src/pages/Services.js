import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Box from "../components/Box";
import { Card, ListGroup } from "react-bootstrap";

const Services = () => {
  useEffect(() => {}, []);

  const servicesList = [
    "Laser Repairing",
    "Laser Rental",
    "Elemental Analysis by LIBS",
    "Fiber Coupler",
    "Fourier Transform Infrared Spectroscopy (FTIR)",
    "Thin Film Deposition",
  ];

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>Services</h1>
      </div>
      <div className="container-md">
        <div>
          <h2>What we offer?</h2>
          <ListGroup className="custom-list">
            {servicesList.map((item, index) => (
              <ListGroup.Item key={index}>{item}</ListGroup.Item>
            ))}
          </ListGroup>
          {/* {servicesList.map((item, index) => (
  <Card key={index} className="custom-card">
    <Card.Body>
      <Card.Text>{item}</Card.Text>
    </Card.Body>
  </Card>
))} */}
          <div className="d-flex justify-content-center mt-4">
            <Link to="/service-form">
              <Button variant="success">Apply now</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Services);
