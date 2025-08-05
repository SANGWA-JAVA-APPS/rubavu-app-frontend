import { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import PropTypes from 'prop-types';
import StockRepository from '../../services/StockServices/StockRepository';

const StorageArrivals = ({ onSelectArrival, selectedArrivalId }) => {
  const [storageArrivals, setStorageArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchStorageArrivals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use full year date range instead of context dates
        const today = new Date();
        const year = today.getFullYear();
        const yearStartDate = `${year}-01-01`; // January 1st of current year
        const yearEndDate = `${year}-12-31`; // December 31st of current year
        
        // Use the new storage arrivals endpoint that joins with storage invoices
        const response = await StockRepository.findStorageArrivals(yearStartDate, yearEndDate, authHeader());
        
        if (response && response.data) {
          setStorageArrivals(response.data);
        }
      } catch (err) {
        console.error('Error fetching storage arrivals:', err);
        setError('Failed to load storage arrivals');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStorageArrivals();
  }, []); // Remove startDate, endDate dependencies

  const refetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use full year date range instead of context dates
      const today = new Date();
      const year = today.getFullYear();
      const yearStartDate = `${year}-01-01`; // January 1st of current year
      const yearEndDate = `${year}-12-31`; // December 31st of current year
      
      // Use the new storage arrivals endpoint that joins with storage invoices
      const response = await StockRepository.findStorageArrivals(yearStartDate, yearEndDate, authHeader());
      
      if (response && response.data) {
        setStorageArrivals(response.data);
      }
    } catch (err) {
      console.error('Error fetching storage arrivals:', err);
      setError('Failed to load storage arrivals');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (arrival) => {
    onSelectArrival('arrival', arrival.id || arrival.tallyId);
  };

  const handleRadioSelect = (arrival, event) => {
    event.stopPropagation(); // Prevent row click when radio is clicked
    onSelectArrival('arrival', arrival.id || arrival.tallyId);
  };

  if (loading) {
    return (
      <Card>
        <Card.Body className="text-center">
          <Spinner animation="border" size="sm" /> Loading storage arrivals...
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Body>
          <div className="alert alert-danger">{error}</div>
          <Button variant="outline-primary" size="sm" onClick={refetchData}>
            Retry
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">🚢 Arrivals with Storage Invoices</h6>
        <small className="text-muted">Total: {storageArrivals.length} arrivals</small>
      </Card.Header>
      <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {storageArrivals.length === 0 ? (
          <div className="text-center text-muted">
            <p>No arrivals with storage invoices found</p>
          </div>
        ) : (
          <Table striped hover size="sm" className="mb-0">
            <thead>
              <tr>
                <th>Select</th>
                <th>Arrival ID</th>
                <th>Client</th>
                <th>Cargo</th>
                <th>Weight</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {storageArrivals.map((arrival) => (
                <tr
                  key={arrival.id || arrival.tallyId}
                  onClick={() => handleRowClick(arrival)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedArrivalId === (arrival.id || arrival.tallyId) ? '#e3f2fd' : 'transparent'
                  }}
                  className={selectedArrivalId === (arrival.id || arrival.tallyId) ? 'table-active' : ''}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="radio"
                      name="selectedArrival"
                      checked={selectedArrivalId === (arrival.id || arrival.tallyId)}
                      onChange={(e) => handleRadioSelect(arrival, e)}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                    <Badge bg="primary">{arrival.id || arrival.tallyId}</Badge>
                  </td>
                  <td>
                    {arrival.name || 
                     arrival.clientName || 
                     arrival.client?.name || 
                     arrival.profile?.name ||
                     'N/A'}
                  </td>
                  <td>
                    {arrival.cargo || 'N/A'}
                  </td>
                  <td>
                    {arrival.weight ? `${arrival.weight} ${arrival.weighttype || ''}` : 'N/A'}
                  </td>
                  <td>
                    {arrival.date_time ? new Date(arrival.date_time).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

StorageArrivals.propTypes = {
  onSelectArrival: PropTypes.func.isRequired,
  selectedArrivalId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default StorageArrivals;
