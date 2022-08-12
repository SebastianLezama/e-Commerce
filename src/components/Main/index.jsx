import React, { useContext } from "react";
import { FavContext } from "../../context/FavContext";
import { categoriesFromApi } from "../../utils/Productos";
import { MapCategories } from "../NavBar/Header/DropDown";
import CardList from "../Productos/Cards/CardList";
import "./index.scss";

function Main() {
  const { favs } = useContext(FavContext);

  return (
    <div className="mainContainer">
      <ul className="listContainer">
        <h2>Productos</h2>
        <ul className="catContainer">
          <MapCategories categories={categoriesFromApi} className="catMain" />
        </ul>
        <li className="favList">
          {favs.length !== 0 && <h2>Productos en favoritos</h2>}
          <CardList items={favs} notInCart={true} onMain={true} />
        </li>
      </ul>
    </div>
  );
}

export default Main;
