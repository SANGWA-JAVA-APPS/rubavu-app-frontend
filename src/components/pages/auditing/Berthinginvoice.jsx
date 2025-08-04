import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import StockRepository from '../../services/StockServices/StockRepository'
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

function Berthinginvoice() {
    const authHeader = useAuthHeader()();
    const [berthInvoices, setBerthInvoices] = useState([]);
    const [userType, setUserType] = useState();
    const [height, setHeight] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [searchHeight, setSearchHeight] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [username, setUsername] = useState('');
    const componentRef = useRef();

    const fetchBerthInvoices = async (filters = {}) => {
        try {
            const { startDate, endDate, username } = filters;
            let url = 'http://localhost:8101/codeguru/api/auditing/berthing-invoices';
            const params = new URLSearchParams();
            
            if (username) params.append('username', username);
            if (startDate) {
                const formattedStartDate = new Date(startDate).toISOString();
                params.append('startDate', formattedStartDate);
            }
            if (endDate) {
                const formattedEndDate = new Date(endDate).toISOString();
                params.append('endDate', formattedEndDate);
            }
            
            const queryString = params.toString();
            if (queryString) url += `?${queryString}`;

            const response = await StockRepository.findAuditingBerthingInvoice(username || "admin", authHeader);
            setBerthInvoices(response.data);
        } catch (error) {
            console.error('Error fetching berthing invoices:', error);
        }
    };

    useEffect(() => {
        fetchBerthInvoices();
    }, [authHeader]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'auditing-invoices-data'
    });

    const handleFilter = () => {
        fetchBerthInvoices({ startDate, endDate, username });
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setUsername('');
        fetchBerthInvoices();
    };

    return (
        <PagesWapper>
            <Splitter />
            <ContainerRow>
                <TitleSmallDesc title="Berthing Invoice Audit Logs" />
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
                                {userType === 'admin' && <td className="delButton d-none">Option</td>}
                            </TableHead>
                            <tbody>
                                {berthInvoices.length > 0 ? (
                                    berthInvoices.map((berth) => (
                                    <tr key={`${berth.entityId}-${berth.revision}`}>
                                        <td>{berth.revision}</td>
                                        <td>{berth.username}</td>
                                        <td>{berth.entityId}</td>
                                        <td>{new Date(berth.timestamp).toLocaleString()}</td>
                                        <td style={{ backgroundColor: 'beige' }}>{'ADD'==berth.revisionType ?'INSERT':berth.revisionType}</td>
                                        <td>{berth.dateTime}</td>
                                        <td>{berth.amount}</td>
                                        <td>{berth.refId}</td>
                                        <td>{berth.totalWeight !== null ? berth.totalWeight : '-'}</td>
                                        <td>{berth.totalAmount !== null ? berth.totalAmount : '-'}</td>
                                        <td>{berth.description !== null ? berth.description : '-'}</td>
                                        <td>{berth.type !== null ? berth.type : '-'}</td>
                                        <td>{berth.storagePeriod !== null ? berth.storagePeriod : '-'}</td>
                                        {userType === 'admin' && (
                                            <td className="delButton d-none">
                                                <button>View Details</button>
                                            </td>
                                        )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14" className="text-center">No audit logs found</td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan="14" style={{ fontSize: '20px' }} className="fw-bold text-end">
                                        Total Entries: {berthInvoices.length}
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

export default Berthinginvoice;