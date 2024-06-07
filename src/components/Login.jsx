import { useState } from "react";
import axios from "axios";

import "./Login.css";
import "../App.css";

export function Login() {
  const url = "http://api-test.michoacan.gob.mx/api/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const login = async () => {
    const data = { email: email.trim(), password: password.trim() };
    await axios({ method: "POST", url: url, data: data })
      .then(function (res) {
        const token = res.data.token;
        const user = res.data.usuario.nombre;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        window.location = "/dashboard";
        setMensaje("OK");
        setError(true);
        console.log(res.data);
      })
      .catch(function (err) {
        const error = err.response.data.message;
        setMensaje(error);
        setError(true);
        //console.log(error);
      });
  };

  const validarDatos = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMensaje("Todos los datos son obligatorios");
      setError(true);
      return;
    }
    login();
  };

  return (
    <div className="App">
      <section>
        <h1>Login</h1>

        <form className="formulario" onSubmit={validarDatos}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Acceder</button>
        </form>
        <p>{error && mensaje}</p>
      </section>
    </div>
  );
}
