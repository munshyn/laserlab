import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  updateServiceApp,
  getServiceApp,
  getAnalysisReport,
} from "../actions/servicesapp";
import { getUsers } from "../actions/auth";
import {
  getAllEquipment,
  getEquipment,
  updateEquipment,
} from "../actions/equipment";
import { useLocation } from "react-router-dom";
import { Badge, Button, Card, Modal, Form, InputGroup } from "react-bootstrap";

const ManageServicesApp = ({
  updateServiceApp,
  getServiceApp,
  getUsers,
  updateEquipment,
  getEquipment,
  getAllEquipment,
  user,
  users,
  equipment,
  serviceApp,
}) => {
  const location = useLocation();
  const prevServiceApp = location.state?.serviceApp;

  const [customer, setCustomer] = useState({});
  const [status, setStatus] = useState("");
  const [isApproved, setIsApproved] = useState("");
  const [charges, setCharges] = useState("");
  const [remarks, setRemarks] = useState("");
  const [analysisReport, setAnalysisReport] = useState(null);
  const [equipmentId, setEquipmentId] = useState(null);
  const [equipmentName, setEquipmentName] = useState(null);
  const [equipmentLocation, setEquipmentLocation] = useState(null);
  const [equipmentStatus, setEquipmentStatus] = useState(null);
  const [staff, setStaff] = useState({});

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    setAnalysisReport(file);
  };

  const handleClearFile = () => {
    fileInputRef.current.value = '';
  };

  const handleDownload = async (fileURL) => {
    try {
      const blobData = await getAnalysisReport(fileURL);
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blobData);
      downloadLink.download = "analysis_report.pdf"; // Specify the desired file name
      downloadLink.click();
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    const serviceAppData = await getServiceApp(prevServiceApp.appId);
    const usersData = await getUsers();

    if (serviceAppData.equipmentId !== null) {
      const equipmentData = await getEquipment(serviceAppData.equipmentId);
      setEquipmentId(equipmentData.equipmentId);
      setEquipmentName(equipmentData.name);
      setEquipmentLocation(equipmentData.location);
      setEquipmentStatus(equipmentData.status);
    } else await getAllEquipment();

    setCustomer(
      usersData.filter((user) => {
        return user.id === serviceAppData.userId;
      })[0]
    );
    setAnalysisReport(serviceAppData.analysisReport);
    setStatus(serviceAppData.status);
    setIsApproved(serviceAppData.isApproved);
    setCharges(serviceAppData.charges || "");
    setRemarks(serviceAppData.remarks || "N/A");
    setStaff(
      usersData.filter((user) => {
        return user.id === serviceAppData.staffInCharged;
      })[0] || "N/A"
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
  const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateReport = async (e) => {
    e.preventDefault();

    const updatedServiceApp = new FormData();
    updatedServiceApp.append("appType", serviceApp.appType);
    updatedServiceApp.append("name", serviceApp.name);
    updatedServiceApp.append("phone_number", serviceApp.phone_number);
    updatedServiceApp.append("status", serviceApp.status);
    updatedServiceApp.append("isApproved", serviceApp.isApproved);
    updatedServiceApp.append("title", serviceApp.title);
    updatedServiceApp.append("sampleNum", serviceApp.sampleNum);
    updatedServiceApp.append("sampleType", serviceApp.sampleType);
    updatedServiceApp.append("useDate", serviceApp.useDate);
    updatedServiceApp.append("userId", serviceApp.userId);
    updatedServiceApp.append("analysisReport", analysisReport);

    await updateServiceApp(updatedServiceApp, serviceApp.appId);
  };

  const onUpdateStatus = async (e, updatedStatus, updatedIsApproved) => {
    e.preventDefault();

    const updatedServiceApp = new FormData();
    updatedServiceApp.append("appType", serviceApp.appType);
    updatedServiceApp.append("name", serviceApp.name);
    updatedServiceApp.append("phone_number", serviceApp.phone_number);
    updatedServiceApp.append("status", updatedStatus);
    updatedServiceApp.append("isApproved", updatedIsApproved);
    updatedServiceApp.append("title", serviceApp.title);
    updatedServiceApp.append("sampleNum", serviceApp.sampleNum);
    updatedServiceApp.append("sampleType", serviceApp.sampleType);
    updatedServiceApp.append("charges", charges);
    updatedServiceApp.append("remarks", remarks);
    updatedServiceApp.append("useDate", serviceApp.useDate);
    updatedServiceApp.append("userId", serviceApp.userId);
    if (user.role === "D") {
      updatedServiceApp.append("staffInCharged", staff.id);
    }

    await updateServiceApp(updatedServiceApp, serviceApp.appId);

    if (updatedStatus == "In Progress") {
      const updatedEquipment = {
        regNum: equipment.regNum,
        name: equipment.name,
        quantity: equipment.qty,
        location: equipmentLocation,
        registered: equipment.registered,
        price: equipment.price,
        status: "Rented",
        availability: 0,
        hasService: equipment.hasService,
      };

      await updateEquipment(updatedEquipment, equipment.equipmentId);
    } else if (updatedStatus == "Completed") {
      const updatedEquipment = {
        regNum: equipment.regNum,
        name: equipment.name,
        quantity: equipment.qty,
        location: equipmentLocation,
        registered: equipment.registered,
        price: equipment.price,
        status: "Good",
        availability: 1,
        hasService: equipment.hasService,
      };

      await updateEquipment(updatedEquipment, equipment.equipmentId);
    }
  };

  const onUpdateEquipment = async (e) => {
    e.preventDefault();

    const updatedEquipment = {
      regNum: equipment.regNum,
      name: equipment.name,
      quantity: equipment.qty,
      location: equipmentLocation,
      registered: equipment.registered,
      price: equipment.price,
      status: equipment.status,
      availability: equipment.availability,
      hasService: equipment.hasService,
    };

    await updateEquipment(updatedEquipment, equipment.equipmentId);

    const updatedServiceApp = new FormData();
    updatedServiceApp.append("appType", serviceApp.appType);
    updatedServiceApp.append("name", serviceApp.name);
    updatedServiceApp.append("phone_number", serviceApp.phone_number);
    updatedServiceApp.append("status", serviceApp.status);
    updatedServiceApp.append("isApproved", serviceApp.isApproved);
    updatedServiceApp.append("title", serviceApp.title);
    updatedServiceApp.append("sampleNum", serviceApp.sampleNum);
    updatedServiceApp.append("sampleType", serviceApp.sampleType);
    updatedServiceApp.append("useDate", serviceApp.useDate);
    updatedServiceApp.append("userId", serviceApp.userId);
    updatedServiceApp.append("equipmentId", equipmentId);
    updatedServiceApp.append("equipmentName", equipmentName);

    await updateServiceApp(updatedServiceApp, serviceApp.appId);
  };

  const renderBadge = (isApproved, status) => {
    switch (isApproved) {
      case 0:
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case 1:
        return (
          <Badge bg="danger" text="light">
            {status}
          </Badge>
        );
      case 2:
        return (
          <Badge bg="success" text="light">
            {status}
          </Badge>
        );
      default:
        return null;
    }
  };

  const renderStudent = (isStudent) => {
    if (isStudent) {
      return (
        <Badge bg="secondary" text="light">
          UTM Student
        </Badge>
      );
    } else {
      return (
        <Badge bg="secondary" text="light">
          Outsiders
        </Badge>
      );
    }
  };
  return (
    <main className="main-content">
      <div className="header-img">
        <h1>Service Application</h1>
      </div>
      <div className="content-status">
        <div className="d-flex content-status-app justify-content-between mb-3">
          <div className="d-flex">
            <h3 className="fw-bold">Service Type</h3>
            <h3 className="text-success fw-bold fst-italic ms-3">
              {serviceApp.appType}
            </h3>
          </div>
          <div className="d-flex">
            <h3 className="me-2">{renderStudent(customer?.isStudent)}</h3>
            <h3>{renderBadge(isApproved, status)}</h3>
          </div>
        </div>
        <div className="d-flex  content-status-app">
          <div className="d-flex flex-column mb-xs-4 me-md-4 w-50 w-xs-auto w-100">
            <Card border="secondary">
              <Card.Header className="fw-bold fs-4">
                Application Details
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Text>Title</Card.Text>
                  <Card.Text>{serviceApp.title}</Card.Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Text>Type of Project</Card.Text>
                  <Card.Text>{serviceApp.projectType}</Card.Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Text>Type of Sample</Card.Text>
                  <Card.Text>{serviceApp.sampleType}</Card.Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Text>Number of Sample</Card.Text>
                  <Card.Text>{serviceApp.sampleNum}</Card.Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Text>Date of Use</Card.Text>
                  <Card.Text>
                    {new Date(serviceApp.useDate).toLocaleDateString()}
                  </Card.Text>
                </div>
                {serviceApp.appType === "Laser Rental" && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Duration of Use</Card.Text>
                      <Card.Text>
                        {parseInt(serviceApp.duration?.split(" ")[0])} Days
                      </Card.Text>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>

            {(serviceApp.equipmentId !== null || user.role === "LS") && (
              <Card border="secondary" className="mt-4">
                <Card.Header className="fw-bold fs-4 d-flex justify-content-between">
                  <p>Equipment Details</p>
                  {user.role === "LS" && <Button variant="dark" onClick={() => setIsEdit(true)}>
                    Edit
                  </Button>}
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <Card.Text>Name</Card.Text>
                    <Card.Text>{equipmentName || "N/A"}</Card.Text>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Card.Text>Location</Card.Text>
                    <Card.Text>{equipmentLocation || "N/A"}</Card.Text>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Card.Text>Status</Card.Text>
                    <Card.Text>{equipmentStatus || "N/A"}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            )}
            {(user.role === "LS" || analysisReport !== null) && status !== "Approved" && (
              <Card border="secondary" className="mt-4">
                <Card.Header className="fw-bold fs-4 d-flex justify-content-between">
                  <p>Analysis Report</p>
                  <div>
                    {user.role === "LS" && fileInputRef.current?.value != '' && (
                      <Button
                        variant="dark"
                        className="me-2"
                        onClick={(e) => {
                          setIsLoading(true);
                          setTimeout(() => {
                            onUpdateReport(e);
                            handleClearFile();
                            setIsLoading(false);
                          }, 2000);
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Upload"}
                      </Button>
                    )}
                    {analysisReport !== null && typeof analysisReport === 'string' && (
                      <Button
                        variant="outline-dark"
                        onClick={() => handleDownload(analysisReport)}
                      >
                        Download
                      </Button>
                    )}
                  </div>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    {analysisReport === null && (
                      <Card.Text>No File Yet</Card.Text>
                    )}
                    {analysisReport !== null && typeof analysisReport !== 'string' && (
                      <Card.Text>
                        {analysisReport.name}
                      </Card.Text>
                    )}
                    {analysisReport !== null && typeof analysisReport === 'string' && (
                      <Card.Text>
                        {analysisReport.substring(
                          analysisReport.indexOf(".com/") + 5
                        )}
                      </Card.Text>
                    )}
                    {user.role === "LS" && (
                      <input type="file" onChange={handleFileSelect} ref={fileInputRef}/>
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
          <div className="d-flex flex-column w-50 w-xs-auto w-100">
            <Card border="secondary">
              <Card.Header className="fw-bold fs-4">
                Customer Details
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Text>Name</Card.Text>
                  <Card.Text>{customer?.name}</Card.Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Text>Phone Number</Card.Text>
                  <Card.Text>{customer?.phone_number}</Card.Text>
                </div>
                {customer?.isStudent && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Matrix Number</Card.Text>
                      <Card.Text>{customer?.matrixNum}</Card.Text>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Name of Supervisor</Card.Text>
                      <Card.Text>{serviceApp.svName}</Card.Text>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
            <Card border="secondary" className="mt-4">
              <Card.Header className="fw-bold fs-4">
                Application Summary
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Text>Created on</Card.Text>
                  <Card.Text>
                    {new Date(serviceApp.created).toLocaleDateString()}
                  </Card.Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Text>Created time</Card.Text>
                  <Card.Text>
                    {new Date(serviceApp.created).toLocaleTimeString()}
                  </Card.Text>
                </div>
                {isApproved === 2 && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Lab Staff in charged</Card.Text>
                      <Card.Text>{staff.name}</Card.Text>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Charges</Card.Text>
                      <Card.Text>RM {charges}</Card.Text>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
            {isApproved !== 0 && (
              <Card border="secondary" className="mt-4">
                <Card.Header className="fw-bold fs-4">Remarks</Card.Header>
                <Card.Body className="d-flex flex-column">
                  <Card.Text>{remarks}</Card.Text>
                </Card.Body>
              </Card>
            )}
            {isApproved === 0 && (
              <div className="d-flex flex-column mt-auto">
                {user.role === "RO" && status === "Pending" && (
                  <>
                    <Button
                      variant="dark"
                      className="my-1"
                      onClick={(e) => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setStatus("Waiting for Approval");
                          onUpdateStatus(e, "Waiting for Approval", 0);
                          setIsLoading(false);
                        }, 2000);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Request for Approval"}
                    </Button>
                    <Button
                      variant="outline-dark"
                      onClick={() => setShowRejectConfirmation(true)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {user.role === "D" && status === "Waiting for Approval" && (
                  <>
                    <Button
                      variant="dark"
                      className="my-1"
                      onClick={() => setShowApproveConfirmation(true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline-dark"
                      onClick={() => setShowRejectConfirmation(true)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            )}
            {user.role === "LS" && isApproved === 2 && (
              <div className="d-flex flex-column mt-auto">
                {status === "Approved" && (
                  <Button
                    variant="dark"
                    className="my-1"
                    onClick={(e) => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setStatus("In Progress");
                        onUpdateStatus(e, "In Progress", 2);
                        setIsLoading(false);
                      }, 2000);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Update status to In Progress"}
                  </Button>
                )}
                {status === "In Progress" && (
                  <Button
                    variant="dark"
                    className="my-1"
                    onClick={(e) => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setStatus("Completed");
                        onUpdateStatus(e, "Completed", 2);
                        setIsLoading(false);
                      }, 2000);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Update status to Completed"}
                  </Button>
                )}
              </div>
            )}
            <Modal
              show={showRejectConfirmation}
              onHide={() => setShowRejectConfirmation(false)}
            >
              <Modal.Header>
                <Modal.Title>
                  Are you sure you want to reject this service application?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                    <Form.Text>Optional</Form.Text>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowRejectConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={(e) => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setStatus("Rejected");
                      setIsApproved(1);
                      onUpdateStatus(e, "Rejected", 1);
                      setShowRejectConfirmation(false);
                      setIsLoading(false);
                    }, 2000);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Reject"}
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={showApproveConfirmation}
              onHide={() => setShowApproveConfirmation(false)}
            >
              <Modal.Header>
                <Modal.Title>
                  Please assign lab staff and charges for this service
                  application.
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Lab Staff</Form.Label>
                    <Form.Select
                      required
                      value={staff ? staff.id : ""}
                      onChange={(e) => {
                        const selectedOption = users.find(
                          (staff) => staff.id === parseInt(e.target.value)
                        );
                        setStaff(selectedOption || null);
                      }}
                    >
                      <option value="">Choose</option>
                      {users.map((staff) => {
                        if (staff.role === "LS") {
                          return (
                            <option key={staff.id} value={staff.id}>
                              {staff.name}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Charges</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>RM</InputGroup.Text>
                      <Form.Control
                        required
                        type="number"
                        value={charges}
                        onChange={(e) => setCharges(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                    <Form.Text>Optional</Form.Text>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowApproveConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-success"
                  onClick={(e) => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setStatus("Approved");
                      setIsApproved(2);
                      onUpdateStatus(e, "Approved", 2);
                      setShowApproveConfirmation(false);
                      setIsLoading(false);
                    }, 2000);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Approve"}
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={isEdit} onHide={() => setIsEdit(false)}>
              <Modal.Header>
                {serviceApp.equipmentId === null ? (
                  <Modal.Title>Choose your equipment.</Modal.Title>
                ) : (
                  <Modal.Title>Update the equipment status</Modal.Title>
                )}
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {serviceApp.equipmentId === null && (
                    <Form.Group className="mb-3">
                      <Form.Label>Equipment</Form.Label>
                      <Form.Select
                        required
                        value={equipmentId}
                        onChange={(e) => {
                          const selectedOption = equipment?.find(
                            (item) =>
                              item.equipmentId === parseInt(e.target.value)
                          );
                          setEquipmentId(selectedOption?.equipmentId);
                          setEquipmentName(selectedOption?.name);
                          setEquipmentLocation(selectedOption?.location);
                          setEquipmentStatus(selectedOption?.status);
                        }}
                      >
                        <option value="">Choose</option>
                        {Array.isArray(equipment) &&
                          equipment.map((item) => {
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
                  )}
                  {serviceApp.equipmentId !== null && (
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        value={equipmentLocation}
                        onChange={(e) => setEquipmentLocation(e.target.value)}
                      />
                    </Form.Group>
                  )}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-secondary"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-success"
                  onClick={(e) => {
                    setIsLoading(true);
                    setTimeout(() => {
                      onUpdateEquipment(e);
                      setIsEdit(false);
                      setIsLoading(false);
                    }, 2000);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Update"}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.auth.users,
  equipment: state.equipment,
  serviceApp: state.servicesApp,
});

export default connect(mapStateToProps, {
  updateServiceApp,
  getServiceApp,
  getUsers,
  getEquipment,
  getAllEquipment,
  updateEquipment,
})(ManageServicesApp);
