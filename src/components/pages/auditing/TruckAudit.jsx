import React, { useState, useEffect, useRef } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useAuthHeader } from 'react-auth-kit';
import { format } from 'date-fns';
import { PrinterFill } from 'react-bootstrap-icons';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

function parseDateString(dateStr) {
    // Expects 'dd/MM/yyyy'
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00`);
}

function TruckAudit() {
    const authHeader = useAuthHeader()();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [username, setUsername] = useState('admin');
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usernames, setUsernames] = useState(['admin']);
    const componentRef = useRef();

    const fetchTruckAudits = async (filters = {}) => {
        try {
            setLoading(true);
            const { startDate, endDate, username = 'admin' } = filters;
            let url = 'http://localhost:8101/codeguru/api/auditing/trucks';
            const params = new URLSearchParams();
            
            params.append('username', username);
            
            if (startDate) {
                const formattedStartDate = parseDateString(startDate).toISOString();
                params.append('startDate', formattedStartDate);
            }
            if (endDate) {
                const formattedEndDate = parseDateString(endDate).toISOString();
                params.append('endDate', formattedEndDate);
            }
            
            const queryString = params.toString();
            url += `?${queryString}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: authHeader
                }
            });
            setAuditLogs(response.data);
            
            // Extract unique usernames from the response
            const uniqueUsernames = [...new Set(response.data.map(audit => audit.username))];
            setUsernames(uniqueUsernames);
        } catch (error) {
            console.error('Error fetching truck audits:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTruckAudits({ username: 'admin' });
    }, [authHeader]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'truck-audit-data'
    });

    const handleFilter = () => {
        fetchTruckAudits({ startDate, endDate, username });
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setUsername('admin');
        fetchTruckAudits({ username: 'admin' });
    };

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
                            <th>Truck Type</th>
                            <th>Status</th>
                            <th>Driver Name</th>
                            <th>Driver Surname</th>
                            <th>Driver Telephone</th>
                            <th>Is Deleted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="12" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : auditLogs && auditLogs.length > 0 ? (
                            auditLogs.map((log) => (
                                <tr key={`${log.entityId}-${log.revision}`}>
                                    <td>{log.revision}</td>
                                    <td>{log.username}</td>
                                    <td>{log.entityId}</td>
                                    <td>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                                    <td style={{ backgroundColor: 'beige' }}>{log.revisionType}</td>
                                    <td>{log.plateNumber}</td>
                                    <td>{log.truckType}</td>
                                    <td>{log.status}</td>
                                    <td>{log.driverName || '-'}</td>
                                    <td>{log.driverSurname || '-'}</td>
                                    <td>{log.driverTelephone || '-'}</td>
                                    <td>{log.isDeleted ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="text-center">
                                    No audit logs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default TruckAudit; 