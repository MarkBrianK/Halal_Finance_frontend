import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate()
  const logout = async () => {
      localStorage.removeItem('token');
      navigate('/')

  };


  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}

export default Logout;
