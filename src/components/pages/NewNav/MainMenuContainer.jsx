import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const MainMenuContainer = ({ children }) => {
    return (
        <Container fluid   >
            <Row className="d-flex justify-content-between " style={{ height: '100vh' }} >
                {children}
            </Row>
        </Container>
    )
}
