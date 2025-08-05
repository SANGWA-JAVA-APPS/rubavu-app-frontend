import { useState, useEffect, useCallback } from 'react';
import { Card, Table, Button, Badge, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import PropTypes from 'prop-types';
import Reporting from '../../services/StockServices/Reporting';


const UnInvoicedWarehouseMovements = ({ onSelectMovement, selectedMovementId }) => {
  const [whMovements, setWhMovements] = useState([]);
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [movementIdFilter, setMovementIdFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  const fetchUnInvoicedMovements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the same endpoint as CargoExitDetailedDeferred
      const today = new Date();
      const year = today.getFullYear();
      const startDate = `${year}-01-01`; // January 1st of current year
      const endDate = `${year}-12-31`; // December 31st of current year
      
      const response = await Reporting.cargoExitDetailedReport(startDate, endDate, authHeader());
      
      if (response && response.data) {
        // Filter for movements that don't have invoices 
        // const uninvoicedMovements = response.data.filter(movement => 
        //   (movement.remaining && movement.remaining > 0) || 
        //   !movement.invoiced || 
        //   movement.paymentOption === "Exit and pay later"
        // );
        setWhMovements(response.data);
        setFilteredMovements(response.data);
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

  // Filter movements based on movement ID
  useEffect(() => {
    if (movementIdFilter.trim() === '') {
      setFilteredMovements(whMovements);
    } else {
      const filtered = whMovements.filter(movement => 
        movement.arrivalId && movement.arrivalId.toString().toLowerCase().includes(movementIdFilter.toLowerCase())
      );
      setFilteredMovements(filtered);
    }
  }, [whMovements, movementIdFilter]);

  const handleFilterChange = (event) => {
    setMovementIdFilter(event.target.value);
  };

  const clearFilter = () => {
    setMovementIdFilter('');
  };

  const handleRowClick = (movement) => {
    onSelectMovement('wh_movement', movement.id);
  };

  const handleRadioSelect = (movement, event) => {
    event.stopPropagation(); // Prevent row click when radio is clicked
    onSelectMovement('wh_movement', movement.id);
  };

  const refetchData = () => {
    setMovementIdFilter(''); // Clear filter when refetching
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
        <small className="text-muted">Total: {whMovements.length} movements (Showing: {filteredMovements.length})</small>
      </Card.Header>
      <Card.Body style={{ maxHeight: '1200px', overflowY: 'auto' }}>
        {/* Filter Input */}
        <div className="mb-3">
          <InputGroup size="sm">
            <InputGroup.Text>🔍</InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Filter by Movement ID..."
              value={movementIdFilter}
              onChange={handleFilterChange}
              className="form-control-sm"
            />
            {movementIdFilter && (
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={clearFilter}
                style={{ borderLeft: 'none' }}
              >
                ✕ Clear
              </Button>
            )}
          </InputGroup>
        </div>

        {filteredMovements.length === 0 ? (
          <div className="text-center text-muted">
            <p>{movementIdFilter ? 'No movements found matching your filter' : 'No uninvoiced warehouse movements found'}</p>
          </div>
        ) : (
          <Table striped hover size="sm" className="mb-0">
            <thead>
              <tr>
                <th>Select</th>
                <th>A.N</th>
                <th>WH/MVT</th>
                <th>Date Time</th>
                <th>Client Name</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Weight</th>
                <th>Collect type</th>
                <th>Invoice</th>
                <th>Payment Option</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map((movement) => (
                <tr
                  key={movement.id} 
                  onClick={() => handleRowClick(movement)}
                  style={{ cursor: 'pointer', backgroundColor: selectedMovementId === movement.id ? '#e3f2fd' : 'transparent' }}
                  className={selectedMovementId === movement.id ? 'table-active' : ''}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="radio" name="selectedMovement" checked={selectedMovementId === movement.id} onChange={(e) => handleRadioSelect(movement, e)} className="form-check-input" />
                  </td>
                  <td>{movement.arrivalNote || movement.arrivalId || movement.id}</td>
                  <td>{  movement.id}</td>
                  <td>{movement.date_time || movement.date_time || movement.date_time}</td>
                  <td>{movement.clientName || movement.user_name || 'N/A'}</td>
                  <td>{movement.itemname || movement.itemname || 'N/A'}</td>
                  <td>{movement.current_qty || movement.current_qty || 'N/A'}</td>
                  <td>{movement.weight || movement.weight || 'N/A'}</td>
                  <td>{movement.collectType  || 'N/A'}</td>
                  {/* <td className="text-end">
                    {movement.invoiceAmount || movement.amount ? 
                      `${(movement.invoiceAmount || movement.amount).toLocaleString()} RWF` : 
                      'N/A'
                    }
                  </td> */}
                  <td>{movement.genInvoiceId || 'N/A'}</td>
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
