import { useState, useEffect, useCallback } from 'react';
import { Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import PropTypes from 'prop-types';
import Reporting from '../../services/StockServices/Reporting';

const UnInvoicedWarehouseMovements = ({ onSelectMovement, selectedMovementId }) => {
  const [whMovements, setWhMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  const fetchUnInvoicedMovements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the same endpoint as CargoExitDetailedDeferred
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];
      
      const response = await Reporting.cargoExitDetailedReport(startDate, endDate, authHeader());
      
      if (response && response.data) {
        // Filter for movements that don't have invoices 
        // const uninvoicedMovements = response.data.filter(movement => 
        //   (movement.remaining && movement.remaining > 0) || 
        //   !movement.invoiced || 
        //   movement.paymentOption === "Exit and pay later"
        // );
        setWhMovements(response.data);
      }
    } catch (err) {
      console.error('Error fetching uninvoiced warehouse movements:', err);
      setError('Failed to load warehouse movements');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - authHeader is called inside but not a dependency

  useEffect(() => {
    fetchUnInvoicedMovements();
  }, [fetchUnInvoicedMovements]);

  const handleRowClick = (movement) => {
    onSelectMovement('wh_movement', movement.id);
  };

  const refetchData = () => {
    fetchUnInvoicedMovements();
  };

  if (loading) {
    return (
      <Card>
        <Card.Body className="text-center">
          <Spinner animation="border" size="sm" /> Loading warehouse movements...
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
        <h6 className="mb-0">📦 Warehouse Movements Without Invoices</h6>
        <small className="text-muted">Total: {whMovements.length} movements</small>
      </Card.Header>
      <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {whMovements.length === 0 ? (
          <div className="text-center text-muted">
            <p>No uninvoiced warehouse movements found</p>
          </div>
        ) : (
          <Table striped hover size="sm" className="mb-0">
            <thead>
              <tr>
                <th>A.N</th>
                <th>Client Name</th>
                <th>Amount</th>
                <th>Payment Option</th>
              </tr>
            </thead>
            <tbody>
              {whMovements.map((movement) => (
                <tr
                  key={movement.id}
                  onClick={() => handleRowClick(movement)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedMovementId === movement.id ? '#e3f2fd' : 'transparent'
                  }}
                  className={selectedMovementId === movement.id ? 'table-active' : ''}
                >
                  <td>{movement.arrivalNote || movement.arrivalId || movement.id}</td>
                  <td>{movement.clientName || movement.user_name || 'N/A'}</td>
                  <td className="text-end">
                    {movement.invoiceAmount || movement.amount ? 
                      `${(movement.invoiceAmount || movement.amount).toLocaleString()} RWF` : 
                      'N/A'
                    }
                  </td>
                  <td>
                    <Badge bg={movement.paymentOption === 'Cash' ? 'success' : 
                              movement.paymentOption === 'Exit and pay later' ? 'warning' : 'secondary'}>
                      {movement.paymentOption || 'Pending'}
                    </Badge>
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

UnInvoicedWarehouseMovements.propTypes = {
  onSelectMovement: PropTypes.func.isRequired,
  selectedMovementId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default UnInvoicedWarehouseMovements;
