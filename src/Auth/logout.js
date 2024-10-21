import React from "react";
import axios from "axios";

function Logout() {
  const logout = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete('http://localhost:3001/users/sign_out', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      localStorage.removeItem('token');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error);
    }
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}

export default Logout;
