import React, { useState } from "react";
import { Button, Table, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Listing = ({ items, onDelete }) => {
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
        <tr>
          <th>#</th>
          <th>Registration Number</th>
          <th>Name</th>
          <th>Location</th>
          <th>Quantity</th>
          <th>Status</th>
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
            <td>{item.availability}</td>
            <td>{item.registered}</td>
            <td className="listing-buttons">
              {/* <Button variant="info">
                <Link style={{ textDecoration: 'none', color: 'white'}} to={{ pathname: "/edit-equipment", state: { equipment: item } }}>
                  Edit
                </Link>
              </Button>
              <Button variant="danger" onClick={() => onDelete(item.equipmentId)}>
                Delete
              </Button> */}
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

export default Listing;
