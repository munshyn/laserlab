import React, { useState } from "react";
import { Button, Table, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListingEquipment = ({ items, onDelete }) => {
  const [showActions, setShowActions] = useState(null);
  const navigate = useNavigate();

  const handleToggleActions = (itemId) => {
    if (showActions === itemId) {
      setShowActions(null);
    } else {
      setShowActions(itemId);
    }
  };

  const handleEditEquipment = (equipment) => {
    navigate("/edit-equipment", { state: { equipment } });
  };

  return (
    <Table striped hover bordered={false} className="listing-content">
      <thead>
        <tr style={{ textAlign: "center" }}>
          <th>#</th>
          <th>Registration Number</th>
          <th>Name</th>
          <th>Location</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Rentable</th>
          <th>Availability</th>
          <th>Registered</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="listing-item">
            <td>{index + 1}</td>
            <td>{item.regNum}</td>
            <td>{item.name}</td>
            <td>{item.location}</td>
            <td>{item.quantity}</td>
            <td>{item.status}</td>
            <td>
              {item.hasService ? (
                <p style={{ color: "green" }}>Yes</p>
              ) : (
                <p style={{ color: "red" }}>No</p>
              )}
            </td>
            <td>{item.availability ? "Available" : "Not Available"}</td>
            <td>{item.registered ? "Yes" : "No"}</td>
            <td className="listing-buttons">
              <Dropdown
                show={showActions === item.equipmentId}
                onToggle={() => handleToggleActions(item.equipmentId)}
              >
                <Dropdown.Toggle
                  variant="secondary"
                  size="sm"
                  id="actions-dropdown"
                >
                  <i className="fas fa-ellipsis-v"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEditEquipment(item)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    variant="danger"
                    onClick={() => onDelete(item.equipmentId)}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListingEquipment;
