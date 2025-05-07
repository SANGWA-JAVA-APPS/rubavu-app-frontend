import React, { useContext, useEffect, useRef } from 'react'
import { TitleDesscNormal, TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { TitleAndList } from '../../globalcomponents/TitleAndList'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { TableOpen } from '../../Global/ListTable'
import { Splitter } from '../../globalcomponents/Splitter'
import PagesWapper from '../../Global/PagesWapper'
import { ArrivalPrintTableComp } from './ArrivalPrintTableComp'
import { PrintRow } from '../../Global/Utils'

export const ArrivalDetailsToPrint = () => {
    const { obj, weitypeLabels, chosenProcess } = useContext(ColItemContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!obj || !obj.arrival) {
            navigate('/startproc')
        }
    }, [obj.arrival])
    const componentRef = useRef();
    let totWeight = 0


    return (
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Printing Arrival note  `}
                rightSideAddress="RUBAVU PORT"
                contentTitle={` ARRIVAL NOTE No. ${obj.arrival?.id}  `} diffTitleSize={true}>

                <h6 className=" text-underline"><u><b>{chosenProcess}
                </b></u></h6>
                <Row>
                    <Col md={6} className="col-6">
                        <Row>
                            <PrintRow txt="Arrival Date:" txtValue={obj?.arrival?.date_time} />
                            <PrintRow txt="DDCOM:" txtValue={obj?.arrival?.ddcom} />
                            <PrintRow txt="Exporter:" txtValue={obj?.arrival?.exporter} />
                            <PrintRow txt="Clearing Agent:" txtValue={obj?.arrival?.clearingAgent} />
                        </Row>
                    </Col>
                    <Col md={6} className="col-6">
                        <Row>
                            <Col md={6} className="mt-2 col-6 border-bottom ">Client Name </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {obj.arrival?.name} </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom ">Client Telephone </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {obj.arrival?.telephone} </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> Date time </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {obj.arrival?.date_time} </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom ">Client TIN </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {obj.arrival?.tin_number} </Col>
                        </Row>
                    </Col>
                </Row>
                <Col md={12} style={{ fontSize: '14px' }}>
                    <Row>
                        <Col md={2} className="mt-2 ps-5 col-2 border-bottom ">Description</Col>
                        <Col md={6} className="mt-2 ps-5 col-6 border-bottom text-left">{obj?.arrival?.description}</Col>
                    </Row>
                    <h5 className="mt-5 text-underline"><u>CARGO</u></h5>
                    <TableOpen>
                        <ArrivalPrintTableComp />
                        {obj.singleArrival && obj.singleArrival.map((tly, index) => {// THIS IS THE STOCK IN  - OR TALLY IN
                            // totWeight += tly.weight
                            totWeight += tly.cargoAssorted === 'Assorted' ? (tly.weight  )  : (tly.weight * tly.unit)
                            return (
                                <tr key={index}>
                                    <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{index + 1}.</td>
                                    <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.cargo}</td>
                                    <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{tly.unit}</td>
                                    <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>       {weitypeLabels(tly.weighttype)}</td>
                                    <td className="mt-2 border-bottom text-center" style={{ textTransform: 'capitalize' }}>{ totWeight} Kg</td>
                                    <td className="mt-2 border-bottom " style={{ textTransform: 'capitalize' }}>{tly.description} </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="5" style={{ fontSize: '20px' }} className="  fw-bold text-end"> Total: {(totWeight).toLocaleString()} Kg</td>
                        </tr>
                    </TableOpen>

                </Col>
                <Splitter />
                <Col md={5} className="mt-2 col-6 border offset-md-1  ">
                    {obj.truck && <h5 className="mt-5 text-underline"><u><b>TRUCK INFORMATION</b></u></h5>}
                    {obj.truck && obj.truck.map((truck) => (
                        <Row>
                            <Col md={6} className="mt-2 col-6 border-bottom "> Truck_type </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {truck?.truck_type} </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> Plate number </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {truck?.plate_number} </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> Driver Name </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {truck?.driver_name} </Col>
                        </Row>
                    ))}
                </Col>
                <Col md={5} className="mt-2 col-6 border  ">
                    {obj.vessel && <h5 className="mt-5 text-underline"><u><b>VESSEL INFORMATION</b></u></h5>}
                    {obj.vessel && obj.vessel.map((vessel) => (
                        <Row>
                            <Col md={6} className="mt-2 col-6 border-bottom "> Name </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {vessel?.name} </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> Plate number </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {vessel?.plate_number} </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> Owner operator </Col>
                            <Col md={6} className="mt-2 col-6 border-bottom "> {vessel?.owner_operator} </Col>
                        </Row>
                    ))}
                </Col>

                <Splitter />
                <Splitter />
                <Col md={12} style={{ fontSize: '20px' }}>
                    <h5 className="  text-underline text-uppercase">Communication to the Client</h5>
                    <p style={{ fontSize: '12px' }}>Dear Client, we are pleased to inform you that your goods have arrived at the port of Rubavu. Please come and collect them. </p>
                </Col>
                <Splitter />
                <Splitter />
                <Col md={11} style={{ marginBottom: '40px' }}>
                    <Row style={{ position: 'absolute', width: '90%', bottom: '0' }}>
                        <table>
                            <thead style={{ backgroundColor: '#f5f5f5' }}>
                                <td className="border border-dark">Tally</td> <td className="border border-dark">Warehouse Supervisor</td> <td className="border border-dark">Customs</td> <td className="border border-dark">Client</td>
                            </thead>
                            <tbody>
                                <tr style={{ height: '100px' }}>
                                    <td className="border border-dark"> </td> <td className="border border-dark"> </td> <td className="border border-dark"> </td> <td className="border border-dark"> </td>
                                </tr>
                            </tbody>
                        </table>
                    </Row>
                </Col>
            </Printtemplate>
        </PagesWapper>
    )
}
