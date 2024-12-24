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
import { Gate } from './opsSubMenu/Gate'
import { Reports } from './opsSubMenu/Reports'
export const Ops = () => {
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
                        <ListItems title="Trucks" desc="Trucks, Truck by entries, arrival notes"
                            chosen={trucksOption ? "redBorder" : ""}
                            iconName={truck}
                            clickHandle={truckClick}

                        />}
                    li2={<ListItems title="Warehouse" desc="Tonnage, vessels"
                        iconName={whouse}
                        chosen={warehouseOption ? "redBorder" : ""}
                        clickHandle={vesselClick} />}
                    li3={<ListItems title="Vessel" desc="Some desc"
                        iconName={boat} chosen={vesselOption ? "redBorder" : ""}
                        clickHandle={warehouseClick} />}

                    li4={<ListItems title="Report" desc="Tonnage, vessels"
                        chosen={reportOption ? "redBorder" : ""}
                        iconName={reports}
                        clickHandle={reportClick} />}


                />
            </Col>
            <Col md={8} className="me-2 mt-4"  >
                <Row>
                    {trucksOption &&
                        <Trucks />
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
