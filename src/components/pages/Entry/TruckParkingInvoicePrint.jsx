import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import PagesWapper from '../../Global/PagesWapper'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import { useAuthHeader } from 'react-auth-kit'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export const TruckParkingInvoicePrint = () => {
    const { obj } = useContext(ColItemContext)
    const navigate = useNavigate()
    const authHeader = useAuthHeader()();
    useEffect(() => {
        if (!obj || !obj?.plate_number) {
            // navigate('/entryform')
        }
    }, [obj])
    const componentRef = useRef();
    return (    
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Print a Truck Parking invoice - ${obj.name}`}
                rightSideAddress="RUBAVU PORT"
                contentTitle={` Parking Invoice   `} >
                <SmallSplitter />

                <Col md={12} style={{ fontSize: '12px' }}>
                    <Row className='d-flex justify-content-between'>
                        <Col md={5} className="col-6">
                            <Row>
                                <h5>Invoice</h5>
                                <PrintRow txt="Invoice ID" txtValue={obj?.id} />
                                <PrintRow txt="Cargo Owner" 
                                txtValue={obj?.cargo_owner} />
                                <PrintRow txt="Licence plate number" txtValue={obj?.licence_plate_number} />
                                <PrintRow txt="Entry time" txtValue={obj?.entryTime} />
                                <PrintRow txt="Get out time" txtValue={obj?.get_out_time} />
                                <PrintRow txt="Amount" txtValue={'RWF ' + obj?.amount && (obj?.amount)} />
                                <PrintRow txt="Total days" txtValue={obj?.totalDays} />
                                <PrintRow txt="Total hours" txtValue={obj?.totalHours + ':'+ obj?.totalMin+':00' } />
                            </Row>
                        </Col>

                        <Col md={5} className="col-6">
                            <Row>
                                <h5>Truck</h5>
                                {/* Nested mdl_truck fields */}
                                 
                                <PrintRow txt="Truck Plate number"  txtValue={obj?.licence_plate_number} />
                                <PrintRow txt="Driver"           txtValue={obj?.driverName} />
                                <PrintRow txt="Truck Status"        txtValue={obj?.status} />
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
