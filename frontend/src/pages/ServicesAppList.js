import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ListingServices from "../components/ListingServicesApp";
import { connect } from "react-redux";
import { getAllServicesApp } from "../actions/servicesapp";
import { getUsers } from "../actions/auth";
import { getAllEquipment } from "../actions/equipment";

const ServicesAppList = ({ servicesApp, getAllServicesApp, user }) => {
  const [key, setKey] = useState("0");

  useEffect(() => {
    getAllServicesApp();
    console.log(servicesApp);
  }, [getAllServicesApp]);

  useEffect(() => {
    if (user.role === "LS") {
      setKey("2");
    }
  }, []);

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>Lab Service Application</h1>
      </div>
      <div className="listing-container">
        <div className="listing-header">
          
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          {user.role !== "LS" && (
            <Tab eventKey="0" title="Pending">
              <ListingServices
                items={servicesApp}
                eventKey="0"
                user={user}
                />
            </Tab>
          )}
          {user.role !== "LS" && (
            <Tab eventKey="1" title="Rejected">
              <ListingServices
                items={servicesApp}
                eventKey="1"
                user={user}
                />
            </Tab>
          )}

          <Tab eventKey="2" title="Approved">
            <ListingServices
              items={servicesApp}
              eventKey="2"
              user={user}
            />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  servicesApp: state.servicesApp,
});

export default connect(mapStateToProps, { getAllServicesApp })(ServicesAppList);
