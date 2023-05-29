import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { applyService } from "../actions/servicesapp";
import { getAllEquipment } from "../actions/equipment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import utmlogo from "../assets/utm-logo.svg";
import { Link } from "react-router-dom";
// import { Row, Col } from "react-bootstrap/esm";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays, addDays } from "date-fns";

const ServiceAppForm = ({
  equipments,
  getAllEquipment,
  applyService,
  user,
}) => {
  const [appType, setAppType] = useState("");
  const [name, setName] = useState(user.name);
  const [svName, setSvName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || "");
  const [status, setStatus] = useState("Pending");

  const [qty, setQty] = useState("");
  const [sampleType, setSampleType] = useState("");

  const [addSuccess, setAddSuccess] = useState("");

  const [fetchEquipment, setFetchEquipment] = useState(false);
  const [equipmentId, setEquipmentId] = useState("");
  const [rentDate, setRentDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [duration, setDuration] = useState(0);

  const handleRentDateChange = (date) => {
    setRentDate(date);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const today = new Date();

  const rentDateFilter = (date) => {
    return date >= today;
  };

  const returnDateFilter = (date) => {
    return date >= rentDate;
  };

  useEffect(() => {
    if (rentDate && returnDate) {
      const calculatedDuration = differenceInDays(returnDate, rentDate);
      const validDuration = calculatedDuration >= 0 ? calculatedDuration : 0;
      setDuration(validDuration);
    } else {
      setDuration(0);
    }
  }, [rentDate, returnDate]);

  useEffect(() => {
    if (appType === "Rental" && !fetchEquipment) {
      getAllEquipment();
      console.log(equipments);
      setFetchEquipment(true);
    }
    console.log(user.name);
  }, [appType, fetchEquipment, getAllEquipment]);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    let serviceApp = null;
    
    if (appType === "Rental") {
      const rentApp = {
        appType: appType,
        svName: svName,
        duration: `P${duration}D`,
        rentDate: rentDate,
        status: status,
        userId: user.id,
        equipmentId: equipmentId,
      };
      
      serviceApp = rentApp;
      console.log(rentApp.duration)
      console.log(rentApp.rentDate)
    } else if (appType === "Sample") {
      const sampleApp = {
        appType: appType,
        svName: svName,
        quantity: qty,
        type: sampleType,
        status: status,
        userId: user.id,
      };
      
      serviceApp = sampleApp;
    }

    const data = await applyService(serviceApp, name, `+60 ${phoneNumber}`);

    if (data == "SUCCESS") setAddSuccess("true");
    else setAddSuccess("false");
  };

  function popup_box() {
    if (addSuccess) {
      return (
        <Alert variant="success">
          <p>Applied Successfully</p>
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
        <h1>Apply for service</h1>
      </div>
      <div className="container-md">
        {popup_box()}
        <Form onSubmit={(e) => onSubmit(e)}>
          <div className="service-form">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Contact No.</Form.Label>
                <InputGroup>
                  <InputGroup.Text>+60</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Eg. +60 12 345 6789
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSvName">
                <Form.Label>Supervisor Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your supervisor's name"
                  value={svName}
                  onChange={(e) => setSvName(e.target.value)}
                />
                <Form.Text className="text-muted">Eg. Dr Shahliza</Form.Text>
              </Form.Group>
            </div>
            <div className="right-form">
              <Form.Group className="mb-3" controlId="formBasicServiceType">
                <Form.Label>Service Application Type: </Form.Label>
                <div className="d-flex flex-row mt-1">
                  <Form.Check
                    className="mx-2"
                    type="radio"
                    name="appType"
                    label="Rental"
                    value="Rental"
                    checked={appType === "Rental"}
                    onChange={(e) => setAppType(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    name="appType"
                    label="Sample"
                    value="Sample"
                    checked={appType === "Sample"}
                    onChange={(e) => setAppType(e.target.value)}
                  />
                </div>
              </Form.Group>
              {appType === "Rental" && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicEquipment">
                    <Form.Label>Equipment</Form.Label>
                    <Form.Select
                      required
                      value={equipmentId}
                      onChange={(e) => setEquipmentId(e.target.value)}
                    >
                      <option value="">Choose</option>
                      {equipments?.map((item, index) => {
                        if (item.hasService) {
                          return (
                            <option
                              key={item.equipmentId}
                              value={item.equipmentId}
                            >
                              {item.name}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </Form.Select>
                  </Form.Group>

                  <Row>
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicRentDate"
                    >
                      <Form.Label>Rent Date</Form.Label>
                      <DatePicker
                        required
                        id="rentDate"
                        selected={rentDate}
                        onChange={handleRentDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        filterDate={rentDateFilter}
                        minDate={today}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicReturnDate"
                    >
                      <Form.Label>Return Date</Form.Label>
                      <DatePicker
                        required
                        id="returnDate"
                        selected={returnDate}
                        onChange={handleReturnDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        filterDate={returnDateFilter}
                        minDate={rentDate ? addDays(rentDate, 1) : null}
                      />
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3" controlId="formBasicDuration">
                    <Form.Label>Duration (in days)</Form.Label>
                    <Form.Control
                      disabled
                      type="number"
                      placeholder="Duration"
                      value={duration}
                    />
                  </Form.Group>
                </>
              )}
              {appType === "Sample" && (
                <>
                  <Row>
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicQty"
                    >
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Quantity"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </Form.Group>
                    <Col xs={8}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSampleType"
                      >
                        <Form.Label>Sample Type</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Type"
                          value={sampleType}
                          onChange={(e) => setSampleType(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          </div>

          {appType === "" ? (
            <></>
          ) : (
            <Button variant="success" type="submit">
              Submit
            </Button>
          )}
        </Form>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  equipments: state.equipment,
  user: state.auth.user,
});

export default connect(mapStateToProps, { applyService, getAllEquipment })(
  ServiceAppForm
);
