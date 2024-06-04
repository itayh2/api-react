import React, { useState } from "react";
import axios from "axios";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`https://jsonplaceholder.typicode.com/users/`, { name, email })
      .then((response) => {
        alert("User added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Add User</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
