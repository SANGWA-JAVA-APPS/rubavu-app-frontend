import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'
import { Icon } from 'react-icons-kit'
import { arrowRight } from 'react-icons-kit/icomoon/arrowRight'
import { Link, useNavigate } from 'react-router-dom'
import { ColItemContext } from '../../../Global/GlobalDataContentx'
export const Trucks = () => {

    const {setDestination_id} = useContext(ColItemContext)
    const navigate = useNavigate();
    const handleClick =(e,destination_id) => {
        e.preventDefault(e)
        setDestination_id(destination_id)
        navigate("/entryform")
    }
    return (
        <>
            <Col md={12} className='lightBg p-5'>
                <Row className="d-flex justify-content-between">
                    <Col md={5}> <TitleDesscNormal title={"Truck Warehouse"}
                        desc={
                            <TitleAndListNormal smallerTitleOn={true}
                                badge1={<>
                                    {/* <BadgeContent content="new" />
                                    <BadgeContent content="search entries by date" /> */}
                                </>}
                                li1="List of processes by period"
                                li2="List of Trucks"
                                li3="Arrival notices"
                            />
                        } /></Col>
                    <Col md={5} style={{ borderLeft: '3px solid orange' }}>
                        <Link className='startProcess'
                         style={{ border: '1px solid #ccc', padding: '9px' }} 
                         to="/startproc"><Icon size={30} style={{ color: '#0b3059' }} className="me-2" icon={arrowRight} />
                            Start a new Process</Link>
                    </Col>
                </Row>


            </Col>
            <Col md={12} className='lightBg p-5 mt-3'>
                <Row className="d-flex justify-content-between">
                    <Col md={5}>   <TitleDesscNormal title={"Truck Vessel"}
                        desc={
                            <TitleAndListNormal smallerTitleOn={true}
                                badge1={<>
                                    {/* <BadgeContent content="new" />
                                <BadgeContent content="search entries by date" /> */}
                                </>}
                                li1="List of processess by period"
                                li2="List of Vessels"
                                li3="List of Truck & vessels & mooring"
                            />
                        } />
                    </Col>
                    <Col md={5} style={{ borderLeft: '3px solid orange' }}>
                        <Link className='startProcess' style={{ border: '1px solid #ccc', padding: '9px' }}
                         onClick={(e)=>handleClick(e,4)} >
                        <Icon size={30} style={{ color: '#0b3059' }} className="me-2" icon={arrowRight} />
                            Start a new Processs</Link>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className='lightBg p-5 mt-3'>
                <Row className="d-flex justify-content-between">
                    <Col md={5}>  <TitleDesscNormal title={"Truck Truck"}
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
                    <Link className='startProcess' style={{ border: '1px solid #ccc', padding: '9px' }}
                         onClick={(e)=>handleClick(e,3)} ><Icon size={30} style={{ color: '#0b3059' }} 
                        className="me-2" icon={arrowRight} />
                            Start a new Process</Link>
                    </Col>
                </Row>  </Col>
        </>
    )
}
