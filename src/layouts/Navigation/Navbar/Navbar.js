import React from 'react'
import { AiOutlineShopping,AiFillFolderAdd } from 'react-icons/ai';
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { FaRegListAlt } from 'react-icons/fa'

const Navbar = ({ toggle }) => {
    return (
        <nav>
            <Link className="nav-link text-light Link" to="/" style={{display:"flex",justifyContent: "center",alignItems: "center"}}><AiOutlineShopping style={{fontSize: '20px'}}/> MERN<span style={{ color: "rgb(255 211 0)", padding: "2px", fontWeight: "bolder" }}>-TODO</span></Link>

            <div className="icons">
                {/* <div className="menu-items">
                    <Link className="nav-link text-light Link" to="/home" style={{display:"flex",justifyContent: "center",alignItems: "center"}}><AiFillFolderAdd style={{fontSize: '20px'}}/> Home</Link>
                </div> */}
                <div className="menu-items">
                    <NavLink className="nav-link text-light Link" to="/show-todo" style={{display:"flex",justifyContent: "center",alignItems: "center"}}><FaRegListAlt style={{fontSize: '20px', padding:"3px"}}/>TO DO LIST</NavLink>
                </div>
                <div className="menu-items">
                    <NavLink className="nav-link text-light Link" to="/add-todo" style={{display:"flex",justifyContent: "center",alignItems: "center"}}><AiFillFolderAdd style={{fontSize: '20px'}}/>ADD TO DO</NavLink>
                </div>
                <div className="mobile-menu-icon">
                    <FaBars onClick={toggle} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar