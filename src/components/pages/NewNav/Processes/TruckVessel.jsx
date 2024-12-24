import React, { useState } from 'react'
import { ItemsContainer } from '../../../globalcomponents/ItemsContainer'
import { Col, Form, Row } from 'react-bootstrap'
import { PathOpsHome, PathVesselHome } from '../BreadCrumb'
import { Link } from 'react-router-dom'
import { TitleSmallDesc } from '../../../globalcomponents/TitleSmallDesc'
import { Splitter } from '../../../globalcomponents/Splitter'
import Entry from '../../Entry/Entry'
import Arrival_note from '../../Arrivalnote/Arrival_note'
import TVTallyIn from '../../TruckWh/TVTallyIn'
import Invoice from '../../Invoice/Invoice'
import Payment from '../../Payment/Payment'
import Exits from '../../Exit/Exits'
import { Client } from '../../../Client/Client'
import TvArrivalNote from '../../TruckVessel/TvArrivalNote'
import TVInvoice from '../../TruckVessel/TVInvoice'
import TVpayment from '../../TruckVessel/TVpayment'
import TVExit from '../../TruckVessel/TVExit'

export const TruckVessel = () => {

    const [counter, setCounter] = useState(1)


    const nextStep = () => {
        setCounter((p) => {
            let np = p
            if (np < 6) {
                np = np + 1
            }
            return np
        })
    }
    const prevStep = () => {
        setCounter((p) => {
            let np = p
            if (np > 1) {
                np = np - 1
            }
            return np
        })
    }
    return (
        <ItemsContainer  >
            <PathOpsHome >
                <Col className="col-auto p-0 m-0 ms-2"> <Link to="/truckwarehouseform">Truck-Vessel</Link></Col>
            </PathOpsHome>

            <Splitter />
            <Col md={12}>
                <Row className='numberParent'>
                    <Col md={2} className="col-1 "><div className={` roundNumber ${counter >= 1 ? 'bgRed' : ''} `}> 1 </div></Col>
                    <Col md={2} className="col-1 "><div className={` roundNumber ${counter >= 2 ? 'bgRed' : ''} `}> 2</div></Col>
                    <Col md={2} className="col-1 "><div className={` roundNumber ${counter >= 3 ? 'bgRed' : ''} `}>3</div></Col>
                    <Col md={2} className="col-1 "><div className={` roundNumber ${counter >= 4 ? 'bgRed' : ''} `}>4</div></Col>
                    <Col md={2} className="col-1 "><div className={` roundNumber ${counter >= 5 ? 'bgRed' : ''} `}>5</div></Col>
                    <Col md={2} className="col-1 "><div className={` roundNumber ${counter >= 6 ? 'bgRed' : ''} `}>6</div></Col>
                    <div className='underlayLine'></div>
                </Row>
            </Col>

            <Col md={12}  >
                {counter === 1 && <>   <Splitter />    <Entry />  </>}
                {counter === 2 && <> <Splitter /> <TvArrivalNote />  </>}
                {counter === 3 && <> <Splitter /> <TVTallyIn />  </>}
                {counter === 4 && <> <Splitter /> <TVInvoice />  </>}
                {counter === 5 && <> <Splitter /> <TVpayment />  </>}
                {counter === 6 && <> <Splitter /> <TVExit />  </>}
            </Col>
            <Col md={4}>
                <Link className='btn btn-primary' onClick={prevStep}>Prev</Link>&nbsp;
                <Link className='btn btn-primary' onClick={nextStep}>next</Link   >
            </Col>

        </ItemsContainer>
    )
}
