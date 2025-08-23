import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import StockConn from '../../services/StockServices/StockConn';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const ArrivalTypesDoughnutChart = () => {
  // Set date range to current year (Jan 1 to Dec 31)
  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01`;
  const endDate = `${currentYear}-12-31`;
  
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  // Debug logging
  console.log('Chart component - startDate:', startDate, 'endDate:', endDate);

  useEffect(() => {

    const fetchArrivalTypesData = async () => {
      if (!startDate || !endDate) {
        console.log('Missing dates, skipping fetch ....');
        return;
      }
      
      console.log('Fetching data for:', startDate, 'to', endDate);
      setLoading(true);
      setError(null);
      
      try {
        const token = authHeader();
        const response = await axios.get(StockConn.wholePath.name + '/arrival-reports/arrival-types-summary', {
          params: { startDate, endDate },
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          }
        });

        console.log('API Response:', response.data);

        if (response.data.success) {
          const data = response.data.data;
          
          // Process data for doughnut chart
          const transhipmentData = data.find(item => item.type === 'transhipment') || {};
          const storageData = data.find(item => item.type === 'storage') || {};
          const otherData = data.find(item => item.type === 'other') || {};
          
          const transhipmentCount = transhipmentData.count || 0;
          const storageCount = storageData.count || 0;
          const otherCount = otherData.count || 0;
          
          const transhipmentAmount = transhipmentData.totalAmount || 0;
          const storageAmount = storageData.totalAmount || 0;
          const otherAmount = otherData.totalAmount || 0;

          console.log('Processed data:', { 
            transhipment: { count: transhipmentCount, amount: transhipmentAmount },
            storage: { count: storageCount, amount: storageAmount },
            other: { count: otherCount, amount: otherAmount }
          });

          const chartConfig = {
            labels: ['Transhipment', 'Storage', 'Other'],
            datasets: [
              {
                label: 'Arrival Notes',
                data: [transhipmentCount, storageCount, otherCount],
                backgroundColor: [
                  '#FF6384', // Pink for Transhipment
                  '#36A2EB', // Blue for Storage
                  '#FFCE56'  // Yellow for Other
                ],
                borderColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                ],
                borderWidth: 2,
                hoverBackgroundColor: [
                  '#FF6384CC',
                  '#36A2EBCC',
                  '#FFCE56CC'
                ],
                hoverBorderColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                ],
                hoverBorderWidth: 3
              }
            ]
          };

          const chartDataObj = {
            chartConfig,
            totals: {
              transhipment: transhipmentCount,
              storage: storageCount,
              other: otherCount,
              total: transhipmentCount + storageCount + otherCount,
              transhipmentAmount: transhipmentAmount,
              storageAmount: storageAmount,
              otherAmount: otherAmount,
              totalAmount: transhipmentAmount + storageAmount + otherAmount
            }
          };

          console.log('Setting chart data:', chartDataObj);
          setChartData(chartDataObj);
        } else {
          setError('Failed to fetch arrival types data');
        }
      } catch (err) {
        console.error('Error fetching arrival types:', err);
        setError('Error loading arrival types data');
      } finally {
        setLoading(false);
      }
    };

    fetchArrivalTypesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount since dates are fixed

  // Move chartOptions inside component to access chartData
  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Arrival Notes by Type',
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
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            
            // Get amount data based on the label
            let amount = 0;
            if (chartData) {
              if (label === 'Transhipment') amount = chartData.totals.transhipmentAmount;
              else if (label === 'Storage') amount = chartData.totals.storageAmount;
              else if (label === 'Other') amount = chartData.totals.otherAmount;
            }
            
            return [`${label}: ${value} (${percentage}%)`, `Amount: $${amount.toLocaleString()}`];
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2
      }
    }
  });

  if (loading) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">📊 Arrival Types Distribution</h6>
        </Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="mt-2">Loading chart data...</div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">📊 Arrival Types Distribution</h6>
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
          <h6 className="mb-0">📊 Arrival Types Distribution</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            No data available for the selected date range.
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
            <h6 className="mb-0">📊 Arrival Types Distribution</h6>
            <small className="text-muted">
              {startDate} to {endDate}
            </small>
          </Col>
          <Col xs="auto">
            <span className="badge bg-primary me-2">
              Count: {chartData.totals.total}
            </span>
            <span className="badge bg-success">
              Amount: RWF{chartData.totals.totalAmount.toLocaleString()}
            </span>
          </Col>
        </Row>
      </Card.Header>
      
      <Card.Body>
        <Row>
          <Col md={6}>
            <div style={{ height: '300px', position: 'relative' }}>
              <Doughnut data={chartData.chartConfig} options={getChartOptions()} />
            </div>
          </Col>
          <Col md={5}>
            <div className="mt-3">
              <h6 className="text-muted mb-3">Summary</h6>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="d-flex align-items-center">
                    <span 
                      className="me-2 rounded-circle d-inline-block" 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#FF6384' 
                      }}
                    ></span>
                    Transhipment
                  </span>
                  <div className="text-end">
                    <strong>{chartData.totals.transhipment}</strong>
                    <div className="small text-muted">RWF{chartData.totals.transhipmentAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${chartData.totals.total > 0 ? (chartData.totals.transhipment / chartData.totals.total) * 100 : 0}%`,
                      backgroundColor: '#FF6384'
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="d-flex align-items-center">
                    <span 
                      className="me-2 rounded-circle d-inline-block" 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#36A2EB' 
                      }}
                    ></span>
                    Storage
                  </span>
                  <div className="text-end">
                    <strong>{chartData.totals.storage}</strong>
                    <div className="small text-muted">RWF{chartData.totals.storageAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${chartData.totals.total > 0 ? (chartData.totals.storage / chartData.totals.total) * 100 : 0}%`,
                      backgroundColor: '#36A2EB'
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="d-flex align-items-center">
                    <span 
                      className="me-2 rounded-circle d-inline-block" 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#FFCE56' 
                      }}
                    ></span>
                    Other
                  </span>
                  <div className="text-end">
                    <strong>{chartData.totals.other}</strong>
                    <div className="small text-muted">RWF{chartData.totals.otherAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${chartData.totals.total > 0 ? (chartData.totals.other / chartData.totals.total) * 100 : 0}%`,
                      backgroundColor: '#FFCE56'
                    }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted">
                  <strong>Period:</strong><br/>
                  {startDate} to {endDate}
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
