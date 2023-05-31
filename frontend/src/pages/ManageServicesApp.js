import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { connect } from "react-redux";
import { getEquipment } from "../actions/equipment";
import { updateServiceApp } from "../actions/servicesapp";
import { useLocation } from "react-router-dom";
import { Table, Badge } from "react-bootstrap";

const ManageServicesApp = ({
  updateServiceApp,
  getEquipment,
  user,
  equipment,
}) => {
  const location = useLocation();
  const serviceApp = location.state?.serviceApp;

  const [appType, setAppType] = useState(serviceApp.appType);
  const [name, setName] = useState(serviceApp.name);
  const [svName, setSvName] = useState(serviceApp.svName);
  const [phoneNumber, setPhoneNumber] = useState(serviceApp.phone_number);
  const [status, setStatus] = useState(serviceApp.status);
  const [isApproved, setIsApproved] = useState(serviceApp.isApproved);

  const [qty, setQty] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [duration, setDuration] = useState("0");

  const [updateSuccess, setUpdateSuccess] = useState("");

  useEffect(() => {
    console.log();
  }, []);
  console.log(isApproved)
  
  const renderBadge = (isApproved,status) => {
    switch (isApproved) {
      case 0:
        return <Badge bg="warning" text="dark">{status}</Badge>;
      case 1:
        return <Badge bg="danger" text="light">{status}</Badge>;
      case 2:
        return <Badge bg="success" text="light">{status}</Badge>;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (appType === "Rental") {
      getEquipment(serviceApp.equipmentId);
      setDuration(serviceApp?.duration);
      setRentDate(serviceApp.rentDate);
    } else if (appType === "Sample") {
      setQty(serviceApp.quantity);
      setSampleType(serviceApp.type);
    }
  }, [serviceApp, appType]);

  return (
    <main className="main-content">
      <div className="utm-logo-start">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-img">
        <h1>Service Application</h1>
      </div>

      <div className="content-status">
        <div className="content-header mb-3">
          <h3>
            {/* <Badge bg="warning" text="dark">
              Warning
            </Badge> */}
            {renderBadge(isApproved,status)}
          </h3>
        </div>
        <Table striped borderless hover className="app-status">
          <tbody>
            <tr>
              <td>Application Type</td>
              <td>:</td>
              <td>{appType}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>:</td>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <td>Supervisor</td>
              <td>:</td>
              <td>{svName}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>:</td>
              <td>{status}</td>
            </tr>
            {appType === "Rental" && (
              <>
                <tr>
                  <td>Equipment</td>
                  <td>:</td>
                  <td>{equipment.name}</td>
                </tr>
                <tr>
                  <td>Rental Date</td>
                  <td>:</td>
                  <td>{new Date(rentDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>Duration (in days)</td>
                  <td>:</td>
                  <td>{parseInt(duration.split(" ")[0])}</td>
                </tr>
              </>
            )}
            {appType === "Sample" && (
              <>
                <tr>
                  <td>Quantity</td>
                  <td>:</td>
                  <td>{qty}</td>
                </tr>
                <tr>
                  <td>Sample Type</td>
                  <td>:</td>
                  <td>{sampleType}</td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps, { getEquipment, updateServiceApp })(
  ManageServicesApp
);
