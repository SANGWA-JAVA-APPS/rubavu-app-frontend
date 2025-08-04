import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import PagesWapper from '../../Global/PagesWapper'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import { useAuthHeader } from 'react-auth-kit'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export const TruckReceiptPrint = () => {
    const { obj } = useContext(ColItemContext)
    const navigate = useNavigate()
    const authHeader = useAuthHeader()();
    useEffect(() => {
        if (!obj || !obj?.payment_amount) {
            navigate('/truckpaymentform')
        }
    }, [obj])
    const componentRef = useRef();
    return (
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Print a Truck Parking Receipt  }`}
                rightSideAddress="RUBAVU PORT"
                contentTitle={`  Parking Receipt   `} >
                <SmallSplitter />

                <Col md={12} style={{ fontSize: '12px' }}>
                    <Row>
                        <Col md={6} className="col-6 ">
                            <Row>
                                <h5>Receipt</h5>
                                <PrintRow txt="Receipt ID" txtValue={obj?.id} />
                                <PrintRow txt="Payment amount" txtValue={obj?.payment_amount && (obj?.payment_amount).toLocaleString()} />
                                <PrintRow txt="Date time" txtValue={obj?.date_time} />
                                
                                <PrintRow txt="Description" txtValue={obj?.description} />
                            </Row>
                        </Col>
                        <Col md={6} className="col-6 border-start">
                            <Row>
                            <h5>Invoice</h5>
                                {/* Nested mdl_truck_parking_invoice fields */}
                                <PrintRow txt="Invoice ID" txtValue={obj?.id} />
                                <PrintRow txt="Licence plate number" txtValue={obj?.licence_plate_number} />
                                <PrintRow txt="Entry time" txtValue={obj?.entryTime} />
                                <PrintRow txt="Get out time" txtValue={obj?.get_out_time} />
                                <PrintRow txt="Amount" txtValue={obj?.amount} />
                                <PrintRow txt="Total days" txtValue={obj?.totalDays} />
                                <PrintRow txt="Total hours" txtValue={obj?.totalHours+' hour(s)'}/>
                                <PrintRow txt="Total minutes" txtValue={obj?.totalMin} />
                                <PrintRow txt="Fee" txtValue={obj?.fee && 'RWF '+ (obj?.fee).toLocaleString()} />
                                
                            </Row>
                        </Col>



                    </Row>
                </Col>

                <Splitter />
                <PrintSignature />
            </Printtemplate>
        </PagesWapper>

    )
}
