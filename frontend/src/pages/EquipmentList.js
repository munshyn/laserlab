import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ListingEquipment from "../components/ListingEquipment";
import { connect } from "react-redux";
import { getAllEquipment, deleteEquipment } from "../actions/equipment";
import axios from "axios";

const EquipmentList = ({ equipments, getAllEquipment, deleteEquipment }) => {
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    getAllEquipment();
    console.log(equipments);
  }, [getAllEquipment]);

  const onDelete = (equipmentId) => {
    setDeleteId(equipmentId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    await deleteEquipment(deleteId);

    cancelDelete();
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId("");
  };

  const handleExportExcel = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/equipment/excel/`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "equipments_report.xlsx");
        document.body.appendChild(link);
        link.click();
      });
  };

  const handleExportPDF = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/equipment/pdf/`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "equipments_report.pdf");
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>List of Equipments</h1>
      </div>
      <div className="listing-container">
        <div className="d-flex justify-content-between mb-3 w-100">
          <Link to="/add-equipment">
            <Button variant="dark">Add Equipment</Button>
          </Link>
          <div>
            <Button variant="outline-success" className="me-2" onClick={handleExportExcel}>
              Export to Excel
            </Button>
            <Button variant="outline-danger" onClick={handleExportPDF}>
              Export to PDF
            </Button>
          </div>
        </div>
        <ListingEquipment items={equipments} onDelete={onDelete} />
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
  equipments: state.equipment,
});

export default connect(mapStateToProps, { getAllEquipment, deleteEquipment })(
  EquipmentList
);
