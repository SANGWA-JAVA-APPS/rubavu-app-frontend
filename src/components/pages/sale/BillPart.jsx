import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import CurrentDate from '../../Global/CurrentDate'
import { ic_print_outline as print } from 'react-icons-kit/md/ic_print_outline'
import Icon from 'react-icons-kit'
import { useReactToPrint } from 'react-to-print'

// child of  MultipleItems
function BillPart({ brandName, fields, sum }) {
    var tot = 0


    /* #region -------Printing */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data'
    });
    /* #endregion */
    return (
        <Col md={4} classname="sticky-top  border border-dark" >
            <Col md={12}>
                <Row>
                    <Col md={6}>
                        <Icon className='printBtn'
                            size={25} onClick={handlePrint}
                            style={{ cursor: 'pointer', color: '#000', marginRight: "10px" }}
                            icon={print} /> </Col>
                </Row>
            </Col>
            <div className='bill slide-down ' ref={componentRef}>
                <div className='border border-dark billContent p-1 ' style={{ backgroundColor: '#fff' }}>

                    <p> {brandName} - {CurrentDate.todaydate()}</p>
                    ------------------
                    <p>Bill Items</p>
                    {fields.map((field, index) => {
                        tot = (field.sold_qty * field.sale_unit_cost)
                        sum += tot
                        return (
                            <Row className=''  >
                                <Col md={7}>
                                    {index + 1}. <span className='text-capitalize'>{field.itemsId}</span>
                                    {field.itemsId.length>1 && <>
                                        <span> (</span>
                                        {field.sold_qty}
                                        <span>)</span></>
                                    }
                                    <span className='float-end'>:</span>  </Col>
                                <Col md={3} classname="text-start border border-danger">
                                    {tot.toLocaleString()}
                                </Col>
                            </Row>
                        )
                    })}
                    <hr style={{ border: '3px solid red' }} />
                    <Row md={8} className="d-flex justify-content-end">
                        <Col md={8}><p><b>Total: {sum.toLocaleString()}</b></p></Col>
                    </Row>
                </div>
            </div>
        </Col>
    )
}

export default BillPart