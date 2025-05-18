import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Card } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import Reporting from '../../services/StockServices/Reporting';

const TruckStatsModal = ({ show, onHide }) => {
  const [truckStats, setTruckStats] = useState({
    monthlyStats: [],
    todayCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const authHeader = useAuthHeader()();

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Get today's date and 12 months ago
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 12);
        
        // Format dates for API
        const formatDate = (date) => {
          return date.toISOString().split('T')[0];
        };

        // Fetch data for the past 12 months
        const response = await Reporting.revenueReport(
          formatDate(startDate),
          formatDate(endDate),
          authHeader
        );

        const trucks = response.data.truckReport || [];
        
        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Process truck statistics
        const todayTrucks = trucks.filter(truck => {
          const entryDate = new Date(truck.entryTime);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === today.getTime();
        });

        const truckMonthlyStats = [];
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const month = date.getMonth();
          const year = date.getFullYear();

          const monthTrucks = trucks.filter(truck => {
            const entryDate = new Date(truck.entryTime);
            return entryDate.getMonth() === month && entryDate.getFullYear() === year;
          });

          truckMonthlyStats.push({
            month: date.toLocaleString('default', { month: 'long' }),
            year: year,
            count: monthTrucks.length
          });
        }
        
        truckMonthlyStats.sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          return new Date(b.month + ' 1, ' + b.year) - new Date(a.month + ' 1, ' + a.year);
        });

        setTruckStats({
          monthlyStats: truckMonthlyStats,
          todayCount: todayTrucks.length
        });

      } catch (error) {
        console.error('Error fetching truck statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (show) {
      fetchStats();
    }
  }, [show, authHeader]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Truck Entry Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <p>Loading truck statistics...</p>
          </div>
        ) : (
          <div className="truck-stats-container">
            <Row>
              <Col md={12} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Trucks Entered Today</Card.Title>
                    <Card.Text className="display-4">{truckStats.todayCount}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Monthly Truck Entries (Past 12 Months)</Card.Title>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Number of Trucks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {truckStats.monthlyStats.map((stat, index) => (
                            <tr key={index}>
                              <td>{stat.month}</td>
                              <td>{stat.year}</td>
                              <td>{stat.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TruckStatsModal; 