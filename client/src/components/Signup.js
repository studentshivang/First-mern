import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import signupImg from "../images/lotus.png";
import { NavLink,useNavigate } from "react-router-dom";


const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (event) => {
    event.preventDefault();

    const {name,email,phone,work,password,cpassword} = user;

    const response = await fetch("/register",{
      method:"POST",
      headers:{
          "Content-Type" : "application/json"
      },//similar to giving headers "Content-Type" : "application/json" in Postman
      body:JSON.stringify({name,email,phone,work,password,cpassword})  
    });
    
    const data = await response.json();

    if(data.status == 422 || data.status == 400 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration successfull");
      console.log("Successful registration");

      navigate('/login');
    }

  };

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-10 mx-auto">
              <div className="row py-5">
                <div className="signup_card bg-white">
                  <form
                    method="POST"
                    className="signup_form px-5 py-5 col-md-6"
                  >
                    <h2 className="form_title">Sign up</h2>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text signup_in"
                        id="inputGroup-sizing-default"
                      >
                        <PersonIcon />
                      </span>
                      <input
                        type="text"
                        className="form-control signup_in"
                        aria-label="Sizing example input"
                        name="name"
                        value={user.name}
                        onChange={inputEvent}
                        autoComplete="off"
                        placeholder="Your Name"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </div>

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
                        aria-label="Sizing example input"
                        name="email"
                        value={user.email}
                        onChange={inputEvent}
                        autoComplete="off"
                        placeholder="Your Email"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span
                        className="input-group-text signup_in"
                        id="inputGroup-sizing-default"
                      >
                        <PhoneInTalkIcon />
                      </span>
                      <input
                        type="number"
                        className="form-control signup_in"
                        aria-label="Sizing example input"
                        name="phone"
                        value={user.phone}
                        onChange={inputEvent}
                        autoComplete="off"
                        placeholder="Your Phone number"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span
                        className="input-group-text signup_in"
                        id="inputGroup-sizing-default"
                      >
                        <BusinessCenterIcon />
                      </span>
                      <input
                        type="text"
                        className="form-control signup_in"
                        aria-label="Sizing example input"
                        name="work"
                        value={user.work}
                        onChange={inputEvent}
                        autoComplete="off"
                        placeholder="Your Profession"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span
                        className="input-group-text signup_in"
                        id="inputGroup-sizing-default"
                      >
                        <LockOpenIcon />
                      </span>
                      <input
                        type="password"
                        className="form-control signup_in"
                        aria-label="Sizing example input"
                        name="password"
                        value={user.password}
                        onChange={inputEvent}
                        autoComplete="off"
                        placeholder="Enter password"
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
                        aria-label="Sizing example input"
                        name="cpassword"
                        value={user.cpassword}
                        onChange={inputEvent}
                        autoComplete="off"
                        placeholder="Confirm Password"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </div>

                    <input
                      class="btn btn-primary "
                      type="submit"
                      value="Register"
                      onClick={PostData}
                    />
                  </form>

                  <div className="signup_image col-md-6">
                    <img
                      className="img-fluid py-5"
                      alt="signup_img"
                      src={signupImg}
                    />
                    <NavLink
                      to="/login"
                      className="d-flex justify-content-center text-decoration-none "
                    >
                      I am already registered.
                    </NavLink>
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

export default Signup;
