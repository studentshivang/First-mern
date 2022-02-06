import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";


const Logout = () => {

  const {dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  //promises

  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        localStorage.setItem("toggleState",JSON.stringify(false));
        dispatch({ type: "USER", payload: false });
        navigate("/login");
        if (response.status !== 200) {
          const error = new Error(response.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <h1 className="text-center">Logging out...</h1>
    </>
  );
};

export default Logout;
