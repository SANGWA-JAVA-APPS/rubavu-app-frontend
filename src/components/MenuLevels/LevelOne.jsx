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
import { useAuthUser } from 'react-auth-kit'; // Adjust import based on your library
import { SingleMenuItem } from './SingleMenuItem';
function LevelOne({ visible }) {
    const { bizType, setBizType } = useContext(StockOrBisnessContext)
    const { purchaseMenu, userMenuType, setUserMenuType, setIconShow, setCordBg, setIconHeight, setColSize, setColWidth, setColSizeTwo } = useContext(ColItemContext)
    const { saleMenu } = useContext(ColItemContext)
    const bisOrStock = bizType === 'business' ? "Tally In" : 'Purchase'
    /* #region  Functions */

    const signOut = useSignOut()

    const navigate = useNavigate()
    const userAuthenticated = useAuthUser(); // Returns authState or null

    const [username, setUsername] = useState('')
    const [userType, setUserType] = useState('')

    const logout = () => {

        localStorage.clear()
        signOut();
        try {
            // signOut()
        } catch (err) {
            console.log('Error while loggin out' + err)
        }

        navigate('/login');
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
        console.log('---------------nav-----------------: ' + localStorage.getItem('catname'))
        console.log('---------------brand-----------------: ' + brandName)
        getSettings('currency')
        const token = localStorage.getItem('token');
        console.log('---token ---' + token)
        const theusername = token
        const theUserType = localStorage.getItem('catname')
        if (theusername) {
            setUsername(token)
        }
        console.log('---------------token-----------------: ' + token)
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
    const [clientChosen, setClientChosen] = useState(false)
    const [reportingChosen, setReportingChosen] = useState(false)

    const menuFlagOne = "user";
    const menuFlagTwo = "client";

    const setOffmenu = () => {
        setHomeChosen(false)
        setBerthChosen(false)
        setOpsChosen(false)
        setUserChosen(false)
        setGateChosen(false)
        setClientChosen(false)
        setReportingChosen(false)

    }
    const homeChosenHandler = () => {
        setOffmenu()
        setHomeChosen(true)
        setUserMenuType(menuFlagOne)
        setIconShow(true)
        setCordBg('bg-light')
        setIconHeight('140px')
        setColSize(3)
        setColWidth('94%')
    }
    const berthChosenHandler = () => {
        setOffmenu()
        setBerthChosen(true)
        setUserMenuType(menuFlagOne)
    }
    const opsChosenHandler = () => {
        setOffmenu()
        setOpsChosen(true)
        setUserMenuType(menuFlagOne)
    }
    const userChosenHandler = () => {
        setOffmenu()
        setUserChosen(true)
        setUserMenuType(menuFlagOne)
    }
    const gateChosenHandler = () => {
        setOffmenu()
        setGateChosen(true)
        setUserMenuType(menuFlagOne)
    }
    const clientChosenHandler = () => {
        setOffmenu()
        //set the flag as client so that the list of users come as clients
        setClientChosen(true)
        setUserMenuType(menuFlagTwo)
    }
    const reportingChosenHandler = () => {
        setOffmenu()
        setUserMenuType(menuFlagOne)
        setReportingChosen(true)
        setIconShow(false)
        setCordBg('bgLight')
        setIconHeight('100px')
        setColSize(3)
        setColWidth('100%')
        setColSizeTwo(2)
    }

    /* #region ---------------multiple roles */
    // const userRoles = user?.roles || []; // ['admin', 'berthOfficer'] or empty array



    // const roles = authUser() ? authUser().roles : [];


   
    const userRoles = userAuthenticated()?.roles ?? [];
    // const userRoles = userAuthenticated() ? userAuthenticated().roles : []; // ['admin', 'berthOfficer'] or empty array
    const userIsAdmin = ['addVessel', 'updateVessel', 'deleteVessel', 'viewVessel', 'addBooking', 'updateBooking', 'deleteBooking', 'viewBooking', 'addGate', 'updateGate', 'deleteGate', 'viewGate', 'addBerthInvoice', 'updateBerthInvoice', 'deleteBerthInvoice', 'viewBerthInvoice', 'addBerthReceipt', 'updateBerthReceipt', 'deleteBerthReceipt', 'viewBerthReceipt', 'addBerthExit', 'updateBerthExit', 'deleteBerthExit', 'viewBerthExit', 'addGateEntry', 'updateGateEntry', 'deleteGateEntry', 'viewGateEntry', 'addGateInvoice', 'updateGateInvoice', 'deleteGateInvoice', 'viewGateInvoice', 'addGateReceipt', 'updateGateReceipt', 'deleteGateReceipt', 'viewGateReceipt', 'addGateExit', 'updateGateExit', 'deleteGateExit', 'viewGateExit']
        .every(role => userRoles.includes(role))

    const userIsBerthOfficer = ["addVessel", "updateVessel", "deleteVessel", "viewVessel", "addBooking", "updateBooking", "deleteBooking", "viewBooking", "addBerthExit", "updateBerthExit", "deleteBerthExit", "viewBerthExit"]
        .every(role => userRoles.includes(role))
    const userIsGateOfficer = ["addGateEntry", "updateGateEntry", "deleteGateEntry", "viewGateEntry"]
        .every(role => userRoles.includes(role))
    const userIsOpsOfficer = ["addOpsArrivalNote", "updateOpsArrivalNote", "deleteOpsArrivalNote", "viewOpsArrivalNote"]
        .every(role => userRoles.includes(role))
    const userIsOpsSuperviser = ["addGateInvoice", "updateGateInvoice", "deleteGateInvoice", "viewGateInvoice",
        "addGateReceipt", "updateGateReceipt", "deleteGateReceipt", "viewGateReceipt", "addGateExit", "updateGateExit", "deleteGateExit", "viewGateExit",
        "addOpsInvoice", "updateOpsInvoice", "deleteOpsInvoice", "viewOpsInvoice", "addOpsReceipt", "updateOpsReceipt", "deleteOpsReceipt", "viewOpsReceipt",
        "addOpsExit", "updateOpsExit", "deleteOpsExit", "viewOpsExit"]
        .every(role => userRoles.includes(role))
    const userIsRtA = ["dashboard", "reports"]
        .every(role => userRoles.includes(role))

    // Check for ANY of multiple roles
    const hasAdminOrManager = userRoles.some(role => ['admin', 'manager'].includes(role));

    // Check for ALL of multiple roles
    const hasAdminAndBerth = ['admin', 'berthOfficer'].every(role => userRoles.includes(role));

    // Check for specific combination
    const hasAdminAndOneOther = userRoles.includes('admin') &&
        userRoles.some(role => ['berthOfficer', 'manager'].includes(role));


    /* #endregion */
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
                    {(<Navbar.Brand className="nav-brand" style={companyBrand} href="/dashboard">
                        {brandName}
                    </Navbar.Brand>)}

                    <Navbar.Toggle onClick={toggleMenu} aria-controls="responsive-navbar-nav " />
                    <Navbar.Collapse id="responsive-navbar-nav" in={!isCollapsed}>

                        <Nav className="me-auto">

                            {!userAuthenticated() ?
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

                            {userAuthenticated() && userIsAdmin ? (<>
                                <SingleMenuItem onClick={berthChosenHandler} isChosen={berthChosen} to="/vessel" text="Berth" icon={boat} />
                                <SingleMenuItem onClick={gateChosenHandler} isChosen={gateChosen} to="/gate" text="Gate" icon={truck} />
                                <SingleMenuItem onClick={opsChosenHandler} isChosen={opsChosen} to="/ops" text="OPS" icon={truck} />
                                <SingleMenuItem onClick={clientChosenHandler} isChosen={clientChosen} to="/clients" text="Client" icon={truck} />
                                <SingleMenuItem onClick={reportingChosenHandler} isChosen={reportingChosen} to="/commonreport" text="Report" icon={truck} />
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
                                </NavDropdown> </>)
                                : (userAuthenticated() && userIsBerthOfficer ? (<>
                                    <SingleMenuItem onClick={berthChosenHandler} isChosen={berthChosen} to="/vessel" text="Berth" icon={boat} />
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
                                    </NavDropdown>  </>)
                                    : (userAuthenticated() && (userIsGateOfficer) ? (
                                        <SingleMenuItem onClick={gateChosenHandler} isChosen={gateChosen} to="/gate" text="Gate" icon={truck} />)
                                        : (userAuthenticated() && userIsOpsSuperviser ? (<>
                                            <SingleMenuItem onClick={gateChosenHandler} isChosen={gateChosen} to="/gate" text="Gate" icon={truck} />
                                            <SingleMenuItem onClick={opsChosenHandler} isChosen={opsChosen} to="/ops" text="OPS" icon={truck} />
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
                                            : ''

                                            // (userAuthenticated() && userIsRtA ?
                                            //     <>
                                            //         <SingleMenuItem onClick={reportingChosenHandler} isChosen={reportingChosen} to="/commonreport" text="Report" icon={truck} />
                                            //     </>
                                            //     :''
                                            // )
                                        )
                                    )
                                )
                            }
                        </Nav>
                        {userAuthenticated() &&
                            <Nav>
                                {userIsAdmin &&
                                    <>
                                        <UsersMenu navLinks={navLinks} userChosen={userChosen} clickHandler={userChosenHandler} />
                                        <SettingsMenu />
                                    </>
                                }
                            </Nav>
                        }
                        <Nav>
                            {userAuthenticated() ?
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