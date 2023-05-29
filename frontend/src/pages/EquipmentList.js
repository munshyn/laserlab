import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Listing from "../component/Listing";
import utmlogo from "../assets/utm-logo.svg";
import { connect } from "react-redux";
import { getAllEquipment, deleteEquipment } from "../actions/equipment";

const EquipmentList = ({ equipments, getAllEquipment, deleteEquipment, isAuthenticated }) => {
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    getAllEquipment();
    console.log(equipments);
    console.log(isAuthenticated);
  }, [getAllEquipment]);

  const onDelete = (equipmentId) => {
    setDeleteId(equipmentId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    const data = await deleteEquipment(deleteId);

    // if (data == "SUCCESS") setEditSuccess("true");
    // else setEditSuccess("false");
    cancelDelete();
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId("");
  };


  return (
    <main className="main-content">
      <div className="utm-logo-start">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-img">
        <h1>List of Equipments</h1>
      </div>
      <div className="listing-container">
        <div className="listing-header">
          <Link to="/add-equipment">
            <Button variant="primary">Add New Equipment</Button>
          </Link>
          {/* <input type="text" placeholder="Search" className="listing-search" /> */}
        </div>
        <Listing items={equipments} onDelete={onDelete} />
      <Modal show={showDeleteConfirmation} onHide={cancelDelete}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // user: state.auth.user,
  equipments: state.equipment,
});

export default connect(mapStateToProps, { getAllEquipment, deleteEquipment })(EquipmentList);
