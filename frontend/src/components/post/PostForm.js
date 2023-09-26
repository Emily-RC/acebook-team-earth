import React, { useState } from "react";
import '../../styles/post_form/post_form.css';
import '../../styles/buttons/buttons.css';
import send from '../../images/send.svg'

const PostForm = ({ token }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message})
      }) 
      if (response.status !== 201) {
      } else {
        let data = await response.json();
        window.localStorage.setItem("token", data.token);
        window.location.reload();
        
      } 
      
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <section className="post_form">
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="post_form__textarea"
            name="Text1" cols="40" rows="5"
            placeholder="Enter your message here.."
            id="message"
            type="text"
            value={message}
            onChange={handleMessageChange}
          />
          <button className="button__send" role="create-button" id="submit" type="submit"><img src={send} /></button>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
