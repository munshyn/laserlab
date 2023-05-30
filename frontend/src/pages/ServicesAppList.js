import React, { useEffect, useState } from "react";
import { Tabs, Tab, Form } from "react-bootstrap";
import ListingServices from "../component/ListingServicesApp";
import utmlogo from "../assets/utm-logo.svg";
import { connect } from "react-redux";
import { getAllServicesApp } from "../actions/servicesapp";

const ServicesAppList = ({ servicesApp, getAllServicesApp, user }) => {
  const [key, setKey] = useState("pending");
  const [appType, setAppType] = useState("Rental");

  useEffect(() => {
    getAllServicesApp(appType);
    console.log(servicesApp);
  }, [getAllServicesApp, appType]);

  useEffect(() => {
    if (user.role === "LS") {
      setKey("approved");
    }
  }, []);

  return (
    <main className="main-content">
      <div className="utm-logo-start">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-img">
        <h1>List of Service Application</h1>
      </div>
      <div className="listing-container">
        <div className="listing-header">
          <Form.Select
            value={appType}
            onChange={(e) => setAppType(e.target.value)}
          >
            <option value="Rental">Rental</option>
            <option value="Sample">Sample</option>
          </Form.Select>
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          {user.role !== "LS" && (
            <Tab eventKey="pending" title="Pending">
              <ListingServices
                items={servicesApp}
                appType={appType}
                eventKey="Pending"
              />
            </Tab>
          )}
          {user.role !== "LS" && (
            <Tab eventKey="rejected" title="Rejected">
              <ListingServices
                items={servicesApp}
                appType={appType}
                eventKey="Rejected"
              />
            </Tab>
          )}

          <Tab eventKey="approved" title="Approved">
            <ListingServices
              items={servicesApp}
              appType={appType}
              eventKey="Approved"
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
