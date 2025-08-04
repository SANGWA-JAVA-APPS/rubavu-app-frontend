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

function SettingsMenu() {
  return (
    <NavDropdown className='menuDropdown' style={{ marginTop: '10px' }} color='#fff' title={
      <span style={Utils.navLinks} >
        <Icon style={OtherStyles.iconStyles()} icon={settings} size={24} />
        Utitlities
      </span>}>
     
      <Nav.Link style={Utils.navLinks} as={Link} to="/companyName">
        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
          <Icon style={Utils.iconStyle} size={18} icon={struc} />
          &nbsp;   Company name
        </span>
      </Nav.Link>
      <Nav.Link style={Utils.navLinks} as={Link} to="/currency">
        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
          <Icon style={Utils.iconStyle} size={18} icon={struc} />
          &nbsp;   Currency
        </span>
      </Nav.Link>
      <Nav.Link style={Utils.navLinks} as={Link} to="/anysetting">
        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
          <Icon style={Utils.iconStyle} size={18} icon={struc} />
          &nbsp;  M. Settings
        </span>
      </Nav.Link>

      <Nav.Link style={Utils.navLinks} as={Link} to="/userroles">
        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
          <Icon style={Utils.iconStyle} size={18} icon={struc} />
          &nbsp;  User roles
        </span>
      </Nav.Link>

      <Nav.Link style={Utils.navLinks} as={Link} to="/otherrevenues">
        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
          <Icon style={Utils.iconStyle} size={18} icon={struc} />
          &nbsp; Other revenues
        </span>
      </Nav.Link>

    </NavDropdown>
  )
}

export default SettingsMenu