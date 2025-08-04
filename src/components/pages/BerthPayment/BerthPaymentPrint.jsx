import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col } from 'react-bootstrap'
import PagesWapper from '../../Global/PagesWapper'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export const BerthPaymentPrint = () => {

    const { obj } = useContext(ColItemContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!obj || !obj.payment) {
            navigate('/berthPaymentform')
        }
    }, [obj])
    const componentRef = useRef();

    return (
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Print a Receipt - ${obj.mdl_invoice.mdl_vessel.name}`}
                rightSideAddress="RUBAVU PORT"
                contentTitle={` RECEIPT `} >

                <h5 className="mt-5 text-underline"><u>RECEIPT</u></h5>
                <PrintRow txt="Receipt ID" txtValue={obj.id} />
                <PrintRow txt="Total Amount Paid" txtValue={obj.payment && `RWF ${(obj.payment).toLocaleString()}`} />

                <h5 className="mt-5 text-underline"><u>INVOICE</u></h5>
                <PrintRow txt="Amount" txtValue={obj.mdl_invoice.quay_amount && `RWF ${(obj.mdl_invoice.quay_amount +obj.mdl_invoice.vessel_handling_charges   ).toLocaleString()}`} />

                <h5 className="mt-5 text-underline"><u>VESSEL</u></h5>
                <PrintRow txt="Vessel Name" txtValue={obj.mdl_invoice.mdl_vessel.name} />
                <PrintRow txt="owner_operator" txtValue={obj.mdl_invoice.mdl_vessel.owner_operator} />
                <PrintRow txt="dimension(m)" txtValue={obj.mdl_invoice.mdl_vessel.dimension} />
                <PrintRow txt="capacity(tons)" txtValue={obj.mdl_invoice.mdl_vessel.capacity} />
                <PrintSignature /> 
            </Printtemplate>
        </PagesWapper>
    )
}
