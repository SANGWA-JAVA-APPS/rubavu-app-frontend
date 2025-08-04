import React, { useEffect, useState } from 'react';
import { Card, Table, Pagination } from 'react-bootstrap';
import StockRepository from '../../services/StockServices/StockRepository';
import StockDelete from '../../services/StockServices/StockDelete';
import { useAuthHeader } from 'react-auth-kit';
import ListOptioncol from '../../Global/ListTable';

const RoleAndCategoryList = () => {
  const [roleCategories, setRoleCategories] = useState([]);
  const [userType, setUserType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 5;
  const authHeader = useAuthHeader()();

  useEffect(() => {
    fetchRolesWithCategories();
    setUserType(localStorage.getItem('catname'));
  }, []);

  const fetchRolesWithCategories = () => {
    StockRepository.finduserRolesWithCategories(authHeader).then((res) => {
      setRoleCategories(res.data);
    });
  };

  const deleteRoleById = (id) => {
    StockDelete.deleteRoleById(id, authHeader).then(() => {
      fetchRolesWithCategories();
    });
  };

  const getRoleById = (id) => {
    console.log('Edit role with ID:', id);
  };

  // Pagination calculations
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roleCategories.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(roleCategories.length / rolesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

    if (endPage - startPage < maxDisplayedPages - 1) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Roles and Categories</Card.Title>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Account Categories</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role, idx) => (
              <tr key={role.id}>
                <td>{indexOfFirstRole + idx + 1}</td>
                <td>{role.name}</td>
                <td>{role.categories.join(', ')}</td>
                {userType === 'admin' && (
                  <ListOptioncol
                    getEntityById={() => getRoleById(role.id)}
                    delEntityById={() => deleteRoleById(role.id)}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="mt-2 justify-content-center">
          {currentPage > 1 && (
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
          )}
          {getPageNumbers().map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => paginate(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          {currentPage < totalPages && (
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />
          )}
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default RoleAndCategoryList;
