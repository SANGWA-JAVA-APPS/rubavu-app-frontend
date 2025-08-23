import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Spinner, Alert } from 'react-bootstrap';
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

export const VesselTopFrequencyChart = () => {
  const currentYear = new Date().getFullYear();
  
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchTopFrequencyData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = authHeader();
        const response = await axios.get(StockConn.wholePath.name + '/vessel/analytics/top-by-frequency', {
          params: { year: currentYear },
          headers: { 
            Authorization: token,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          const vessels = response.data.vessels || [];
          
          const frequencyData = {
            labels: vessels.map(vessel => vessel.vesselName || 'Unknown'),
            datasets: [
              {
                label: 'Invoice Count',
                data: vessels.map(vessel => parseInt(vessel.invoiceCount) || 0),
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
                borderRadius: 4,
              }
            ]
          };

          setChartData({ 
            chartData: frequencyData, 
            vessels: vessels
          });
        } else {
          setError('Failed to fetch top frequency data');
        }
      } catch (err) {
        console.error('Error fetching top frequency data:', err);
        setError('Error loading top frequency data');
      } finally {
        setLoading(false);
      }
    };

    fetchTopFrequencyData();
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
        text: 'Top 3 Vessels by Frequency',
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
            return `Invoices: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Invoice Count',
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
          <h6 className="mb-0">📊 Top by Frequency</h6>
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
          <h6 className="mb-0">📊 Top by Frequency</h6>
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
          <h6 className="mb-0">📊 Top by Frequency</h6>
        </Card.Header>
        <Card.Body>
          <Alert variant="info" className="small">
            No frequency data available for {currentYear}.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-light">
        <h6 className="mb-0">📊 Top by Frequency</h6>
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
            <small className="text-muted fw-bold">Most Active</small>
            {chartData.vessels.slice(0, 3).map((vessel, index) => (
              <div key={index} className="d-flex justify-content-between mt-1">
                <small>{vessel.vesselName}</small>
                <small className="fw-bold">{vessel.invoiceCount} invoices</small>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
