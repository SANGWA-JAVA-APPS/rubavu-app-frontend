import React from 'react'
import { Col } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'
import { useNavigate } from 'react-router-dom'

export const BerthPamentSubMenu = () => {

    const navigate = useNavigate()
    const gotoinvoice = () => {
        navigate("/berthPaymentform")
    }
    const gotoUnberth = () => {
        navigate("/unberthform")

    }
    return (
        <>
            <Col md={12} className='lightBg p-5'>
                <TitleDesscNormal title={"Receipt"}
                    desc={
                        <TitleAndListNormal smallerTitleOn={true}
                            eventOne={gotoinvoice}
                                                        li1="Generate Receipt"
                            
                             />

                    } />

            </Col>


        </>
    )
}
