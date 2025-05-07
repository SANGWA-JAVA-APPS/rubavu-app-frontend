import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import PagesWapper from '../../Global/PagesWapper'
import { Splitter } from '../../globalcomponents/Splitter'
import { useAuthHeader } from 'react-auth-kit'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export const UnberthPrint = () => {
    const { obj } = useContext(ColItemContext)
    const navigate = useNavigate()
    const authHeader = useAuthHeader()();
    useEffect(() => {
        if (!obj || !obj.payment) {
            navigate('/unberthform')
        }
    }, [obj])
    const componentRef = useRef();
    return (
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Print a Receipt - ${obj.name}`}
                rightSideAddress="RUBAVU PORT"
                contentTitle={` UNBERTHING NOTE   `} >
                <Splitter />
                <Col md={12} style={{ fontSize: '12px' }}>
                    <h5 className="mt-5 text-underline"><u>UNBERTHING NOTE DETAILS</u></h5>
                    <Row>
                        <PrintRow txt="Unberthing ID" txtValue={obj.berthId} />
                        <PrintRow txt="Unberthing ATA" txtValue={obj.atd} />
                        <PrintRow txt="Departure Draft (m)" txtValue={obj.departure_draft} />
                    </Row>
                </Col>
                <Col md={6} style={{ fontSize: '12px' }}>
                    <h5 className="mt-5 text-underline"><u>VESSEL</u></h5>
                    <Row>
                        <PrintRow txt="Vessel ID" txtValue={obj.id} />
                        <PrintRow txt="Plate Number" txtValue={obj.plate_number} />
                        <PrintRow txt="Vessel Name" txtValue={obj.name} />
                        <PrintRow txt="Owner/Operator" txtValue={obj.owner_operator} />
                        <PrintRow txt="Dimension (W x L x H)" txtValue={obj.dimension} />
                        <PrintRow txt="Capacity" txtValue={obj.capacity && (Number(obj.capacity)).toLocaleString()} />
                    </Row>
                </Col>

                <Splitter />
               <PrintSignature/>
            </Printtemplate>
        </PagesWapper>

    )
}
