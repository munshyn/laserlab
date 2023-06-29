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
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sampleNum, setSampleNum] = useState("");
  const [sampleType, setSampleType] = useState("");

  const [addSuccess, setAddSuccess] = useState("");

  const [fetchEquipment, setFetchEquipment] = useState(false);
  const [equipmentId, setEquipmentId] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [useDate, setUseDate] = useState(null);
  const [duration, setDuration] = useState(0);

  const projectTypes = [
    "Undergraduate",
    "Master (Mixed Mode)",
    "Master (Research)",
    "P.h.D",
    "Consultancy",
  ];

  const services = [
    "Laser Rental",
    "Laser Repairing",
    "Elemental Analysis by LIBS",
    "Fiber Coupler",
    "Fourier Transform Infrared Spectroscopy (FTIR)",
    "Thin Film Deposition",
  ];

  const durations = ["1", "2", "3", "4", "5", "6", "7"];

  const handleUseDateChange = (date) => {
    setUseDate(date);
  };

  const today = new Date();

  const useDateFilter = (date) => {
    return date >= today;
  };

  useEffect(() => {
    setAddSuccess("");
  }, [
    appType,
    svName,
    duration,
    useDate,
    equipmentId,
    equipmentName,
    sampleNum,
    sampleType,
  ]);

  useEffect(() => {
    if (appType === "Laser Rental" && !fetchEquipment) {
      getAllEquipment();
      console.log(equipments);
      setFetchEquipment(true);
    }
    console.log(user.name);
  }, [appType, fetchEquipment, getAllEquipment]);

  useEffect(() => {
    if (user.phone_number !== null) {
      const arr = user.phone_number.split(" ", 2);
      setPhoneNumber(arr[1]);
    }
    console.log(user);
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let serviceApp = "";
    let phone_number = `+60 ${phoneNumber}`;
    
    if(appType === "Laser Rental"){
      setDuration(`P${duration}D`)

      const rentalApp = {
        appType: appType,
        svName: svName,
        title: title,
        projectType: projectType,
        sampleNum: sampleNum,
        sampleType: sampleType,
        duration: duration,
        useDate: useDate,
        status: "Pending",
        isApproved: 0,
        name: name,
        phone_number: phone_number,
        userId: user.id,
        equipmentId: equipmentId,
        equipmentName: equipmentName,
      }

      serviceApp = rentalApp;
      
    }else{
      const generalApp = {
        appType: appType,
        svName: svName,
        title: title,
        projectType: projectType,
        sampleNum: sampleNum,
        sampleType: sampleType,
        useDate: useDate,
        status: "Pending",
        isApproved: 0,
        name: name,
        phone_number: phone_number,
        userId: user.id,
      }
      
      serviceApp = generalApp;
    }

    console.log(serviceApp)

    const data = await applyService(serviceApp);

    if (data == "SUCCESS") {
      setAddSuccess(true);
      setTimeout(() => {
        setAppType("");
        setSvName("");
        setDuration(0);
        setUseDate("");
        setTitle("");
        setProjectType("");
        setSampleType("");
        setEquipmentId("");
        setEquipmentName("");
        setSampleNum("");
      }, 3000);
    } else setAddSuccess(false);
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
      <div className="header-img">
        <h1>Apply for service</h1>
      </div>
      <div className="container-md">
        {popup_box()}
        <Form onSubmit={(e) => onSubmit(e)} autoComplete="off">
          <div className="service-form">
            <Form.Group className="mb-3" controlId="formBasicServiceType">
              <Form.Label>Service Application Type: </Form.Label>
              <Form.Select
                required
                value={appType}
                onChange={(e) => setAppType(e.target.value)}
              >
                <option value="">Choose</option>
                {services.map((appType, index) => (
                  <option key={index} value={appType}>
                    {appType}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
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
                  required
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </InputGroup>
              <Form.Text className="text-muted">Eg. +60 12 345 6789</Form.Text>
            </Form.Group>
            {user.isStudent && (
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
            )}
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
              required
                type="text"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formBasicTitle">
                <Form.Label>Type of Project</Form.Label>
                <Form.Select
                  required
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="">Choose</option>
                  {projectTypes.map((projectType, index) => (
                    <option key={index} value={projectType}>
                      {projectType}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicUseDate"
              >
                <Form.Label>Date of Use</Form.Label>
                <DatePicker
                  required
                  id="useDate"
                  selected={useDate}
                  onChange={handleUseDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  filterDate={useDateFilter}
                  minDate={today}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col xs={8}>
                <Form.Group className="mb-3" controlId="formBasicSampleType">
                  <Form.Label>Type of Samples</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Type"
                    value={sampleType}
                    onChange={(e) => setSampleType(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Form.Group as={Col} className="mb-3" controlId="formBasicQty">
                <Form.Label>Number of Samples</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Quantity"
                  value={sampleNum}
                  onChange={(e) => setSampleNum(e.target.value)}
                />
              </Form.Group>
            </Row>

            {appType === "Laser Rental" && (
              <>
                <Row>
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    controlId="formBasicEquipment"
                  >
                    <Form.Label>Equipment</Form.Label>
                    <Form.Select
                      required
                      value={equipmentId}
                      onChange={(e) => {
                        const selectedOption = equipments?.find(
                          (item) =>
                            item.equipmentId === parseInt(e.target.value)
                        );
                        setEquipmentId(selectedOption?.equipmentId);
                        setEquipmentName(selectedOption?.name);
                      }}
                    >
                      <option value="">Choose</option>
                      {equipments?.map((item, index) => {
                        if (item.hasService && item.availability) {
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

                  <Form.Group
                    as={Col}
                    className="mb-3"
                    controlId="formBasicDuration"
                  >
                    <Form.Label>Duration (in days)</Form.Label>
                    <Form.Select
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="0">Choose</option>
                      {durations.map((duration, index) => (
                        <option key={index} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </>
            )}
          </div>

          {appType === "" ? (
            <></>
          ) : (
            <div className="d-flex justify-content-center mt-3">
              <Button variant="dark" type="submit">
                Apply
              </Button>
            </div>
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
