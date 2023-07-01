import React, { useState } from "react";
import { Pagination, Table, Dropdown, Badge } from "react-bootstrap";
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

  const renderBadge = (status) => {
    switch (status) {
      case "Require Fix":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Damaged":
        return (
          <Badge bg="danger" text="light">
            {status}
          </Badge>
        );
      case "Good":
        return (
          <Badge bg="success" text="light">
            {status}
          </Badge>
        );
      case "Maintenance":
        return (
          <Badge bg="secondary" text="light">
            {status}
          </Badge>
        );
      case "Rented":
        return (
          <Badge bg="info" text="light">
            {status}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Table striped hover bordered={false} className="listing-content">
      <thead>
        <tr>
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
            <td>{item.regNum}</td>
            <td>{item.name}</td>
            <td>{item.location}</td>
            <td>{item.quantity}</td>
            <td>{renderBadge(item.status)}</td>
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
