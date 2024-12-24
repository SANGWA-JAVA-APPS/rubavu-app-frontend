import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'

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

import { Button, Col, Row } from 'react-bootstrap';
import '../Navbar/Navbar.css'
import Utils from '../Global/Utils';
import { money } from 'react-icons-kit/fa/money';
import { BrandContext } from '../Global/BrandContext';
import UsersMenu from '../Navbar/UsersMenu'
import SettingsMenu from '../Navbar/SettingsMenu';
import { StockOrBisnessContext } from '../Global/StockOrBisness';
import { ColItemContext } from '../Global/GlobalDataContentx';
import OffCancasMenu from '../pages/Offcanvas/OffCancasMenu';
import StockNavBar from '../Navbar/StockNavBar';
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { truck } from 'react-icons-kit/icomoon/truck'

function LevelOne({ visible }) {


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
        color: "#fff",
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
        backgroundColor: OtherStyles.bg(),

        fontWeight: "bolder",
        zIndex: "1",

        borderBottom: '6px solid orange',

        /*To make it sticky*/
        position: '-webkit-sticky',
        position: 'sticky',
        zIndex: '7',
        height: ' 90px'

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
        document.body.style.backgroundColor = Utils.skinBg1();
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


    const [homeChosen, setHomeChosen] = useState(true)
    const [berthChosen, setBerthChosen] = useState(false)
    const [opsChosen, setOpsChosen] = useState(false)
    const [userChosen, setUserChosen] = useState(false)
    const [gateChosen, setGateChosen] = useState(false)

    const homeChosenHandler = () => {
        setHomeChosen(true)
        setBerthChosen(false)
        setOpsChosen(false)
        setUserChosen(false)
        setGateChosen(false)
    }
    const berthChosenHandler = () => {
        setHomeChosen(false)
        setBerthChosen(true)
        setOpsChosen(false)
        setUserChosen(false)
        setGateChosen(false)
    }
    const opsChosenHandler = () => {
        setHomeChosen(false)
        setBerthChosen(false)
        setOpsChosen(true)
        setUserChosen(false)
        setGateChosen(false)
    }
    const userChosenHandler = () => {
        setHomeChosen(false)
        setBerthChosen(false)
        setOpsChosen(false)
        setUserChosen(true)
        setGateChosen(false)
    }
    const gateChosenHandler = () => {
        setHomeChosen(false)
        setBerthChosen(false)
        setOpsChosen(false)
        setUserChosen(false)
        setGateChosen(true)
    }




    /* #endregion */
    return (
        <>
            <OffCancasMenu show={showcanvaOne} onHide={getof1} />
            <Navbar sticky="top" className={`navbar custom-navbar p-0 ${visible ? 'visible' : 'hidden'}`} collapseOnSelect expand="lg" style={nav_styles} >
                <Container fluid >
                    {/* <Button onClick={() => setshowcanvaOne(true)} className='CustomHumuberger'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </Button> */}
                    <a href="/"  > <div className='logo'>       </div>     </a>
                    {username && brandName && (<Navbar.Brand className="nav-brand" style={companyBrand} href="/">
                        {brandName}
                    </Navbar.Brand>)}

                    <Navbar.Toggle onClick={toggleMenu} aria-controls="responsive-navbar-nav " />
                    <Navbar.Collapse id="responsive-navbar-nav" in={!isCollapsed}>

                        <Nav className="me-auto">

                            {!username ?
                                <Nav.Link onClick={homeChosenHandler} className={homeChosen ? 'underlineMenu' : ''} style={navLinksmtop} as={Link} to="/home">
                                    <span style={Utils.navLinks} >
                                        {/* <Icon style={iconStyle} size={18} icon={struc} /> */}
                                        Home
                                    </span>
                                </Nav.Link>
                                :
                                <Nav.Link onClick={homeChosenHandler} className={homeChosen ? 'underlineMenu' : ''} style={navLinksmtop} as={Link} to="/dashboard">
                                    <span style={Utils.navLinks} >
                                        {/* <Icon style={iconStyle} size={18} icon={struc} /> */}
                                        Home
                                    </span>
                                </Nav.Link>
                            }

                            {(username && brandName) && (<>
                                <Nav.Link onClick={berthChosenHandler} className={berthChosen ? 'underlineMenu' : ''} style={Utils.navLinksmtop} as={Link} to="/vessel">
                                    <span style={Utils.navLinks} >
                                        <Icon style={Utils.iconStyle} size={24} icon={boat} />
                                        Berth
                                    </span>
                                </Nav.Link>
                                <Nav.Link onClick={gateChosenHandler} className={gateChosen ? 'underlineMenu' : ''} style={Utils.navLinksmtop} as={Link} to="/gate">
                                    <span style={Utils.navLinks} >
                                        <Icon style={Utils.iconStyle} size={18} icon={truck} />
                                        Gate
                                    </span>
                                </Nav.Link>
                                <Nav.Link onClick={opsChosenHandler} className={opsChosen ? 'underlineMenu' : ''} style={Utils.navLinksmtop} as={Link} to="/ops">
                                    <span style={Utils.navLinks} >
                                        <Icon style={Utils.iconStyle} size={18} icon={truck} />
                                        OPS
                                    </span>
                                </Nav.Link>

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
                            </>)


                            }

                        </Nav>


                        {username && brandName &&
                            <Nav>
                                {userType == 'admin' &&

                                    <><UsersMenu navLinks={navLinks} userChosen={userChosen} clickHandler={userChosenHandler} />

                                        <SettingsMenu />
                                    </>
                                }
                            </Nav>
                        }
                        <Nav>
                            {(username && brandName) ?
                                <NavDropdown className='menuDropdown' style={{ marginTop: '10px' }} color='#fff' title={
                                    <span style={navLinks} >
                                        <Icon style={OtherStyles.iconStyles()} icon={ic_person_pin} size={24} />
                                        {localStorage.getItem('catname') !== null ?
                                            <>
                                                {localStorage.getItem('name')} {localStorage.getItem('surname')}
                                                <span> (</span>
                                                {localStorage.getItem('catname')}
                                                <span>)</span>
                                            </>
                                            : 'Login'}

                                    </span>
                                } id="collasible-nav-dropdowns">
                                    <NavDropdown.Divider />
                                    <>
                                        <Nav.Link as={Link} onClick={logout}>
                                            <span style={{ color: '#824920', fontWeight: 'bolder' }}>
                                                <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                                Logout
                                            </span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/changepassword" onClick={changePassword}>
                                            <span style={{ color: '#824920', fontWeight: 'bolder' }}>
                                                <Icon style={OtherStyles.iconStyles()} size={22} icon={ic_logout} />
                                                Credentials
                                            </span>
                                        </Nav.Link>

                                    </>

                                </NavDropdown>

                                :
                                <Nav.Link onClick={toggleMenu} style={navLinks} as={Link} to="/login">
                                    <Icon style={OtherStyles.iconStyles()} size={22} icon={deploy} />
                                    Login
                                </Nav.Link>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >


        </>
    )
}

export default LevelOne