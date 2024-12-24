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
import { Entry } from './GateSubmenu/Entry'
export const Gate = () => {
    const [gateOption, setGateOption] = useState(true)
    const [trucksOption, setTruckslOption] = useState(false)
    const [warehouseOption, setWarehouseOption] = useState(false)
    const [vesselOption, setVesselOption] = useState(false)
    const [reportOption, setReportOption] = useState(false)
    const truckClick = () => {
        setVesselOption(false)
        setWarehouseOption(false)
        setTruckslOption(true)
        setReportOption(false)
        setGateOption(false)
    }
    const warehouseClick = () => {
        setVesselOption(true)
        setWarehouseOption(false)
        setTruckslOption(false)
        setReportOption(false)
        setGateOption(false)
    }
    const vesselClick = () => {
        setVesselOption(false)
        setWarehouseOption(true)
        setTruckslOption(false)
        setReportOption(false)
        setGateOption(false)
    }
    const reportClick = () => {
        setVesselOption(false)
        setWarehouseOption(false)
        setTruckslOption(false)
        setReportOption(true)
        setGateOption(false)
    }
    const gateClick = () => {
        setVesselOption(false)
        setWarehouseOption(false)
        setTruckslOption(false)
        setReportOption(false)
        setGateOption(true)
    }
    return (
        <MainMenuContainer>
                <PathOpsHome />
            <Col md={3}  >
                <TitleBigList
                    li1={
                        <ListItems title="Cargo Entry" desc="Trucks, Truck by entries, arrival notes"
                            chosen={trucksOption ? "redBorder" : ""}
                            iconName={truck}
                            clickHandle={truckClick}

                        />}
                    


                />
            </Col>
            <Col md={8} className="me-2 mt-4"  >
                <Row>
                    {trucksOption &&
                        <Entry />
                    }
                    {warehouseOption &&
                        <Warehouse />
                    }
                    {vesselOption &&
                        <Vessel />
                    }
                    {vesselOption &&
                        <Vessel />
                    }
                    {reportOption&&
                    <Reports/>
                    }
                </Row>
            </Col>
        </MainMenuContainer>
    )
}
