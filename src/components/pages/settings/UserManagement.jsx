import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal, Alert, Badge, Row, Col } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import StockRepository from '../../services/StockServices/StockRepository';
import StockCommons from '../../services/StockServices/StockCommons';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const authHeader = useAuthHeader();

  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    gender: '',
    accountCategory: '',
    tin_number: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchCategories();
  }, []);

  const fetchUsers = async () => {
    try {
      // This would be replaced with actual API call
      const mockUsers = [
        {
          id: 1,
          username: 'admin',
          name: 'System',
          surname: 'Administrator',
          gender: 'Male',
          accountCategory: 'admin',
          status: 'Active'
        },
        {
          id: 2,
          username: 'berth_officer',
          name: 'John',
          surname: 'Doe',
          gender: 'Male',
          accountCategory: 'Berthing Officer',
          status: 'Active'
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to fetch users' });
    }
  };

  const fetchRoles = async () => {
    try {
      const token = authHeader();
      const response = await StockRepository.finduserRoles(token);
      setRoles(response.data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = authHeader();
      const response = await StockRepository.findAccount_category(token);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = authHeader();
      if (editingUser) {
        // Update user logic
        await StockCommons.updateAccount(userForm, token);
        setMessage({ type: 'success', text: 'User updated successfully!' });
      } else {
        // Create user logic
        await StockCommons.saveAccount(userForm, token);
        setMessage({ type: 'success', text: 'User created successfully!' });
      }
      
      setShowModal(false);
      setUserForm({
        username: '',
        password: '',
        name: '',
        surname: '',
        gender: '',
        accountCategory: '',
        tin_number: ''
      });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to save user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      password: '', // Don't pre-fill password
      name: user.name,
      surname: user.surname,
      gender: user.gender,
      accountCategory: user.accountCategory,
      tin_number: user.tin_number || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Delete user logic would go here
        setMessage({ type: 'success', text: 'User deleted successfully!' });
        fetchUsers();
      } catch (error) {
        setMessage({ type: 'danger', text: 'Failed to delete user.' });
      }
    }
  };

  const getStatusBadge = (status) => {
    return (
      <Badge bg={status === 'Active' ? 'success' : 'danger'}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="h-100">
      <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">👥 User Management</h5>
        <Button 
          variant="light" 
          size="sm"
          onClick={() => {
            setEditingUser(null);
            setUserForm({
              username: '',
              password: '',
              name: '',
              surname: '',
              gender: '',
              accountCategory: '',
              tin_number: ''
            });
            setShowModal(true);
          }}
        >
          Add New User
        </Button>
      </Card.Header>
      <Card.Body>
        {message.text && (
          <Alert variant={message.type} className="mb-3">
            {message.text}
          </Alert>
        )}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.name} {user.surname}</td>
                <td>{user.gender}</td>
                <td>{user.accountCategory}</td>
                <td>{getStatusBadge(user.status)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* User Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingUser ? 'Edit User' : 'Create New User'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={userForm.username}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={userForm.password}
                      onChange={handleInputChange}
                      required={!editingUser}
                      placeholder={editingUser ? 'Leave blank to keep current password' : ''}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={userForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      value={userForm.surname}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={userForm.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Account Category</Form.Label>
                    <Form.Select
                      name="accountCategory"
                      value={userForm.accountCategory}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>TIN Number (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="tin_number"
                  value={userForm.tin_number}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : (editingUser ? 'Update User' : 'Create User')}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default UserManagement;
