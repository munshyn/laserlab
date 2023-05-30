import React, { useEffect, useState } from "react";
import { Button, Table, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListingServices = ({ items, appType, eventKey }) => {
  const navigate = useNavigate();

  // const filteredItems = items.filter((item) => item.status === eventKey);
  const filteredItems = Array.isArray(items)
    ? items.filter((item) => item.status === eventKey)
    : [];

  const onManage = (serviceApp) => {
    navigate("/manage-serviceapp", { state: { serviceApp } });
  };

  return (
    <>
      {appType === "Sample" && (
        <Table striped hover bordered={false} className="listing-content">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Supervisor</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Sample Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr
                key={index}
                className="listing-item"
                onClick={() => onManage(item)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone_number}</td>
                <td>{item.svName}</td>
                <td>{item.status}</td>
                <td>{item.quantity}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {appType === "Rental" && (
        <Table striped hover bordered={false} className="listing-content">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Supervisor</th>
              <th>Status</th>
              <th>Rental Date</th>
              <th>Duration (in Days)</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr
                key={index}
                className="listing-item"
                onClick={() => onManage(item)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone_number}</td>
                <td>{item.svName}</td>
                <td>{item.status}</td>
                <td>{new Date(item.rentDate).toLocaleDateString()}</td>
                <td>{parseInt(item.duration?.split(" ")[0])}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ListingServices;
