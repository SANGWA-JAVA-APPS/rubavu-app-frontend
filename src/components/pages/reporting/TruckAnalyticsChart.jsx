import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Row, Col, Spinner, Alert, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import StockConn from '../../services/StockServices/StockConn';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TruckAnalyticsChart = () => {
  // Set date range to current year (Jan 1 to Dec 31)
  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01`;
  const endDate = `${currentYear}-12-31`;
  
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('payment');
  const authHeader = useAuthHeader();

  // Debug logging
  console.log('Truck Analytics - startDate:', startDate, 'endDate:', endDate);

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) {
        console.log('Missing dates, skipping fetch');
        return;
      }
      
      console.log('Fetching truck analytics for:', startDate, 'to', endDate);
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(StockConn.wholePath.name + '/truck/analytics/combined', {
          params: { startDate, endDate },
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader()
          }
        });        console.log('Truck Analytics API Response:', response.data);

        if (response.data.success) {
          const { topByPayment, topByFrequency } = response.data;
          
          // Process data for payment chart
          const paymentLabels = topByPayment.map(item => item.plateNumber);
          const paymentAmounts = topByPayment.map(item => parseInt(item.totalAmount));
          
          // Process data for frequency chart
          const frequencyLabels = topByFrequency.map(item => item.plateNumber);
          const frequencyCounts = topByFrequency.map(item => parseInt(item.visitCount));

          const chartDataObj = {
            payment: {
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
            },
            frequency: {
              labels: frequencyLabels,
              datasets: [
                {
                  label: 'Visit Count',
                  data: frequencyCounts,
                  backgroundColor: '#36A2EB',
                  borderColor: '#36A2EB',
                  borderWidth: 1,
                  borderRadius: 4,
                }
              ]
            },
            rawData: {
              topByPayment,
              topByFrequency
            }
          };

          console.log('Setting truck analytics data:', chartDataObj);
          setChartData(chartDataObj);
        } else {
          setError('Failed to fetch truck analytics data');
        }
      } catch (err) {
        console.error('Error fetching truck analytics:', err);
        setError('Error loading truck analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount since dates are fixed

  const getChartOptions = (type) => ({
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
        text: type === 'payment' ? 'Top 5 Trucks by Payment Amount' : 'Top 5 Trucks by Visit Frequency',
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
              return `Visits: ${value}`;
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
          text: type === 'payment' ? 'Amount (RWF)' : 'Visit Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Truck Plate Number'
        }
      }
    }
  });

  if (loading) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🚛 Truck Analytics</h6>
        </Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="mt-2">Loading truck analytics...</div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🚛 Truck Analytics</h6>
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
          <h6 className="mb-0">🚛 Truck Analytics</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            No truck analytics data available for the selected date range.
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
            <h6 className="mb-0">🚛 Truck Analytics</h6>
            <small className="text-muted">
              {startDate} to {endDate}
            </small>
          </Col>
        </Row>
        
        {/* Tab Navigation */}
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'payment'} 
              onClick={() => setActiveTab('payment')}
              style={{ cursor: 'pointer' }}
            >
              By Payment
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'frequency'} 
              onClick={() => setActiveTab('frequency')}
              style={{ cursor: 'pointer' }}
            >
              By Frequency
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      
      <Card.Body>
        <div style={{ height: '400px', position: 'relative' }}>
          <Bar 
            data={chartData[activeTab]} 
            options={getChartOptions(activeTab)} 
          />
        </div>
        
        {/* Summary Stats */}
        <Row className="mt-3">
          <Col md={6}>
            <div className="bg-light p-3 rounded">
              <h6 className="text-muted mb-2">Top by Payment</h6>
              {chartData.rawData.topByPayment.slice(0, 3).map((truck, index) => (
                <div key={index} className="d-flex justify-content-between mb-1">
                  <small>{truck.plateNumber}</small>
                  <small className="fw-bold">{parseInt(truck.totalAmount).toLocaleString()} RWF</small>
                </div>
              ))}
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-light p-3 rounded">
              <h6 className="text-muted mb-2">Top by Visits</h6>
              {chartData.rawData.topByFrequency.slice(0, 3).map((truck, index) => (
                <div key={index} className="d-flex justify-content-between mb-1">
                  <small>{truck.plateNumber}</small>
                  <small className="fw-bold">{truck.visitCount} visits</small>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
