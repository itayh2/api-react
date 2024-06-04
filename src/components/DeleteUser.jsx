import React from "react";
import axios from "axios";

export default function DeleteUser({ userId }) {
  const handleDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        alert("User deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
