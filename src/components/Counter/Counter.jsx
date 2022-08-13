import React, { useContext, useEffect, useState } from "react";
import "./Counter.scss";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";
import { FavContext } from "../../context/FavContext";

const Counter = ({ item }) => {
  const { stockCart, addToCart, isInCart } = useContext(CartContext);
  const { addToFavs, removeFromFavs, isInFavs } = useContext(FavContext);

  const [count, setCount] = useState(1);
  const [{ iconClassDash, iconClassPlus }, setIconClass] = useState({
    iconClassDash: "icon",
    iconClassPlus: "icon",
  });
  const itemCartStock = stockCart(item);
  const currentStock = itemCartStock ? item.stock - itemCartStock : item.stock;
  const changeIconClassPlus = (iconClass) => {
    setIconClass((currentState) => ({
      ...currentState,
      iconClassPlus: iconClass,
    }));
  };
  const changeIconClassDash = (iconClass) => {
    setIconClass((currentState) => ({
      ...currentState,
      iconClassDash: iconClass,
    }));
  };

  useEffect(() => {
    if (count === 1 || currentStock === 0) {
      changeIconClassPlus("icon");
      changeIconClassDash("icon");
    } else if (count < currentStock) {
      changeIconClassPlus("icon-hover");
    } else {
      changeIconClassPlus("icon-max");
    }
  }, [count, item.stock, currentStock]);

  const dashOnClick = () => {
    if (count > 1) {
      setCount(count - 1);
      changeIconClassDash("icon-hover");
    }
  };

  const plusOnClick = () => {
    count < currentStock && setCount(count + 1);
  };

  const Favoritos = ({ item }) => {
    return isInFavs(item.id) ? (
      <button className="addFavs" onClick={() => removeFromFavs(item.id)}>
        Quitar de Favoritos
      </button>
    ) : (
      <button className="addFavs" onClick={() => addToFavs(item)}>
        Agregar a Favoritos
      </button>
    );
  };

  const handleClick = () => {
    addToCart(item, count);
    setCount(1);
  };

  return (
    <div className="Counter">
      <BsCartDash size="33" className={iconClassDash} onClick={dashOnClick} />
      <BsCartPlus size="33" className={iconClassPlus} onClick={plusOnClick} />
      <div>Stock Disponible: {currentStock}</div>
      <div>Cantidad: {count}</div>
      <div className="modalButtons">
        <Favoritos item={item}></Favoritos>
        <button className="addToCart" onClick={() => handleClick()}>
          {isInCart(item.id) ? "Sumar Cantidad" : "Añadir al Carrito"}
        </button>
      </div>
    </div>
  );
};

export default Counter;
