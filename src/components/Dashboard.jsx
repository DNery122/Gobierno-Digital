import React, { useState, useEffect } from "react";

import "../App.css";

export function Dashboard() {
  const [user, setUser] = useState("N/A");
  useEffect(() => {
    datos();
  }, []);

  const products = (e) => {
    e.preventDefault();
    window.location = "/products";
  };

  const datos = () => {
    setUser(localStorage.getItem('user'))
  };

  return (
    <div className="App">
      <h1>DASHBOARD PAGE</h1>
      <div className="App">Bienvenido: {user} </div>
      <p>
        <button onClick={products}>PRODUCTOS</button>
      </p>
    </div>
  );
}
