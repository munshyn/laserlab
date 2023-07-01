import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addEquipment } from "../actions/equipment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/esm/Col";

const AddEquipment = ({ equipments, addEquipment }) => {
  const [regNum, setRegNum] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [hasService, setHasService] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [availability, setAvailability] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const [addSuccess, setAddSuccess] = useState("");

  const statuses = ["Damaged", "Require Fix", "Good", "Rented", "Maintenance"];

  useEffect(() => {
    setAddSuccess("");
  }, [
    regNum,
    name,
    qty,
    location,
    hasService,
    registered,
    availability,
    price,
    status,
  ]);

  const onSubmit = async (e) => {                     //Function called upon submit
    e.preventDefault();

    const newEquipment = {                            //Create a new JSON object
      regNum: regNum,                                 //for new equipment
      name: name,
      quantity: qty,
      location: location,
      registered: registered,
      price: price,
      status: status,
      availability: availability,
      hasService: hasService,
    };

    const data = await addEquipment(newEquipment);   //Send the new equipment using
                                                     //the addEquipment function
    
    if (data === "SUCCESS") {                         //Process the retrieved data
      setAddSuccess(true);                           //if it is success, it will
      setTimeout(() => {                             //give a pop up success message
        setRegNum("");                               //and reset the form
        setName("");
        setLocation("");
        setPrice("");
        setRegistered(false);
        setAvailability("");
        setHasService(false);
        setStatus("");
        setQty("");
      }, 3000);
    } else setAddSuccess(false);
  };

  function popup_box() {
    if (addSuccess) {
      return (
        <Alert variant="success">
          <p>Equipment Successfully created</p>
        </Alert>
      );
    } else if (addSuccess === "") {
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
      <div className="header-img">
        <h1>Add Equipment</h1>
      </div>
      <div className="container-md">
        {popup_box()}
        <Form onSubmit={(e) => onSubmit(e)} autoComplete="off">
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formBasicRegNum">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Registration Number"
                value={regNum}
                onChange={(e) => setRegNum(e.target.value)}
              />
              <Form.Text className="text-muted">Eg. J001002</Form.Text>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">Eg. Laser</Form.Text>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formBasicLocation">
              <Form.Label>Equipment Location</Form.Label>
              <Form.Control
                required
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
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formBasicStatus">
              <Form.Label>Equipment Status</Form.Label>
              <Form.Select
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Choose</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
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
            <Form.Group as={Col} className="mb-3" controlId="formBasicRentable">
              <Form.Label>Is the equipment rentable?</Form.Label>
              <Form.Check
                type="radio"
                name="hasService"
                label="Yes"
                value="true"
                checked={hasService}
                onChange={(e) => setHasService(e.target.value === "true")}
              />
              <Form.Check
                type="radio"
                name="hasService"
                label="No"
                value="false"
                checked={!hasService}
                onChange={(e) => setHasService(e.target.value === "true")}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formBasicAvailability"
            >
              <Form.Label>Availability</Form.Label>
              <Form.Select
                required
                value={availability.toString()}
                onChange={(e) => setAvailability(e.target.value === "true")}
              >
                <option value="">Choose</option>
                <option value="true">Available</option>
                <option value="false">Not available</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button variant="dark" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  equipments: state.equipment,
});

export default connect(mapStateToProps, { addEquipment })(AddEquipment);
