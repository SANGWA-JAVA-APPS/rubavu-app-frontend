import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PurchaseFrom from './PurchaseForm'
import PurchaseForm from './PurchaseForm'

function Menu({ content, addEvent, modalShow, hideEvent }) {


    return (

        <Col md={12}>
            <Row className="d-flex justify-content-center">
                <Col md={6}  >
                    <button className="btn beerskin2" onClick={addEvent}>Add Purchases</button>
                </Col>
            </Row>
            <PurchaseForm content={content} modalShow={modalShow} hideEvent={hideEvent} />


        </Col>
    )
}

export default Menu