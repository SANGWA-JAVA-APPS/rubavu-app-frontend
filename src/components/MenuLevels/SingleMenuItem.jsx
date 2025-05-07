import React from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import Utils from '../Global/Utils';
export const SingleMenuItem = ({ onClick, isChosen, to = "/vessel", text = "Berth", icon = 'boat' }) => {
    return (
        <Nav.Link onClick={onClick} className={isChosen ? 'underlineMenu' : ''}
            style={Utils.navLinksmtop} as={Link} to={to}>
            <span style={Utils.navLinks}>
                <Icon style={Utils.iconStyle} size={20} icon={icon} />
                {text}
            </span>
        </Nav.Link>
    )
}


 