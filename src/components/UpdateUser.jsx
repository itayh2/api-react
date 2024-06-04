import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateUser({ userId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error("There was an error fetching the user!", error);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        name,
        email,
      })
      .then((response) => {
        alert("User updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update User</h1>
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
      <button type="submit">Update</button>
    </form>
  );
}
