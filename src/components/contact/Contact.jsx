import React, { useState, useRef } from "react";
import "./contact.scss";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_for3v6q",
        "template_bzlyzzf",
        formRef.current,
        "user_sIkICpGUvmF12GF3rOVP1"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setMessage(true);
  };

  return (
    <div className="contact" id="contact">
      <div className="main">
        <div className="left">
          <img src="assets/discuss-svgrepo-com.svg" alt="" />
        </div>
        <div className="right">
          <form ref={formRef} onSubmit={handleSubmit}>
            <input type="text" placeholder="John" name="user_name" />
            <input type="text" placeholder="jone@mail.com" name="user_email" />
            <textarea
              cols="30"
              rows="10"
              placeholder="message"
              name="message"></textarea>
            <button type="submit">Submit</button>
            {message && <span>Thanks for your feedback!</span>}
          </form>
        </div>
      </div>
      <div className="footer">
        <div className="call">
          <h1>nkg.</h1>
          <p>9549409336</p>
        </div>
        <p>© 2022 Nitish Kumar Gupta. All rights reserved.</p>
      </div>
    </div>
  );
}
