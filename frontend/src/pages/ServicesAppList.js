import React, { useEffect, useState } from "react";
import { Tabs, Tab, Form } from "react-bootstrap";
import ListingServices from "../component/ListingServicesApp";
import utmlogo from "../assets/utm-logo.svg";
import { connect } from "react-redux";
import { getAllServicesApp } from "../actions/servicesapp";

const ServicesAppList = ({ servicesApp, getAllServicesApp, user }) => {
  const [key, setKey] = useState("0");
  const [appType, setAppType] = useState("Rental");

  useEffect(() => {
    getAllServicesApp(appType);
    console.log(servicesApp);
  }, [getAllServicesApp, appType]);

  useEffect(() => {
    if (user.role === "LS") {
      setKey("2");
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
            <Tab eventKey="0" title="Pending">
              <ListingServices
                items={servicesApp}
                appType={appType}
                eventKey="0"
                role={user.role}
                />
            </Tab>
          )}
          {user.role !== "LS" && (
            <Tab eventKey="1" title="Rejected">
              <ListingServices
                items={servicesApp}
                appType={appType}
                eventKey="1"
                role={user.role}
                />
            </Tab>
          )}

          <Tab eventKey="2" title="Approved">
            <ListingServices
              items={servicesApp}
              appType={appType}
              eventKey="2"
              role={user.role}
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
