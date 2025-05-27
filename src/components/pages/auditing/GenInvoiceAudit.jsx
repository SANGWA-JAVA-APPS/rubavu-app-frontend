import React, { useRef, useState, useEffect } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { Col, Form, Button } from 'react-bootstrap';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';
import { Splitter } from '../../globalcomponents/Splitter';
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc';
import PrintCompanyInfo from '../../Global/PrintCompanyInfo';
import { useReactToPrint } from 'react-to-print';
import ContainerRow from '../../Global/ContainerRow';
import ListToolBar from '../../Global/ListToolBar';
import PagesWapper from '../../Global/PagesWapper';
import axios from 'axios';

function GenInvoiceAudit() {
    const authHeader = useAuthHeader()();
    const [invoiceAudits, setInvoiceAudits] = useState([]);
    const [filteredAudits, setFilteredAudits] = useState([]);
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [username, setUsername] = useState('admin');
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

    const fetchInvoiceAudits = async () => {
        try {
            const url = `http://localhost:8101/api/audit/gen-invoices/${username}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: authHeader
                }
            });
            setInvoiceAudits(response.data);
            setFilteredAudits(response.data);
        } catch (error) {
            console.error('Error fetching invoice audits:', error);
        }
    };

    useEffect(() => {
        fetchUsernames();
        fetchInvoiceAudits();
    }, [authHeader]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'gen-invoice-audit-data'
    });

    const handleFilter = () => {
        let filtered = [...invoiceAudits];

        // Filter by username
        if (username) {
            filtered = filtered.filter(audit => audit.revisionUsername === username);
        }

        // Filter by date range
        if (startDate) {
            const startTimestamp = new Date(startDate).getTime();
            filtered = filtered.filter(audit => audit.revisionTimestamp >= startTimestamp);
        }

        if (endDate) {
            const endTimestamp = new Date(endDate).getTime() + (24 * 60 * 60 * 1000); // Add one day to include the end date
            filtered = filtered.filter(audit => audit.revisionTimestamp <= endTimestamp);
        }

        setFilteredAudits(filtered);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setUsername('admin');
        setFilteredAudits(invoiceAudits);
    };

    return (
        <PagesWapper>
            <Splitter />
            <ContainerRow>
                <TitleSmallDesc title="Gen Invoice Audit Logs" />
                <ListToolBar 
                    hideSaveBtn={true} 
                    height={height} 
                    entity='Invoice' 
                    changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} 
                    changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} 
                    handlePrint={handlePrint} 
                    searchHeight={searchHeight} 
                />
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
                <div ref={componentRef} className="dataTableBox">
                    <Col md={12}>
                        <PrintCompanyInfo />
                        <TableOpen>
                            <TableHead>
                                <td>Revision</td>
                                <td>Username</td>
                                <td>Entity ID</td>
                                <td>Timestamp</td>
                                <td>Revision Type</td>
                                <td>Date Time</td>
                                <td>Amount</td>
                                <td>Ref ID</td>
                                <td>Total Weight</td>
                                <td>Total Amount</td>
                                <td>Description</td>
                                <td>Type</td>
                                <td>Storage Period</td>
                                <td>Is Deleted</td>
                            </TableHead>
                            <tbody>
                                {filteredAudits.length > 0 ? (
                                    filteredAudits.map((audit) => (
                                        <tr key={`${audit.entityId}-${audit.revisionId}`}>
                                            <td>{audit.revisionId}</td>
                                            <td>{audit.revisionUsername}</td>
                                            <td>{audit.entityId}</td>
                                            <td>{audit.revisionTimestamp ? new Date(audit.revisionTimestamp).toLocaleString() : '-'}</td>
                                            <td style={{ backgroundColor: 'beige' }}>{audit.revisionType}</td>
                                            <td>{audit.dateTime ? new Date(audit.dateTime).toLocaleString() : '-'}</td>
                                            <td>{audit.amount}</td>
                                            <td>{audit.refId}</td>
                                            <td>{audit.totalWeight}</td>
                                            <td>{audit.totalAmount}</td>
                                            <td>{audit.description || '-'}</td>
                                            <td>{audit.type || '-'}</td>
                                            <td>{audit.storagePeriod || '-'}</td>
                                            <td>{audit.isDeleted ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14" className="text-center">No audit logs found</td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan="14" style={{ fontSize: '20px' }} className="fw-bold text-end">
                                        Total Entries: {filteredAudits.length}
                                    </td>
                                </tr>
                            </tbody>
                        </TableOpen>
                    </Col>
                </div>
            </ContainerRow>
        </PagesWapper>
    );
}

export default GenInvoiceAudit; 