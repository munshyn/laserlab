import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Box from "../component/Box";
import { FiInfo } from "react-icons/fi";

const Dashboard = ({ isAuthenticated, role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <main className="main-content">
      <div className="utm-logo-start">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-img">
        <h1>Dashboard</h1>
      </div>
      <div className="container-md">
        <Box
          imageSrc={<FiInfo />}
          title="Equipments"
          description="Manage your equipments here"
          link="/equipment-list"
        />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { logout })(Dashboard);
