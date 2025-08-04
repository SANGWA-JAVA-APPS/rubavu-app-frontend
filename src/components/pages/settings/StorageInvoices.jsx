import { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import PropTypes from 'prop-types';
import StockRepository from '../../services/StockServices/StockRepository';

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
        
        // Using the general invoice endpoint and filtering for storage type
        const response = await StockRepository.findGen_invoice(authHeader());
        
        if (response && response.data) {
          // Filter for storage type invoices
          const filtered = response.data.filter(invoice => 
            invoice.type === 'storage' || invoice.invoiceType === 'storage'
          );
          setStorageInvoices(filtered);
        }
      } catch (err) {
        console.error('Error fetching storage invoices:', err);
        setError('Failed to load storage invoices');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStorageInvoices();
  }, [authHeader]);

  const refetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the general invoice endpoint and filtering for storage type
      const response = await StockRepository.findGen_invoice(authHeader());
      
      if (response && response.data) {
        // Filter for storage type invoices
        const filtered = response.data.filter(invoice => 
          invoice.type === 'storage' || invoice.invoiceType === 'storage'
        );
        setStorageInvoices(filtered);
      }
    } catch (err) {
      console.error('Error fetching storage invoices:', err);
      setError('Failed to load storage invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (invoice) => {
    onSelectInvoice('gen_invoice', invoice.id);
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
                <th>ID</th>
                <th>Amount</th>
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
                  <td>
                    <Badge bg="info">{invoice.id}</Badge>
                  </td>
                  <td className="text-end">
                    {invoice.amount ? 
                      `${invoice.amount.toLocaleString()} RWF` : 
                      'N/A'
                    }
                  </td>
                  <td>
                    {invoice.date ? 
                      new Date(invoice.date).toLocaleDateString() : 
                      invoice.created_at ? 
                      new Date(invoice.created_at).toLocaleDateString() :
                      'N/A'
                    }
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
