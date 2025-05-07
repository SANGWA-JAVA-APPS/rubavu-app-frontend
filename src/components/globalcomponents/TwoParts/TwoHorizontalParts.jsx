import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { ItemsContainer } from '../ItemsContainer'

export const TwoHorizontalParts = ({ partOne, partTwo, moreClassOne,moreClassTwo }) => {
    return (
        <>
            <ItemsContainer>
                <Col style={{paddingBottom:'0px', position:'relative'}} className={`   scaleOnHoverParent ${moreClassOne} `} xs={12} sm={12} md={6}>{partOne}</Col>
                <Col style={{paddingBottom:'0px', position:'relative'}} className={`   scaleOnHoverParent ${moreClassTwo} `} xs={12} sm={12} md={6}>{partTwo}</Col>
            </ItemsContainer>
        </>
    )
}
