import React from 'react'
import { TitleAndList } from './TitleAndList'
import { Col } from 'react-bootstrap'

export const AllProductsBenefits = () => {
    return (
        <>  <Col md={4}>
            <TitleAndList title="Dont miss Quality Biscuit."
                li1="Fresh cooking oil directly from our self-service oil ATM machines"
                li2="Choose the exact quantity you need with our innovative oil ATM solution"
                li3="Our premium cooking oil enhances the flavor of your meals."
                li4="Rich in essential nutrients, our cooking oil is perfect for frying, sautéing, and baking."
                lineHeightClass="nutList" smallerTitleOn={true} />
        </Col>
            <Col md={4}>
                <TitleAndList title="Dont miss Health and tasty oil"
                    li1="Fresh cooking oil directly from our self-service oil ATM machines"
                    li2="Choose the exact quantity you need with our innovative oil ATM solution"
                    li3="Our premium cooking oil enhances the flavor of your meals."
                    li4="Rich in essential nutrients, our cooking oil is perfect for frying, sautéing, and baking."
                    lineHeightClass="nutList" smallerTitleOn={true} />
            </Col>
            <Col md={4}>
                <TitleAndList title="Groundnuts read for:"
                    li1="Blend roasted" li2="Peanut Sauce, stir-fries or stews" li3="Roasting"
                    lineHeightClass="nutList" smallerTitleOn={true} />
            </Col>
        </>
    )
}
