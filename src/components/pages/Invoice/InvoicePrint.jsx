import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useLocation, useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col } from 'react-bootstrap'
import PagesWapper from '../../Global/PagesWapper'
import { Invoice } from '../NewNav/NewProcesses/Invoice'
import { separateDateTime } from './Invoice'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export default function InvoicePrint() {

    const { obj } = useContext(ColItemContext)
    const location = useLocation();

    const navigate = useNavigate()
    const { numDays } = location.state || {};
    useEffect(() => {
        if (!obj || !obj.name) {
            navigate('/bollardsform')
        }
    }, [obj])
    const componentRef = useRef();

    return (
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Print Invoice - RWf ${obj.name}    `}
                rightSideAddress="RUBAVU PORT"
                contentTitle={` BERTHING INVOICE `} >
                <h5 className="mt-5 text-underline"><u>VESSEL</u></h5>
                <PrintRow txt="Vessel name" txtValue={obj.name} />
                <PrintRow txt="Owner Operator" txtValue={obj.owner_operator} />
                <PrintRow txt="LOA(m)" txtValue={`${obj.loa}m`} />
                <PrintRow txt="Dimension(m)" txtValue={obj.dimension} />
                <PrintRow txt="ATA" txtValue={String(obj.ata).includes('T') ? (obj.ata).split('T')[0] + ' ' + (obj.ata).split('T')[1] : obj.ata} />
                <PrintRow txt="ETD" txtValue={String(obj.etd).includes('T') ? (obj.etd).split('T')[0] + ' ' + (obj.etd).split('T')[1] : obj.etd} />
                <PrintRow txt="Number Days" txtValue={obj.number_days} />
                <PrintRow txt="Capacity(tons)" txtValue={obj.capacity && `${(Number(obj.capacity)).toLocaleString()} tons`} />

                <h5 className="mt-5 text-underline"><u>INVOICE</u></h5>
                <PrintRow txt="Invoice ID" txtValue={obj.id} />
                <PrintRow txt="Berthing Charges" txtValue={`RWF ${(Number(obj.quay_amount)).toLocaleString()}`} />
                <PrintRow txt="Vessel Wharfage charges" txtValue={obj.vessel_handling_charges && `RWF ${(obj.vessel_handling_charges).toLocaleString()}`} />


                <PrintSignature /> 



            </Printtemplate>
        </PagesWapper>)
}
