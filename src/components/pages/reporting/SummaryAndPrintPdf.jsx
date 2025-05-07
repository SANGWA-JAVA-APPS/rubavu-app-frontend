import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'

export const SummaryAndPrintPdf = ({ TopTitle, children }) => {
    const { cardIconShow, cardBg, cardHeight, colSizeTwo, colWidth } = useContext(ColItemContext)
    return (
        <Row className={`d-flex flex-row justify-content-between p-3 gy-3  ${cardBg} `} style={{ borderRadius: '10px', boxShadow: '0 0 2px #000' }}  >
            <p className="m-0 mb-3" style={{ fontSize: '17px' }} ><b>{TopTitle}</b></p>

            {children}
        </Row>

    )
}

export const PdfItem = ({ leftTitle, leftSummary, rightValue }) => {
    return (
        <>
            <Col md={5}>
                <h5 className="m-0" style={{ fontSize: '15px' }}><b>{leftTitle}</b></h5>
                <p className="m-0" style={{ fontSize: '13px' }}>{leftSummary}</p>
            </Col>
            <Col md={5} className="text-end   d-flex justify-content-end align-items-center">
               <Row style={{fontSize:'13px'}}>
                <Col md={5}>RWF&nbsp;{rightValue}</Col>
                <Col md={5}><b> PDF</b></Col>
               </Row>
               
            </Col>
        </>
    )
}