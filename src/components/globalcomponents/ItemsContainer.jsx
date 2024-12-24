import React from 'react'
import { Container, Row } from 'react-bootstrap'

export const ItemsContainer = ({ children, full, moreclass }) => {
    return full ? (
        <Container fluid className={`p-0 m-0 ${moreclass} `} >
            < Row className="p-0 m-0" >
                {children}
            </Row >
        </Container >
        )        : (
            <Container className={` pb-0 ${moreclass} `} >
                <Row className="pb-0  ">
                    {children}
                </Row>
            </Container>
        )



}
