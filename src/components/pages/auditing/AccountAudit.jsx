import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountAuditLogs } from '../../../redux/actions/accountActions';
import { format } from 'date-fns';
import { PrinterFill } from 'react-bootstrap-icons';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

function AccountAudit() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [username, setUsername] = useState('');
    const componentRef = useRef();
    const dispatch = useDispatch();
    const { auditLogs, loading } = useSelector((state) => state.account);

    useEffect(() => {
        dispatch(getAccountAuditLogs());
    }, [dispatch]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleFilter = () => {
        dispatch(getAccountAuditLogs({ startDate, endDate, username }));
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setUsername('');
        dispatch(getAccountAuditLogs());
    };

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col">
                    <h4>Account Audit Logs</h4>
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
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : auditLogs && auditLogs.length > 0 ? (
                            auditLogs.map((log) => (
                                <tr key={log.id}>
                                    <td>{log.username}</td>
                                    <td>{log.email}</td>
                                    <td>{log.status}</td>
                                    <td>{log.action}</td>
                                    <td>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                                    <td>
                                        {log.changes && (
                                            <ul className="list-unstyled mb-0">
                                                {Object.entries(log.changes).map(([key, value]) => (
                                                    <li key={key}>
                                                        <strong>{key}:</strong> {value}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
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

export default AccountAudit; 