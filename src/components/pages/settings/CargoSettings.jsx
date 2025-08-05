import { useState } from "react";
import { Container, Row, Col, Card, Nav, Alert } from "react-bootstrap";
import { useAuthHeader } from 'react-auth-kit';
import PagesWapper from "../../Global/PagesWapper";
import { ItemsContainer } from "../../globalcomponents/ItemsContainer";
import { TitleSmallDesc } from "../../globalcomponents/TitleSmallDesc";
import { SmallSplitter } from "../../globalcomponents/Splitter";
import UnInvoicedWarehouseMovements from "./UnInvoicedWarehouseMovements";
import StorageInvoices from "./StorageInvoices";
import StorageArrivals from "./StorageArrivals";
import StockRepository from "../../services/StockServices/StockRepository";

const CargoSettings = () => {
  const [activeTab, setActiveTab] = useState("warehouse");
  const authHeader = useAuthHeader();

  // Selection states
  const [selectedWHMovementId, setSelectedWHMovementId] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [selectedInvoiceWeight, setSelectedInvoiceWeight] = useState(null);
  const [selectedInvoiceArrivalId, setSelectedInvoiceArrivalId] = useState(null);
  const [selectedArrivalId, setSelectedArrivalId] = useState(null);

  // Loading state for update operation
  const [updateLoading, setUpdateLoading] = useState(false);

  // Selection handlers
  const handleSelectMovement = (type, id) => {
    if (type === "wh_movement") {
      setSelectedWHMovementId(id);
    }
  };

  const handleSelectInvoice = (type, id, weight, arrivalId) => {
    if (type === "gen_invoice") {
      setSelectedInvoiceId(id);
      setSelectedInvoiceWeight(weight);
      setSelectedInvoiceArrivalId(arrivalId);
    }
  };

  const handleSelectArrival = (type, id) => {
    if (type === "arrival") {
      setSelectedArrivalId(id);
    }
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedWHMovementId(null);
    setSelectedInvoiceId(null);
    setSelectedInvoiceWeight(null);
    setSelectedInvoiceArrivalId(null);
    setSelectedArrivalId(null);
  };

  // Update stock handler (placeholder for now) added some comments removed some comments
  const handleUpdateStock = async () => {
    if (!selectedWHMovementId && !selectedInvoiceId && !selectedArrivalId) {
      alert("Please select at least one item to update stock.");
      return;
    }

    setUpdateLoading(true);

    try {
      // Prepare the data to send to backend
      const updateData = {
        selectedWHMovementId: selectedWHMovementId,
        selectedInvoiceId: selectedInvoiceId,
        selectedArrivalId: selectedArrivalId,
      };

      // Call the backend API to update warehouse movement
      const response = await StockRepository.updateWarehouseMovement(updateData, authHeader());

      if (response && response.data && response.data.success) {
        alert("Stock updated successfully!");
        console.log("Update Stock completed:", response.data);
        
        // Clear selections after successful update
        clearSelections();
      } else {
        throw new Error(response.data?.message || "Failed to update stock");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "warehouse":
        return (
          <UnInvoicedWarehouseMovements
            onSelectMovement={handleSelectMovement}
            selectedMovementId={selectedWHMovementId}
          />
        );
      case "invoices":
        return (
          <StorageInvoices
            onSelectInvoice={handleSelectInvoice}
            selectedInvoiceId={selectedInvoiceId}
          />
        );
      case "arrivals":
        return (
          <StorageArrivals
            onSelectArrival={handleSelectArrival}
            selectedArrivalId={selectedArrivalId}
          />
        );
      default:
        return (
          <UnInvoicedWarehouseMovements
            onSelectMovement={handleSelectMovement}
            selectedMovementId={selectedWHMovementId}
          />
        );
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
                  active={activeTab === "warehouse"}
                  onClick={() => setActiveTab("warehouse")}
                  style={{ cursor: "pointer" }}>
                  � Warehouse Movements
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === "invoices"}
                  onClick={() => setActiveTab("invoices")}
                  style={{ cursor: "pointer" }}>
                  🏪 Storage Invoices
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === "arrivals"}
                  onClick={() => setActiveTab("arrivals")}
                  style={{ cursor: "pointer" }}>
                  � Storage Arrivals
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body>
            <Container fluid>
              {/* Selection Display and Update Stock Section */}
              <Row className="mt-4">
                <Col>
                  <Card className="border-top">
                    <Card.Header className="bg-light">
                      <h6 className="mb-0">🎯 Selected Items</h6>
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col md={3}>
                          <div
                            className="p-3"
                            style={{
                              backgroundColor: "#f8f9fa",
                              borderRadius: "5px",
                            }}>
                            <strong>WH MVT ID:</strong>
                            <div className="mt-1">
                              {selectedWHMovementId ? (
                                <span className="badge bg-primary fs-6">
                                  {selectedWHMovementId}
                                </span>
                              ) : (
                                <span className="text-muted">Not selected</span>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div
                            className="p-3"
                            style={{
                              backgroundColor: "#f8f9fa",
                              borderRadius: "5px",
                            }}>
                            <strong>Storage Invoice ID:</strong>
                            <div className="mt-1">
                              {selectedInvoiceId ? (
                                <div>
                                  <span className="badge bg-success fs-6">
                                    {selectedInvoiceId}
                                  </span>
                                  {selectedInvoiceWeight && (
                                    <div className="mt-1">
                                      <small className="text-muted">
                                        Weight: <strong>{selectedInvoiceWeight.toLocaleString()} KG</strong>
                                      </small>
                                    </div>
                                  )}
                                  {selectedInvoiceArrivalId && (
                                    <div className="mt-1">
                                      <small className="text-muted">
                                        Arrival ID: <strong>{selectedInvoiceArrivalId}</strong>
                                      </small>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted">Not selected</span>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div
                            className="p-3"
                            style={{
                              backgroundColor: "#f8f9fa",
                              borderRadius: "5px",
                            }}>
                            <strong>Arrival ID:</strong>
                            <div className="mt-1">
                              {selectedArrivalId ? (
                                <span className="badge bg-info fs-6">
                                  {selectedArrivalId}
                                </span>
                              ) : (
                                <span className="text-muted">Not selected</span>
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col md={3}>
                          {(selectedWHMovementId ||
                            selectedInvoiceId ||
                            selectedArrivalId) && (
                            <Alert variant="info" className="mb-3">
                              <strong>Selection Summary:</strong>
                              <ul className="mb-0 mt-2">
                                {selectedWHMovementId && (
                                  <li>
                                    WH MVT: {selectedWHMovementId}
                                  </li>
                                )}
                                {selectedInvoiceId && (
                                  <li>
                                    Storage Invoice: {selectedInvoiceId}
                                    {selectedInvoiceWeight && (
                                      <span className="text-muted"> ({selectedInvoiceWeight.toLocaleString()} KG)</span>
                                    )}
                                    {selectedInvoiceArrivalId && (
                                      <span className="text-muted"> - Arrival: {selectedInvoiceArrivalId}</span>
                                    )}
                                  </li>
                                )}
                                {selectedArrivalId && (
                                  <li>Arrival Note: {selectedArrivalId}</li>
                                )}
                              </ul>
                            </Alert>
                          )}
                        </Col>
                      </Row>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-success" onClick={handleUpdateStock}
                          disabled={
                            updateLoading ||
                            (!selectedWHMovementId &&
                              !selectedInvoiceId &&
                              !selectedArrivalId)
                          }>
                          {updateLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"></span>
                                Updating...
                            </>
                          ) : (
                            "📈 Update Stock"
                          )}
                        </button>

                        <button
                          className="btn btn-outline-secondary"
                          onClick={clearSelections}
                          disabled={updateLoading}>
                          🗑️ Clear Selections
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>{renderActiveComponent()}</Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </ItemsContainer>
    </PagesWapper>
  );
};

export default CargoSettings;
