import React, { useEffect, useState } from "react";
import { Table, Badge, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListingServices = ({ items, eventKey, user }) => {
  const navigate = useNavigate();
  const filteredItems = Array.isArray(items)
    ? items.filter((item) => item.isApproved === parseInt(eventKey))
    : [];

  const onManage = (serviceApp) => {
    if (user.role !== "C") {
      navigate("/manage-serviceapp", { state: { serviceApp } });
    } else {
      navigate("/serviceapp", { state: { serviceApp } });
    }
  };

  const renderBadge = (isApproved, status) => {
    switch (isApproved) {
      case 0:
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case 1:
        return (
          <Badge bg="danger" text="light">
            {status}
          </Badge>
        );
      case 2:
        return (
          <Badge bg="success" text="light">
            {status}
          </Badge>
        );
      default:
        return null;
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table hover bordered={false} className="listing-content" >
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Service Type</th>
            {user.role !== "C" && <th>Name</th>}
            <th>Title</th>
            <th>Project Type</th>
            <th>Status</th>
            <th>Date of Use</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={index}
              className="listing-item"
              onClick={() => onManage(item)}
              style={{ cursor: "pointer" }}
            >
              <td>{item.appType}</td>
              {user.role !== "C" && <td>{item.name}</td>}
              <td>{item.title}</td>
              <td>{item.projectType}</td>
              <td>{renderBadge(item.isApproved, item.status)}</td>
              <td>{new Date(item.useDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    </>
  );
};

export default ListingServices;
