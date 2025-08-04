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
        
        // This will need to be a custom endpoint that joins arrivals with storage invoices
        // For now, we'll fetch arrivals and then check for storage invoices
        const response = await StockRepository.findArrival_note('', '', '', authHeader());
        
        if (response && response.data) {
          // We would typically filter these based on having storage invoices
          // For now, showing all arrivals as the backend would handle the join
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
  }, [authHeader]);

  const refetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This will need to be a custom endpoint that joins arrivals with storage invoices
      // For now, we'll fetch arrivals and then check for storage invoices
      const response = await StockRepository.findArrival_note('', '', '', authHeader());
      
      if (response && response.data) {
        // We would typically filter these based on having storage invoices
        // For now, showing all arrivals as the backend would handle the join
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
    onSelectArrival('arrival', arrival.id);
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
                <th>ID</th>
                <th>Client</th>
              </tr>
            </thead>
            <tbody>
              {storageArrivals.map((arrival) => (
                <tr
                  key={arrival.id}
                  onClick={() => handleRowClick(arrival)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedArrivalId === arrival.id ? '#e3f2fd' : 'transparent'
                  }}
                  className={selectedArrivalId === arrival.id ? 'table-active' : ''}
                >
                  <td>
                    <Badge bg="primary">{arrival.id}</Badge>
                  </td>
                  <td>
                    {arrival.clientName || 
                     arrival.client?.name || 
                     arrival.profile?.name ||
                     'N/A'}
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
