import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addEquipment } from "../actions/equipment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import utmlogo from "../assets/utm-logo.svg";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";

const AddEquipment = ({ equipments, addEquipment }) => {
  const [regNum, setRegNum] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [registered, setRegistered] = useState(false);
  const [availability, setAvailability] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const [addSuccess, setAddSuccess] = useState("");

  useEffect(() => {
    setRegNum("");
    setName("");
    setLocation("");
    setPrice("");
    setRegistered("");
    setAvailability("");
    setStatus("");
    setQty("");
  }, [addSuccess]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newEquipment = {
      regNum: regNum,
      name: name,
      quantity: qty,
      location: location,
      registered: registered,
      price: price,
      status: status,
      availability: availability,
    };

    const data = await addEquipment(newEquipment);

    if (data == "SUCCESS") setAddSuccess("true");
    else setAddSuccess("false");
  };

  function popup_box() {
    if (addSuccess) {
      return (
        <Alert variant="success">
          <p>Equipment Successfully created</p>
        </Alert>
      );
    } else if (addSuccess == "") {
      return <></>;
    } else
      return (
        <Alert variant="danger">
          <p>Check your form again</p>
        </Alert>
      );
  }

  return (
    <main className="main-content">
      <div className="utm-logo-start">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-img">
        <h1>Add Equipment</h1>
      </div>
      <div className="container-md">
        {/* <div className="center-form"> */}
        {popup_box()}
        <Form onSubmit={(e) => onSubmit(e)}>
          {/* <div className="form-box"> */}
          {/* <div> */}
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicRegNum">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Registration Number"
                value={regNum}
                onChange={(e) => setRegNum(e.target.value)}
              />
              <Form.Text className="text-muted">
                Eg. J001002
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">Eg. Laser</Form.Text>
            </Form.Group>
          </Row>
          {/* </div>
              <div> */}
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicLocation">
              <Form.Label>Equipment Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicQty">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicPrice">
              <Form.Label>Equipment Price (RM)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicStatus">
              <Form.Label>Equipment Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Form.Text className="text-muted">Eg. Good</Form.Text>
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formBasicRegistered"
            >
              <Form.Label>Is the equipment registered in KEWPA?</Form.Label>
              <Form.Check
                type="radio"
                name="registered"
                label="Yes"
                value="true"
                checked={registered}
                onChange={(e) => setRegistered(e.target.value === "true")}
              />
              <Form.Check
                type="radio"
                name="registered"
                label="No"
                value="false"
                checked={!registered}
                onChange={(e) => setRegistered(e.target.value === "true")}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formBasicAvailability"
            >
              <Form.Label>Availability</Form.Label>
              <Form.Select
                value={availability.toString()}
                onChange={(e) => setAvailability(e.target.value === "true")}
              >
                <option value="">Choose</option>
                <option value="true">Available</option>
                <option value="false">Not available</option>
              </Form.Select>
            </Form.Group>
          </Row>
          {/* </div>
            </div> */}
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
        {/* </div> */}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  // isAuthenticated: state.auth.isAuthenticated,
  // user: state.auth.user,
  equipments: state.equipment,
});

export default connect(mapStateToProps, { addEquipment })(AddEquipment);
