import React, { forwardRef } from 'react'
import { Container, Row } from 'react-bootstrap'

export const ItemsContainer = forwardRef(({ children, full, moreclass, positioning }, ref) => {
    return full ? (
        <Container ref={ref} fluid className={`p-0 m-0 ${moreclass} `} >
            <Row className={` p-0 m-0 ${positioning}`}       >
                {children}
            </Row >
        </Container >
    ) : (
        <Container ref={ref} className={` pb-0 ${moreclass} `} >
            <Row className={`pb-0 ${positioning} `}      >
                {children}
            </Row>
        </Container>
    )



})
