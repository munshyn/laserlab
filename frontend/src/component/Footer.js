import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
import fax from "../assets/fax.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col>
            <h3 className="footer-heading">About Us</h3>
            <p className="footer-paragraph">
              Laser Research Centre (LRC) is a leading research center focusing
              on laser <br/> and photonics technology, Plasma Physics and Fusion, and
              Nano-materials & structures. <br/>Laser Center is the first centre in
              the Malaysia to provide facilities and <br/>expertise for postgraduate
              research in field of Laser Technology and we continue this today
              through our constantly evolving latest research activates and
              facilities and delivered by world-leading experts.
            </p>
          </Col>
          <Col></Col>
          <Col>
            <h3 className="footer-heading">Contact Us</h3>
            <Row>
              <Col>
                <div className="d-flex">
                  <img
                    src={location}
                    style={{
                      height: 40,
                      width: 40,
                      marginLeft: 5,
                      marginRight: 10,
                    }}
                  ></img>
                  <p className="footer-paragraph">
                    Level 5, T05, Laser Center,
                    <br />
                    Ibnu Sina Institute for Scientific & Industrial Research
                    (ISI-SIR)
                    <br />
                    University Teknologi Malaysia,
                    <br />
                    81310 Johor Bahru, Johor, Malaysia
                  </p>
                </div>
                <div className="d-flex">
                  <img
                    src={mail}
                    style={{ width: 40, marginLeft: 5, marginRight: 10 }}
                  ></img>
                  <p className="footer-paragraph">lasercenter@utm.my</p>
                </div>
              </Col>
              <Col>
                <div className="d-flex">
                  <img
                    src={fax}
                    style={{ width: 40, marginLeft: 5, marginRight: 10 }}
                  ></img>
                  <p className="footer-paragraph">Fax : +607-5610393</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
