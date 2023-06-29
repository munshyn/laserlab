import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateEquipment, getEquipment } from "../actions/equipment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/esm/Col";

const EditEquipment = ({ updateEquipment, getEquipment }) => {
  const prevLocation = useLocation();
  const equipment = prevLocation.state?.equipment;

  console.log(equipment.regNum);

  const [regNum, setRegNum] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [registered, setRegistered] = useState("");
  const [hasService, setHasService] = useState("");
  const [availability, setAvailability] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const [editSuccess, setEditSuccess] = useState("");

  const statuses = ["Damaged", "Require Fix", "Good", "Rented", "Maintenance"];

  const getData = async () => {
    const equipmentData = await getEquipment(equipment.equipmentId);
    setRegNum(equipmentData.regNum);
    setName(equipmentData.name);
    setQty(equipmentData.quantity);
    setLocation(equipmentData.location);
    setRegistered(equipmentData.registered);
    setHasService(equipmentData.hasService);
    setAvailability(equipmentData.availability);
    setPrice(equipmentData.price);
    setStatus(equipmentData.status);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedEquipment = {
      regNum: regNum,
      name: name,
      quantity: qty,
      location: location,
      registered: registered,
      price: price,
      status: status,
      availability: availability,
      hasService: hasService,
    };

    const data = await updateEquipment(updatedEquipment, equipment.equipmentId);

    if (data == "SUCCESS") setEditSuccess("true");
    else setEditSuccess("false");
  };

  function popup_box() {
    if (editSuccess) {
      return (
        <Alert variant="success">
          <p>Equipment Successfully Updated</p>
        </Alert>
      );
    } else if (editSuccess == "") {
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
        <h1>Edit Equipment</h1>
      </div>
      <div className="container-md">
        {popup_box()}
        <Form onSubmit={(e) => onSubmit(e)}>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicRegNum">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Registration Number"
                value={regNum}
                onChange={(e) => setRegNum(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Row>
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
                value={availability.toString()}
                onChange={(e) => setAvailability(e.target.value === "true")}
              >
                <option value="true">Available</option>
                <option value="false">Not available</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button variant="dark" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  equipment: state.equipment,
});

export default connect(mapStateToProps, { updateEquipment, getEquipment })(EditEquipment);
