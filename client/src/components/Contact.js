import React, { useEffect, useState } from "react";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const response = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setUserData({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!response.status === 200) {
        const error = new Error(response.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  // We are storing data in states

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  // send the data to backend

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await res.json();

    if (!data) {
      console.log("message not sent");
    } else {
      alert("Message Sent");
    }
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="row contact_row">
            <div className="col-md-3 contact_div  bg-white">
              <h4 className="contact_font">Phone</h4>
              <p className="contact_font">9889988988</p>
            </div>

            <div className="col-md-3 contact_div  bg-white">
              <h4 className="contact_font">Email</h4>
              <p className="contact_font">strcpy@imail.com</p>
            </div>
            <div className="col-md-3 contact_div  bg-white">
              <h4 className="contact_font">Address</h4>
              <p className="contact_font">GB Nagar,NCR,UP</p>
            </div>
          </div>
          <div className="row contact_row2">
            <form className=" contact_div_lg bg-white">
              <div className="row contact_row3">
                <input
                  className="col-md-3 contact_div2"
                  autoComplete="off"
                  onChange={handleInputs}
                  name="name"
                  value={userData.name}
                  placeholder="Your Name"
                />
                <input
                  className="col-md-3 contact_div2"
                  autoComplete="off"
                  onChange={handleInputs}
                  name="email"
                  value={userData.email}
                  placeholder="Your email"
                />
                <input
                  className="col-md-3 contact_div2"
                  autoComplete="off"
                  onChange={handleInputs}
                  name="phone"
                  value={userData.phone}
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="row contact_row4">
                <input
                  className="col-md-3 contact_div_md"
                  onChange={handleInputs}
                  name="message"
                  value={userData.message}
                  placeholder="Message"
                />
              </div>
              <input
                class="btn btn-primary mx-5"
                type="submit"
                onClick={contactForm}
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
