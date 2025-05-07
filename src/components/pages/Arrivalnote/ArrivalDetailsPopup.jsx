import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import CustomModalPopup from '../../Global/CustomModalPopup'
import { ArrivalDetailsContent } from './ArrivalClientDetails'

export const ArrivalDetailsPopup = ({ modalOpen, handleShowModal, dataLoaded, content, title }) => {

    return (
        <CustomModalPopup fullscreen={true} content={
            <>
                {!dataLoaded &&
                    <Row>
                        <Col md={12} className='border loader'>  </Col>
                    </Row>
                }
                {content}
            </>
        }
            show={modalOpen} title={title} onHide={handleShowModal} />
    )
}
export const MediumPopup = ({ modalOpen, handleShowModal, dataLoaded, content, title, full,centered }) => {
    return (
        <CustomModalPopup fullscreen={full} centered={centered} content={
            <>
                {!dataLoaded &&
                    <Row>
                        <Col md={12} className='border loader'>  </Col>
                    </Row>
                }
                {content}
            </>

        } show={modalOpen} title={title} onHide={handleShowModal} />
    )
}
