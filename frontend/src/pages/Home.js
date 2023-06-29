import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Home = ({ user }) => {
  
  return (
    <div className="main-content">
      <div className="header">
        <h1>Home</h1>
      </div>
      <div className="content"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Home);
