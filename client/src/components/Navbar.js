import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import logo from "../images/fctr.png";

import { UserContext } from "../App";

const Navbar = () => {
  const { state,dispatch } = useContext(UserContext);
  

  const RenderMenu = () => {
    
    if (state) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link me-md-5 ms-4 about_btn mt-2 active"
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link me-md-5 ms-4 about_btn mt-2"
              to="/about"
            >
              AboutMe
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link me-md-5 ms-4 about_btn mt-2"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link me-md-5 ms-4 about_btn mt-2"
              to="/logout"
            >
              Logout
            </NavLink>
          </li>
        </>
      );
    }else{
      return(
        <>
         <li className="nav-item">
                <NavLink className="nav-link me-md-5 ms-4 about_btn mt-2 active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link me-md-5 ms-4 about_btn mt-2" to="/about">
                  AboutMe
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link me-md-5 ms-4 about_btn mt-2" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link me-md-5 ms-4 about_btn mt-2" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link me-md-5 ms-4 about_btn mt-2" to="/signup">
                  Signup
                </NavLink>
              </li>
        </>
      )
    }
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} className="img-fluid" alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
