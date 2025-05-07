import React from 'react'
import { ItemsContainer } from './ItemsContainer'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { Icon } from 'react-icons-kit'
import {facebook as fb} from 'react-icons-kit/icomoon/facebook'
import {instagram as ig} from 'react-icons-kit/fa/instagram'
export const SocialLinks = () => {
    return (

        <ItemsContainer>
            <Col className="col-2">
                <Link target='_blank' to="https://www.facebook.com/profile.php?id=100089002448731&mibextid=kFxxJD">
                <Icon size={16} icon={fb}/>
            </Link>
            </Col>
            <Col className="col-2">
                <Link target='_blank' to="https://www.instagram.com/vnlimitedrwanda/profilecard/?igsh=bjc0aWFtczlpem92">
                <Icon size={16} icon={ig}/>
                </Link>
            </Col>
            
        </ItemsContainer>
    )
}
