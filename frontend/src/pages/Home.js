import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "RO" || user?.role === "D") {
      navigate("/dashboard");
    } else if (user?.role === "LS") {
      navigate("/servicesapp-list");
    } else {
      navigate("/services");
    }
  }, []);

  return <div className="m-auto">Redirecting...</div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Home);
