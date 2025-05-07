import React, { useContext, useEffect, useState } from 'react'
import { ItemsContainer } from '../../../globalcomponents/ItemsContainer'
import { Col, Form, Row } from 'react-bootstrap'
import { PathOpsHome } from '../BreadCrumb'
import { Link, useNavigate } from 'react-router-dom'
import { TitleSmallDesc } from '../../../globalcomponents/TitleSmallDesc'
import { SmallerSplitter, SmallSplitter, Splitter } from '../../../globalcomponents/Splitter'
import Entry from '../../Entry/Entry'
import Arrival_note from '../../Arrivalnote/Arrival_note'
import TVTallyIn from '../../TruckWh/TVTallyIn'


import Exits from '../../Exit/Exits'
import { Client } from '../../../Client/Client'
import Clients from '../NewProcesses/Clients'
import Arrival from '../NewProcesses/Arrival'
import Tally from '../NewProcesses/Tally'

import { Invoice } from '../NewProcesses/Invoice'
import { Payment } from '../NewProcesses/Payment'
import ProcExit from '../NewProcesses/ProcExit'
import { ColItemContext } from '../../../Global/GlobalDataContentx'
import { TwoHorizontalParts } from '../../../globalcomponents/TwoParts/TwoHorizontalParts'
import { DropDownInput } from '../../../Global/InputRow'
import StockRepository from '../../../services/StockServices/StockRepository'
import { Submenu } from '../ProcSubMenu/Submenu'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TallyForm from '../../Tally/TallyForm'
import Purchase from '../../Purchase/Purchases'
import Sales from '../../sale/Sales'
import CustomModalPopup from '../../../Global/CustomModalPopup'
import PagesWapper from '../../../Global/PagesWapper'
import { useAuthHeader } from 'react-auth-kit'


export const Generic = () => {
    const { chosenProcess, chosenProcessCategory, setSourceId, setdestId,
        arrivalPage, setArrivalPage, tallyPage, setTallyPage, purchasePage, setPurhchasePage, salePage, setSalePage,
        invoicePage, setInvoicePage, receiptPage, seReceiptPage, exitPage, seExitPage

    } = useContext(ColItemContext)

    const [trucks, setTrucks] = useState([])
    const [vessels, setVessels] = useState([])
    const [dataLoad, setDataLoad] = useState(false)

 const authHeader = useAuthHeader()();
    const getAllVessels = (page, size) => {
        StockRepository.findVessel(authHeader).then((res) => {
            setVessels(res.data);
            setDataLoad(true)

        });
    }
    const getAllTrucks = () => {
        StockRepository.getAllTruck(authHeader).then((res) => {
            setTrucks(res.data);
            setDataLoad(true)

        });
    }
    const navigate = useNavigate()
    useEffect(() => {
        document.body.style.backgroundColor = '#fff'
        if (!chosenProcess || !chosenProcessCategory) {
            navigate("/ops")
            // console.log('-----------------choseproc or chosenproccat is set not chosenProc: ' + chosenProcess + ' cat: ' + chosenProcessCategory)
        } else {
            // console.log('-----------------choseproc or chosenproccat is set chosenProc: ' + chosenProcess + ' cat: ' + chosenProcessCategory)
        }

        const interval = setInterval(() => {
            if (!chosenProcess || !chosenProcessCategory) {
                navigate("/ops");
                // console.log('chosenProc or chosenProcCat is NOT set. chosenProc: ' + chosenProcess + ' cat: ' + chosenProcessCategory);
            } else {
                // console.log('chosenProc or chosenProcCat IS set. chosenProc: ' + chosenProcess + ' cat: ' + chosenProcessCategory);
            }
        }, 500); // Runs every 500 milliseconds

        return () => clearInterval(interval); // Cleanup interval on component unmount

    }, [chosenProcess, chosenProcessCategory, navigate])

    useEffect(() => {
        getAllVessels()
        getAllTrucks()
        
        
    }, [])

    return (
        <>
        <PagesWapper>
            <ItemsContainer>
                {/* <PathOpsHome >
                    <Col className="col-auto p-0 m-0 ms-2"> <Link to="/startproc">{chosenProcess}</Link></Col>
                </PathOpsHome> */}
                <SmallerSplitter/>
                <Submenu />
                <Row className="p-0"  style={{marginTop:'10px'}}>
                    
                </Row>
                <hr/>
                <SmallerSplitter />
                <Col md={12} className=" ">
                    
                    {arrivalPage && <Arrival />}

                     
                    {/* <Tally /> */}
                    {tallyPage && <TallyForm />}
                    {purchasePage && <Purchase />}
                    {salePage && <Sales />}

                    {invoicePage && <Invoice />}
                    {receiptPage && <Payment />}
                    {exitPage && <ProcExit />}

                    {/* From warehouse,
                    1. Client to be chosen
                    2. arrival to be chosen by client name or surname
                    3.  Make some warehouse tally 
                    4.  Get the tarrif from the table
                    5.  Deduct the quantities
                    6. make invoice based on tariff
                    
                    7. Add weight on each tally  */}
                </Col>
                <Splitter/>
            </ItemsContainer>
      </PagesWapper> 
       </>
        
    )
}
