import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert, Table, Badge, Modal } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';

const SystemConfiguration = () => {
  const [config, setConfig] = useState({
    backupFrequency: 'daily',
    maxLoginAttempts: 3,
    sessionTimeout: 30,
    enableAuditLog: true,
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    maintenanceMode: false,
    apiRateLimit: 1000,
    maxFileUploadSize: 10
  });

  const [auditLogs, setAuditLogs] = useState([]);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const authHeader = useAuthHeader();

  useEffect(() => {
    fetchSystemConfig();
    fetchAuditLogs();
  }, []);

  const fetchSystemConfig = async () => {
    try {
      // Load system configuration from localStorage or API
      const savedConfig = JSON.parse(localStorage.getItem('systemConfig') || '{}');
      setConfig(prev => ({ ...prev, ...savedConfig }));
    } catch (error) {
      console.error('Failed to fetch system configuration:', error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      // Mock audit logs - replace with actual API call
      const mockLogs = [
        {
          id: 1,
          action: 'User Login',
          user: 'admin',
          timestamp: new Date().toISOString(),
          details: 'Successful login from 192.168.1.100',
          severity: 'Info'
        },
        {
          id: 2,
          action: 'Settings Changed',
          user: 'admin',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          details: 'Updated general settings',
          severity: 'Warning'
        },
        {
          id: 3,
          action: 'Failed Login',
          user: 'unknown',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          details: 'Failed login attempt from 192.168.1.200',
          severity: 'Error'
        }
      ];
      setAuditLogs(mockLogs);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    }
  };

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Save configuration to localStorage (replace with API call)
      localStorage.setItem('systemConfig', JSON.stringify(config));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ type: 'success', text: 'System configuration saved successfully!' });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to save configuration. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBackup = async () => {
    setLoading(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage({ type: 'success', text: 'System backup completed successfully!' });
      setShowBackupModal(false);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Backup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    const variants = {
      'Info': 'info',
      'Warning': 'warning',
      'Error': 'danger',
      'Success': 'success'
    };
    return (
      <Badge bg={variants[severity] || 'secondary'}>
        {severity}
      </Badge>
    );
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0">⚙️ System Configuration</h5>
            </Card.Header>
            <Card.Body>
              {message.text && (
                <Alert variant={message.type} className="mb-3">
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Backup Frequency</Form.Label>
                      <Form.Select
                        name="backupFrequency"
                        value={config.backupFrequency}
                        onChange={handleConfigChange}
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Login Attempts</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxLoginAttempts"
                        value={config.maxLoginAttempts}
                        onChange={handleConfigChange}
                        min="1"
                        max="10"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Session Timeout (minutes)</Form.Label>
                      <Form.Control
                        type="number"
                        name="sessionTimeout"
                        value={config.sessionTimeout}
                        onChange={handleConfigChange}
                        min="5"
                        max="480"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>API Rate Limit (requests/hour)</Form.Label>
                      <Form.Control
                        type="number"
                        name="apiRateLimit"
                        value={config.apiRateLimit}
                        onChange={handleConfigChange}
                        min="100"
                        max="10000"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max File Upload Size (MB)</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxFileUploadSize"
                        value={config.maxFileUploadSize}
                        onChange={handleConfigChange}
                        min="1"
                        max="100"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <hr />

                <h6>System Features</h6>
                <Row>
                  <Col md={6}>
                    <Form.Check
                      type="checkbox"
                      name="enableAuditLog"
                      label="Enable Audit Logging"
                      checked={config.enableAuditLog}
                      onChange={handleConfigChange}
                      className="mb-3"
                    />
                    <Form.Check
                      type="checkbox"
                      name="enableEmailNotifications"
                      label="Enable Email Notifications"
                      checked={config.enableEmailNotifications}
                      onChange={handleConfigChange}
                      className="mb-3"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Check
                      type="checkbox"
                      name="enableSmsNotifications"
                      label="Enable SMS Notifications"
                      checked={config.enableSmsNotifications}
                      onChange={handleConfigChange}
                      className="mb-3"
                    />
                    <Form.Check
                      type="checkbox"
                      name="maintenanceMode"
                      label="Maintenance Mode"
                      checked={config.maintenanceMode}
                      onChange={handleConfigChange}
                      className="mb-3"
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-between">
                  <Button 
                    variant="outline-primary"
                    onClick={() => setShowBackupModal(true)}
                  >
                    🔄 Create Backup
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Configuration'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header className="bg-secondary text-white">
              <h6 className="mb-0">📋 Recent Audit Logs</h6>
            </Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table striped hover size="sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>Time</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontSize: '0.8rem' }}>{log.action}</td>
                      <td style={{ fontSize: '0.8rem' }}>{log.user}</td>
                      <td style={{ fontSize: '0.8rem' }}>{formatTimestamp(log.timestamp)}</td>
                      <td>{getSeverityBadge(log.severity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Backup Modal */}
      <Modal show={showBackupModal} onHide={() => setShowBackupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>System Backup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to create a system backup?</p>
          <p className="text-muted">
            This will create a backup of all system data, configurations, and user information.
            The process may take a few minutes to complete.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBackupModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleBackup}
            disabled={loading}
          >
            {loading ? 'Creating Backup...' : 'Create Backup'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SystemConfiguration;
