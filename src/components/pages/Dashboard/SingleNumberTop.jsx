import React from 'react'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { Col, Container, Row } from 'react-bootstrap'
import { WidthFull } from '@mui/icons-material'
import { Icon } from 'react-icons-kit'
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { truck } from 'react-icons-kit/icomoon/truck'
import { ic_attach_money_outline as money } from 'react-icons-kit/md/ic_attach_money_outline'
import { useState } from 'react'
import { useContext } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
export const SingleNumberTop = ({ topRightTxt1, topRightTxt2, topRightTxt3, topRightTxt4, dataTodisplay ,
    bottomLeftTxt1, bottomLeftTxt2, bottomLeftTxt3, clickHandler
}) => {
    return (
        <Container fluid>
            <Row className="m-5 mt-5" style={{}}>
                <SingleNumCol topRightTxt1="Vessels" clickHandler={clickHandler}   topRightTxt2={`RWF ${topRightTxt1}`} bottomLeftTxt1={bottomLeftTxt1} bottomLeftTxt2="" bg="c1" icon={boat}         dataTodisplay={dataTodisplay} />
                <SingleNumCol topRightTxt1="Trucks" clickHandler={clickHandler}     topRightTxt2={`RWF ${topRightTxt2}`} bottomLeftTxt1={bottomLeftTxt2} bottomLeftTxt2=""   bg="c2" icon={truck}           dataTodisplay={dataTodisplay} />
                <SingleNumCol topRightTxt1="Cargo" clickHandler={clickHandler}     topRightTxt2={`RWF ${topRightTxt3}`} bottomLeftTxt1={bottomLeftTxt3} bottomLeftTxt2=""    bg="c3" icon={truck}           dataTodisplay={dataTodisplay} />
                <SingleNumCol topRightTxt1="All Revenue" clickHandler={clickHandler}     topRightTxt2={`RWF ${topRightTxt4}`} bottomLeftTxt1="" bottomLeftTxt2=""  bg="c4" icon={money}         dataTodisplay={dataTodisplay} />
                {/* <SingleNumCol topRightTxt1="Incoming" topRightTxt2={`RWF ${topRightTxt4}`} bottomLeftTxt1="" bottomLeftTxt2=""  bg="c4" icon={money}         dataTodisplay={dataTodisplay} /> */}

            </Row>
        </Container>
    )
}
export const CustomCardRows = ({ topRightTxt1, topRightTxt2, bottomLeftTxt1, bottomLeftTxt2 ,dataTodisplay}) => {
    const { cardIconShow } = useContext(ColItemContext)
    return <Row className="d-flex   align-content-between p-3 " data-data-to-display={dataTodisplay} style={{ height: '100%' }}>
        <div className='  row ms-2 d-flex justify-content-end '  >

            {cardIconShow ? (<div className='d-flex flex-row justify-content-end'>
                <div className='d-flex flex-column'>
                    <h6>{topRightTxt1}</h6>
                    <b>{topRightTxt2}</b>
                </div>
            </div>) : (<div className='d-flex flex-row justify-content-between'>
                {/* <div className='d-flex flex-row'> */}
                <div>{topRightTxt1}</div>
                <div> <b>{topRightTxt2}</b></div>
                {/* </div> */}
            </div>)}

        </div >
        <div className='  row ms-2  d-flex flex-row justify-content-start' style={{ fontSize: '13px' }}>
            <div>
                <span style={{ color: 'green', }}>{bottomLeftTxt1}</span>
                <span style={{ color: '#7b7b7b' }}  >  {bottomLeftTxt2}</span></div >
        </div>
    </Row>
}

