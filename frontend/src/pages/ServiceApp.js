import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getServiceApp, getAnalysisReport } from "../actions/servicesapp";
import { getUsers } from "../actions/auth";
import { useLocation } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";

const ManageServicesApp = ({
  getServiceApp,
  getUsers,
  user,
  serviceApp,
}) => {
  const location = useLocation();
  const prevServiceApp = location.state?.serviceApp;

  const [status, setStatus] = useState("");
  const [isApproved, setIsApproved] = useState("");
  const [charges, setCharges] = useState("");
  const [remarks, setRemarks] = useState("");
  const [analysisReport, setAnalysisReport] = useState(null);
  const [staff, setStaff] = useState({});

  // const [updateSuccess, setUpdateSuccess] = useState("");

  const handleDownload = async (fileURL) => {
    try {
      const blobData = await getAnalysisReport(fileURL);
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blobData);
      downloadLink.download = "analysis_report.pdf";
      downloadLink.click();
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    const serviceAppData = await getServiceApp(prevServiceApp.appId);
    const usersData = await getUsers();

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
    console.log(staff, analysisReport, serviceAppData);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <div className="d-flex justify-content-between mb-3 flex-sm-column flex-md-row align-items-sm-center">
          <div className="d-flex">
            <h3 className="fw-bold">Service Type</h3>
            <h3 className="text-success fw-bold fst-italic ms-3">
              {serviceApp.appType}
            </h3>
          </div>
          <div className="d-flex">
            <h3 className="me-2">{renderStudent(user?.isStudent)}</h3>
            <h3>{renderBadge(isApproved, status)}</h3>
          </div>
        </div>
        <div className="d-flex flex-sm-column flex-md-row">
          <div className="d-flex flex-column mb-sm-4 me-md-4 w-50 w-sm-auto w-100">
            <Card border="secondary">
              <Card.Header className="fw-bold fs-4">
                Application Details
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Title>Title</Card.Title>
                  <Card.Title>{serviceApp.title}</Card.Title>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Title>Type of Project</Card.Title>
                  <Card.Title>{serviceApp.projectType}</Card.Title>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Title>Type of Sample</Card.Title>
                  <Card.Title>{serviceApp.sampleType}</Card.Title>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Title>Number of Sample</Card.Title>
                  <Card.Title>{serviceApp.sampleNum}</Card.Title>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Title>Date of Use</Card.Title>
                  <Card.Title>
                    {new Date(serviceApp.useDate).toLocaleDateString()}
                  </Card.Title>
                </div>
                {serviceApp.appType === "Laser Rental" && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Title>Duration of Use</Card.Title>
                      <Card.Title>
                        {parseInt(serviceApp.duration?.split(" ")[0])} Days
                      </Card.Title>
                    </div>
                  </>
                )}
                {serviceApp.equipmentId !== null && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Title>Equipment</Card.Title>
                      <Card.Title>
                        {serviceApp.equipmentName || "N/A"}
                      </Card.Title>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
            {isApproved !== 0 && (
              <Card border="secondary" className="mt-4">
                <Card.Header className="fw-bold fs-4">Remarks</Card.Header>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{remarks}</Card.Title>
                </Card.Body>
              </Card>
            )}
            {isApproved === 2 && (
              <Card border="secondary" className="mt-4">
                <Card.Header className="fw-bold fs-4">
                  Analysis Report
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    {analysisReport === null && (
                      <Card.Title>No File Yet</Card.Title>
                    )}
                    {analysisReport !== null && (
                      <>
                        <Card.Title>
                          {analysisReport.substring(
                            analysisReport.indexOf(".com/") + 5
                          )}
                        </Card.Title>
                        <Button
                          variant="outline-dark"
                          onClick={() => handleDownload(analysisReport)}
                        >
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
          <div className="d-flex flex-column w-50 w-sm-auto w-100">
            <Card border="secondary">
              <Card.Header className="fw-bold fs-4">Your Details</Card.Header>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Title>Name</Card.Title>
                  <Card.Title>{user?.name}</Card.Title>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Title>Phone Number</Card.Title>
                  <Card.Title>{user?.phone_number}</Card.Title>
                </div>
                {user?.isStudent && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Title>Matrix Number</Card.Title>
                      <Card.Title>{user?.matrixNum}</Card.Title>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Title>Name of Supervisor</Card.Title>
                      <Card.Title>{serviceApp.svName}</Card.Title>
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
                  <Card.Title>Created on</Card.Title>
                  <Card.Title>
                    {new Date(serviceApp.created).toLocaleDateString()}
                  </Card.Title>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Title>Created time</Card.Title>
                  <Card.Title>
                    {new Date(serviceApp.created).toLocaleTimeString()}
                  </Card.Title>
                </div>
                {isApproved === 2 && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Title>Lab Staff in charged</Card.Title>
                      <Card.Title>{staff.name}</Card.Title>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Title>Charges</Card.Title>
                      <Card.Title>RM {charges}</Card.Title>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.auth.users,
  serviceApp: state.servicesApp,
});

export default connect(mapStateToProps, {
  getServiceApp,
  getUsers,
})(ManageServicesApp);
