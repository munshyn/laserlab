import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Listing = ({ items, onDelete }) => {
  return (
    <div className="listing-container">
      {items.map((item, index) => (
        <div key={index} className="listing-item">
          {/* <img src={item.imageSrc} alt={item.name} className="listing-image" /> */}
          <div className="listing-content">
            <h3>{item.regNum}</h3>
            <h3>{item.name}</h3>
            <h3>{item.location}</h3>
            <h3>{item.quantity}</h3>
            <h3>{item.status}</h3>
            <h3>{item.availability}</h3>
            <h3>{item.registered}</h3>
            {/* <p className="listing-description">{item.description}</p> */}
            <Button variant="info">
              <Link to="/edit-equipment" state={{ equipment: item }}>
                Edit
              </Link>
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(item.equipmentId)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;
