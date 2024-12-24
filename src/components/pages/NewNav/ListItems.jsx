import React from 'react'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { Col } from 'react-bootstrap'
import { Fade } from 'react-reveal'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import Icon from 'react-icons-kit'

export const ListItems = ({ title, desc, clickHandle, chosen, iconName }) => {
    return (
        <ItemsContainer full={true}>
            <Col xs={11} sm={11} md={12} onClick={clickHandle}
                className={`ms-0 mt-2 p-3 lightBg listItems rounded  ${chosen}`}>
                <Fade duration={500}>
                    <TitleSmallDesc title={<>
                        {iconName && <Icon size={30} style={{color:'#0b3059'}} className="me-2" icon={iconName} />}
                        {title}
                    </>}desc={desc} />
                </Fade>
            </Col>
        </ItemsContainer>
    )
}
