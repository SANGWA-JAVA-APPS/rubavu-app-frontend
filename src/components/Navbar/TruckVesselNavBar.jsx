import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { compass } from 'react-icons-kit/icomoon/compass'

import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'
import { ic_next_plan_twotone as more } from 'react-icons-kit/md/ic_next_plan_twotone'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { stack as deploy } from 'react-icons-kit/icomoon/stack'
import { useSignOut } from 'react-auth-kit';
import { strikethrough as debt } from 'react-icons-kit/fa/strikethrough'
import { useState } from 'react';
import { useEffect } from 'react';
import OtherStyles from '../Styles/OtherStyles';
import { ic_person_pin } from 'react-icons-kit/md/ic_person_pin'

import { ic_logout } from 'react-icons-kit/md/ic_logout'
import { ic_perm_phone_msg as phone } from 'react-icons-kit/md/ic_perm_phone_msg'
import { code } from 'react-icons-kit/fa/code'

import { Button, Col, Row } from 'react-bootstrap';
import '../Navbar/Navbar.css'
import { ic_location_on_outline as location } from 'react-icons-kit/md/ic_location_on_outline'
import { ic_email_outline as email } from 'react-icons-kit/md/ic_email_outline'
import { ic_facebook } from 'react-icons-kit/md/ic_facebook'
import { linkedin } from 'react-icons-kit/fa/linkedin'
import Utils from '../Global/Utils';
import { money } from 'react-icons-kit/fa/money';
import { BrandContext } from '../Global/BrandContext';
import { ic_add_task as item } from 'react-icons-kit/md/ic_add_task'
import { ic_view_list_outline as stockList } from 'react-icons-kit/md/ic_view_list_outline'
import UsersMenu from './UsersMenu';
import SettingsMenu from './SettingsMenu';
import { StockOrBisnessContext } from '../Global/StockOrBisness';
import { ColItemContext } from '../Global/GlobalDataContentx';
import OffCancasMenu from '../pages/Offcanvas/OffCancasMenu';
import MenuHightlight from './MenuHightlight';

