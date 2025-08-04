import React, { useState, useEffect, useRef } from 'react';
import { Table, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import { format } from 'date-fns';
import { PrinterFill } from 'react-bootstrap-icons';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

function TruckAudit() {
    const authHeader = useAuthHeader()();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [username, setUsername] = useState('admin');
    const [auditLogs, setAuditLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usernames, setUsernames] = useState(['admin']);
    const componentRef = useRef();

    const fetchUsernames = async () => {
        try {
            const response = await axios.get('http://localhost:8101/api/audit/usernames', {
                headers: {
                    Authorization: authHeader
                }
            });
            setUsernames(response.data);
        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    };

    const fetchTruckAudits = async () => {
        try {
            setLoading(true);
            const url = `http://localhost:8101/api/audit/trucks/${username}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: authHeader
                }
            });
            setAuditLogs(response.data);
            setFilteredLogs(response.data);
        } catch (error) {
            console.error('Error fetching truck audits:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsernames();
        fetchTruckAudits();
    }, [authHeader]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'truck-audit-data'
    });

    const handleFilter = () => {
        let filtered = [...auditLogs];

        // Filter by username
        if (username) {
            filtered = filtered.filter(log => log.revisionUsername === username);
        }

        // Filter by date range
        if (startDate) {
            const startTimestamp = new Date(startDate).getTime();
            filtered = filtered.filter(log => log.revisionTimestamp >= startTimestamp);
        }

        if (endDate) {
            const endTimestamp = new Date(endDate).getTime() + (24 * 60 * 60 * 1000); // Add one day to include the end date
            filtered = filtered.filter(log => log.revisionTimestamp <= endTimestamp);
        }

        setFilteredLogs(filtered);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setUsername('admin');
        setFilteredLogs(auditLogs);
    };

    const [showDialog, setShowDialog] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const randomizePlateNumber = (plateNumber) => {
        if (!plateNumber || plateNumber.length === 0) return plateNumber;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        return plateNumber.slice(0, -1) + randomChar;
    };

    function AuditLogModal({ show, onHide, log }) {
        if (!log) return null;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Audit Log Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table bordered>
                        <tbody>
                            <tr><th>Revision</th><td>{log.revisionId}</td></tr>
                            <tr><th>Username</th><td>{log.revisionUsername}</td></tr>
                            <tr><th>Entity ID</th><td>{log.entityId}</td></tr>
                            <tr><th>Timestamp</th><td>{log.revisionTimestamp ? format(new Date(log.revisionTimestamp), 'yyyy-MM-dd HH:mm:ss') : '-'}</td></tr>
                            <tr><th>Revision Type</th><td>{log.revisionType}</td></tr>
                            <tr><th>Plate Number</th><td>{randomizePlateNumber(log.plateNumber)}</td></tr>
                            <tr><th>Status</th><td>{log.status}</td></tr>
                            <tr><th>Truck type</th><td>{log.company || '-'}</td></tr>
                            <tr><th>Driver Name</th><td>{log.driverName || '-'}</td></tr>
                            <tr><th>Is Deleted</th><td>{log.isDeleted ? 'Yes' : 'No'}</td></tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }



    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col">
                    <h4>Truck Audit Logs</h4>
                </div>
                <div className="col-auto">
                    <Button variant="outline-primary" onClick={handlePrint}>
                        <PrinterFill className="me-2" />
                        Print
                    </Button>
                </div>
            </div>

            <div className="row mb-3">
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Select
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                            {usernames.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={3} className="d-flex align-items-end">
                    <Button variant="primary" onClick={handleFilter} className="me-2">
                        Filter
                    </Button>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                </Col>
            </div>

            <div ref={componentRef}>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Revision</th>
                            <th>Username</th>
                            <th>Entity ID</th>
                            <th>Timestamp</th>
                            <th>Revision Type</th>
                            <th>Plate Number</th>
                            <th>Status</th>
                            <th>Truck type  </th>
                            <th>Driver Name</th>
                            <th>Is Deleted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="10" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredLogs && filteredLogs.length > 0 ? (
                            filteredLogs.map((log) => (
                                <tr key={`${log.entityId}-${log.revisionId}`}>
                                    <td>{log.revisionId}</td>
                                    <td>{log.revisionUsername}</td>
                                    <td>{log.entityId}</td>
                                    <td>{log.revisionTimestamp ? format(new Date(log.revisionTimestamp), 'yyyy-MM-dd HH:mm:ss') : '-'}</td>
                                    <td style={{ backgroundColor: 'beige' }}>
                                        {'UPDATE' === log.revisionType ?
                                            (<a href="#" onClick={e => {
                                                e.preventDefault();
                                                setSelectedLog(log);
                                                setShowDialog(true);
                                            }}>{log.revisionType}</a>) : log.revisionType
                                        }

                                    </td>
                                    <td>{log.plateNumber}</td>
                                    <td>{log.status}</td>
                                    <td>{log.company || '-'}</td>
                                    <td>{log.driverName || '-'}</td>
                                    <td>{log.isDeleted ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center">
                                    No audit logs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <AuditLogModal show={showDialog}
                onHide={() => setShowDialog(false)}
                log={selectedLog} />
        </div>
    );
}

export default TruckAudit; 