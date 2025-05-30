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

function VesselAudit() {
    const authHeader = useAuthHeader()();
    const [vesselAudits, setVesselAudits] = useState([]);
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [username, setUsername] = useState('admin');
    const [usernames, setUsernames] = useState(['admin']);
    const componentRef = useRef();

    const fetchVesselAudits = async (filters = {}) => {
        try {
            const { startDate, endDate, username = 'admin' } = filters;
            let url = 'http://localhost:8101/codeguru/api/auditing/vessels';
            const params = new URLSearchParams();
            
            params.append('username', username);
            
            if (startDate) {
                const formattedStartDate = new Date(startDate).toISOString();
                params.append('startDate', formattedStartDate);
            }
            if (endDate) {
                const formattedEndDate = new Date(endDate).toISOString();
                params.append('endDate', formattedEndDate);
            }
            
            const queryString = params.toString();
            url += `?${queryString}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: authHeader
                }
            });
            setVesselAudits(response.data);
            
            // Extract unique usernames from the response
            const uniqueUsernames = [...new Set(response.data.map(audit => audit.username))];
            setUsernames(uniqueUsernames);
        } catch (error) {
            console.error('Error fetching vessel audits:', error);
        }
    };

    useEffect(() => {
        fetchVesselAudits({ username: 'admin' });
    }, [authHeader]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'vessel-audit-data'
    });

    const handleFilter = () => {
        fetchVesselAudits({ startDate, endDate, username });
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setUsername('admin');
        fetchVesselAudits({ username: 'admin' });
    };

    return (
        <PagesWapper>
            <Splitter />
            <ContainerRow>
                <TitleSmallDesc title="Vessel Audit Logs" />
                <ListToolBar 
                    hideSaveBtn={true} 
                    height={height} 
                    entity='Vessel' 
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
                                <td>Vessel Name</td>
                                <td>Plate Number</td>
                                <td>Dimension</td>
                                <td>Capacity</td>
                                <td>Owner/Operator</td>
                                <td>RURA Certificate</td>
                                <td>Contact Number</td>
                                <td>LOA</td>
                                <td>Status</td>
                            </TableHead>
                            <tbody>
                                {vesselAudits.length > 0 ? (
                                    vesselAudits.map((audit) => (
                                        <tr key={`${audit.entityId}-${audit.revision}`}>
                                            <td>{audit.revision}</td>
                                            <td>{audit.username}</td>
                                            <td>{audit.entityId}</td>
                                            <td>{new Date(audit.timestamp).toLocaleString()}</td>
                                            <td style={{ backgroundColor: 'beige' }}>{audit.revisionType}</td>
                                            <td>{audit.name}</td>
                                            <td>{audit.plateNumber}</td>
                                            <td>{audit.dimension}</td>
                                            <td>{audit.capacity}</td>
                                            <td>{audit.ownerOperator}</td>
                                            <td>{audit.ruraCertificate}</td>
                                            <td>{audit.contactNumber}</td>
                                            <td>{audit.loa}</td>
                                            <td>{audit.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14" className="text-center">No audit logs found</td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan="14" style={{ fontSize: '20px' }} className="fw-bold text-end">
                                        Total Entries: {vesselAudits.length}
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

export default VesselAudit; 