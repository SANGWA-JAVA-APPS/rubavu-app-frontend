import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import { Splitter } from '../../globalcomponents/Splitter'
import { TableOpen } from '../../Global/ListTable'
import { InvoiceHeader, InvoiceRows } from './InvoiceRows'
import { ButtonContext } from '../../globalcomponents/ButtonContext'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { Pages } from '@mui/icons-material'
import PagesWapper from '../../Global/PagesWapper'
import { PrintSignature } from '../../Global/Utils'

export const PrintOpsInvoice = () => {

    const { obj } = useContext(ColItemContext)
    const { serviceName, chargeCriteria, setChargeCriteria } = useContext(ButtonContext)
    const navigate = useNavigate()

    const componentRef = useRef();
    let totWeight = 0
    useEffect(() => {
        if (!obj || !obj.Tallies) {
            navigate('/startproc')
        }
    }, [obj])
    let lbl=''
    return (
        <PagesWapper>

            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Printing Invoice  `}
                rightSideAddress="RUBAVU PORT"
                contentTitle={`HANDLING  INVOICE No. ${obj.arrival?.id}`}>

                {/* <h5 className="mt-5 text-underline"><u><b>CLIENT INFORMATION</b></u></h5> */}
                <Col md={12} style={{ marginTop: '80px' }}>
                    <Row className="d-flex justify-content-around ">

                        <Col md={5} className="mt-2 col-6 border-bottom border border-dark">
                            <Row>

                                <Col className="col-5"  >  Date time    </Col> <Col className="col-6"  >{obj?.Tallies && obj?.Tallies[0]?.entry_date}</Col>
                                <Col className="col-5"  > Criteria   </Col> <Col className="col-6"  >{chargeCriteria}</Col>
                                <Col className="col-5"  > ATA   </Col> <Col className="col-6"  >{obj?.arrival?.date_time}</Col>
                            </Row>
                        </Col>
                        <Col md={5} className="mt-2 col-6 border-bottom border border-dark">
                            <Row>
                                <Col className="col-5"  > Arrival ID    </Col> <Col className="col-6"  >{obj.arrival?.id}</Col>
                                <Col className="col-5"  >  Client Name    </Col> <Col className="col-6"  >{obj.arrival?.name}</Col>
                                <Col className="col-5"  >  TIN number    </Col> <Col className="col-6"  >{obj.arrival?.tin_number}</Col>
                                <Col className="col-5"  >  telephone  </Col>  <Col className="col-6"  >{obj.arrival?.telephone}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Splitter />

                <Col md={12} style={{ marginTop: '80px' }}>

                    <TitleSmallDesc title="BILL DETAILS" />
                    <TableOpen>
                        <InvoiceHeader />

                        {obj.SalesTallies && obj?.SalesTallies.map((tly, index) => {
                            totWeight += 'Assorted' === tly.cargoAssorted ? (tly.weight * tly.unitPrice) : (tly.weight * tly.unit * tly.unitPrice)
                            return (
                                <InvoiceRows tally={tly} index={index} serviceName={serviceName && serviceName} />
                            )
                        })}
                        {obj.talliesOfPurchase && obj?.talliesOfPurchase.map((tly, index) => {
                            totWeight += 'Assorted'=== tly.cargoAssorted  ? (tly.weight ?? 1  )  *(tly.unitPrice ?? 1)   : (tly.weight ?? 1) * (tly.unit ?? 1) * ((tly.unitPrice ?? 1));
                            // lbl=`${tly.weight} - ${tly.unit} - ${tly.unitPrice}   `
                            return (
                                <InvoiceRows tally={tly} index={index} serviceName={serviceName && serviceName} />
                            )
                        })}
                        {obj.Tallies && obj?.Tallies.map((tly, index) => {
                            totWeight += 'Assorted' === tly.cargoAssorted ? (tly.weight * tly.unitPrice) : (tly.weight * tly.unit * tly.unitPrice)
                            return (
                                <InvoiceRows tally={tly} index={index} serviceName={serviceName && serviceName} />
                            )
                        })}
                        <tr>
                            <td colSpan="5" style={{ fontSize: '20px' }} className="  fw-bold text-end"> Total Amount: Rwf {(totWeight).toLocaleString()}    </td>
                        </tr>
                    </TableOpen>

                </Col>
                <Col md={11}>
                    <Col md={12} className="VertSpacenOnPrint d-none"></Col>
                    <PrintSignature />
                </Col>
            </Printtemplate>
        </PagesWapper>
    )
}
