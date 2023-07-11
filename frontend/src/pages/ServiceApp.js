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
        <div className="d-flex content-status-app justify-content-between mb-3">
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
        <div className="d-flex content-status-app">
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
                {serviceApp.equipmentId !== null && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Equipment</Card.Text>
                      <Card.Text>
                        {serviceApp.equipmentName || "N/A"}
                      </Card.Text>
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
            {isApproved === 2 && (
              <Card border="secondary" className="mt-4">
                <Card.Header className="fw-bold fs-4">
                  Analysis Report
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    {analysisReport === null && (
                      <Card.Text>No File Yet</Card.Text>
                    )}
                    {analysisReport !== null && (
                      <>
                        <Card.Text>
                          {analysisReport.substring(
                            analysisReport.indexOf(".com/") + 5
                          )}
                        </Card.Text>
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
          <div className="d-flex flex-column w-50 w-xs-auto w-100">
            <Card border="secondary">
              <Card.Header className="fw-bold fs-4">Your Details</Card.Header>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Text>Name</Card.Text>
                  <Card.Text>{user?.name}</Card.Text>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Card.Text>Phone Number</Card.Text>
                  <Card.Text>{user?.phone_number}</Card.Text>
                </div>
                {user?.isStudent && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Card.Text>Matrix Number</Card.Text>
                      <Card.Text>{user?.matrixNum}</Card.Text>
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
