import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListingServices = ({ items, eventKey, user }) => {
  const navigate = useNavigate();
  const filteredItems = Array.isArray(items)
    ? items.filter((item) => item.isApproved === parseInt(eventKey))
    : [];

  const onManage = (serviceApp) => {
    if(user.role !== "C"){
      navigate("/manage-serviceapp", { state: { serviceApp } });
    }else{
      navigate("/serviceapp", { state: { serviceApp } });
    }
  };

  return (
    <>
      <Table hover bordered={false} className="listing-content">
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Service Type</th>
            {user.role !== "C" && <th>Name</th>}
            {user.role !== "C" && <th>Phone Number</th>}
            <th>Title</th>
            <th>Project Type</th>
            <th>Date of Use</th>
            {eventKey === 2 && <th>Status</th>}
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
              <td>{item.appType}</td>
              {user.role !== "C" && <td>{item.name}</td>}
              {user.role !== "C" && <td>{item.phone_number}</td>}
              <td>{item.title}</td>
              <td>{item.projectType}</td>
              <td>{new Date(item.useDate).toLocaleDateString()}</td>
              {eventKey === 2 && <td>
                <Badge bg="warning" text="dark">
                  {item.status}
                </Badge>
              </td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ListingServices;