import { color } from 'framer-motion';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Splitter } from './Splitter';

export const MediumModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered  >
            <Modal.Header closeButton>
                {/*   <Modal.Title id="contained-modal-title-vcenter">
                  {props.title}
                </Modal.Title>*/}
            </Modal.Header>
            <Modal.Body>
                <img src={props.src} width="100%" className='mx-auto img-fluid' />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

  }
    export const SmallModal = (props) => {
        return (<Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered  >
            <Modal.Header closeButton>
                {/*   <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
            </Modal.Title>*/}
            </Modal.Header>
            <Modal.Body>
                <h2 style={{textAlign:'center'}} className=''>You can call this number for the quick delivery of <span style={{color:'#ffa200'}}> {props.productToOrder} </span></h2>
                <Splitter/>
                <p style={{textAlign:'center'}} > <h2> <Link href="tel:+250788201179">+250 788 201 179</Link></h2> </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        )
  
}
