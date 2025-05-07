import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { ButtonContext } from '../../globalcomponents/ButtonContext'
import { Link } from 'react-router-dom'
import Icon from 'react-icons-kit'
import { plus } from 'react-icons-kit/icomoon/plus'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
export const ArrivalToolBar = () => {
    const { addInput, clearAll, arrivalNote, step, getTotal, getTotalWgt } = useContext(ButtonContext)
    return (
        <Row className="align-items-center">
            <Col className="col-auto">
                <h2 style={{ textTransform: 'capitalize' }}>
                    <Link style={{ marginLeft: '30px', fontSize: '16px' }}>
                        <span style={{ color: '#000' }}>  TIN: </span>
                        {arrivalNote.tin_number}
                        &nbsp;  &nbsp;<span style={{ color: '#000' }}>Client Names:
                        </span> {arrivalNote.name}  
                        &nbsp;  &nbsp;<span style={{ color: '#000' }}> Phone:</span> {arrivalNote.telephone}
                    </Link>
                </h2>
            </Col>
            {step === 2 &&
                <>
                    <Col className="col-auto  fw-normal mt-2"
                        style={{ textTransform: 'normal', fontSize: '15px' }}>
                        Qty: {getTotal()}
                        &nbsp;&nbsp;&nbsp;
                         

                        &nbsp;&nbsp;&nbsp;
                        
                    </Col>
                    <Col className="col-auto">
                        <Button onClick={clearAll} variant='outline-danger p-1 mt-2'>
                            <Icon size={16} icon={remove} />
                        </Button>
                    </Col>
                    <Col className="col-auto">
                        <Button onClick={addInput} variant='outline-info p-1 mt-2 ' className="text-end">
                            <Icon size={16} icon={plus} />
                        </Button>
                    </Col>
                </>}
        </Row>

    )
}
