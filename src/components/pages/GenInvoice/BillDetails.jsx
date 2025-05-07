import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { InputReadOnly } from '../../Global/Forms/InputRow'
import { InvoiceHeader, InvoiceRows } from './InvoiceRows'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockRepository from '../../services/StockServices/StockRepository'

export const BillDetails = ({ serviceName, tallyItems, handle,
    ata, invDate, movement, chargeCriteria,
    arrivalNo, arrivalDate, arrivalName, tinNumber, telephone,
    tallies, totalWeight, total_amount }) => {


    return (
        <>
            <Col className='col-6'>
                <TitleSmallDesc title="CHARGES DETAILS" />
                {/* <span className='text-danger'>weight type</span> */}

                <InputReadOnly name={`${serviceName + ' Amount'} `} val={tallyItems} handle={handle} label='lblref_id' />
                <InputReadOnly name='**ATA' val={ata} handle={handle} label='lblref_id' />
                <InputReadOnly name='**Inv. date' val={invDate} handle={handle} label='lblref_id' />
                <InputReadOnly name='Movement' val={movement} handle={handle} label='lblref_id' />
                <InputReadOnly name='Charge Criteria' val={chargeCriteria} handle={handle} label='lblref_id' />

            </Col>
            <Col className='col-6'>
                <TitleSmallDesc title="CLIENT DETAILS" />
                <InputReadOnly name='Arrival No. ' val={arrivalNo} handle={handle} label='lblref_id' />
                <InputReadOnly name='Arrival Date ' val={arrivalDate} handle={handle} label='lblref_id' />
                <h5 style={{ fontWeight: ' bold' }} className="ms-3 mt-4 fw-bold text-underline"><u>
                    <b>CLIENT DETAILS</b></u></h5>
                <InputReadOnly name='Client Name' val={arrivalName} handle={handle} label='lblref_id' />
                <InputReadOnly name='Client TIN' val={tinNumber} handle={handle} label='lblref_id' />
                <InputReadOnly name='Client Telephone' val={telephone} handle={handle} label='lblref_id' />

            </Col>
            <Col md={12} className="mt-2">
            <TitleSmallDesc title="BILL DETAILS" />
            </Col>

            <table className="table d-none">
                <InvoiceHeader />
                {tallies.map((tally, index) => {
                    totalWeight += tally.weight * tally.unitPrice
                    return (
                    <InvoiceRows tally={tally} index={index} serviceName={serviceName} />

                    )
                })

                }</table>
            <Row className="mt-2  py-3 d-none" style={{ borderTop: '1px solid  #ffae00' }}>
                <Col md={5} className="offset-md-4">
                    <h4>Total Amount:   {total_amount}   </h4>
                </Col>
            </Row>
        </>
    )
}
