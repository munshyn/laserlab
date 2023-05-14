import Button from "react-bootstrap/Button";
import React, { Fragment, useState, useEffect } from "react";
import "../App.css";
import utmlogo from "../assets/utm-logo.svg";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { load_user, logout } from "../actions/auth";

const Home = ({ logout, isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false);
  const [currUser, setCurrUser] = useState('');

  useEffect(() => {
    const getCurrUser = async() => {
      setCurrUser = await load_user();
    }
    getCurrUser().catch(console.error)
    // setCurrUser(load_user());
    console.log(currUser)
  }, []);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  const guestLinks = () => (
    <div>
      <p>You are not signed in</p>
    </div>
  );

  const authLinks = () => (
    <Fragment>
      <p>{currUser.data}</p>
    <Button variant="primary" onClick={logout_user}>
      Logout
    </Button>
    </Fragment>  );

  return (
    <Fragment>
      <div className="main-content">
        <div className="utm-logo">
          <img src={utmlogo} alt="logo" />
        </div>
        <div className="header">
          <h1>Home</h1>
        </div>
        <div className="content">
          {isAuthenticated ? authLinks() : guestLinks()}
        </div>
      </div>
      {redirect ? <Navigate to="/" /> : <Fragment></Fragment>}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Home);
