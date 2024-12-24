import React, { useState } from 'react'



import { Badge, Col, Container, Row } from 'react-bootstrap'
import { Fade, Slide } from 'react-reveal'
import { ListItems } from '../ListItems'
import { PathVesselHome } from '../BreadCrumb'
import { Link, useNavigate } from 'react-router-dom'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'

export const VesselSubMenu = () => {
    const navigate = useNavigate()
    const goToVesselPage = (e) => {
        e.preventDefault()
        navigate("/vesselform")
    }
    return (
        <>
            <Col md={12} className='lightBg p-5'>
                <TitleDesscNormal title={"Vessel"}
                    desc={
                        <TitleAndListNormal smallerTitleOn={true}
                            badge1={<>
                                {/* <BadgeContent content="new" />
                                <BadgeContent content="search entries by date" /> */}

                            </>}
                            eventOne={goToVesselPage}
                            li1="Add vessel"
                            

                        />

                    } />

            </Col>
            <Col md={12} className='lightBg p-5 mt-3'>
                <TitleDesscNormal title={" Unberth "}
                    desc={
                        <TitleAndListNormal smallerTitleOn={true}
                            badge1={<>
                                {/* <BadgeContent content="Pending" />
                                <BadgeContent content="Occupied" /> */}
                            </>}
                            li1="Search vessel"
                            li2="Search By client"
                            li3="Unfinished entries" />
                    } />
            </Col>

        </>
    )
}
