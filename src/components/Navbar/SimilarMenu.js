import React from 'react'
import { Nav } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom'

function SimilarMenu({navLinks,iconStyle,struc}) {
    return (<>
        <Nav.Link style={navLinks} className="mt-2" as={Link} to="/vessel">
            <Icon style={iconStyle} size={18} icon={struc} />
            Vessel
        </Nav.Link>
        <Nav.Link style={navLinks} className="mt-2" as={Link} to="/booking">
            <Icon style={iconStyle} size={18} icon={struc} />
            Booking
        </Nav.Link>
        <Nav.Link style={navLinks} className="mt-2" as={Link} to="/arrivalnote">
            <Icon style={iconStyle} size={18} icon={struc} />
            Arrival Note
        </Nav.Link>
    </>
    )
}

export default SimilarMenu