import React, { useState, useEffect } from "react";
import axios from "axios";

import "../App.css";
import "./Products.css";
import "./Login.css";

export function Products() {
  const url = "http://api-test.michoacan.gob.mx/api/productos";
  const url_crear = "http://api-test.michoacan.gob.mx/api/productos/crear";
  const url_actualizar =
    "http://api-test.michoacan.gob.mx/api/productos/modificar/";
  const url_eliminar =
    "http://api-test.michoacan.gob.mx/api/productos/eliminar/";
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [create, setCreate] = useState({});
  const [edit, setEdit] = useState({});
  const [del, setDel] = useState({});
  const token = localStorage.getItem("token");
  const header = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    datos();
  }, []);

  const datos = async () => {
    await axios({ method: "GET", url: url, headers: header })
      .then(function (res) {
        setData(res.data.data);
        console.log(res.data.data);
        console.log("OK");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const toggleModal = (item) => {
    setShowModal(!showModal);
    if (!showModal) {
      setEdit(item.item);
    }
  };

  const toggleModalCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEdit({ ...edit, [name]: value });
  };

  const handleChangeCreate = (event) => {
    const { name, value } = event.target;
    setCreate({ ...create, [name]: value });
  };

  const crear_datos = async (e) => {
    e.preventDefault();
    console.log("CREANDO");
    const data = {
      nombre: create.nombre.trim(),
      descripcion: create.descripcion.trim(),
      precio: create.precio.trim(),
    };
    await axios({
      method: "POST",
      url: url_crear,
      data: data,
      headers: header,
    })
      .then(function (res) {
        console.log("OK");
        console.log(res);
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const actualizar_datos = async (e) => {
    console.log(edit);
    e.preventDefault();
    console.log("Actualizado");
    const data = {
      nombre: edit.nombre.trim(),
      descripcion: edit.descripcion.trim(),
      precio: edit.precio.trim(),
    };
    await axios({
      method: "PUT",
      url: url_actualizar + edit.id,
      data: data,
      headers: header,
    })
      .then(function (res) {
        console.log(res);
        console.log("OK");
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const eliminar_datos = async (item) => {
    console.log(item.item);
    await axios({
      method: "DELETE",
      url: url_eliminar + item.item.id,
      headers: header,
    })
      .then(function (res) {
        console.log(res);
        console.log("OK");
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>PRODUCTS PAGE</h1>
      <div className="container">
        <h2>Tabla de productos</h2>
        <button className="create-button" onClick={toggleModalCreate}>
          Agregar
        </button>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>${item.precio}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => eliminar_datos({ item })}
                    >
                      Eliminar
                    </button>
                    <button
                      key={item.id}
                      onClick={() => toggleModal({ item })}
                      className="edit-button"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      &nbsp
      {showCreate && (
        <div className="modal">
          <button className="close-button" onClick={toggleModalCreate}>
            &times;
          </button>
          <div className="modal-content">
            <h2>Crear Producto</h2>
            <form className="formulario" onSubmit={crear_datos}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChangeCreate}
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripcion"
                onChange={handleChangeCreate}
              />
              <input
                type="text"
                name="precio"
                placeholder="Precio"
                onChange={handleChangeCreate}
              />
              <button>Guardar</button>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <button className="close-button" onClick={toggleModal}>
            &times;
          </button>
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <form className="formulario" onSubmit={actualizar_datos}>
              <input type="hidden" name="id" value={edit.id} />
              <input
                type="text"
                name="nombre"
                value={edit.nombre}
                onChange={handleChange}
              />
              <input
                type="text"
                name="descripcion"
                value={edit.descripcion}
                onChange={handleChange}
              />
              <input
                type="text"
                name="precio"
                value={edit.precio}
                onChange={handleChange}
              />
              <button>Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
