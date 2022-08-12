import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavContext } from "../../context/FavContext";
import CardList from "./Cards/CardList";
import "./Favorites.scss";

const Favorites = () => {
  const { favs, clearFavs } = useContext(FavContext);

  return (
    <div className="mainContainer">
      <div className="favsContainer">
        <div className="favs">
          {favs.length === 0 ? (
            <>
              <h2>No hay productos guardados!</h2>
              <Link to="/productos">
                <button className="buscarButton">Ver productos</button>
              </Link>{" "}
            </>
          ) : (
            <>
              <h2>Favoritos</h2>
              <button className="vaciarFavs" onClick={clearFavs}>
                Vaciar Favoritos
              </button>
            </>
          )}
        </div>
        <div className="card-container">
          <CardList items={favs} notInCart={false} onProd={true} />
        </div>
      </div>
    </div>
  );
};

export default Favorites;
