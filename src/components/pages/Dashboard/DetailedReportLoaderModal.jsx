import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import Reporting from '../../services/StockServices/Reporting'
import { useAuthHeader } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { DateRangeContext } from '../../globalcomponents/ButtonContext'
import { useEffect } from 'react'
import BerthingRevenue, { AllRevenue, CargoRevenue, TrucksRevenue } from './DetailedReport'
import { useReactToPrint } from 'react-to-print'

export const DetailedReportLoaderModal = (props) => {
    const { modalSize } = useContext(ColItemContext)

    const { setPurchaseMenu, setSaleMenu, setRecPurchase, showModal, setShowModal, modalTitle, setupBycolor,
        setDataTodisplayInModal, dataTodisplayInModal, setReportType } = useContext(ColItemContext)

    const [allTallies, setAllTallies] = useState({})
    const [berthingReport, setBerthingReport] = useState([])
    const [truckReport, setTruckReport] = useState([])
    const [cargoAmountReport, setCargoAmountReport] = useState([])
    const [vessels, setVessels] = useState([]) //Data List
    const [dataLoad, setDataLoad] = useState(false)
    const [paneReportDataLoad, setPaneReportDataLoad] = useState(false)

    const navigate = useNavigate();
    const authHeader = useAuthHeader()();
    const [berthReportGrpByhour, setBerthReportGrpByhour] = useState([])
    const [berthReportGrpByMonth, setBerthReportGrpByMonth] = useState([])

    // this are the states to capture all tallyin tallyou and tally
    const [tally, setTally] = useState([])
    const [tallyIn, setTallyIn] = useState([])
    const [tallyOut, setTallyOut] = useState([])
    const { startDate, endDate } = useContext(DateRangeContext)
    const [truckAmount, setTruckAmount] = useState(0)
    const [allTruckEntries, setallTruckEntries] = useState(0)
    const [allBerthings, setAllBerthings] = useState(0)
    const [allunberthedVessels, setAllunberthedVessels] = useState(0)
    const [alloutgoingTrucks, setAlloutgoingTrucks] = useState(0)
    const [allTrucksAtTheport, setallTrucksAtTheport] = useState([])

    const [totIncomingWoodedboats, setTotIncomingWoodedboats] = useState(0)
    const [totOutgoingWoodedboats, setTotOutgoingWoodedboats] = useState(0)
    const [totBerthedWoodedboats, setTotBerthedWoodedboats] = useState(0)

    let allAvailableAtPort = 0
    const loadAllData = () => {
        setPaneReportDataLoad(true); // Set loading state to true

        Reporting.revenueReport(startDate, endDate, authHeader).then((res) => {
            setBerthingReport(res.data.berthReport)
            //    setBerthingList(res.data.berthingList)
            setTruckReport(res.data.truckReport)
            setCargoAmountReport(res.data.cargoAmount)
            setallTruckEntries(res.data.allEnteredTrucks)//only a number
            setAllBerthings(res.data.totBerthings)
            setAllunberthedVessels(res.data.totUnberthedVessels)//only a number
            setAlloutgoingTrucks(res.data.totOutgoingTrucks)//only a number
            setallTrucksAtTheport(res.data.allTrucksAtTheport)//List of trucks at the port
            
            setTotIncomingWoodedboats(res.data.totIncomingWoodedboats)//only a number
            setTotOutgoingWoodedboats(res.data.totOutgoingWoodedboats)//only a number
            setTotBerthedWoodedboats(res.data.totBerthedWoodedboats)//only a number
            setPaneReportDataLoad(false)
        })
        Reporting.vesselTruckWeightReport(startDate, endDate, authHeader).then((res) => {
            setTruckReport(res.data.BerthedVessels)
        })
        Reporting.allCargoReport(startDate, endDate, authHeader).then((res) => {
            setTally(res.data.tally)
            setTallyIn(res.data.tallyIn)
            setTallyOut(res.data.tallyOut)

            setAllTallies({
                tally: res.data.tally,
                tallyIn: res.data.tallyIn,
                tallyOut: res.data.tallyOut,
            });
        })
    }

    useEffect(() => {

        loadAllData()
    }, [startDate, endDate])


    /* #region ---------ToolBar ----------------------- */
    const [searchHeight, setSearchHeight] = useState(0);
    const [height, setHeight] = useState(0);
    const { setStartDate, setendDate } = useContext(DateRangeContext)
    const getCommonSearchByDate = (date1, date2) => {
        setStartDate(date1)
        setendDate(date2)

    }
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data'
    });
    /* #endregion */

    useEffect(() => {
        loadAllData()
    }, [startDate])
    useEffect(() => {
        loadAllData()
    }, [endDate])
    let totalBerthing = 0.0
    let totBerthingNumber = 0.0

    let totalTruck = 0.0
    let totalTruckNumber = 0.0

    let totcargo = 0.0;
    let toCargotAmount = 0.0;
    let toCargotNumber = 0.0;
    let berthingCount = 0
    return (
        <>
            {berthingReport.map((inv) => {
                totalBerthing += inv.quayAmount + inv.handlingCharges
                berthingCount += 1
            })}
            {truckReport.map((truck) => {
                totalTruck += Number(truck.amount)
                totalTruckNumber += 1
            })}
            {cargoAmountReport.map((ca) => { //cargoAmount: ca
                totcargo += ca.total_weight
                toCargotAmount += ca.amount;
                toCargotNumber += ca.id
            })}

            <Modal fullscreen={props.fullscreen ? true : false} dialogClassName={`modal-90w h-75 ${modalSize}  mw-100 mh-100`}
                show={props.show} size="lg" {...props} onHide={props.onHide} centered={props.centered}
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton className=' modalStyle'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example modalStyle styledVHScrollBar" style={{ backgroundColor: '#ccc', overflowX: 'scroll' }}>
                    <Container style={{ height: '100%', width: '100%' }} className='styledVHScrollBar'>
                        <Row>
                            <Col md={12}>
                                {paneReportDataLoad &&
                                    <Row className="d-flex justify-content-center">
                                        <Col className='loader' md={3}>Loading ...</Col>
                                    </Row>
                                }
                            </Col>
                            <Col md={12}>

                                {(!paneReportDataLoad) && <>
                                    {'Trucks' === modalTitle ?
                                        <TrucksRevenue truckReport={truckReport} />
                                        : ('Cargo' === modalTitle ? <CargoRevenue cargoAmountReport={allTallies} />
                                            : ('Vessels' === modalTitle ? <BerthingRevenue invoiceReport={berthingReport} />
                                                : <AllRevenue berthingAmount={totalBerthing} trucksamount={totalTruck}
                                                 cargoAmount={toCargotAmount}
                                                    grandTotal={totalBerthing + totalTruck + toCargotAmount} />
                                            )
                                        )
                                    }

                                </>}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className='modalStyle'>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    )


}
