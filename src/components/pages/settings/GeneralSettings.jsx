import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    portName: '',
    defaultCurrency: 'RWF',
    timeZone: 'Africa/Kigali',
    dateFormat: 'DD/MM/YYYY',
    language: 'English'
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const authHeader = useAuthHeader();

  useEffect(() => {
    // Load current settings from localStorage or API
    const savedCompanyName = localStorage.getItem('companyName') || '';
    const savedCurrency = localStorage.getItem('currency') || 'RWF';
    
    setSettings(prev => ({
      ...prev,
      companyName: savedCompanyName,
      defaultCurrency: savedCurrency
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Save settings to localStorage (you can replace this with API call)
      localStorage.setItem('companyName', settings.companyName);
      localStorage.setItem('currency', settings.defaultCurrency);
      localStorage.setItem('portName', settings.portName);
      localStorage.setItem('timeZone', settings.timeZone);
      localStorage.setItem('dateFormat', settings.dateFormat);
      localStorage.setItem('language', settings.language);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ type: 'success', text: 'General settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to save settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-100">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">🔧 General Settings</h5>
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
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Port Name</Form.Label>
                <Form.Control
                  type="text"
                  name="portName"
                  value={settings.portName}
                  onChange={handleInputChange}
                  placeholder="Enter port name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Default Currency</Form.Label>
                <Form.Select
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleInputChange}
                >
                  <option value="RWF">Rwandan Franc (RWF)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="KES">Kenyan Shilling (KES)</option>
                  <option value="UGX">Ugandan Shilling (UGX)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Time Zone</Form.Label>
                <Form.Select
                  name="timeZone"
                  value={settings.timeZone}
                  onChange={handleInputChange}
                >
                  <option value="Africa/Kigali">Africa/Kigali (GMT+2)</option>
                  <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
                  <option value="Africa/Kampala">Africa/Kampala (GMT+3)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date Format</Form.Label>
                <Form.Select
                  name="dateFormat"
                  value={settings.dateFormat}
                  onChange={handleInputChange}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Select
                  name="language"
                  value={settings.language}
                  onChange={handleInputChange}
                >
                  <option value="English">English</option>
                  <option value="French">Français</option>
                  <option value="Kinyarwanda">Kinyarwanda</option>
                  <option value="Swahili">Kiswahili</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              className="px-4"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default GeneralSettings;
