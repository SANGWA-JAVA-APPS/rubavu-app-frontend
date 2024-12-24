import React from 'react'
import CardComp from './CardComp'
import { Col, Row } from 'react-bootstrap'
import { Slide } from 'react-reveal'
import { data } from 'jquery'

export const FourCards = ({data}) => {
    return (
        <Slide up cascade duration={1000} delay={300}  appear={true} fraction={0.5}>
            <Row   >
                <Col md={3}>
                    <CardComp title={data?.home?.secondCardOne} subtitle={data?.home?.secondCardTwo} description={data?.home?.secondCardThree} />
                </Col>
                <Col md={3}>
                    <CardComp />
                </Col>
                <Col md={3}>
                    <CardComp />
                </Col>
                <Col md={3}>
                    <CardComp />
                </Col>
            </Row>
        </Slide>

    )
}
