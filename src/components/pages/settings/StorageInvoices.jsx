import { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import PropTypes from 'prop-types';
import StockRepository from '../../services/StockServices/StockRepository';
import CurrentDate from '../../Global/CurrentDate';

const StorageInvoices = ({ onSelectInvoice, selectedInvoiceId }) => {
  const [storageInvoices, setStorageInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchStorageInvoices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using today's date for current data only
        const todayDate = CurrentDate.todaydate();
 
         
        const response = await StockRepository.findStorageInvoices(authHeader(), todayDate, todayDate);
        
        if (response && response.data) {
          setStorageInvoices(response.data);
        }
      } catch (err) {
        console.error('Error fetching storage invoices:', err);
        setError('Failed to load storage invoices');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStorageInvoices();
  }, []);

  const refetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the new storage-specific endpoint
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];
      
      const response = await StockRepository.findStorageInvoices(authHeader(), startDate, endDate);
      
      if (response && response.data) {
        setStorageInvoices(response.data);
      }
    } catch (err) {
      console.error('Error fetching storage invoices:', err);
      setError('Failed to load storage invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (invoice) => {
    onSelectInvoice('gen_invoice', invoice.id, invoice.total_weight, invoice.arrivalId);
  };

  const handleRadioSelect = (invoice, event) => {
    event.stopPropagation(); // Prevent row click when radio is clicked
    onSelectInvoice('gen_invoice', invoice.id, invoice.total_weight, invoice.arrivalId);
  };

  if (loading) {
    return (
      <Card>
        <Card.Body className="text-center">
          <Spinner animation="border" size="sm" /> Loading storage invoices...
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
        <h6 className="mb-0">🏪 Storage Type Invoices</h6>
        <small className="text-muted">Total: {storageInvoices.length} invoices</small>
      </Card.Header>
      <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {storageInvoices.length === 0 ? (
          <div className="text-center text-muted">
            <p>No storage invoices found</p>
          </div>
        ) : (
          <Table striped hover size="sm" className="mb-0">
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Total Weight</th>
                <th>Arrival ID</th>
                <th>Storage Period</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {storageInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  onClick={() => handleRowClick(invoice)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedInvoiceId === invoice.id ? '#e3f2fd' : 'transparent'
                  }}
                  className={selectedInvoiceId === invoice.id ? 'table-active' : ''}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="radio"
                      name="selectedInvoice"
                      checked={selectedInvoiceId === invoice.id}
                      onChange={(e) => handleRadioSelect(invoice, e)}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                   {invoice.id}
                  </td>
                  <td>
                    
                      {invoice.clientName || invoice.name || 'N/A'}
                    
                  </td>
                  <td className="text-left">
                    <strong>
                      {invoice.amount ? 
                        `${invoice.amount.toLocaleString()} RWF` : 
                        invoice.totalAmount ?
                        `${invoice.totalAmount.toLocaleString()} RWF` :
                        'N/A'
                      }
                    </strong>
                  </td>
                  <td>{invoice.total_weight.toLocaleString()} <small>KG</small> </td>
                  <td>{invoice.arrivalId} </td>
                  <td>
                    
                      {invoice.storagePeriod || invoice.storage_period || 'N/A'} days
                    
                  </td>
                  <td>
                    <small>
                      {invoice.dateTime ? 
                        new Date(invoice.dateTime).toLocaleDateString() : 
                        invoice.date_time ? 
                        new Date(invoice.date_time).toLocaleDateString() :
                        'N/A'
                      }
                    </small>
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

StorageInvoices.propTypes = {
  onSelectInvoice: PropTypes.func.isRequired,
  selectedInvoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default StorageInvoices;
