import React, { useEffect, useState } from 'react'


import { Col, Container, Row } from 'react-bootstrap'
import SlidesPanes from './SlidesPanes'

import ItemsList from '../../Global/ItemsList'
import Products from './Products'
import StockRepository from '../../services/StockServices/StockRepository'
import { useSignIn } from 'react-auth-kit'
import Categories from './Categories'

function Home() {

    const [userName, setUsername] = useState()
    const [password, setPassword] = useState()

    const signIn = useSignIn()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [userType, setUserType] = useState()

    const [pageLoaded, setPageLoaded] = useState(false);



    return (

        <>
            <Container fluid className='header'>
                <Row className="d-flex justify-content-center">
                    <Col md={12} className='padd'>
                        <h1>RUBAVU PORT</h1>
                        <SlidesPanes />

                    </Col>
                </Row>
            </Container>
          

        </>
    )
}

export default Home