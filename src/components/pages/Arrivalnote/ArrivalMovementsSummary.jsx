import React, { useContext, useEffect } from 'react'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { SingleNumCol, SingleNumColCustomClick, SingleNumColSamPageCustomClick } from '../Dashboard/SingleNumberTop'
import { Button, Col, Row } from 'react-bootstrap'
import { Icon } from 'react-icons-kit'
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { truck } from 'react-icons-kit/icomoon/truck'
import { ic_attach_money_outline as money } from 'react-icons-kit/md/ic_attach_money_outline'
import { Link } from 'react-router-dom'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockRepository from '../../services/StockServices/StockRepository'
import CurrentDate from '../../Global/CurrentDate'
import { ArrivalPrintTableComp, ArrivalTallyRows } from './ArrivalPrintTableComp'
import { TableOpen } from '../../Global/ListTable'
import { useState } from 'react'
import { arrowLeft } from 'react-icons-kit/icomoon/arrowLeft'
import { eye } from 'react-icons-kit/icomoon/eye'
import { useNavigate } from 'react-router-dom'
import { ButtonContext } from '../../globalcomponents/ButtonContext'
import { BillDetails } from '../GenInvoice/BillDetails'
import { Splitter } from '../../globalcomponents/Splitter'
import { TitleAndList } from '../../globalcomponents/TitleAndList'
import StockCommons from '../../services/StockServices/StockCommons'
import { LongTextINputRow } from '../../Global/Forms/InputRow'
import { WindowSharp } from '@mui/icons-material'
import { useAuthHeader } from 'react-auth-kit';
import { Tabcomponent } from '../../Global/Tabcomponent'


