import React, { useState } from 'react'
import { BadgeContent, TitleAndList, TitleAndListNormal, TitleBigList } from '../../globalcomponents/TitleAndList'
import { TitleDesscNormal, TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { Fade, Slide } from 'react-reveal'
import { ListItems } from './ListItems'
import { PathVesselHome } from './BreadCrumb'
import { Link } from 'react-router-dom'
import { VesselSubMenu } from './BerthSubMenu/VesselSubMenu'
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { enter as booking } from 'react-icons-kit/icomoon/enter'
import { link as berth } from 'react-icons-kit/icomoon/link'
import { statsBars as reports } from 'react-icons-kit/icomoon/statsBars'
import { MainMenuContainer } from './MainMenuContainer'
import { BookingSubMenu } from './BerthSubMenu/BookingSubMenu'
import { Berth } from './BerthSubMenu/Berth'
import { Reporting } from './BerthSubMenu/Reporting'
import { InvoiceSubMenu } from './BerthSubMenu/InvoiceSubMenu'
import Unberthing from './Processes/Unberthing'
import { UnberthSubMenu } from './BerthSubMenu/UnberthSubMenu'
export const Vessels = () => {

    const [vesselOption, setVesselOption] = useState(true)
    const [bookingOption, setBookingOption] = useState(false)
    const [berthOption, setBerthOption] = useState(false)
    const [unberthOption, setUnberthOption] = useState(false)
    const [reportOption, setReportOption] = useState(false)
    const [invoiceOption, setInvoiceOption] = useState(false)
    
    const vesselClick = () => {
        setBerthOption(false)
        setBookingOption(false)
        setVesselOption(true)
        setReportOption(false)
        setInvoiceOption(false) 
        setUnberthOption(false) 
    }
    const berthClick = () => {
        setBerthOption(true)
        setBookingOption(false)
        setVesselOption(false)
        setReportOption(false)
        setInvoiceOption(false) 
        setUnberthOption(false) 
    }
    const bookingClick = () => {
        setBerthOption(false)
        setBookingOption(true)
        setVesselOption(false)
        setReportOption(false)
        setInvoiceOption(false) 
        setUnberthOption(false) 
    }
    const reportClick = () => {
        setBerthOption(false)
        setBookingOption(false)
        setVesselOption(false)
        setReportOption(true)
        setInvoiceOption(false) 
        setUnberthOption(false) 
    }
    const invoiceClick = () => {
        setBerthOption(false)
        setBookingOption(false)
        setVesselOption(false)
        setReportOption(false)
        setInvoiceOption(true) 
        setUnberthOption(false) 
    }
    const unberthClick = () => {
        setBerthOption(false)
        setBookingOption(false)
        setVesselOption(false)
        setReportOption(false)
        setInvoiceOption(false) 
        setUnberthOption(true) 
    }
    return (

        <MainMenuContainer>
             <PathVesselHome/>
            <Col md={3} className="  "   >
                <TitleBigList
                    li1={<ListItems title="Vessels" desc="Driver, Truck, etc"
                        iconName={boat}
                        chosen={vesselOption ? "redBorder" : ""}
                        clickHandle={vesselClick}
                    />}
                    li2={<ListItems title="Bookings" desc="vessel bookings"
                        iconName={booking}
                        chosen={bookingOption ? "redBorder" : ""}
                        clickHandle={bookingClick} />}

                    li3={<ListItems title="Berth" desc="Bollards, mooring"
                        chosen={berthOption ? "redBorder" : ""}
                        iconName={berth}
                        clickHandle={berthClick} />}
                    
                    li4={<ListItems title="Invoicing" desc="Bollards, mooring"
                        chosen={invoiceOption ? "redBorder" : ""}
                        iconName={berth}
                        clickHandle={invoiceClick} />
                    }
                    li5={<ListItems title="Unberth" desc="Bollards, mooring"
                        chosen={unberthOption ? "redBorder" : ""}
                        iconName={berth}
                        clickHandle={unberthClick} />}
                   
                />
            </Col>
            <Col md={8} className=" mt-4 me-2">
                <Row>
                    {vesselOption &&
                        <VesselSubMenu />
                    }
                    {bookingOption &&
                        <BookingSubMenu />
                    }
                    {berthOption &&
                         <Berth />
                    }
                   
                    {unberthOption &&
                         <UnberthSubMenu />
                    }
                    {invoiceOption   &&
                         <InvoiceSubMenu />
                    }
                </Row>
            </Col>
        </MainMenuContainer>


    )
}
