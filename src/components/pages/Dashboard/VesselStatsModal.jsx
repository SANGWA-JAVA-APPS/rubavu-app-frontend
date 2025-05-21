import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Card } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import Reporting from '../../services/StockServices/Reporting';

const VesselStatsModal = ({ show, onHide }) => {
  const [vesselStats, setVesselStats] = useState({
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

        const vessels = response.data.berthReport || [];
        
        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Process vessel statistics
        const todayVessels = vessels.filter(vessel => {
          const arrivalDate = new Date(vessel.etd);
          arrivalDate.setHours(0, 0, 0, 0);
          return arrivalDate.getTime() === today.getTime();
        });

        const vesselMonthlyStats = [];
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const month = date.getMonth();
          const year = date.getFullYear();

          const monthVessels = vessels.filter(vessel => {
            const arrivalDate = new Date(vessel.etd);
            return arrivalDate.getMonth() === month && arrivalDate.getFullYear() === year;
          });

          vesselMonthlyStats.push({
            month: date.toLocaleString('default', { month: 'long' }),
            year: year,
            count: monthVessels.length
          });
        }
        
        vesselMonthlyStats.sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          return new Date(b.month + ' 1, ' + b.year) - new Date(a.month + ' 1, ' + a.year);
        });

        setVesselStats({
          monthlyStats: vesselMonthlyStats,
          todayCount: todayVessels.length
        });

      } catch (error) {
        console.error('Error fetching vessel statistics:', error);
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
        <Modal.Title>Vessel Entry Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <p>Loading vessel statistics...</p>
          </div>
        ) : (
          <div className="vessel-stats-container">
            <Row>
              <Col md={12} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>Vessels Entered Today</Card.Title>
                    <Card.Text className="display-4">{vesselStats.todayCount}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Monthly Vessel Entries (Past 12 Months)</Card.Title>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Number of Vessels</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vesselStats.monthlyStats.map((stat, index) => (
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

export default VesselStatsModal; 