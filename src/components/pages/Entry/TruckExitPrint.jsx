import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import PagesWapper from '../../Global/PagesWapper'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import { useAuthHeader } from 'react-auth-kit'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export const TruckExitPrint = () => {
  const { obj } = useContext(ColItemContext)
  const navigate = useNavigate()
  const authHeader = useAuthHeader()();
  useEffect(() => {
    if (!obj || !obj.amount) {
      navigate('/truckexitform')
    }
  }, [obj])
  const componentRef = useRef();
  return (
    <PagesWapper>
      <Printtemplate
        ref={componentRef}
        leftAddress="MAGERWA"
        title={`Print a Truck Exit note - ${obj.name}`}
        rightSideAddress="RUBAVU PORT"
        contentTitle={` Truck Exit Note   `} >
        <SmallSplitter />

        <Col md={12} style={{ fontSize: '12px' }}>
          <Row>
            <h5>Exit Information</h5>
            <Col md={6} className="col-6 border-start">
              <Row>
                <PrintRow txt="ID" txtValue={obj?.id} />
                <PrintRow txt="Get Out Time" txtValue={obj?.get_out_time} />
              </Row>
            </Col>
            <Col md={6} className="col-6 border-start">
              <Row>
              <h5>Invoice Information</h5>
                <PrintRow txt="Amount" txtValue={obj?.amount && (obj?.amount).toLocaleString()} />
                <PrintRow txt="Licence Plate Number" txtValue={obj?.licence_plate_number} />
                <PrintRow txt="Invoice Date" txtValue={obj?.invget_out_time} />
                <PrintRow txt="Total Time" txtValue={obj?.totalDays + ' day(s) '+ obj?.totalHours+'h:'+obj?.totalMin+'min' } />
                
                <PrintRow txt="Fee" txtValue={obj?.fee && (obj?.fee).toLocaleString()} />
                <PrintRow txt="Entry Time" txtValue={obj?.entryTime} />
              </Row>
            </Col>
            <Col md={6} className="col-6 border-start">
              <Row>
              <h5>Payment Information</h5>
                <PrintRow txt="Payment Amount" txtValue={obj?.payment_amount && (obj?.payment_amount).toLocaleString()} />
                <PrintRow txt="Date Time" txtValue={obj?.date_time} />
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
