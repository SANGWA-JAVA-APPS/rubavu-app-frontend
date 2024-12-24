import React from 'react'
import { Col } from 'react-bootstrap'
import { TitleDesscNormal } from '../../../globalcomponents/TitleSmallDesc'
import { BadgeContent, TitleAndListNormal } from '../../../globalcomponents/TitleAndList'
import { useNavigate } from 'react-router-dom'

export const Berth = () => {

    const navigate = useNavigate()
    const gotoBollards = () => {
        navigate("/bollardsform")
    }
    const gotoUnberth = () => {
        navigate("/unberthform")

    }
    return (
        <>
            <Col md={12} className='lightBg p-5'>
                <TitleDesscNormal title={"Bollards"}
                    desc={
                        <TitleAndListNormal smallerTitleOn={true}
                            badge1={<>
                            </>}
                            eventOne={gotoBollards}
                            eventTwo={gotoUnberth}
                            li1="Berth"
                            li2="Unberth"
                             />

                    } />

            </Col>


        </>
    )
}
