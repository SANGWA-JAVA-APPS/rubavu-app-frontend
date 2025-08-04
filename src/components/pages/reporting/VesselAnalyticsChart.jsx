import { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Card, Row, Col, Spinner, Alert, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const VesselAnalyticsChart = () => {
  // Set year to current year
  const currentYear = new Date().getFullYear();
  
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('revenue');
  const authHeader = useAuthHeader();

  // Debug logging
  console.log('Vessel Analytics - year:', currentYear);

  useEffect(() => {
    const fetchVesselAnalyticsData = async () => {
      console.log('Fetching vessel analytics for year:', currentYear);
      setLoading(true);
      setError(null);
      
      try {
        const token = authHeader();
        const response = await axios.get('/codeguru/api/vessel/analytics/combined', {
          params: { year: currentYear },
          headers: { 
            Authorization: token,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        console.log('Vessel Analytics API Response:', response.data);

        if (response.data.success) {
          const { revenueByTypes, topByPayment, topByFrequency } = response.data;
          
          // Process data for revenue types chart (Doughnut)
          const revenueData = {
            labels: ['Quay Amount', 'Vessel Handling Charges'],
            datasets: [
              {
                label: 'Revenue (RWF)',
                data: [
                  revenueByTypes.quayAmount || 0,
                  revenueByTypes.vesselHandlingCharges || 0
                ],
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderColor: ['#FF6384', '#36A2EB'],
                borderWidth: 2,
              }
            ]
          };

          // Process data for top by payment chart (Bar)
          const paymentLabels = topByPayment?.map(item => item.vesselName || 'Unknown') || [];
          const paymentAmounts = topByPayment?.map(item => parseInt(item.totalAmount) || 0) || [];
          
          const paymentData = {
            labels: paymentLabels,
            datasets: [
              {
                label: 'Total Payment Amount (RWF)',
                data: paymentAmounts,
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
                borderRadius: 4,
              }
            ]
          };

          // Process data for top by frequency chart (Bar)
          const frequencyLabels = topByFrequency?.map(item => item.vesselName || 'Unknown') || [];
          const frequencyCounts = topByFrequency?.map(item => parseInt(item.invoiceCount) || 0) || [];

          const frequencyData = {
            labels: frequencyLabels,
            datasets: [
              {
                label: 'Invoice Count',
                data: frequencyCounts,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
                borderRadius: 4,
              }
            ]
          };

          const chartDataObj = {
            revenue: revenueData,
            payment: paymentData,
            frequency: frequencyData,
            rawData: {
              revenueByTypes,
              topByPayment: topByPayment || [],
              topByFrequency: topByFrequency || []
            }
          };

          console.log('Setting vessel analytics data:', chartDataObj);
          setChartData(chartDataObj);
        } else {
          setError('Failed to fetch vessel analytics data');
        }
      } catch (err) {
        console.error('Error fetching vessel analytics:', err);
        setError('Error loading vessel analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchVesselAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount since year is fixed

  const getDoughnutOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Vessel Revenue by Types',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            return `${context.label}: ${value.toLocaleString()} RWF`;
          }
        }
      }
    }
  });

  const getBarOptions = (type) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: type === 'payment' ? 'Top 3 Vessels by Payment Amount' : 'Top 3 Vessels by Invoice Frequency',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            if (type === 'payment') {
              return `Payment: ${value.toLocaleString()} RWF`;
            } else {
              return `Invoices: ${value}`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: type === 'payment' ? 'Amount (RWF)' : 'Invoice Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Vessel Name'
        }
      }
    }
  });

  if (loading) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🚢 Vessel Analytics</h6>
        </Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="mt-2">Loading vessel analytics...</div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🚢 Vessel Analytics</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="danger">
            {error}
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  if (!chartData) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🚢 Vessel Analytics</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            No vessel analytics data available for {currentYear}.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-light">
        <Row className="align-items-center">
          <Col>
            <h6 className="mb-0">🚢 Vessel Analytics</h6>
            <small className="text-muted">
              Year {currentYear}
            </small>
          </Col>
        </Row>
        
        {/* Tab Navigation */}
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'revenue'} 
              onClick={() => setActiveTab('revenue')}
              style={{ cursor: 'pointer' }}
            >
              Revenue Types
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'payment'} 
              onClick={() => setActiveTab('payment')}
              style={{ cursor: 'pointer' }}
            >
              Top by Payment
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'frequency'} 
              onClick={() => setActiveTab('frequency')}
              style={{ cursor: 'pointer' }}
            >
              Top by Frequency
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      
      <Card.Body>
        <div style={{ height: '400px', position: 'relative' }}>
          {activeTab === 'revenue' && (
            <Doughnut 
              data={chartData.revenue} 
              options={getDoughnutOptions()} 
            />
          )}
          {activeTab === 'payment' && (
            <Bar 
              data={chartData.payment} 
              options={getBarOptions('payment')} 
            />
          )}
          {activeTab === 'frequency' && (
            <Bar 
              data={chartData.frequency} 
              options={getBarOptions('frequency')} 
            />
          )}
        </div>
        
        {/* Summary Stats */}
        <Row className="mt-3">
          <Col md={4}>
            <div className="bg-light p-3 rounded">
              <h6 className="text-muted mb-2">Total Revenue</h6>
              <div className="d-flex justify-content-between mb-1">
                <small>Quay Amount:</small>
                <small className="fw-bold">{(chartData.rawData.revenueByTypes.quayAmount || 0).toLocaleString()} RWF</small>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <small>Handling Charges:</small>
                <small className="fw-bold">{(chartData.rawData.revenueByTypes.vesselHandlingCharges || 0).toLocaleString()} RWF</small>
              </div>
              <div className="d-flex justify-content-between">
                <small className="fw-bold">Total:</small>
                <small className="fw-bold text-primary">{(chartData.rawData.revenueByTypes.totalRevenue || 0).toLocaleString()} RWF</small>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="bg-light p-3 rounded">
              <h6 className="text-muted mb-2">Top by Payment</h6>
              {chartData.rawData.topByPayment.slice(0, 3).map((vessel, index) => (
                <div key={index} className="d-flex justify-content-between mb-1">
                  <small>{vessel.vesselName}</small>
                  <small className="fw-bold">{parseInt(vessel.totalAmount).toLocaleString()} RWF</small>
                </div>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="bg-light p-3 rounded">
              <h6 className="text-muted mb-2">Top by Frequency</h6>
              {chartData.rawData.topByFrequency.slice(0, 3).map((vessel, index) => (
                <div key={index} className="d-flex justify-content-between mb-1">
                  <small>{vessel.vesselName}</small>
                  <small className="fw-bold">{vessel.invoiceCount} invoices</small>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