function TruckVesselNavBar({ visible }) {


    const { bizType, setBizType } = useContext(StockOrBisnessContext)
    const { purchaseMenu } = useContext(ColItemContext)
    const { saleMenu } = useContext(ColItemContext)
    const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)

    const bisOrStock = bizType === 'business' ? "Tally In" : 'Purchase'
    /* #region  Functions */

    const signOut = useSignOut()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [userType, setUserType] = useState('')

    const logout = () => {

        localStorage.clear()
        try {
            // signOut()
        } catch (err) {
            console.log('Error while loggin out' + err)
        }

        window.location.replace('/login');
        // navigate('/logout')
        // alert('done')

    }

    const navLinks = {
        color: "#000",
        textDecoration: "none",
        fontWeight: "bolder",

        fontSize: "14px",
        // marginLeft: "12px"
        //  marginTop: '7px'
    };
    const navLinksmtop = {
        color: "#ccbbbb",
        textDecoration: "none",
        fontWeight: "bolder",

        fontSize: "14px",
        marginLeft: "12px"
        , marginTop: '10px',
        padding: '9px'

    };

    const nav_styles = {
        backgroundColor: '#fff',

        fontWeight: "bolder",
        zIndex: "1",

        BorderBottom: '1px solid #fff',

        /*To make it sticky*/
        position: '-webkit-sticky',
        position: 'sticky',
        zIndex: '7'

    };
    const companyBrand = {
        textShadow: 'none', color: '#fff'
    }


    const iconStyle = {
        color: "#2ccdf5",
        marginRight: Utils.SocialmediaiconSize

    };


    const changePassword = () => {
        // navigate('/changepassword')
    }
    const getSettings = (companyName) => {

    }
    useEffect(() => {

        getSettings('currency')
        const theusername = localStorage.getItem('token')
        const theUserType = localStorage.getItem('catname')
        if (theusername) {
            setUsername(localStorage.getItem('token'))
        }
        if (theUserType) {
            setUserType(localStorage.getItem('catname'))
        }
         document.body.style.backgroundColor = '#fff';
        // alert(username)
    }, [])

    const sticked = {

        position: 'sticky',
        top: '0',
        zIndex: '7'
    }
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }
    const hideSubmenu = () => {
        setIsCollapsed(false);
    };
    const { brandName, currency } = useContext(BrandContext);  // Access item1 and its setter

    const { showcanvaOne, setshowcanvaOne } = useContext(ColItemContext)

    const getof1 = () => {
        setshowcanvaOne(false)
    }

    /* #endregion */
    return (
        <> <MenuHightlight title='Truck => Vessel'/>
            
            <Navbar sticky="top" className={`navbar stckbarNavBar custom-navbar p-0 ${visible ? 'visible' : 'hidden'}`} collapseOnSelect expand="lg" style={nav_styles} >
                <Container fluid >

                    <a href="/"  > <div className='logo'>       </div>     </a>
                    {username && brandName && (<Navbar.Brand className="nav-brand" style={companyBrand} href="/">
                        {brandName}
                    </Navbar.Brand>)}

                    <Navbar.Toggle onClick={toggleMenu} aria-controls="responsive-navbar-nav " />
                    <Navbar.Collapse id="responsive-navbar-nav" in={!isCollapsed}>

                        {(username && brandName) &&
                            <Nav className="me-auto">
                                <Nav.Link style={navLinks} className="mt-2" as={Link} to="/tvvessel">
                                    <Icon style={iconStyle} size={18} icon={struc} />
                                    Vessel
                                </Nav.Link>
                                <Nav.Link style={navLinks} className="mt-2" as={Link} to="/tvbooking">
                                    <Icon style={iconStyle} size={18} icon={struc} />
                                    Booking
                                </Nav.Link>
                                <Nav.Link style={navLinks} className="mt-2" as={Link} to="/tvarrivalnote">
                                    <Icon style={iconStyle} size={18} icon={struc} />
                                    Arrival Note
                                </Nav.Link>
                                <Nav.Link style={navLinks} className="mt-2" as={Link} to="/tvtallyout">
                                    <Icon style={iconStyle} size={18} icon={struc} />
                                    Tally out
                                </Nav.Link>
                                <Nav.Link style={navLinks} className="mt-2" as={Link} to="/tvinvoice">
                                    <Icon style={iconStyle} size={18} icon={struc} />
                                    Invoice
                                </Nav.Link>

                                <Nav.Link style={navLinks} className="mt-2" as={Link} to="/tvpayment">
                                    <Icon style={iconStyle} size={18} icon={struc} />
                                    Payment
                                </Nav.Link>
                                <Nav.Link style={navLinks} className="mt-2" as={Link} to="/tvexit">
                                    <Icon style={iconStyle} size={18} icon={struc} />
                                    Exit
                                </Nav.Link>


                                {/* <Nav.Link style={Utils.navLinksmtop} as={Link} to="/debts">
                                    <Icon style={Utils.iconStyle} size={18} icon={debt} />
                                    Debts
                                </Nav.Link> */}

                                <NavDropdown className='menuDropdown d-none' style={{ marginTop: '10px' }} color='#fff' title={
                                    <span style={navLinks} >
                                        <Icon style={OtherStyles.iconStyles()} icon={money} size={24} />
                                        Finance
                                    </span>}>
                                    <Nav.Link style={navLinks} as={Link} to="/closing">
                                        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
                                            <Icon style={iconStyle} size={18} icon={struc} />
                                            Closing
                                        </span>
                                    </Nav.Link>
                                    <Nav.Link style={navLinks} as={Link} to="/funding">
                                        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
                                            <Icon style={iconStyle} size={18} icon={struc} />
                                            Funding
                                        </span>
                                    </Nav.Link>
                                    <Nav.Link style={navLinks} as={Link} to="/expenses">
                                        <span style={{ color: '#824920', fontWeight: 'bolder' }}>
                                            <Icon style={iconStyle} size={18} icon={struc} />
                                            Expenses
                                        </span>
                                    </Nav.Link>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar >


        </>
    )
}

export default TruckVesselNavBar