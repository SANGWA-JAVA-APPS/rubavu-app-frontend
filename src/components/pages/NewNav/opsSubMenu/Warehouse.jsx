import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'
import { Link, useNavigate } from 'react-router-dom'
import Icon from 'react-icons-kit'

import { arrowRight } from 'react-icons-kit/icomoon/arrowRight'
export const Warehouse = () => {

    const navigate=useNavigate()

    const gotoWTruck=()=>{
        navigate("/wtruckform")
    }
    
    return (
        <>
            <Col md={12} className='lightBg p-5'>
                <Row className="d-flex justify-content-between">
                    <Col md={5}>  <TitleDesscNormal title={"Warehouse Vessel"}
                        desc={
                            <TitleAndListNormal smallerTitleOn={true}
                                badge1={<>
                                    {/* <BadgeContent content="new" />
                                <BadgeContent content="search entries by date" /> */}

                                </>}
                                li1="Add entry"
                                li2="Search By Date"
                                li3="Unfinished entries" />

                        } />
                    </Col>
                    <Col md={5} style={{ borderLeft: '3px solid orange' }}>
                        <Link className='startProcess' style={{ border: '1px solid #ccc', padding: '9px' }} to="/wvesselform"><Icon size={30} style={{ color: '#0b3059' }} className="me-2" icon={arrowRight} />
                            Start a new Process</Link>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className='lightBg p-5 mt-3'>
                <TitleDesscNormal title={"Warehouse Truck"}
                    desc={
                        <TitleAndListNormal smallerTitleOn={true}
                            badge1={<>
                                {/* <BadgeContent content="new" />
                                <BadgeContent content="search entries by date" /> */}
                            </>}
                            eventOne={gotoWTruck}
                            li1="Add warehouse - Truck records"
                            li2="Search By Date"
                            li3="Unfinished entries" />
                    } />
            </Col>


        </>
    )
}
