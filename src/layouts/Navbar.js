import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/home" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/show-todo" className="nav-link">
        TO do list
      </NavLink>
      <NavLink to="/add-todo" className="nav-link">
        Add To DO
      </NavLink>
    </nav>
  );
};

export default Navbar;
