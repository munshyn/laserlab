import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Box from "../component/Box";
import { FiInfo } from "react-icons/fi";
import { ListGroup } from "react-bootstrap";

const Services = ({ user }) => {
  const navigate = useNavigate();

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
      <div className="utm-logo-start">
        <img src={utmlogo} alt="logo" />
      </div>
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

export default connect(mapStateToProps, { logout })(Services);
