import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from '../data/SideNavBarData';
import { IconContext } from 'react-icons';
import './sidenavbar.css';
import * as FaIcons from 'react-icons/fa';
import Isotipo from '../assets/ISOTIPO.png'



export default function SideNavBar() {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);


    return (
        <div>
            <IconContext.Provider value={{ color: '#000' }}>
                <a className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </a>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <a className='menu-bars'>
                                <AiOutlineClose />
                                           
                            </a>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <a href={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="sidebarbackground" onClick={showSidebar}></div>
                </nav>
            </IconContext.Provider>
        </div>
    );
}