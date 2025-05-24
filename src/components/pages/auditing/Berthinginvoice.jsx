import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import StockRepository from '../../services/StockServices/StockRepository'
import { useAuthHeader } from 'react-auth-kit';
import { Col, Row } from 'react-bootstrap';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';
import { Splitter } from '../../globalcomponents/Splitter';
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc';
import PrintCompanyInfo from '../../Global/PrintCompanyInfo';
import { useReactToPrint } from 'react-to-print';
import ContainerRow from '../../Global/ContainerRow';
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar';
import SearchBox from '../../Global/SearchBox';
import CurrentDate from '../../Global/CurrentDate';
import PagesWapper from '../../Global/PagesWapper';

function Berthinginvoice() {
    const authHeader = useAuthHeader()();
    const [berthInvoices, setBerthInvoices] = useState([])
    const [userType, setUserType] = useState()
    const [height, setHeight] = useState(0);
    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [searchHeight, setSearchHeight] = useState(0);

    const [date1, setDate1] = useState(CurrentDate.todaydate())
    const [date2, setDate2] = useState(CurrentDate.todaydate())



    const [refresh, setRefresh] = useState(false);
    let totaInvoices = 0
    useEffect(() => {

        StockRepository.findAuditingBerthingInvoice("admin", authHeader).then((res) => {
            setBerthInvoices(res.data)

        }).catch((err) => {
            console.log(err)
        })

    })
    useEffect(() => {
        berthInvoices.map((berth) => {
            totaInvoices += 1
        })
    }, [berthInvoices])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'auditing-invoices-data'
    });

    const getCommonSearchByDate = (startDate, endDate) => {
        setDate1(startDate)
        setDate2(endDate)
        setRefresh(!refresh)
    }

    return (
        <PagesWapper>
            <Splitter />
            <ContainerRow>
                <TitleSmallDesc title="Berthing Invoice Audit Logs" />
                <ListToolBar hideSaveBtn={true} height={height} entity='Invoice' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
                <SearchformAnimation searchHeight={searchHeight}>
                    <SearchBox options={[
                        { name: "amza", value: "amza", label: "Amza" },
                        { name: "Paul", value: "Paul", label: "Paul" },
                        { name: "Heritier", value: "Heritier", label: "Heritier" },
                        { name: "HUbert", value: "HUbert", label: "HUbert" },

                    ]} getCommonSearchByDate={getCommonSearchByDate} />
                </SearchformAnimation>
                <div ref={componentRef} className="dataTableBox">
                    <Col md={10}>

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
                                {berthInvoices.map((berth) => (
                                    <tr key={`${berth.entityId}-${berth.revision}`}>
                                        <td>{berth.revision}</td>
                                        <td>{berth.username}</td>
                                        <td>{berth.entityId}</td>
                                        <td>{new Date(berth.timestamp).toLocaleString()}</td>
                                        <td style={{ backgroundColor: 'beige' }}>{berth.revisionType}</td>
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
                                                {/* Add admin-specific options here, e.g., a button or link */}
                                                <button>View Details</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="5" style={{ fontSize: '20px' }} className="fw-bold text-end"> Total Entries: Rwf {(totaInvoices).toLocaleString()}    </td>
                                </tr>
                            </tbody>
                        </TableOpen>

                    </Col>
                </div>
            </ContainerRow>
        </PagesWapper >
    )
}

export default Berthinginvoice