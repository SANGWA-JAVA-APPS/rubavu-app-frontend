import { useState, useCallback } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import UnInvoicedWarehouseMovements from './UnInvoicedWarehouseMovements';
import StorageInvoices from './StorageInvoices';
import StorageArrivals from './StorageArrivals';

const StockManagement = () => {
  // Selection states
  const [selectedWHMovementId, setSelectedWHMovementId] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [selectedArrivalId, setSelectedArrivalId] = useState(null);
  
  // Loading state for update operation
  const [updateLoading, setUpdateLoading] = useState(false);

  // Selection handlers
  const handleSelectMovement = useCallback((type, id) => {
    if (type === 'wh_movement') {
      setSelectedWHMovementId(id);
    }
  }, []);

  const handleSelectInvoice = useCallback((type, id) => {
    if (type === 'gen_invoice') {
      setSelectedInvoiceId(id);
    }
  }, []);

  const handleSelectArrival = useCallback((type, id) => {
    if (type === 'arrival') {
      setSelectedArrivalId(id);
    }
  }, []);

  // Clear all selections
  const clearSelections = () => {
    setSelectedWHMovementId(null);
    setSelectedInvoiceId(null);
    setSelectedArrivalId(null);
  };

  // Update stock handler (placeholder for now)
  const handleUpdateStock = async () => {
    if (!selectedWHMovementId && !selectedInvoiceId && !selectedArrivalId) {
      alert('Please select at least one item to update stock.');
      return;
    }

    setUpdateLoading(true);
    
    try {
      // Placeholder for actual update logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      alert('Stock update will be implemented soon!');
      console.log('Update Stock clicked with selections:', {
        wh_movement_id: selectedWHMovementId,
        invoice_id: selectedInvoiceId,
        arrival_id: selectedArrivalId
      });
      
      // Clear selections after successful update
      clearSelections();
      
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h4>📦 Stock Management System</h4>
          <p className="text-muted">
            Manage warehouse movements, storage invoices, and arrivals. Select items from each section to update stock.
          </p>
        </Col>
      </Row>

      {/* Three main components in a row */}
      <Row className="mb-4">
        <Col md={4}>
          <UnInvoicedWarehouseMovements 
            onSelectMovement={handleSelectMovement}
            selectedMovementId={selectedWHMovementId}
          />
        </Col>
        <Col md={4}>
          <StorageInvoices 
            onSelectInvoice={handleSelectInvoice}
            selectedInvoiceId={selectedInvoiceId}
          />
        </Col>
        <Col md={4}>
          <StorageArrivals 
            onSelectArrival={handleSelectArrival}
            selectedArrivalId={selectedArrivalId}
          />
        </Col>
      </Row>

      {/* Selection Display and Actions */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h6 className="mb-0">🎯 Selected Items</h6>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <div className="p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                    <strong>Warehouse Movement ID:</strong>
                    <div className="mt-1">
                      {selectedWHMovementId ? (
                        <span className="badge bg-primary fs-6">{selectedWHMovementId}</span>
                      ) : (
                        <span className="text-muted">Not selected</span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                    <strong>Storage Invoice ID:</strong>
                    <div className="mt-1">
                      {selectedInvoiceId ? (
                        <span className="badge bg-success fs-6">{selectedInvoiceId}</span>
                      ) : (
                        <span className="text-muted">Not selected</span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                    <strong>Arrival ID:</strong>
                    <div className="mt-1">
                      {selectedArrivalId ? (
                        <span className="badge bg-info fs-6">{selectedArrivalId}</span>
                      ) : (
                        <span className="text-muted">Not selected</span>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>

              {(selectedWHMovementId || selectedInvoiceId || selectedArrivalId) && (
                <Alert variant="info" className="mb-3">
                  <strong>Selection Summary:</strong>
                  <ul className="mb-0 mt-2">
                    {selectedWHMovementId && <li>Warehouse Movement: {selectedWHMovementId}</li>}
                    {selectedInvoiceId && <li>Storage Invoice: {selectedInvoiceId}</li>}
                    {selectedArrivalId && <li>Arrival Note: {selectedArrivalId}</li>}
                  </ul>
                </Alert>
              )}

              <div className="d-flex gap-2">
                <Button 
                  variant="success" 
                  onClick={handleUpdateStock}
                  disabled={updateLoading || (!selectedWHMovementId && !selectedInvoiceId && !selectedArrivalId)}
                >
                  {updateLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    '📈 Update Stock'
                  )}
                </Button>
                
                <Button 
                  variant="outline-secondary" 
                  onClick={clearSelections}
                  disabled={updateLoading}
                >
                  🗑️ Clear Selections
                </Button>
              </div>

              <div className="mt-3">
                <small className="text-muted">
                  <strong>Note:</strong> The &quot;Update Stock&quot; button is currently a placeholder. 
                  Backend integration will be implemented as requested.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StockManagement;
