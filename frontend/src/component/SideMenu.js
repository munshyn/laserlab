import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Button, Nav } from "react-bootstrap";
import { FiHome, FiInfo, FiSettings } from "react-icons/fi";

const SideMenu = ({ logout, isAuthenticated, role }) => {
  const navigate = useNavigate();

  const logout_user = async () => {
    await logout();
    navigate("/");
  };

  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {isAuthenticated && (
        <div className={`sidebar ${expanded ? "expanded" : ""}`}>
          <div className="sidebar-header">
            {expanded && <h4>{role}</h4>}
            <Button
              variant="secondary"
              onClick={toggleSidebar}
              className="toggle-button"
            >
              {expanded ? "<" : ">"}
            </Button>
          </div>

          {role == "RO" && (
            <Nav className="flex-column">
              <Nav.Link href="/dashboard">
                <FiInfo className="link-icon" />
                {expanded && <p>Dashboard</p>}
              </Nav.Link>
              <Nav.Link href="/equipment-list">
                <FiInfo className="link-icon" />
                {expanded && <p>Equipments</p>}
              </Nav.Link>
            </Nav>
          )}
          {role == "STUDENT" && (
            <Nav className="flex-column">
              <Nav.Link href="/services">
                <FiSettings className="link-icon" />
                {expanded && <p>Services</p>}
              </Nav.Link>
            </Nav>
          )}

          <div className="sidebar-footer">
            <Button
              variant="secondary"
              className="logout-button"
              onClick={logout_user}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { logout })(SideMenu);
