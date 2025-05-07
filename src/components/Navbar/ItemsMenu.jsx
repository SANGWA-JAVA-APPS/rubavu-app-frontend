import React from 'react'
import { ic_person_pin } from 'react-icons-kit/md/ic_person_pin'
import { gear as settings } from 'react-icons-kit/fa/gear'
import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'
import {    NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import OtherStyles from '../Styles/OtherStyles'
import Utils from '../Global/Utils'
import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom';
import { ic_add_task as item } from 'react-icons-kit/md/ic_add_task'
function ItemsMenu() {
    return (
        <>
            <NavDropdown className='menuDropdown' style={{ marginTop: '10px' }} color='#fff' title={
                <span style={navLinks} >
                    <Icon style={OtherStyles.iconStyles()} icon={item} size={24} />
                    Items
                </span>}>
                <Nav.Link style={navLinks} as={Link} to="/itemcategory">
                    <span style={{ color: '#824920', fontWeight: 'bolder' }}>
                        <Icon style={iconStyle} size={18} icon={struc} />
                        Category
                    </span>
                </Nav.Link>
                <Nav.Link style={navLinks} as={Link} to="/items">
                    <span style={{ color: '#824920', fontWeight: 'bolder' }}>
                        <Icon style={iconStyle} size={18} icon={struc} />
                        Items
                    </span>
                </Nav.Link>
            </NavDropdown>
        </>
    )
}

export default ItemsMenu