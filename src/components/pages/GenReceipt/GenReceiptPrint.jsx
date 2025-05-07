import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { ButtonContext } from '../../globalcomponents/ButtonContext'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import PagesWapper from '../../Global/PagesWapper'
import { PrintSignature } from '../../Global/Utils'

export const GenReceiptPrint = () => {

    const { obj } = useContext(ColItemContext)
    const { serviceName, chargeCriteria, setChargeCriteria } = useContext(ButtonContext)
    const navigate = useNavigate()


    const componentRef = useRef();
    let totWeight = 0
    useEffect(() => {
        if (!obj || !obj.amount) {
            // navigate('/startproc')
        }
    }, [obj])
    return (
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Printing REceipt  `}
                rightSideAddress="RUBAVU PORT"
                contentTitle={` HANDLING RECEIPT No. ${obj.id}`}>

                {/* <h5 className="mt-5 text-underline"><u><b>CLIENT INFORMATION</b></u></h5> */}
                <Col md={12} style={{ marginTop: '80px' }}>
                    <Row className="d-flex justify-content-around ">
                        <Splitter />

                        <Col md={11} className="mt-2 col-6 border-bottom border border-dark">
                            <Row>
                                <Col className="col-5"  >  Invoice No.    </Col> <Col className="col-6"  >{obj.mdl_invoice?.id}</Col>
                                <Col className="col-5"  >  Invoice amount    </Col> <Col className="col-6"  >{obj.mdl_invoice?.amount && (obj.mdl_invoice?.amount).toLocaleString()}</Col>
                                <Col className="col-5"  >  Invoice Date    </Col>  <Col className="col-6"  >{obj.mdl_invoice?.date_time}</Col>
                            </Row>
                        </Col>
                        <Col md={11} className="mt-2 col-6 border-bottom border border-dark">
                            <Row>
                                <Col className="col-5"  >   Reecipt No.  </Col> <Col className="col-6"  >{obj?.id}</Col>
                                <Col className="col-5"  > Receipt  Date    </Col> <Col className="col-6"  >{obj.date_time}</Col>
                                <SmallSplitter />
                                <Col className="col-5"  > Receipt  Amount    </Col> <Col className="col-6 fw-bold"  >RWf {obj.amount && (obj.amount).toLocaleString()}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col md={11}>
                    <Col md={12} className="VertSpacenOnPrint d-none"></Col>
                    <Row style={{ position: 'absolute', width: '90%', bottom: '0' }}>
                        <PrintSignature/>
                    </Row>
                </Col>
            </Printtemplate>
        </PagesWapper>
    )
}
