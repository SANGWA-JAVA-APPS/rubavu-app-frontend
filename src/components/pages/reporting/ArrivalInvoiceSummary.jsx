import React, { useState, useContext, useCallback } from 'react';
import { Card, Row, Col, Table, Badge, Alert, Spinner } from 'react-bootstrap';
import { DateRangeContext } from '../../globalcomponents/ButtonContext';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import PropTypes from 'prop-types';

export const ArrivalInvoiceSummary = ({ onClose }) => {
    const { startDate, endDate } = useContext(DateRangeContext);
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeView, setActiveView] = useState('overview');
    const authHeader = useAuthHeader();

    const fetchSummaryData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/reports/arrival-invoice-summary', {
                params: { startDate, endDate },
                headers: { Authorization: authHeader() }
            });
            setSummaryData(response.data);
        } catch (error) {
            console.error('Error fetching summary data:', error);
            setSummaryData({ success: false, message: 'Failed to fetch data' });
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate, authHeader]);

    React.useEffect(() => {
        if (startDate && endDate) {
            fetchSummaryData();
        }
    }, [startDate, endDate, fetchSummaryData]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-RW', {
            style: 'currency',
            currency: 'RWF',
            minimumFractionDigits: 0
        }).format(amount || 0);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num || 0);
    };

    if (loading) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <div className="mt-3">Loading arrival invoice summary...</div>
            </div>
        );
    }

    if (!summaryData || !summaryData.success) {
        return (
            <Alert variant="danger">
                {summaryData?.message || 'Failed to load summary data'}
            </Alert>
        );
    }

    const { totals, detailedSummary, clientSummary, typeSummary, dailySummary } = summaryData;

    return (
        <div className="arrival-invoice-summary">
            {/* Header */}
            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <Row className="align-items-center">
                        <Col>
                            <h5 className="mb-0">📊 Arrival Note & Invoice Summary Report</h5>
                            <small>Period: {startDate} to {endDate}</small>
                        </Col>
                        <Col xs="auto">
                            <button className="btn btn-light btn-sm" onClick={onClose}>
                                ✕ Close
                            </button>
                        </Col>
                    </Row>
                </Card.Header>
            </Card>

            {/* Overview Cards */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="text-center bg-primary text-white h-100">
                        <Card.Body>
                            <h2 className="mb-1">{formatNumber(totals.totalArrivals)}</h2>
                            <p className="mb-0">Total Arrivals</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center bg-success text-white h-100">
                        <Card.Body>
                            <h2 className="mb-1">{formatNumber(totals.totalInvoices)}</h2>
                            <p className="mb-0">Total Invoices</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center bg-warning text-dark h-100">
                        <Card.Body>
                            <h2 className="mb-1">{formatCurrency(totals.totalAmount)}</h2>
                            <p className="mb-0">Total Amount</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center bg-info text-white h-100">
                        <Card.Body>
                            <h2 className="mb-1">{formatNumber(totals.totalWeight)}</h2>
                            <p className="mb-0">Total Weight (KG)</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Navigation Tabs */}
            <Card className="mb-4">
                <Card.Header>
                    <Row>
                        <Col>
                            <div className="btn-group" role="group">
                                <button 
                                    type="button" 
                                    className={`btn ${activeView === 'overview' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveView('overview')}
                                >
                                    📈 Overview
                                </button>
                                <button 
                                    type="button" 
                                    className={`btn ${activeView === 'detailed' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveView('detailed')}
                                >
                                    📋 Detailed
                                </button>
                                <button 
                                    type="button" 
                                    className={`btn ${activeView === 'clients' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveView('clients')}
                                >
                                    👥 Clients
                                </button>
                                <button 
                                    type="button" 
                                    className={`btn ${activeView === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActiveView('daily')}
                                >
                                    📅 Daily
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/* Overview View */}
                    {activeView === 'overview' && (
                        <Row>
                            <Col md={6}>
                                <h6 className="text-primary mb-3">💰 Invoice Type Breakdown</h6>
                                <Table striped bordered hover size="sm">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Type</th>
                                            <th>Count</th>
                                            <th>Amount</th>
                                            <th>Avg</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {typeSummary.map((type, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Badge bg={type.invoiceType === 'storage' ? 'warning' : 'info'}>
                                                        {type.invoiceType === 'storage' ? '🏪' : '📊'} {type.invoiceType}
                                                    </Badge>
                                                </td>
                                                <td>{formatNumber(type.totalInvoices)}</td>
                                                <td>{formatCurrency(type.totalAmount)}</td>
                                                <td>{formatCurrency(type.averageAmount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={6}>
                                <h6 className="text-success mb-3">📊 Summary Statistics</h6>
                                <div className="bg-light p-3 rounded">
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <strong>Storage Invoices:</strong><br/>
                                            <span className="text-warning">{formatNumber(totals.totalStorageInvoices)}</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <strong>Tally Invoices:</strong><br/>
                                            <span className="text-info">{formatNumber(totals.totalTallyInvoices)}</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <strong>Storage Amount:</strong><br/>
                                            <span className="text-warning">{formatCurrency(totals.totalStorageAmount)}</span>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <strong>Tally Amount:</strong><br/>
                                            <span className="text-info">{formatCurrency(totals.totalTallyAmount)}</span>
                                        </div>
                                        <div className="col-12 mt-2 pt-2 border-top">
                                            <strong>Avg per Arrival:</strong><br/>
                                            <span className="text-success">{formatCurrency(totals.averageAmountPerArrival)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}

                    {/* Detailed View */}
                    {activeView === 'detailed' && (
                        <div>
                            <h6 className="text-primary mb-3">📋 Detailed Arrival & Invoice Summary</h6>
                            <div className="table-responsive">
                                <Table striped bordered hover size="sm">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Arrival ID</th>
                                            <th>Date</th>
                                            <th>Client</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Invoices</th>
                                            <th>Storage</th>
                                            <th>Tally</th>
                                            <th>Total Amount</th>
                                            <th>Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detailedSummary.map((item, index) => (
                                            <tr key={index}>
                                                <td><strong>{item.arrivalId}</strong></td>
                                                <td>{new Date(item.arrivalDate).toLocaleDateString()}</td>
                                                <td>{item.clientName}</td>
                                                <td>
                                                    <Badge bg={item.collectType === 'Assorted' ? 'success' : 'warning'}>
                                                        {item.collectType}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Badge bg={item.arrivalStatus === 'open' ? 'primary' : 'secondary'}>
                                                        {item.arrivalStatus}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">{item.totalInvoices}</td>
                                                <td className="text-center">{item.storageInvoices}</td>
                                                <td className="text-center">{item.tallyInvoices}</td>
                                                <td className="text-end">{formatCurrency(item.totalInvoiceAmount)}</td>
                                                <td className="text-end">{formatNumber(item.totalWeight)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {/* Clients View */}
                    {activeView === 'clients' && (
                        <div>
                            <h6 className="text-success mb-3">👥 Client Summary</h6>
                            <div className="table-responsive">
                                <Table striped bordered hover size="sm">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Client Name</th>
                                            <th>Arrivals</th>
                                            <th>Invoices</th>
                                            <th>Storage Inv.</th>
                                            <th>Tally Inv.</th>
                                            <th>Storage Amt.</th>
                                            <th>Tally Amt.</th>
                                            <th>Total Amount</th>
                                            <th>Weight (KG)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientSummary.map((client, index) => (
                                            <tr key={index}>
                                                <td><strong>{client.clientName}</strong></td>
                                                <td className="text-center">{client.totalArrivals}</td>
                                                <td className="text-center">{client.totalInvoices}</td>
                                                <td className="text-center">{client.storageInvoices}</td>
                                                <td className="text-center">{client.tallyInvoices}</td>
                                                <td className="text-end">{formatCurrency(client.storageAmount)}</td>
                                                <td className="text-end">{formatCurrency(client.tallyAmount)}</td>
                                                <td className="text-end"><strong>{formatCurrency(client.totalAmount)}</strong></td>
                                                <td className="text-end">{formatNumber(client.totalWeight)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {/* Daily View */}
                    {activeView === 'daily' && (
                        <div>
                            <h6 className="text-info mb-3">📅 Daily Summary</h6>
                            <div className="table-responsive">
                                <Table striped bordered hover size="sm">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Date</th>
                                            <th>Total Arrivals</th>
                                            <th>Total Invoices</th>
                                            <th>Total Amount</th>
                                            <th>Avg per Arrival</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dailySummary.map((day, index) => (
                                            <tr key={index}>
                                                <td><strong>{new Date(day.arrivalDate).toLocaleDateString()}</strong></td>
                                                <td className="text-center">{day.totalArrivals}</td>
                                                <td className="text-center">{day.totalInvoices}</td>
                                                <td className="text-end">{formatCurrency(day.totalAmount)}</td>
                                                <td className="text-end">
                                                    {formatCurrency(day.totalArrivals > 0 ? day.totalAmount / day.totalArrivals : 0)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

ArrivalInvoiceSummary.propTypes = {
    onClose: PropTypes.func.isRequired
};
