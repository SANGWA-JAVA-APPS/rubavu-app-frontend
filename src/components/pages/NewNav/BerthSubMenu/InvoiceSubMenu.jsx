import React from 'react'
import { Col } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'
import { useNavigate } from 'react-router-dom'

export const InvoiceSubMenu = () => {

    const navigate = useNavigate()
    const gotoinvoice = () => {
        navigate("/invoiceform")
    }
    const gotoUnberth = () => {
        navigate("/unberthform")

    }
    return (
        <>
            <Col md={12} className='lightBg p-5'>
                <TitleDesscNormal title={"Payment Advice"}
                    desc={
                        <TitleAndListNormal smallerTitleOn={true}
                            badge1={<>
                            </>}
                            eventOne={gotoinvoice}
                            
                            li1="Generate Payment Advice"
                            
                             />

                    } />

            </Col>


        </>
    )
}
