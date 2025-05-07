import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const YesNoDialog = ({ show, handleClose, handleYes, confirm }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to proceed?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={confirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
