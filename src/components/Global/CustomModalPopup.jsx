import React from 'react'
import { Button, Container, Modal, Row, Col } from 'react-bootstrap'

function CustomModalPopup(props) {
    return (
        <Modal size="lg" {...props}  aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton className=' modalStyle'>
                <Modal.Title id="contained-modal-title-vcenter">
                  {props.title}   
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example modalStyle">
                <Container>
                   {props.content}
                </Container>
            </Modal.Body>
            <Modal.Footer className='modalStyle'>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModalPopup