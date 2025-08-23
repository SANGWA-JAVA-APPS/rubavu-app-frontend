import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import StockConn from '../../services/StockServices/StockConn';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const VesselRevenueTypesChart = () => {
  const currentYear = new Date().getFullYear();
  
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = authHeader();
        const response = await axios.get(StockConn.wholePath.name + '/vessel/analytics/revenue-by-types', {
          params: { year: currentYear },
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          const data = response.data;
          
          const revenueData = {
            labels: ['Quay Amount', 'Vessel Handling Charges'],
            datasets: [
              {
                label: 'Revenue (RWF)',
                data: [
                  data.quayAmount || 0,
                  data.vesselHandlingCharges || 0
                ],
                backgroundColor: ['#FF6384', '#36A2EB'],
                borderColor: ['#FF6384', '#36A2EB'],
                borderWidth: 2,
              }
            ]
          };

          setChartData({ 
            chartData: revenueData, 
            totalRevenue: data.totalRevenue || 0,
            quayAmount: data.quayAmount || 0,
            vesselHandlingCharges: data.vesselHandlingCharges || 0
          });
        } else {
          setError('Failed to fetch vessel revenue data');
        }
      } catch (err) {
        console.error('Error fetching vessel revenue data:', err);
        setError('Error loading vessel revenue data');
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'Vessel Revenue by Types',
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
            const value = context.parsed;
            return `${context.label}: ${value.toLocaleString()} RWF`;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <Card className="h-100">
        <Card.Header className="bg-light">
          <h6 className="mb-0">🚢 Revenue Types</h6>
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
          <h6 className="mb-0">🚢 Revenue Types</h6>
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
          <h6 className="mb-0">🚢 Revenue Types</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="info" className="small">
            No revenue data available for {currentYear}.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-light">
        <h6 className="mb-0">🚢 Revenue Types</h6>
        <small className="text-muted">Year {currentYear}</small>
      </Card.Header>
      
      <Card.Body>
        <div style={{ height: '250px', position: 'relative' }}>
          <Doughnut 
            data={chartData.chartData} 
            options={chartOptions} 
          />
        </div>
        
        {/* Summary */}
        <div className="mt-3 text-center">
          <div className="bg-light p-2 rounded">
            <small className="text-muted">Total Revenue</small>
            <div className="fw-bold text-primary">
              {chartData.totalRevenue.toLocaleString()} RWF
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
