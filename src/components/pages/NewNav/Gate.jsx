import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { PathOpsHome } from './BreadCrumb'
import { TitleBigList } from '../../globalcomponents/TitleAndList'
import { ListItems } from './ListItems'
import { VesselSubMenu } from './BerthSubMenu/VesselSubMenu'
import { Trucks } from './opsSubMenu/Trucks'
import { Warehouse } from './opsSubMenu/Warehouse'
import { Vessel } from './opsSubMenu/Vessel'

import { Icon } from 'react-icons-kit'
import { truck } from 'react-icons-kit/icomoon/truck'
import { home as whouse } from 'react-icons-kit/icomoon/home'
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { statsBars as reports } from 'react-icons-kit/icomoon/statsBars'
import { MainMenuContainer } from './MainMenuContainer'
import { map_add as gate } from 'react-icons-kit/ikons/map_add'

import { Reports } from './opsSubMenu/Reports'
import { TruckExit } from './GateSubmenu/TruckExit'
import { TruckEntry } from './GateSubmenu/TruckEntry'
import { Truck } from './GateSubmenu/Truck'
import { TruckInvoice } from './GateSubmenu/TruckInvoice'
import Utils from '../../Global/Utils'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { MenuSides } from './Vessels'
import { TruckReceipt } from './GateSubmenu/TruckReceipt'
export const Gate = () => {
    const [truckOption, setTruckOption] = useState(false)
    const [trucksEntryOption, setTrucksEntryOption] = useState(false)
    const [truckExitOption, setTruckExitOption] = useState(false)
    const [truckInvoiceOption, setTruckInvoiceOption] = useState(false)
    const [truckPaymentOption, setTruckPaymentOption] = useState(false)

    const { setupBycolor,disableBodyScroll } = useContext(ColItemContext)
    useEffect(() => {
        setupBycolor()
        disableBodyScroll()
        setTrucksEntryOption(true)
    }, [])
    const truckClick = () => {
        setTruckOption(true)
        setTrucksEntryOption(false)
        setTruckExitOption(false)
        setTruckInvoiceOption(false)
        setTruckPaymentOption(false)
    }
    const truckEntryClick = () => {
        setTruckOption(false)
        setTrucksEntryOption(true)
        setTruckExitOption(false)
        setTruckInvoiceOption(false)
        setTruckPaymentOption(false)
    }
    const truckExitClick = () => {
        setTruckOption(false)
        setTrucksEntryOption(false)
        setTruckExitOption(true)
        setTruckInvoiceOption(false)
        setTruckPaymentOption(false)
    }
    const truckInvoiceClick = () => {
        setTruckOption(false)
        setTrucksEntryOption(false)
        setTruckExitOption(false)
        setTruckInvoiceOption(true)
        setTruckPaymentOption(false)
    }
    const truckPaymentClick = () => {
        setTruckOption(false)
        setTrucksEntryOption(false)
        setTruckExitOption(false)
        setTruckInvoiceOption(false)
        setTruckPaymentOption(true)
    }
    return (
        <MainMenuContainer>
            {/* <PathOpsHome /> */}
            <MenuSides
                partLeft={
                    <TitleBigList
                        li1={
                            <ListItems title="Truck Entry" desc="Trucks, Truck by entries, arrival notes"
                                chosen={trucksEntryOption ? "redBorder" : ""}
                                iconName={truck}
                                clickHandle={truckEntryClick}

                            />}
                        li2={
                            <ListItems title="Truck Invoice" desc="Trucks, Truck by entries, arrival notes"
                                chosen={truckInvoiceOption ? "redBorder" : ""}
                                iconName={truck}
                                clickHandle={truckInvoiceClick}

                            />}
                         
                        li3={
                            <ListItems title="Truck Payment" desc="Trucks, Truck by entries, arrival notes"
                                chosen={truckPaymentOption ? "redBorder" : ""}
                                iconName={truck}
                                clickHandle={truckPaymentClick}
                            />} 
                            li4={
                                <ListItems title="Truck Exit" desc="Trucks, Truck by entries, arrival notes"
                                    chosen={truckExitOption ? "redBorder" : ""}
                                    iconName={truck}
                                    clickHandle={truckExitClick}
                                />}  
                                />
                }
                partRight={
                <Row>
                    {truckOption &&
                        <Truck />
                    }
                    {trucksEntryOption &&
                        <TruckEntry />
                    }
                    {truckExitOption &&
                        <TruckExit />
                    }
                    {truckInvoiceOption &&
                        <TruckInvoice />
                    }
                    {truckPaymentOption && 
                    <TruckReceipt/>}
                </Row>
                } />
        </MainMenuContainer>
    )
}
