import Button from "react-bootstrap/Button";
import React from "react";
import fiber_coupler from "../assets/fiber_coupler.jpg";
import laser_rental from "../assets/laser_rental.jpg";
import laser_repairing from "../assets/laser_repairing.jpg";
import libs from "../assets/libs.jpg";
import tfd from "../assets/tfd.png";
import ftir from "../assets/ftir.jpeg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";

const Services = () => {
  const servicesList = [
    { name: "Laser Repairing", image: laser_repairing },
    { name: "Laser Rental", image: laser_rental },
    { name: "Elemental Analysis by LIBS", image: libs },
    { name: "Fiber Coupler", image: fiber_coupler },
    { name: "Fourier Transform Infrared Spectroscopy (FTIR)", image: ftir },
    { name: "Thin Film Deposition", image: tfd },
  ];

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>Services</h1>
      </div>
      <div className="container-md">
        <div className="w-100 d-flex flex-column align-items-center">
          <h2>What we offer?</h2>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div className="services-list">
              {servicesList.slice(0, 3).map((item, index) => (
                <Card key={index} style={{ width: "20rem" }} className="m-2">
                  <Card.Img variant="top" src={item.image} style={{ height: "200px" }}/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Link to="/service-form">
                      <Button variant="dark">Apply now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className="services-list">
              {servicesList.slice(3).map((item, index) => (
                <Card key={index} style={{ width: "20rem" }} className="m-2">
                  <Card.Img variant="top" src={item.image} style={{ height: "200px" }}/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Link to="/service-form">
                      <Button variant="dark">Apply now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
            </div>
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
