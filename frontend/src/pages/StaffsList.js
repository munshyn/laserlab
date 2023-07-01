import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Alert, Pagination } from "react-bootstrap";
import ListingStaff from "../components/ListingStaff";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../actions/auth";

const StaffsList = ({ users, getUsers, deleteUser }) => {
  const [deleteId, setDeleteId] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onDelete = (userId) => {
    setDeleteId(userId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    const data = await deleteUser(deleteId);

    setDeleteMsg(data);
    cancelDelete();
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteId("");
  };

  function popup_box() {
    if (deleteMsg == "SUCCESS") {
      setTimeout(() => {
        setDeleteMsg("");
      }, 3000);
      return (
        <Alert variant="success">
          <p>Deleted Successfully</p>
        </Alert>
      );
    } else if (
      deleteMsg == "Unable to delete user because it is tied to other tables."
    ) {
      setTimeout(() => {
        setDeleteMsg("");
      }, 3000);
      return (
        <Alert variant="danger">
          <p>
            Unable to delete user because it is tied to lab service application.
          </p>
        </Alert>
      );
    } else return <p></p>;
  }

  const filteredData = users.filter((item) => !["RO", "C"].includes(item.role));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="main-content">
      <div className="header-img">
        <h1>List of Staffs</h1>
      </div>
      <div className="listing-container d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between mb-3 w-100">
            <Link to="/register-staff">
              <Button variant="dark">Add Lab Staff</Button>
            </Link>
            {popup_box()}
          </div>
          <ListingStaff items={currentItems} onDelete={onDelete} />
        </div>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        <Modal show={showDeleteConfirmation} onHide={cancelDelete}>
          <Modal.Header>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="outline-danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  users: state.auth.users,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(StaffsList);
