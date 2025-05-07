import React from 'react'
import { useContext } from 'react'
import { Button, Container, Modal, Row, Col } from 'react-bootstrap'
import { ColItemContext } from './GlobalDataContentx'

function CustomModalPopup(props) {
    const {modalSize}=useContext(ColItemContext)
    return (
        <Modal fullscreen={props.fullscreen?true:false}   dialogClassName={`modal-90w h-75 ${modalSize}  mw-100 mh-100`} 
         show={props.show} size="lg" {...props} onHide={props.onHide}  centered={props.centered}
          aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton className=' modalStyle'>
                <Modal.Title id="contained-modal-title-vcenter">
                  {props.title}   
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example modalStyle styledVHScrollBar" style={{backgroundColor:'#ccc', overflowX:'scroll'}}>
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