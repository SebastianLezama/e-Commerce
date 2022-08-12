import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss";

const Search = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    text.length !== 0
      ? navigate(`/productos/search/${text}`)
      : navigate("/productos");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="searchDiv">
      <input
        className="buscador"
        type="text"
        placeholder="Buscar productos"
        onChange={handleChange}
        value={text}
      />
      <button className="buscarButton">Buscar</button>
    </form>
  );
};

export default Search;
