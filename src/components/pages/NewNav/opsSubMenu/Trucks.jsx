import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'
import { Icon } from 'react-icons-kit'
import { arrowRight } from 'react-icons-kit/icomoon/arrowRight'
import { Link, useNavigate } from 'react-router-dom'
import { ColItemContext, useColItemContext } from '../../../Global/GlobalDataContentx'
import { ButtonContext } from '../../../globalcomponents/ButtonContext'
export const Trucks = () => {
    const { trucksProcesses, warehouseProcesses, vesselProcesses, chosenProcess,
        chosenProcessId, setChosenProcessId, setChosenProcess, setChosenProcessCategory } = useContext(ColItemContext)
        const {arrivalNote}= useContext(ButtonContext)

    const navigate = useNavigate()
    const processDetailsHandler = (id, name, category, e) => {
        e.preventDefault()
        setChosenProcess(name)
        setChosenProcessCategory(category)
        setChosenProcessId(id)
        arrivalNote.destination_id=id
        navigate("/startproc")

        
    }
    return (
        <>
            {trucksProcesses.map(truck => (
                <Col md={12} className='lightBg p-5 mb-3'>
                    <Row className="d-flex justify-content-between ">
                        <Col md={5}> 
                        <TitleDesscNormal title={truck.name}
                           />
                                    </Col>
                        <Col md={5} style={{ borderLeft: '3px solid orange' }}>
                            <a onClick={(e)=>processDetailsHandler(truck.id, truck.name, truck.category,e)} className='startProcess'
                                style={{ border: '1px solid #ccc', padding: '9px' }} >
                                <Icon size={30} style={{ color: '#0b3059' }} className="me-2" icon={arrowRight} />
                                Start a new Process</a>
                        </Col>
                    </Row>
                </Col>
            ))}



        </>
    )
}
