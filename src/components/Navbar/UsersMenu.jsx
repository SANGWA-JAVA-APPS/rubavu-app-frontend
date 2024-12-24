import React from 'react'
import { ic_person_pin } from 'react-icons-kit/md/ic_person_pin'
import { gear as settings } from 'react-icons-kit/fa/gear'
import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'
import { NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import OtherStyles from '../Styles/OtherStyles'
import Utils from '../Global/Utils'
import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom';
function UsersMenu({navLinks,userChosen, clickHandler}) {
  return (
    <>
      <Nav.Link className={userChosen?'underlineMenu':''} onClick={clickHandler} style={Utils.navLinksmtop} as={Link} to="/user">
        <span style={Utils.navLinks} >
          <Icon style={Utils.iconStyle} size={23} icon={ic_person_pin} />
          Users
        </span>
      </Nav.Link>

    </>
  )
}

export default UsersMenu