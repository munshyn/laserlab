import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

const ListingStaff = ({ items, onDelete }) => {

  const renderRole = (role) => {
    switch (role) {
      case "LS":
        return (
          <Badge bg="info" text="light">
            Lab Staff
          </Badge>
        );
      case "D":
        return (
          <Badge bg="success" text="light">
            Director
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
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="listing-item">
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{renderRole(item.role)}</td>
            <td>
              {item.role !== "D" && (
                <Button variant="danger" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListingStaff;