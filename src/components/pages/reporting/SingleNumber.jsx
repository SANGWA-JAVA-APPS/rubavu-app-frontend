import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { SingleNumCol, SingleNumColSamPage } from '../Dashboard/SingleNumberTop'

import { Icon } from 'react-icons-kit'
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { truck } from 'react-icons-kit/icomoon/truck'
import { ic_attach_money_outline as money } from 'react-icons-kit/md/ic_attach_money_outline'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import { TitleDesscNormal, TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { PdfItem, SummaryAndPrintPdf } from './SummaryAndPrintPdf'
import { ChartComponent, SampleLineChartData } from '../Dashboard/ThreeCharts'
export const SingleNumber = () => {
    const { cardIconShow, setIconShow,setColSizeTwo, cardBg} = useContext(ColItemContext)
    useEffect(() => {
        setIconShow(false) //hide the icon on the cards
        setColSizeTwo(2)
    }, [])
    return (
        <Row className="" style={{}}>
            
            <SingleNumCol topRightTxt1="Booking" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumCol topRightTxt1="Berthing" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumCol topRightTxt1="Payment Advice" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumCol topRightTxt1="Berthing Receipts" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />

            <SmallSplitter />
            <SingleNumColSamPage topRightTxt1="Trucks" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumColSamPage topRightTxt1="Parking Invoices" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumColSamPage topRightTxt1="Handling Invoices" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumColSamPage topRightTxt1="W/H Invoices" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumColSamPage topRightTxt1="Inventory" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SingleNumColSamPage topRightTxt1="Clients" topRightTxt2="0" bottomLeftTxt1="+55%" bottomLeftTxt2="than last week" bg="c1" icon={boat} />
            <SmallSplitter />
            <Row className="ms-0 mt-3 bg-light ">
                <Col md={8} className={`col-offset-md-3 ${cardBg} `}>
                    <Col className="p-3"><b>Unreceipted Invoices</b></Col>
                    <Col><ChartComponent  /></Col>
                    <Col className="p-3"><b>Pending Exits</b></Col>
                    <Col><ChartComponent  /></Col>
                </Col>
                <Col md={4} className="col-offset-md-3">
                    <SummaryAndPrintPdf TopTitle="invoice" children={<>
                        {PdfList.map((item, index) => (
                            <PdfItem key={index} leftTitle={item.type} leftSummary={item.number} rightValue={item.amount} />
                        ))}
                    </>} />   
                </Col>
            </Row>
        </Row>
    )
}

export const PdfList = [
    { 'type': 'berthing', 'number': '#23243', 'amount': 230.0 },
    { 'type': 'Cargo', 'number': '#23243', 'amount': 230.0 },
    { 'type': 'berthing', 'number': '#23243', 'amount': 330.0 },
    { 'type': 'Parking', 'number': '#23243', 'amount': 430.0 },
    { 'type': 'Handling', 'number': '#23243', 'amount': 530.0 },
    { 'type': 'Quy', 'number': '#23243', 'amount': 630.0 },
    { 'type': 'berthing', 'number': '#23243', 'amount': 230.0 },
    { 'type': 'Cargo', 'number': '#23243', 'amount': 230.0 },
    { 'type': 'berthing', 'number': '#23243', 'amount': 330.0 },
    { 'type': 'Parking', 'number': '#23243', 'amount': 430.0 },
    { 'type': 'Handling', 'number': '#23243', 'amount': 530.0 },
    { 'type': 'Quy', 'number': '#23243', 'amount': 630.0 }

]
