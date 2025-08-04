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

function AccountAudit() {
    const authHeader = useAuthHeader()();
    const [accountAudits, setAccountAudits] = useState([]);
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

    const fetchAccountAudits = async () => {
        try {
            const url = `http://localhost:8101/api/audit/accounts/${username}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: authHeader
                }
            });
            setAccountAudits(response.data);
            setFilteredAudits(response.data);
        } catch (error) {
            console.error('Error fetching account audits:', error);
        }
    };

    useEffect(() => {
        fetchUsernames();
        fetchAccountAudits();
    }, [authHeader]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'account-audit-data'
    });

    const handleFilter = () => {
        let filtered = [...accountAudits];

        // Filter by username
        if (username) {
            filtered = filtered.filter(audit => audit.username === username);
        }

        // Filter by date range
        if (startDate) {
            const startTimestamp = new Date(startDate).getTime();
            filtered = filtered.filter(audit => audit.timestamp >= startTimestamp);
        }

        if (endDate) {
            const endTimestamp = new Date(endDate).getTime() + (24 * 60 * 60 * 1000); // Add one day to include the end date
            filtered = filtered.filter(audit => audit.timestamp <= endTimestamp);
        }

        setFilteredAudits(filtered);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setUsername('admin');
        setFilteredAudits(accountAudits);
    };

    return (
        <PagesWapper>
            <Splitter />
            <ContainerRow>
                <TitleSmallDesc title="Account Audit Logs" />
                <ListToolBar 
                    hideSaveBtn={true} 
                    height={height} 
                    entity='Account' 
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
                                <td>Account Username</td>
                                <td>Email</td>
                                <td>Status</td>
                                <td>Account Category</td>
                                <td>Profile Name</td>
                                <td>Profile Surname</td>
                                <td>Profile Gender</td>
                                <td>Is Deleted</td>
                            </TableHead>
                            <tbody>
                                {filteredAudits.length > 0 ? (
                                    filteredAudits.map((audit) => (
                                        <tr key={`${audit.entityId}-${audit.revision}`}>
                                            <td>{audit.revision}</td>
                                            <td>{audit.username}</td>
                                            <td>{audit.entityId}</td>
                                            <td>{audit.timestamp ? new Date(audit.timestamp).toLocaleString() : '-'}</td>
                                            <td style={{ backgroundColor: 'beige' }}>{'ADD'==audit.revisionType?'INSERT': audit.revisionType}</td>
                                            <td>{audit.accountUsername}</td>
                                            <td>{audit.email}</td>
                                            <td>{audit.status}</td>
                                            <td>{audit.accountCategoryName || '-'}</td>
                                            <td>{audit.profileName || '-'}</td>
                                            <td>{audit.profileSurname || '-'}</td>
                                            <td>{audit.profileGender || '-'}</td>
                                            <td>{audit.isDeleted ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="13" className="text-center">No audit logs found</td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan="13" style={{ fontSize: '20px' }} className="fw-bold text-end">
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

export default AccountAudit; 