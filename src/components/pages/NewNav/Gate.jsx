import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { PathOpsHome, PathVesselHome } from './BreadCrumb'
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
import {  TruckExit } from './GateSubmenu/TruckExit'
import { TruckEntry } from './GateSubmenu/TruckEntry'
import { Truck } from './GateSubmenu/Truck'
import { TruckInvoice } from './GateSubmenu/TruckInvoice'
export const Gate = () => {
    const [truckOption, setTruckOption] = useState(false)
    const [trucksEntryOption, setTrucksEntryOption] = useState(false)
    const [truckExitOption, setTruckExitOption] = useState(false)
    const [truckInvoiceOption, setTruckInvoiceOption] = useState(false)
    const truckClick = () => {
        setTruckOption(true)
        setTrucksEntryOption(false)
        setTruckExitOption(false)
        setTruckInvoiceOption(false)   
    }
    const truckEntryClick = () => {
        setTruckOption(false)
        setTrucksEntryOption(true)
        setTruckExitOption(false)
        setTruckInvoiceOption(false)   
    }
    const truckExitClick = () => {
        setTruckOption(false)
        setTrucksEntryOption(false)
        setTruckExitOption(true)
        setTruckInvoiceOption(false)   
    }
    const truckInvoiceClick = () => {
        setTruckOption(false)
        setTrucksEntryOption(false)
        setTruckExitOption(false)
        setTruckInvoiceOption(true)   
    }
    return (
        <MainMenuContainer>
                <PathOpsHome />
            <Col md={3}  >
                <TitleBigList
                    li1={
                        <ListItems title="Truck" desc="Trucks, Truck by entries, arrival notes"
                            chosen={truckOption ? "redBorder" : ""}
                            iconName={truck}
                            clickHandle={truckClick}

                        />}
                    li2={
                        <ListItems title="Cargo Entry" desc="Trucks, Truck by entries, arrival notes"
                            chosen={trucksEntryOption ? "redBorder" : ""}
                            iconName={truck}
                            clickHandle={truckEntryClick}

                        />}
                        
                        li3={
                            <ListItems title="Truck Exit" desc="Trucks, Truck by entries, arrival notes"
                                chosen={truckExitOption ? "redBorder" : ""}
                                iconName={truck}
                                clickHandle={truckExitClick}
    
                            />}
                        li4={
                            <ListItems title="Truck Parking Invoice" desc="Trucks, Truck by entries, arrival notes"
                                chosen={truckInvoiceOption ? "redBorder" : ""}
                                iconName={truck}
                                clickHandle={truckInvoiceClick}
    
                            />}


                />
            </Col>
            <Col md={8} className="me-2 mt-4"  >
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
                </Row>
            </Col>
        </MainMenuContainer>
    )
}
