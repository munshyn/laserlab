import { Card, Badge } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { getAllServicesApp } from "../actions/servicesapp";
import { getAllEquipment } from "../actions/equipment";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = ({ getAllServicesApp, getAllEquipment, isAuthenticated }) => {
  const [equipments, setEquipments] = useState([]);
  const [servicesApp, setServicesApp] = useState([]);
  const [pendingServicesApp, setPendingServicesApp] = useState([]);
  const [waitServicesApp, setWaitServicesApp] = useState([]);
  const [ongoingServicesApp, setOngoingServicesApp] = useState([]);
  const [servicesAppToday, setServicesAppToday] = useState([]);
  const [servicesAppRecent, setServicesAppRecent] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [chartWidth, setChartWidth] = useState(null);
  const [chartHeight, setChartHeight] = useState(null);

  const getData = async () => {
    const servicesAppData = await getAllServicesApp();
    const equipmentsData = await getAllEquipment();
    setEquipments(equipmentsData);
    setServicesApp(servicesAppData);
    setMaintenance(
      equipmentsData.filter((equipment) => {
        return equipment.status === "Maintenance";
      })
    );
    setPendingServicesApp(
      servicesAppData.filter((serviceApp) => {
        return serviceApp.isApproved === 0;
      })
    );
    setWaitServicesApp(
      servicesAppData.filter((serviceApp) => {
        return serviceApp.status === "Waiting for Approval";
      })
    );
    setOngoingServicesApp(
      servicesAppData.filter((serviceApp) => {
        return serviceApp.status === "In Progress";
      })
    );
    const today = new Date();
    const filteredServicesAppData = servicesAppData.filter((service) => {
      const serviceDate = new Date(service.created);
      return (
        serviceDate.getDate() === today.getDate() &&
        serviceDate.getMonth() === today.getMonth() &&
        serviceDate.getFullYear() === today.getFullYear()
      );
    });
    setServicesAppToday(filteredServicesAppData);

    setServicesAppRecent(
      servicesAppData
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
        .slice(0, 5)
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const chartContainerRef = useRef(null);

  useEffect(() => {
    if(isAuthenticated){
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const containerWidth = entry.contentRect.width;
          const containerHeight = entry.contentRect.height;
  
          setChartWidth(containerWidth);
          setChartHeight(containerHeight);
        }
      });
  
      resizeObserver.observe(chartContainerRef.current);
  
      return () => {
        if (chartContainerRef.current) {
          resizeObserver.unobserve(chartContainerRef.current);
        }
      };
    }
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getLastSevenDaysData = () => {
    const today = new Date();
    const lastSevenDays = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      lastSevenDays.push({
        date: formatDate(day),
        count: 0,
      });
    }
    servicesApp.forEach((service) => {
      const serviceDate = new Date(service.created);
      const index = lastSevenDays.findIndex(
        (day) => day.date === formatDate(serviceDate)
      );
      if (index !== -1) {
        lastSevenDays[index].count++;
      }
    });
    return lastSevenDays;
  };

  const lastSevenDaysData = getLastSevenDaysData();

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

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>Dashboard</h1>
      </div>
      <div className="container-fluid w-75">
        <div className="d-flex flex-sm-column flex-md-row justify-content-between">
          <Card border="dark" className="mb-3">
            <Card.Header>Total Equipments</Card.Header>
            <Card.Body>
              <Card.Title>{equipments.length}</Card.Title>
              <Card.Text>{maintenance.length} in a maintenance</Card.Text>
            </Card.Body>
          </Card>
          <Card border="dark" className="mb-3">
            <Card.Header>Total Lab Service Applications</Card.Header>
            <Card.Body>
              <Card.Title>{servicesApp.length}</Card.Title>
              <Card.Text>{servicesAppToday.length} created today</Card.Text>
            </Card.Body>
          </Card>
          <Card border="dark" className="mb-3">
            <Card.Header>Pending Lab Service Applications</Card.Header>
            <Card.Body>
              <Card.Title>{pendingServicesApp.length}</Card.Title>
              <Card.Text>
                {waitServicesApp.length} are still waiting for approval
              </Card.Text>
            </Card.Body>
          </Card>
          <Card border="dark" className="mb-3">
            <Card.Header>Ongoing Lab Services</Card.Header>
            <Card.Body>
              <Card.Title>{ongoingServicesApp.length}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="d-flex justify-content-between mt-5 flex-md-row flex-sm-column">
          <div className="w-md-75 mx-md-2 d-flex flex-column flex-sm-fill">
            <h3>Lab Service Applications for the last seven days</h3>
            <div className="w-100 h-100" ref={chartContainerRef}>
              <BarChart
                width={chartWidth}
                height={chartHeight}
                data={lastSevenDaysData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  name="Lab Service Applications"
                  fill="#000"
                  barSize={30}
                />
              </BarChart>
            </div>
          </div>
          <div className="d-flex flex-column w-md-25 flex-sm-fill mx-md-2 mt-sm-3 mb-5">
            <h3>Recent Activities</h3>
            {servicesAppRecent.length > 0 &&
              servicesAppRecent.map((item, index) => {
                const updatedDate = new Date(item.updated);
                const today = new Date();
                const diffInDays = Math.floor(
                  (today - updatedDate) / (1000 * 60 * 60 * 24)
                );

                let formattedUpdated;
                if (diffInDays === 0) {
                  formattedUpdated = "Today";
                } else if (diffInDays === 1) {
                  formattedUpdated = "Yesterday";
                } else {
                  formattedUpdated = `${diffInDays} days ago`;
                }

                return (
                  <Card className="m-1" key={index}>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Body>
                      <Card.Title>
                        {renderBadge(item.isApproved, item.status)}
                      </Card.Title>
                      <Card.Text>{item.appType}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      Updated on {new Date(item.updated).toLocaleTimeString()},{" "}
                      {formattedUpdated}
                    </Card.Footer>
                  </Card>
                );
              })}
            {servicesAppRecent.length === 0 && <h4>No recent activity</h4>}
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAllServicesApp, getAllEquipment })(
  Dashboard
);
