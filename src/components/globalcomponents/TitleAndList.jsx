import React from 'react'
import { Badge, Col, Row } from 'react-bootstrap'
import { Icon } from 'react-icons-kit'
import { arrowRight2 as tick } from 'react-icons-kit/icomoon/arrowRight2'
import { Slide } from 'react-reveal'
import { Link } from 'react-router-dom'

export const TitleAndListNormal = ({ title, li1, li2, li3, li4, eventOne, eventTwo,
    smallerTitleOn, lineHeightClass,
    badge1, badge2, badge3, badge4
}) => {
    return (
        <>
            <h2 className={`mb-3 ${smallerTitleOn ? 'smalleListTitle' : ''}`} style={{ fontSize: '13px' }} >{title}</h2>
            <ul>
                <li className={`${lineHeightClass} smallLineHeight`}>
                    <a style={{ textDecoration: 'none' }}
                        onClick={eventOne} href="#">
                        <Icon size={'16'} style={{ margin: 'auto 7px' }} icon={tick} />
                        {li1}
                    </a>
                    <BadgeItem bg="secondary" badge={badge1} />
                </li>
                {li2 && <li className={`${lineHeightClass} smallLineHeight`}><a style={{ textDecoration: 'none' }} onClick={eventTwo} href="#/"><Icon size={'16'} style={{ margin: 'auto 7px' }} icon={tick} />{li2}</a>
                    <BadgeItem badge={badge2} />
                </li>}
                {li3 && <li className={`${lineHeightClass} smallLineHeight`}><a style={{ textDecoration: 'none' }} href="#/"><Icon size={'16'} style={{ margin: 'auto 7px' }} icon={tick} />{li3}</a>
                    <BadgeItem badge={badge3} />
                </li>}
                {li4 &&
                    <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/"><Icon size={'16'} style={{ margin: 'auto 7px' }} icon={tick} />{li4}</a>
                        {badge4}
                    </li>
                }
            </ul>

        </>
    )
}
export const BadgeItem = ({ badge }) => {
    return (
        <Row>
            <Col md={12} className=''>
                <Row className="ms-5 d-flex justify-content-start">
                    {badge}
                </Row>
            </Col>
        </Row>)
}

export const BadgeContent = ({ content }) => {
    return (
        <Col className="col-auto" >
            <h6 className="mt-0"><Badge bg="dark"><Link to="#/" className="text-white">{content} </Link></Badge></h6>
        </Col>

    )
}


export const TitleAndList = ({ title, li1, li2, li3, li4, smallerTitleOn, lineHeightClass }) => {
    const iconSize = 15
    return (
        <>
            <h4 className={`mb-3 text-underline ${smallerTitleOn ? 'smalleListTitle' : ''}`} >{title}</h4>
            <ul>
                <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                    <Icon size={iconSize} style={{ margin: 'auto 7px' }} icon={tick} />
                    {li1} </a></li>
              {li2 &&  <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                    <Icon size={iconSize} style={{ margin: 'auto 7px' }} icon={tick} />{li2}</a></li>}
              {li3 && <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                    <Icon size={iconSize} style={{ margin: 'auto 7px' }} icon={tick} />{li3}</a></li>
              }  
                {li4 &&
                    <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                        <Icon size={'16'} style={{ margin: 'auto 7px' }} icon={tick} />{li4}</a></li>
                }
            </ul>
        </>
    )
}

export const TitleBigList = ({ title, li1, li2, li3, li4, li5,li6, smallerTitleOn, lineHeightClass }) => {
    const iconSize = 50
    return (
        <>
            <h2 className={`mb-3 ${smallerTitleOn ? 'smalleListTitle' : ''}`} >{title}</h2>
            <ul className="ms-0 ps-0">
                <li className={`${lineHeightClass} ms-0   `}><a style={{ textDecoration: 'none' }} href="#/">
                    {li1} </a></li>
                <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                    {li2}</a></li>
                <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                    {li3}</a></li>
                {li4 &&
                    <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                        {li4}</a></li>
                }
                {li5 &&
                    <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                        {li5}</a></li>
                }
                {li6 &&
                    <li className={lineHeightClass}><a style={{ textDecoration: 'none' }} href="#/">
                        {li6}</a></li>
                }
            </ul>
        </>
    )
}
