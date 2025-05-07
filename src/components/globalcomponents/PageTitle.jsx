import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TitleSmallDesc } from './TitleSmallDesc'
import { ItemsContainer } from './ItemsContainer'
import { TextImage } from './TwoParts/TextImage'
import { TitleAndList } from './TitleAndList'
import { Footer } from '../Footer/Footer'
import { Splitter } from './Splitter'

export const PageTitle = ({ title, desc }) => {
    return (<>
        <ItemsContainer full={true}>
            <Col md={12} className='pageTitle p-3'>
                <TitleSmallDesc title={title} desc={desc} color="#483f0b" big={true} />
            </Col>
            
            

        </ItemsContainer>
       

        </>
    )
}
