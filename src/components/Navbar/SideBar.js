import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import MenuLogo from '../pages/menu/MenuLogo';
import { SideMenuItems } from '../pages/menu/MenuItems';
import {ic_backup_outline as run} from 'react-icons-kit/md/ic_backup_outline'
import { Icon } from 'react-icons-kit'
import { Cloud } from '@mui/icons-material';
const SideBar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/about",
            name: "About",
            icon: <FaUserAlt />
        },
        {
            path: "/analytics",
            name: "Analytics",
            icon: <FaRegChartBar />
        },
        {
            path: "/comment",
            name: "Comment",
            icon: <FaCommentAlt />
        },
        {
            path: "/product",
            name: "Product",
            icon: <FaShoppingBag />
        },
        {
            path: "/productList",
            name: "Product List",
            icon: <FaThList />
        }
    ]
    return (
        <div className="menuContainer" style={{zIndex: '5'}}>
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                
                <MenuLogo isOpen={isOpen} toggle={toggle} />
                {
                    SideMenuItems.menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>

    );
};


export default SideBar

export const DeploySubMenu = ({children},sendPath) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <FaTh  size = '1em'/>
        } ,
        {
            path: "/pomconf",
            name: "Publish",
            icon: <Cloud  size = '1em'/>
        },
        {
            path: "/analytics",
            name: "Analytics",
            icon: <FaRegChartBar  size = '1em'/>
        } 
    ]

    const menuItemStyles={
        fontSize:'13px' 
    }
    return (
        <div className="menuContainer ">
                <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                    <div className="top_section">
                        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index}  onClick={()=> sendPath(item.path)}   className="link" activeclassName="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none", fontSize:'13px' }} className="link_text ">{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
           
            <main>{children}</main>
        </div>

    );
}