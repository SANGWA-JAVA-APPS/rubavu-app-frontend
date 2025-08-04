import React, { useEffect, useState } from "react";
import { Card, Table, Form, Button, Pagination } from "react-bootstrap";
import StockRepository from "../../services/StockServices/StockRepository";
import { useAuthHeader } from "react-auth-kit";

const RoleList = ({ refreshFlag }) => {
  const [roles, setRoles] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 3;
  const authHeader = useAuthHeader()();

  useEffect(() => {
    StockRepository.finduserRoles(authHeader).then((res) => {
      setRoles(res.data);
    });
  }, [refreshFlag]);

  const handleSelect = (id) => {
    alert(`Selected role ID: ${id}`);
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);
  const pageNumbers = [];
  const paginationGroupSize = 5;
  const groupStart = Math.floor((currentPage - 1) / paginationGroupSize) * paginationGroupSize + 1;
  const groupEnd = Math.min(groupStart + paginationGroupSize - 1, totalPages);

  for (let i = groupStart; i <= groupEnd; i++) {
    pageNumbers.push(i);
  }

  const handleNextGroup = () => {
    if (groupEnd < totalPages) {
      setCurrentPage(groupEnd + 1);
    }
  };

  const handlePrevGroup = () => {
    if (groupStart > 1) {
      setCurrentPage(groupStart - paginationGroupSize);
    }
  };

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  return (
    <Card className="bg-light">
      <Card.Body>
        <Card.Title>Roles List</Card.Title>
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="Filter by role name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role, index) => (
              <tr key={role.id}>
                <td>{indexOfFirstRole + index + 1}</td>
                <td>{role.name}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleSelect(role.id)}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev onClick={handlePrevGroup} disabled={groupStart === 1} />
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextGroup} disabled={groupEnd >= totalPages} />
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default RoleList;