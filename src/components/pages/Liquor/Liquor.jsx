import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MostSoldBeer, { Overstayed } from '../Beer/MostSoldBeer'

import liquor from '../../images/products/liquorwhiskey.png'
function Liquor() {
    return (
        <Container fluid className='p-2' style={{ backgroundColor: '#b6dde4 ' }}>
            <div style={{  position: "fixed", top: "40px", left: "0px", width: '100px', height: ' 200px' }}>

                <img src={liquor} width="150%" />

            </div>

            <MostSoldBeer Title="&nbsp;&nbsp;&nbsp;&nbsp;Liquor Best Sales" SmallTitle="Beer" />
            <Overstayed Title="Most asked" SmallTitle="Non-Alcoolic" />

        </Container>
    )
}

export default Liquor