import React, { useEffect, useState } from "react";

const Home=()=>{

  const [userData, setUserData] = useState();
  const [show,setShow] = useState(false); 

  const homeData = async () => {
    try {
      const response = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();
      console.log(data);
      setUserData(data.name);
      setShow(true);
      
      if (!response.status === 200) {
        const error = new Error(response.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    homeData();
  }, []);

  return(
    <>
      <div className="fw-bolder home_pg">
        <p>WELCOME</p>
        <p className="text-capitalize">{userData}</p>
        <h1 className="text-center">{show?"Happy to see you back":"We Are The MERN Developer"}</h1>
      </div>
    </>
  )
}

export default Home;