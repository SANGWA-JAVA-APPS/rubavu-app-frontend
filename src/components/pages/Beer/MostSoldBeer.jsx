import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import BeerColsTitleDesc from './BeerColsTitleDesc'

import primus from '../../images/products/primus.png'
import mutsig from '../../images/products/mutsig.png'
import amstel from '../../images/products/amstel.png'

import fiesta from '../../images/products/fiesta.png'
import coke from '../../images/products/coke.png'
import fantaorange from '../../images/products/fantaorange.png'

import whiskey from '../../images/products/liquorwhiskey.png'
import vodka from '../../images/products/liquorvodka.png'
import rum from '../../images/products/liquorrum.png'





function MostSoldBeer({ mdl_items, Title, SmallTitle }) {

    return (

        <Row className="border bg-light m-5 p-3 g-2" >
            <Col md={12}>
                <TitleSubTitle Title={Title} SmallTitle={SmallTitle} titleColor="beerskin1" />
            </Col>
            <Col md={12}>
                <Row className="d-flex justify-content-around">
                    <BeerColsTitleDesc mdl_items={mdl_items} />
                </Row>
            </Col>
        </Row>



    )
}

export default MostSoldBeer

export const Overstayed = ({ Title, SmallTitle }) => {
    return (<Row className="border bg-light m-5 p-3 g-3" >
        <Col md={12}>
            <TitleSubTitle Title={Title} SmallTitle={SmallTitle} titleColor="beerskin2" />
        </Col>
        <Col md={12}>
            <Row className="d-flex  g-3 justify-content-around">
                <BeerColsTitleDesc
                    title1="Fanta Orange (Rwf >40k/day )" desc1=" Detailed Report for Orange" img1={fiesta}
                    title2="Fiesta (Rwf >71k/day )" desc2="Detailed Report Mutzig" img2={coke}
                    title3="Vitalo (Rwf >34k/day )" desc3="Detailed Amstel" img3={fantaorange}
                />
            </Row>
        </Col>
    </Row>)

}

export const TitleSubTitle = ({ Title, SmallTitle, titleColor }) => {
    return <Col md={12}>
        <h2 className={titleColor}>        {Title}      </h2>
        <h3>        {SmallTitle}          </h3>
    </Col>
}