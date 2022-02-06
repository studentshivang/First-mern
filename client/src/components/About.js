import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pp from "../images/studentshivang.jpg";
import lhsImg from "../images/hellobg.jpg";

const Lhs = () => {
  return (
    <>
      {/* img */}
      <img src={pp} alt="profile pic" className="img-fluid about_img mt-4 " />

      {/* Links */}
      <p className="mb-2 mt-2">
        <span className="fw-bolder">Project Links</span>
        <br />
        <p className="mt-2">
          <a 
            title="My first Bootstrap website!"
            className="fw-bold text-decoration-none"
            href="https://studentshivang.github.io/bsone/"
            target="_radheradhe"
          >
            WebFreaks
          </a>
          <br />
          <a 
            title="Want to know you city's weather conditions? This is where you'll find it!"
            className="fw-bold text-decoration-none"
            href="https://apnaweather.herokuapp.com/"
            target="_radheradhe"
          >
            WeatherApp
          </a>
          <br />
          <a 
            title="Like to keep notes? Here's your personal Notekeeping app!(localStorage Enabled)"
            className="fw-bold text-decoration-none"
            href="https://studentshivang.github.io/Keeps/"
            target="_radheradhe"
          >
            KeepApp
          </a>
          <br />
          <a 
            title="Do what you have to! Never forget a thing!"
            className="fw-bold text-decoration-none"
            href="https://studentshivang.github.io/TodoList/"
            target="_radheradhe"
          >
            TodoList
          </a>
          <br />
          <a 
            title="Wanna know me more? Find my social media here!"
            className="fw-bold text-decoration-none"
            href="https://studentshivang.github.io/web4/"
            target="_radheradhe"
          >
            Portfolio
          </a>
          <br />
        </p>
      </p>
    </>
  );
};

const LhsGeneral = () => {
  return (
    <>
      <img src={lhsImg} className="img-fluid" alt="A road in Spring Season" id="aboutColImg" />
    </>
  );
};

const About = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const response = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      setUserData(data);

      if (!response.status === 200) {
        const error = new Error(response.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="container">
        <form method="GET">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-10 mb-5 signup_card mt-5 bg-white">
              <div className="col-md-4 text-center">
                {userData.email === "shivangdwivedi2012@gmail.com" ? (
                  <Lhs />
                ) : (
                  <LhsGeneral />
                )}
              </div>
              <div className="row col-md-8">
                <div className="row mt-5">
                  <div className="col-md-9 text-md-start text-center">
                    <h4 className="fw-bold">{userData.name}</h4>
                    <p id="about_p">{userData.work}</p>
                    <p>Rankings:1/10</p>
                  </div>
                  <div className="col-md-3 text-md-start text-center">
                    <NavLink to="/signup">
                      <button
                        id="about_btn"
                        onClick={() => {
                          alert("Create an updated profile!");
                        }}
                      >
                        Edit Profile
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div className="row">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        About
                      </button>
                      <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Timeline
                      </button>
                    </div>
                  </nav>

                  {/* About(Home) */}

                  <div className="tab-content ms-2 mb-3" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div className="row mt-2 ">
                        <div className="col-md-6">
                          <label className="fw-bold">UserID</label>
                        </div>
                        <div className="col-md-6">
                          <p>8768969696</p>
                        </div>
                      </div>

                      <div className="row mt-2 ">
                        <div className="col-md-6">
                          <label className="fw-bold">Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.name}</p>
                        </div>
                      </div>
                      <div className="row mt-2 ">
                        <div className="col-md-6">
                          <label className="fw-bold">Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.email}</p>
                        </div>
                      </div>
                      <div className="row mt-2 ">
                        <div className="col-md-6">
                          <label className="fw-bold">Phone</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.phone}</p>
                        </div>
                      </div>
                      <div className="row mt-2 ">
                        <div className="col-md-6">
                          <label className="fw-bold">Profession</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.work}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline(Profile) */}

                    <div
                      className="tab-pane fade ms-2 mb-3"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="fw-bold">Experience</label>
                        </div>
                        <div className="col-md-6">
                          <p>Expert</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="fw-bold">Hourly Rate</label>
                        </div>
                        <div className="col-md-6">
                          <p>$10/hr</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="fw-bold">Total Projects</label>
                        </div>
                        <div className="col-md-6">
                          <p>230</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="fw-bold">English Proficiency</label>
                        </div>
                        <div className="col-md-6">
                          <p>Expert</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="fw-bold">Availability</label>
                        </div>
                        <div className="col-md-6">
                          <p>6 months</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
