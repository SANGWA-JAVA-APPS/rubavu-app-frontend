import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { ColItemContext } from '../../../Global/GlobalDataContentx';
import Icon from 'react-icons-kit';
import { checkmark as tick } from 'react-icons-kit/icomoon/checkmark'
export const Submenu = () => {
    const { chosenProcess, chosenProcessCategory,
        setArrivalPage, setTallyPage, setPurchasePage, setSalePage,
        setInvoicePage, setReceiptPage, setExitPage } = useContext(ColItemContext)
    const pageSetter = (item) => {
        if (item === 'arrival') { //arrival
            setAllToFalse()
            setArrivalPage(true)
        } else if (item === 'tally') {
            setAllToFalse()
            if (chosenProcess === 'Warehouse Truck' || chosenProcess === 'Warehouse Vessel') {
                setPurchasePage(false)
                setArrivalPage(false)
                setTallyPage(false)
                setInvoicePage(false)
                setReceiptPage(false)
                setExitPage(false)
                setSalePage(true)
            }
            if (chosenProcess === 'Truck Warehouse' || chosenProcess === 'Vessel Warehouse') {

                setArrivalPage(false)
                setInvoicePage(false)
                setReceiptPage(false)
                setExitPage(false)
                setSalePage(true)
                setTallyPage(false)
                setPurchasePage(true)
            }
            if (
                chosenProcess === 'Truck Truck' ||
                chosenProcess === 'Vessel Vessel' ||
                chosenProcess === 'Truck Vessel' ||
                chosenProcess === 'Vessel Truck') {
                setPurchasePage(false)
                setArrivalPage(false)
                setInvoicePage(false)
                setReceiptPage(false)
                setExitPage(false)
                setSalePage(false)
                setTallyPage(true)
            }


        } else if (item === 'inv') {
            setAllToFalse()
            setInvoicePage(true)
        } else if (item === 'rec') {
            setAllToFalse()
            setReceiptPage(true)
        } else if (item === 'ext') {
            setAllToFalse()
            setExitPage(true)
        }
    }
    const setAllToFalse = () => {
        setPurchasePage(false)
        setSalePage(false)
        setArrivalPage(false)
        setTallyPage(false)
        setInvoicePage(false)
        setReceiptPage(false)
        setExitPage(false)
    }
    return (
        <>
            <Container>
                <Row>

                    <Col className="col-auto" style={{ position: 'relative' }}>
                        <a style={{ color: '#000', }} onClick={() => pageSetter('arrival')} className="btn fw-bold btn-outline-info"> Arrival</a>
                        <Icon size={16} icon={tick} style={{
                            position: 'absolute', top: '-10px', color:'#fff', borderRadius: '100%',
                            backgroundColor: 'green', right: '8px'
                        }} />
                    </Col>
                    <Col className="col-auto d-none">
                        <a style={{ color: '#000', }} onClick={() => pageSetter('tally')} className="btn fw-bold   btn-outline-info"> Tally</a></Col>
                    <Col className="col-auto">
                        <a style={{ color: '#000', }} onClick={() => pageSetter('inv')} className="btn fw-bold  btn-outline-info"> Invoice</a></Col>
                    <Col className="col-auto">
                        <a style={{ color: '#000', }} onClick={() => pageSetter('rec')} className="btn fw-bold  btn-outline-info"> Receipt</a></Col>
                    <Col className="col-auto">
                        <a style={{ color: '#000', }} onClick={() => pageSetter('ext')} className="btn fw-bold  btn-outline-info"> Exit</a></Col>

                </Row>
            </Container >
        </>
    )


}
