import React, { useState } from "react";
import "./Login.css";
import Home from "./Home.jsx";
import InputArea from "./inputArea.jsx";
import ToDoItem from "./ToDoItem.jsx";
import "../../public/styles.css";

function Login(props) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [emailValue, setEmailvalue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const users = {
    usernames: ["test1@gmail.com", "test2@gmail.com", "test3@gmail.com"],
    passwords: ["test1", "test2", "test3"]
  };
  window.localStorage.setItem("users", JSON.stringify(users));

  const persons = JSON.parse(window.localStorage.getItem("users"));

  function handleEmailChange(event) {
    setEmailvalue(event.target.value);
    return emailValue;
  }

  function handlePasswordChange(event) {
    setPasswordValue(event.target.value);
    return passwordValue;
  }

  function handleClick() {
    console.log(buttonClicked);
    persons.usernames.map((username, usernameIndex) => {
      if (username === emailValue) {
        persons.passwords.map((password, passwordIndex) => {
          if (password === passwordValue && passwordIndex === usernameIndex) {
            return setButtonClicked(true);
          } else {
            return null;
          }
        });
      }
      return null;
    });
    console.log(buttonClicked);
  }

  const [items, setItems] = useState([]);

  function addItem(inputText) {
    setItems(prevItems => {
      return [...prevItems, inputText];
    });
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return buttonClicked ? (
    <div>
      <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <InputArea buttonClick={addItem} />
        <div>
          <ul>
            {items.map((todoItem, index) => (
              <ToDoItem
                key={index}
                id={index}
                text={todoItem}
                onChecked={deleteItem}
              />
            ))}
          </ul>
        </div>
      </div>
      <footer>Copyright Pratham ⓒ 2020</footer>
    </div>
  ) : (
    <div className="login-container">
      <h1>TODO with login</h1>
      <input
        onChange={handleEmailChange}
        name="email"
        type="email"
        placeholder="Email"
      />
      <input
        onChange={handlePasswordChange}
        name="password"
        type="password"
        placeholder="Password"
      />
      <button onClick={handleClick} type="submit">
        Login
      </button>
    </div>
  );
}

export default Login;
