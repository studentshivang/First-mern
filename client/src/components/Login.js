import React, { useContext, useState } from "react";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import loginImg from "../images/loginImg.png";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../App";

const Login = () => {

  const {dispatch} = useContext(UserContext);

  const navigate = useNavigate(); //To send the user to desired page(here home) ,after successfull signin

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({ email, password }),
    });

    const data = response.json();

    if (response.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      localStorage.setItem("toggleState",JSON.stringify(true));
      dispatch({type:"USER",payload:true})
      window.alert("Login successfull");
      console.log("Successful signin");

      navigate("/");
    }
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-10 mx-auto">
              <div className="row py-5 py-auto">
                <div className="signup_card h-100 bg-white">
                  <div className="signup_image col-md-6">
                    <img
                      className="img-fluid py-5"
                      alt="login_img"
                      src={loginImg}
                    />
                    <NavLink
                      to="/signup"
                      className="d-flex justify-content-center text-decoration-none "
                    >
                      Create account
                    </NavLink>
                  </div>

                  <div className="signup_form px-5 py-5 col-md-6 ">
                    <h2 className="form_title">Sign in</h2>
                    <form className="py-5" method="POST">
                      <div className="input-group mb-3">
                        <span
                          className="input-group-text signup_in"
                          id="inputGroup-sizing-default"
                        >
                          <EmailIcon />
                        </span>
                        <input
                          type="email"
                          className="form-control signup_in"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          placeholder="Enter email"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <span
                          className="input-group-text signup_in"
                          id="inputGroup-sizing-default"
                        >
                          <LockIcon />
                        </span>
                        <input
                          type="password"
                          className="form-control signup_in"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          placeholder="Enter password"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        />
                      </div>

                      <input
                        class="btn btn-primary "
                        type="submit"
                        onClick={loginUser}
                        value="login"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