export const SingleNumCol = ({ topRightTxt1 = "Booking", topRightTxt2 = "281", bottomLeftTxt1 = "+55%", bottomLeftTxt2 = "than last week", bg, icon, clickHandler, dataTodisplay }) => {

    const { cardIconShow, cardBg, cardHeight, colSize, colWidth,showModal, setShowModal, modalTitle, setDataTodisplayInModal, setMOdalTitle } = useContext(ColItemContext)
    const setupModal = () => {

        setShowModal(true)
        
        setMOdalTitle(topRightTxt1)

        
        // setDataTodisplayInModal(topRightTxt1)
    }
    return (
        <Col className='' md={colSize} onClick={clickHandler}>
            <div onClick={setupModal} className={`castomCard  redBorderWhite  p-0 ${cardBg}`} style={{ height: cardHeight, width: colWidth }}  >
                {cardIconShow && <div className={`cardIcon shadow ${bg}`}>
                    <Icon size={'70%'} style={{ marginLeft: '15%', marginTop: '10px' }} icon={icon} />
                </div>}
                <CustomCardRows topRightTxt1={topRightTxt1} topRightTxt2={topRightTxt2} bottomLeftTxt1={bottomLeftTxt1} 
                bottomLeftTxt2={bottomLeftTxt2} dataTodisplay={dataTodisplay} />
            </div>
        </Col>)
}
export const SingleNumColCustomClick = ({clickEvent, topRightTxt1 = "Booking", topRightTxt2 = "281", bottomLeftTxt1 = "+55%", bottomLeftTxt2 = "than last week", bg, icon, clickHandler }) => {

    const { cardIconShow, cardBg, cardHeight, colSize, colWidth, setShowModal, modalTitle, setMOdalTitle } = useContext(ColItemContext)
    
    return (
        <Col className='' md={colSize} onClick={clickHandler}>
            <div onClick={clickEvent} className={`castomCard  redBorderWhite  p-0 ${cardBg}`} style={{ height: cardHeight, width: colWidth }}  >
                {cardIconShow && <div className={`cardIcon shadow ${bg}`}>
                    <Icon size={'70%'} style={{ marginLeft: '15%', marginTop: '10px' }} icon={icon} />
                </div>}
                <CustomCardRows topRightTxt1={topRightTxt1} topRightTxt2={topRightTxt2} bottomLeftTxt1={bottomLeftTxt1} bottomLeftTxt2={bottomLeftTxt2} />
            </div>
        </Col>)
}
// the below "SingleNumColSamPage" is same as "SingleNumCol" but on the same page the colSizeTwo has its own size from the one of "SingleNumCol" so that they have differet values
export const SingleNumColSamPage = ({ topRightTxt1 = "Booking", topRightTxt2 = "281", bottomLeftTxt1 = "+55%", bottomLeftTxt2 = "than last week", bg, icon, clickHandler }) => {

    const { cardIconShow, cardBg, cardHeight, colSizeTwo, colWidth, setShowModal } = useContext(ColItemContext)
    return (
        <Col className='' md={colSizeTwo} >
            <div onClick={() => setShowModal(true)} className={`castomCard redBorderWhite   p-0 ${cardBg}`} style={{ height: cardHeight, width: colWidth }}  >
                {cardIconShow && <div className={`cardIcon shadow ${bg}`}>
                    <Icon size={'70%'} style={{ marginLeft: '15%', marginTop: '10px' }} icon={icon} />
                </div>}
                <CustomCardRows topRightTxt1={topRightTxt1} topRightTxt2={topRightTxt2} bottomLeftTxt1={bottomLeftTxt1} bottomLeftTxt2={bottomLeftTxt2} />
            </div>
        </Col>)
}
export const SingleNumColSamPageCustomClick = ({clickEvent, topRightTxt1 = "Booking", topRightTxt2 = "281", bottomLeftTxt1 = "+55%", bottomLeftTxt2 = "than last week", bg, icon, clickHandler }) => {

    const { cardIconShow, cardBg, cardHeight, colSizeTwo, colWidth, setShowModal } = useContext(ColItemContext)
    return (
        <Col className='' md={colSizeTwo} >
            <div onClick={clickEvent} className={`castomCard redBorderWhite   p-0 ${cardBg}`} style={{ height: cardHeight, width: colWidth }}  >
                {cardIconShow && <div className={`cardIcon shadow ${bg}`}>
                    <Icon size={'70%'} style={{ marginLeft: '15%', marginTop: '10px' }} icon={icon} />
                </div>}
                <CustomCardRows topRightTxt1={topRightTxt1} topRightTxt2={topRightTxt2} bottomLeftTxt1={bottomLeftTxt1} bottomLeftTxt2={bottomLeftTxt2} />
            </div>
        </Col>)
}
export const SingleNumColSamPageThree = ({ topRightTxt1 = "Booking", topRightTxt2 = "281", bottomLeftTxt1 = "+55%", bottomLeftTxt2 = "than last week", bg, icon }) => {

    const { cardIconShow, cardBg, cardHeight, colSizeTwo, colWidth } = useContext(ColItemContext)
    return (
        <Col className='' md={colSizeTwo}>
            <div className={`castomCard    p-0 ${cardBg}`} style={{ height: cardHeight, width: colWidth }}  >
                {cardIconShow && <div className={`cardIcon shadow ${bg}`}>
                    <Icon size={'70%'} style={{ marginLeft: '15%', marginTop: '10px' }} icon={icon} />
                </div>}
                <CustomCardRows topRightTxt1={topRightTxt1} topRightTxt2={topRightTxt2} bottomLeftTxt1={bottomLeftTxt1} bottomLeftTxt2={bottomLeftTxt2} />
            </div>
        </Col>)
}