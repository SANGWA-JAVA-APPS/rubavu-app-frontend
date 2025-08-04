import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
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

export const VesselTopPaymentChart = () => {
  const currentYear = new Date().getFullYear();
  
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchTopPaymentData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = authHeader();
        const response = await axios.get('/codeguru/api/vessel/analytics/top-by-payment', {
          params: { year: currentYear },
          headers: { 
            Authorization: token,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (response.data.success) {
          const vessels = response.data.vessels || [];
          
          const paymentData = {
            labels: vessels.map(vessel => vessel.vesselName || 'Unknown'),
            datasets: [
              {
                label: 'Total Payment (RWF)',
                data: vessels.map(vessel => parseInt(vessel.totalAmount) || 0),
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
                borderRadius: 4,
              }
            ]
          };

          setChartData({ 
            chartData: paymentData, 
            vessels: vessels
          });
        } else {
          setError('Failed to fetch top payment data');
        }
      } catch (err) {
        console.error('Error fetching top payment data:', err);
        setError('Error loading top payment data');
      } finally {
        setLoading(false);
      }
    };

    fetchTopPaymentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'Top 3 Vessels by Payment',
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: {
          top: 5,
          bottom: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `Payment: ${value.toLocaleString()} RWF`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (RWF)',
          font: {
            size: 10
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Vessel Name',
          font: {
            size: 10
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🏆 Top by Payment</h6>
        </Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="mt-2 small">Loading...</div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🏆 Top by Payment</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="danger" className="small">
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
          <h6 className="mb-0">🏆 Top by Payment</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="info" className="small">
            No payment data available for {currentYear}.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-light">
        <h6 className="mb-0">🏆 Top by Payment</h6>
        <small className="text-muted">Year {currentYear}</small>
      </Card.Header>
      
      <Card.Body>
        <div style={{ height: '250px', position: 'relative' }}>
          <Bar 
            data={chartData.chartData} 
            options={chartOptions} 
          />
        </div>
        
        {/* Summary List */}
        <div className="mt-3">
          <div className="bg-light p-2 rounded">
            <small className="text-muted fw-bold">Top Performers</small>
            {chartData.vessels.slice(0, 3).map((vessel, index) => (
              <div key={index} className="d-flex justify-content-between mt-1">
                <small>{vessel.vesselName}</small>
                <small className="fw-bold">{parseInt(vessel.totalAmount).toLocaleString()} RWF</small>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
