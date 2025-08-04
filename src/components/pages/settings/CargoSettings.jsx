import { useState } from 'react';
import { Container, Row, Col, Card, Nav, Alert } from 'react-bootstrap';
import PagesWapper from '../../Global/PagesWapper';
import { ItemsContainer } from '../../globalcomponents/ItemsContainer';
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc';
import { SmallSplitter } from '../../globalcomponents/Splitter';
import UnInvoicedWarehouseMovements from './UnInvoicedWarehouseMovements';
import StorageInvoices from './StorageInvoices';
import StorageArrivals from './StorageArrivals';

const CargoSettings = () => {
  const [activeTab, setActiveTab] = useState('warehouse');
  
  // Selection states
  const [selectedWHMovementId, setSelectedWHMovementId] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [selectedArrivalId, setSelectedArrivalId] = useState(null);
  
  // Loading state for update operation
  const [updateLoading, setUpdateLoading] = useState(false);

  // Selection handlers
  const handleSelectMovement = (type, id) => {
    if (type === 'wh_movement') {
      setSelectedWHMovementId(id);
    }
  };

  const handleSelectInvoice = (type, id) => {
    if (type === 'gen_invoice') {
      setSelectedInvoiceId(id);
    }
  };

  const handleSelectArrival = (type, id) => {
    if (type === 'arrival') {
      setSelectedArrivalId(id);
    }
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedWHMovementId(null);
    setSelectedInvoiceId(null);
    setSelectedArrivalId(null);
  };

  // Update stock handler (placeholder for now) added some comments
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

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'warehouse':
        return <UnInvoicedWarehouseMovements 
          onSelectMovement={handleSelectMovement}
          selectedMovementId={selectedWHMovementId}
        />;
      case 'invoices':
        return <StorageInvoices 
          onSelectInvoice={handleSelectInvoice}
          selectedInvoiceId={selectedInvoiceId}
        />;
      case 'arrivals':
        return <StorageArrivals 
          onSelectArrival={handleSelectArrival}
          selectedArrivalId={selectedArrivalId}
        />;
      default:
        return <UnInvoicedWarehouseMovements 
          onSelectMovement={handleSelectMovement}
          selectedMovementId={selectedWHMovementId}
        />;
    }
  };

  return (
    <PagesWapper>
      <ItemsContainer>
        <TitleSmallDesc title="Cargo Management Settings" />
        <SmallSplitter />
        
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <Nav variant="tabs" className="card-header-tabs">
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'warehouse'} 
                  onClick={() => setActiveTab('warehouse')}
                  style={{ cursor: 'pointer' }}
                >
                  � Warehouse Movements
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'invoices'} 
                  onClick={() => setActiveTab('invoices')}
                  style={{ cursor: 'pointer' }}
                >
                  🏪 Storage Invoices
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'arrivals'} 
                  onClick={() => setActiveTab('arrivals')}
                  style={{ cursor: 'pointer' }}
                >
                  � Storage Arrivals
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          
          <Card.Body>
            <Container fluid>
              <Row>
                <Col>
                  {renderActiveComponent()}
                </Col>
              </Row>
              
              {/* Selection Display and Update Stock Section */}
              <Row className="mt-4">
                <Col>
                  <Card className="border-top">
                    <Card.Header className="bg-light">
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
                        <button 
                          className="btn btn-success"
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
                        </button>
                        
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={clearSelections}
                          disabled={updateLoading}
                        >
                          🗑️ Clear Selections
                        </button>
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
            </Container>
          </Card.Body>
        </Card>
      </ItemsContainer>
    </PagesWapper>
  );
};

export default CargoSettings;
