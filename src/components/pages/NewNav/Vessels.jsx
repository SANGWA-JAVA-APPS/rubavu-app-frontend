import React, { useEffect, useState } from 'react'
import { BadgeContent, TitleAndList, TitleAndListNormal, TitleBigList } from '../../globalcomponents/TitleAndList'
import { TitleDesscNormal, TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { Fade, Slide } from 'react-reveal'
import { ListItems } from './ListItems'
import { PathBreadCrumb } from './BreadCrumb'
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
import { BerthPamentSubMenu } from './BerthSubMenu/BerthPamentSubMenu'
import Utils from '../../Global/Utils'
import { useContext } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'

export const Vessels = () => {

    const [vesselOption, setVesselOption] = useState(true)
    const [bookingOption, setBookingOption] = useState(false)
    const [berthOption, setBerthOption] = useState(false)
    const [unberthOption, setUnberthOption] = useState(false)
    const [reportOption, setReportOption] = useState(false)
    const [invoiceOption, setInvoiceOption] = useState(false)
    const [paymentOption, setPaymentOption] = useState(false)
    const { setupBycolor, disableBodyScroll } = useContext(ColItemContext)
    useEffect(() => {
        setupBycolor()
        disableBodyScroll()
    }, [])
    const setOffAllMenus = () => {
        setBerthOption(false)
        setBookingOption(false)
        setVesselOption(false)
        setReportOption(false)
        setInvoiceOption(false)
        setUnberthOption(false)
        setPaymentOption(false)
    }
    const vesselClick = () => {
        setOffAllMenus()
        setVesselOption(true)
    }
    const berthClick = () => {
        setOffAllMenus()
        setBerthOption(true)

    }
    const bookingClick = () => {
        setOffAllMenus()
        setBookingOption(true)

    }
    const reportClick = () => {
        setOffAllMenus()
        setReportOption(true)

    }
    const invoiceClick = () => {
        setOffAllMenus()
        setInvoiceOption(true)

    }
    const unberthClick = () => {
        setOffAllMenus()
        setUnberthOption(true)

    }
    const paymentOptionClick = () => {
        setOffAllMenus()
        setPaymentOption(true)
    }

    return (
        <MainMenuContainer>
            <MenuSides partLeft={
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

                    li4={<ListItems title="Payment Advice" desc="Bollards, mooring"
                        chosen={invoiceOption ? "redBorder" : ""}
                        iconName={berth}
                        clickHandle={invoiceClick} />
                    }
                    li5={<ListItems title="Payment" desc="Bollards, mooring"
                        chosen={paymentOption ? "redBorder" : ""}
                        iconName={berth}
                        clickHandle={paymentOptionClick} />
                    }
                    li6={<ListItems title="Unberth" desc="Bollards, mooring"
                        chosen={unberthOption ? "redBorder" : ""}
                        iconName={berth}
                        clickHandle={unberthClick} />
                    }
                />
            }partRight={
                <Row className="d-flex flex-row border border-success bg-danger">
                {vesselOption &&
                    <VesselSubMenu />
                }
                {bookingOption &&
                    <BookingSubMenu />
                }
                {berthOption &&
                    <Berth />
                }

                {invoiceOption &&
                    <InvoiceSubMenu />
                }

                {paymentOption &&
                    <BerthPamentSubMenu />
                }

                {unberthOption &&
                    <UnberthSubMenu />
                }
            </Row>
            }   />

        </MainMenuContainer>
    )

}
export const MenuSides = ({ partLeft, partRight }) => {
    return (<>
        <Col md={2} className="border border-success styledVHScrollBar"   style={{ height: '99%', overflowY: 'scroll' }}  >
            {partLeft}
        </Col>
        <Col md={10} className=" mt-4   d-flex flex-row justify-content-center align-items-center" 
                style={{ height: '96%', overflowY:'hidden' }}>
            <div className="d-flex flex-column   w-100   p-5  styledVHScrollBar pt-4"
                style={{  width: '95%', height: '100%', 
                overflowY: 'scroll', display:'block' }}> 


                {partRight}
            </div>
        </Col>

    </>)
}