export const ArrivalMovementsSummary = ({ purchMvt, saleMvt, tallyMvt, movementsSummary, setShowModal, startDate, endDate }) => {

    const { setIconHeight,
        setColSize,
        setColWidth,
        setColSizeTwo, setIconShow, cardHeight, weitypeLabels, chosenProcessCategory, obj, setObj, chosenProcess } = useContext(ColItemContext)

    // o----------------------
    const [tallyCargo, setTallyCargo] = useState([])
    const [purchasessmovements, setPurchasessmovements] = useState([])
    const [salesmovements, setSalesmovements] = useState([])
    const [clickedDestName, setClickedDestName] = useState('')
    const [singleArrival, setsingleArrival] = useState([])
    const authHeader = useAuthHeader()();
    const [steps, setsteps] = useState(1)
    useEffect(() => {
        setIconHeight('100px')
        setColSize(4)
        setColWidth('100%')
        setColSizeTwo(4)
        setIconShow(false)
        setIconHeight('80px')

    }, [])
    const [arrivalObj, setArrivalObj] = useState()
    const ForwardStephandler = (groupId) => {// groupId os either purchaseId, saleId or tallyRefId
        if (steps <= 1) {
            setsteps((s) => s + 1)
            let startDate = CurrentDate.todaydate(), endDate = CurrentDate.todaydate()
            StockRepository.getArrivalDetailsGrpByWeighttype(chosenProcessCategory, movementsSummary.arrivalNote, groupId, startDate, endDate, authHeader).then((res) => {
                // setsingleArrival(res.data.)
                if (clickedDestName.split(' ')[1] === "Warehouse") { //to warehouse, purchase
                    setsingleArrival(res.data.PurchaseTallies)
                    console.log('The purchase')
                } else if (clickedDestName.split(' ')[0] === 'Warehouse') {//from warehouse
                    setsingleArrival(res.data.SalesTallies)
                    console.log('The sale')
                } else {//tally, vessel-truck, transhipment
                    setsingleArrival(res.data.Tallies)
                    console.log('The tally')
                }
                setObj(res.data)
                setArrivalObj(res.data.arrival)

            })

        }
    }
    const PrevStephandler = () => {
        if (steps >= 1) {
            setsteps((s) => s - 1)
        }
    }
    const findArrivalDetails = (destName, arrivalId) => {
        setClickedDestName(destName)
        StockRepository.getarrivalByIdByDestId(destName, arrivalId, startDate, endDate, authHeader).then((res) => {
            if (destName.split(' ')[1] === "Warehouse") { //to warehouse, purchase
                setPurchasessmovements(res.data.PurchaseCargo)
                //clear all others
                setSalesmovements([])
                setTallyCargo([])
            } else if (destName.split(' ')[0] === 'Warehouse') {//from warehouse
                setSalesmovements(res.data.SalesCargo)
                //clear all others
                setPurchasessmovements([])
                setTallyCargo([])
            } else {//tally, vessel-truck, transhipment
                setTallyCargo(res.data.TallyCargo)
                setPurchasessmovements([])
                setSalesmovements([])
            }
        })
    }

    const detailIconColor = '#f17618'

    return (<>
        <Tabcomponent
            tablabel1={"Arrival Note"} tableCon1={ 
                <> {movementsSummary.arrivalNote &&
                    <>
                        <Row className="d-flex flex-row justify-items-start">
                            {steps > 1 && <Col className="col-1  ">
                                <Link onClick={PrevStephandler}>  <Icon size={'16'} style={{ padding: '0px' }} icon={arrowLeft} /> </Link>
                            </Col>}
                            <Col className="col">
                                { }
                                <TitleSmallDesc title={`Arrival Note ${movementsSummary.arrivalNote} details`} />
                            </Col>
                        </Row>
                    </>
                }
                    <Row>

                        {steps == 1 && purchMvt && purchMvt.map((p) => (
                            <SingleNumColSamPageCustomClick topRightTxt1={`${p.destinationName} `}
                                topRightTxt2={` (${p.totalDestiations})`} bottomLeftTxt1="" bottomLeftTxt2=""
                                clickEvent={() => findArrivalDetails(p.destinationName, movementsSummary.arrivalNote)} bg="c1" icon={money} />))}
                        {steps == 1 && saleMvt && saleMvt.map((s) => (
                            <SingleNumColSamPageCustomClick topRightTxt1={`${s.destinationName} `}
                                topRightTxt2={` (${s.totalDestiations})`} bottomLeftTxt1="" bottomLeftTxt2="" clickEvent={() => findArrivalDetails(s.destinationName, movementsSummary.arrivalNote)} bg="c2" icon={money} />))}
                        {steps == 1 && tallyMvt && tallyMvt.map((t) => (
                            <SingleNumColSamPageCustomClick topRightTxt1={`${t.destinationName} `}
                                topRightTxt2={` (${t.totalDestiations})`} bottomLeftTxt1="" bottomLeftTxt2="" clickEvent={() => findArrivalDetails(t.destinationName, movementsSummary.arrivalNote)} bg="c3" icon={money} />))}

                        {steps == 1 ? (<> <h6 className='my-3'>{clickedDestName}</h6> <TableOpen>
                            <thead>
                                <td>#</td>
                                <td className="text-center">entry date</td>
                                {/* <td className="text-center">Quantity Type</td> */}
                                <td className="text-center">Total Quantity</td>
                                <td className="text-center">Total Weights</td>
                                <td className="text-center">Collect Type</td>
                                <td className="text-center">Details</td>
                            </thead>
                            <tbody>
                                {tallyCargo.map((cargo, i) => (
                                    <tr >
                                        <td>{i + 1}</td>
                                        <td className="text-center">{(cargo.entry_date).split('T')[0] + ' ' + (cargo.entry_date).split('T')[1]}</td>
                                        <td className="text-center">{cargo.unit}</td>
                                        <td className="text-center">{cargo.weight} kg</td>
                                        <td className="text-center">{cargo.cargoAssorted}</td>
                                        <td>    <Link onClick={() => ForwardStephandler(cargo.id)}>  <Icon size={'16'} style={{ color: detailIconColor, padding: '0px' }} icon={eye} /> </Link></td>
                                    </tr>
                                ))}
                                {purchasessmovements.map((cargo, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td className="text-center">{(cargo.date_time).split('T')[0] + ' ' + (cargo.date_time).split('T')[1]}</td>
                                        {/* <td className="text-center">{weitypeLabels(cargo.weighttype)} </td> */}
                                        <td className="text-center">{cargo.purchased_qty}</td>
                                        <td className="text-center">{cargo.weight} kg</td>
                                        <td> <Link onClick={() => ForwardStephandler(cargo.id)}>  <Icon size={'16'} style={{ color: detailIconColor, padding: '0px' }} icon={eye} /> </Link></td>
                                    </tr>
                                ))}
                                {salesmovements.map((cargo, i) => (
                                    <tr >

                                        <td>{i + 1}</td>
                                        <td className="text-center">{(cargo.date_time).split('T')[0] + ' ' + (cargo.date_time).split('T')[1]}</td>
                                        {/* <td className="text-center">{weitypeLabels(cargo.weighttype)}</td> */}
                                        <td className="text-center">{cargo.sold_qty}</td>
                                        <td className="text-center">{cargo.weight} kg</td>
                                        <td>
                                            <Link onClick={() => ForwardStephandler(cargo.id)}>  <Icon size={'16'} style={{ color: detailIconColor, padding: '0px' }} icon={eye} /> </Link>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </TableOpen> </>
                        ) : (
                            <StepTwoContent clickedDestName={clickedDestName} arrivalNoteid={movementsSummary.arrivalNote} arrivalObj={arrivalObj}
                                singleArrival={singleArrival} setShowModal={setShowModal} startDate={startDate} endDate={endDate} />
                        )}
                    </Row>
                </>
            } tabLabel2={"Cargo Details"} tabCont2={"sd"}

        />

    </>
    )
}
export const StepTwoContent = ({ clickedDestName, arrivalNoteid, singleArrival, arrivalObj, setShowModal, startDate, endDate }) => {
    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    let totalWeight = 0;
    let totalDisp = 0; //this is to be displayed but not used to save a record
    let totalCost = 0.0, totalQty = 0, fee = 0.0
    const authHeader = useAuthHeader()();
    const [total_Cost, setTotalCost] = useState(0.0)
    const [total_Qty, setTotal_Qty] = useState(0)
    const [total_Weight, setTotal_Weight] = useState(0)


    const [id, setId] = useState()
    const [date_time, setDate_time] = useState()
    const [ref_id, setRef_id] = useState()
    const [description, setDescription] = useState()
    const { obj, setObj, setChosenProcess, arrivalInvModal } = useContext(ColItemContext)
    const { setChargeCriteria, serviceName, setServiceName, showModal } = useContext(ButtonContext)



    const navigate = useNavigate()
    const printArrival = () => {
        setChosenProcess(clickedDestName)

        setObj((prevObj) => ({
            ...prevObj,
            ...{ "singleArrival": singleArrival },
            ...{ "arrivalObj": arrivalObj }
        }));

        navigate("/arrivalPrint")
        console.log((obj))
    }

    useEffect(() => {
        if (obj.arrival) { }
    }), [obj]
    const DoZero = (item) => {
        return item ? item : "0"
    }
    /* #region -------------------------BILL DETAILS */
    const [tallies, setTallies] = useState([]) //Data list if tallies got after clicking the arrival for tariff
    const [payment, setPayment] = useState({ service: '', amount: '', fee: '', chosenProcessCategory: '' })
    const [tallyItems, setTallyItems] = useState([])
    const [invoiceToBePrinted, setInvoiceToBePrinted] = useState(false)
    const [total_weight, setTotal_weight] = useState()
    const [total_amount, setTotal_amount] = useState()
    const { arrival_id, setArrival_id } = useContext(ColItemContext)
    const [destIName, setDestName] = useState()
    const [source_id, setSource_id] = useState(0)
    const [dest_id, setDest_id] = useState(0)
    const [destCat, setDestCat] = useState()

    const [arrivalSelection, setArrivalSelection] = useState(false)
    const ArrivalDetails = (destIName, source_id, dest_id, destCat, arrivalId) => {
        setDestName(destIName)
        setSource_id(DoZero(source_id))
        setDest_id(DoZero(dest_id))
        setDestCat(destCat)
        setArrival_id(arrivalId)
        setArrivalSelection(!arrivalSelection)
    }
    useEffect(() => {
        if (arrival_id) {

            StockRepository.truckarrivalInvoice(clickedDestName, obj.arrival.source_id, obj.arrival.dest_id,
                clickedDestName.split(' ')[0], obj.arrival.id, authHeader, startDate, endDate).then((res) => {
                    if (res.data.Tallies.length > 0) {
                        setTallies(res.data.Tallies)
                    } else if (res.data.PurchaseTallies.length > 0) {
                        setTallies(res.data.PurchaseTallies)
                    } else if (res.data.SalesTallies.length > 0) {
                        setTallies(res.data.SalesTallies)
                    }
                    // setArrivalObj(res.data.arrival)
                    setChargeCriteria(res.data.ChargeCriteria)
                    setPayment(res.data.Payment)
                    setTallyItems(res.data.Payment.res)
                    setServiceName(res.data.Payment.service)
                    setObj(res.data)
                    setInvoiceToBePrinted(false)

                    // if (invoiceToBePrinted) {
                    //     navigate("/printInvoice")
                    // }
                })
        }
    }, [arrival_id, invoiceToBePrinted])
    /* #endregion */

    const [showBillingDetails, setShowBillingDetails] = useState(false)
    const calculatecosts = () => {
        setShowBillingDetails(true)
        setDestName(destIName)
        setObj((prevObj) => ({
            ...prevObj, ...{ "singleArrival": singleArrival }, ...{ "arrivalObj": arrivalObj }
        }));


        setSource_id(DoZero(obj.arrival.source_id))
        setDest_id(DoZero(obj.arrival.dest_id))
        setDestCat(clickedDestName.split(' ')[0])
        setArrival_id(obj.arrival.id)


        setTotalCost(totalCost)
        setTotal_Qty(totalQty)
        setTotal_Weight(totalWeight)
        // setArrivalSelection(!arrivalSelection)
    }

    const getAllGen_invoices = (page, size) => {
        StockRepository.findGen_invoice(page, size, authHeader).then((res) => {
            // setGen_invoices(res.data);
            // setDataLoad(true)

        });
    }
    const resetAfterSave = () => {
        alert('Invoice saved successfully')
        getAllGen_invoices(0, 20)
        // setShowLoader(false)
        // setShowAlert(true)
        // setHeight(0)
        setId(null)
        setDate_time(0)

        setRef_id(0)


    }
    var gen_invoice = {
        id: id, date_time: getFormattedDate(date_time), amount: total_Cost, ref_id: ref_id, total_weight: total_Weight, total_amount: total_Cost, description: description
    }
    const saveInvoice = () => {
        if (total_Cost === 0 || total_Weight === 0 || !description) {
            alert('You have To calculate the cost, add description')
        } else {
            StockCommons.saveGen_invoice(gen_invoice, arrival_id, authHeader).then((res) => {
                console.log(res.data)
                if (res.data != null) {
                    resetAfterSave()
                }
                setShowModal(false)
            }).catch((error) => {
                alert('Error Occured')
                console.log('-----------')
                console.log(error)
            })
        }
    }
    let collectType = '', OnlySumOfWeight = 0
    return (
        <Row>
            <Col md={12} className={arrivalInvModal ? 'border p-2' : ''}>
                <TableOpen>
                    <ArrivalPrintTableComp />
                    {singleArrival.map((arrival, index) => {
                        totalWeight += ('Not Assorted' === arrival.cargoAssorted) ? (arrival.weight * arrival.unit)
                            : arrival.weight
                        OnlySumOfWeight += arrival.weight
                        totalQty += arrival.unit
                        totalDisp = totalWeight
                        collectType = arrival.cargoAssorted
                        totalCost += collectType == 'Assorted' ? arrival.weight * arrival.unitPrice : arrival.weight * arrival.unit * arrival.unitPrice

                        fee = arrival.unitPrice
                        return (<>
                            <ArrivalTallyRows tly={arrival} index={index} collectType={collectType} />
                        </>
                        )
                    })}
                    <tr>  <td colSpan="4" style={{ fontSize: '20px' }} className="  fw-bold text-end"> Total: {(collectType == 'Not Assorted' ? totalWeight : OnlySumOfWeight).toLocaleString()} Kg</td>       </tr>

                    <tr className="d-none">
                        <td colSpan={4} style={{ fontSize: '15px' }} className="fw-bold">
                            The Total Cost: {totalWeight.toLocaleString()}
                        </td>
                    </tr>
                    <tr className="">
                        <td colSpan={3} style={{ fontSize: '15px' }}  >
                            <ul>
                                <li><b>Quantity: </b>{(totalQty).toLocaleString()} </li>
                                <li><b>Weight: </b>{(totalWeight).toLocaleString()} </li>
                                <li><b>Fee: </b>{fee} </li>
                                <li><b>collection Type: </b>{collectType} </li>
                            </ul>

                        </td>
                    </tr>

                </TableOpen>
                <Row className="d-flex justify-content-end">
                    <Col className="col-12 d-flex justify-content-end">
                        {arrivalInvModal === 'arrival' ?
                            (<Button onClick={printArrival} className="bg-dark" >Print</Button>)
                            :
                            (<Button onClick={calculatecosts} className="bg-dark" >Calculate Cost</Button>)}
                    </Col>

                </Row>

            </Col>
            <Splitter />
            <Row className={`d-flex justify-content-center ${arrivalInvModal === 'invoice' ? 'border ms-1 p-2' : ''}`}>
                <Col md={11}>
                    <Row>   {showBillingDetails &&
                        <BillDetails serviceName={serviceName}
                            tallyItems={(totalCost).toLocaleString()} ata={arrivalObj?.date_time} invDate={arrivalObj?.date_time} movement={payment.service}
                            arrivalNo={arrivalObj?.id} arrivalDate={arrivalObj?.date_time} arrivalName={arrivalObj?.name} tinNumber={arrivalObj?.tin_number} telephone={arrivalObj?.telephone}
                            tallies={tallies} totalWeight={totalWeight} total_amount={total_amount} />
                    }
                    </Row>
                </Col>
                {arrivalInvModal === 'invoice' && <>
                    <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />
                    <Col md={11} className='d-flex justify-content-end mb-5'>
                        <Button onClick={saveInvoice} className="bg-success btn-block" >Save</Button>
                    </Col> </>
                }
            </Row>
        </Row>
    )
}
