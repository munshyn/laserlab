import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import utmlogo from "../assets/utm-logo.svg";
import { logout } from "../actions/auth";
import { Button, Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import {
  BarChart3,
  Boxes,
  FileText,
  Microscope,
} from "lucide-react";

const SideMenu = ({ logout, isAuthenticated, user }) => {
  const navigate = useNavigate();

  const logout_user = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {isAuthenticated && (
        <Navbar sticky="top" key={false} expand={false} className="bg-body">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Brand href="#">
              <img src={utmlogo} alt="logo" height={50} />
            </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                  <h4>{user?.name}</h4>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex flex-column justify-content-between">
                {(user?.role === "RO" || user?.role === "D") && (
                  <Nav className="justify-content-start flex-grow-1 sidebar">
                    <Nav.Link href="/dashboard">
                      <BarChart3 size={30} className="link-icon" />
                      <h5>Dashboard</h5>
                    </Nav.Link>
                    <Nav.Link href="/equipment-list">
                      <Boxes size={30} className="link-icon" />
                      <h5>Equipments</h5>
                    </Nav.Link>
                    <Nav.Link href="/servicesapp-list">
                      <FileText size={30} className="link-icon" />
                      <h5>Services Application</h5>
                    </Nav.Link>
                  </Nav>
                )}
                {user?.role == "LS" && (
                  <Nav className="justify-content-start flex-grow-1 sidebar">
                    <Nav.Link href="/servicesapp-list">
                      <FileText size={30} className="link-icon"/>
                      <h5>Services Application</h5>
                    </Nav.Link>
                  </Nav>
                )}
                {user?.role == "C" && (
                  <Nav className="justify-content-start flex-grow-1 sidebar">
                    <Nav.Link href="/services">
                      <Microscope size={30} className="link-icon" />
                      <h5>Services</h5>
                    </Nav.Link>
                    <Nav.Link href="/servicesapp-list">
                      <FileText size={30} className="link-icon" />
                      <h5>Lab Application</h5>
                    </Nav.Link>
                  </Nav>
                )}
                <Button className="w-25 mx-auto" variant="outline-dark" onClick={logout_user}>
                  Logout
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        //   <div className="sidebar">
        //     <div className="my-4 d-flex justify-content-evenly">
        //   <UserCircle2 size={32} />
        //  <h4>{user?.name}</h4>
        //   </div>

        //     <hr
        //       style={{
        //         background: "white",
        //         color: "white",
        //         borderColor: "white",
        //         height: "3px",
        //         marginInline: 20,
        //       }}
        //     />
        //     {user?.role == "RO" && (
        //       <Nav className="flex-column">
        //         <Nav.Link href="/dashboard">
        //           <BarChart3 size={30} className="link-icon"/>
        //           <h5>Dashboard</h5>
        //         </Nav.Link>
        //         <Nav.Link href="/equipment-list">
        //           <Boxes size={30} className="link-icon"/>
        //           <h5>Equipments</h5>
        //         </Nav.Link>
        //         <Nav.Link href="/servicesapp-list">
        //           <FileText size={30} className="link-icon"/>
        //           <h5>Services Application</h5>
        //         </Nav.Link>
        //       </Nav>
        //     )}
        //     {user?.role == "LS" && (
        //       <Nav className="flex-column">
        //         <Nav.Link href="/servicesapp-list">
        //           <FileText />
        //           <h5>Services Application</h5>
        //         </Nav.Link>
        //       </Nav>
        //     )}
        //     {user?.role == "C" && (
        //       <Nav className="flex-column">
        //         <Nav.Link href="/services">
        //           <Microscope size={30} className="link-icon"/>
        //           <h5>Services</h5>
        //         </Nav.Link>
        //         <Nav.Link href="/servicesapp-list">
        //           <FileText size={30} className="link-icon"/>
        //          <h5>Lab Application</h5>
        //         </Nav.Link>
        //       </Nav>
        //     )}

        //     <div className="sidebar-footer">
        //       <Button
        //         variant="secondary"
        //         className="logout-button"
        //         onClick={logout_user}
        //       >
        //         Logout
        //       </Button>
        //     </div>
        //   </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(SideMenu);
