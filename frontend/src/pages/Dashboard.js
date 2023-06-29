import { Button, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getAllServicesApp } from "../actions/servicesapp";
import { getAllEquipment } from "../actions/equipment";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

const Dashboard = ({
  getAllServicesApp,
  getAllEquipment,
  equipments,
  servicesApp,
}) => {

  const [equipments, setEquipments] = useState([]);
  const [servicesApp, setServicesApp] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [equipmentLocation, setEquipmentLocation] = useState(null);
  const [equipmentAvailability, setAvailability] = useState(null);

  const getData = async () => {
    const serviceAppData = await getAllServicesApp();
    const equipmentData = await getAllEquipment();

      setEquipmentId(equipmentData.equipmentId);
      setEquipmentName(equipmentData.name);
      setEquipmentLocation(equipmentData.location);
      setAvailability(equipmentData.availability);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>Dashboard</h1>
      </div>
      <div className="container-fluid w-75">
        <div className="d-flex justify-content-between">
          <Card border="dark" style={{ width: "18rem" }}>
            <Card.Header>Total Equipments</Card.Header>
            <Card.Body>
              <Card.Title>{equipments.length}</Card.Title>
              <Card.Text>6 in a maintenance</Card.Text>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: "18rem" }}>
            <Card.Header>Total Lab Service Applications</Card.Header>
            <Card.Body>
              <Card.Title>32</Card.Title>
              <Card.Text>0 today</Card.Text>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: "19rem" }}>
            <Card.Header>Pending Lab Service Applications</Card.Header>
            <Card.Body>
              <Card.Title>12</Card.Title>
              <Card.Text>3 are still waiting for approval</Card.Text>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: "18rem" }}>
            <Card.Header>Ongoing Lab Services</Card.Header>
            <Card.Body>
              <Card.Title>32</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="d-flex justify-content-between">
          <Line data={servicesApp} />
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  servicesApp: state.servicesApp,
  equipments: state.equipment,
});

export default connect(mapStateToProps, { getAllServicesApp, getAllEquipment })(
  Dashboard
);
