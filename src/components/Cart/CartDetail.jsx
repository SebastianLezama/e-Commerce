import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CardDetail from "../Productos/Cards/CardDetail";
import "./Cart.scss";

const CartDetail = ({ prod }) => {
  const { deleteItem, addOne, subOne } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="containerCartDetail">
        <ul className="infoCartDetail">
          <div className="prodInfo">
            <img src={prod.img} alt={prod.name} onClick={() => handleClick()} />
            <div className="stock">
              <h3>{prod.name}</h3>
              <p>Quedan en stock: {prod.stock - prod.quantity}</p>
            </div>
          </div>
          <div className="subContainer">
            <div className="titulo">
              <h4>Precio: $ {prod.price}</h4>
            </div>
            <div className="subtotal">
              <div className="botonera">
                <button className="boton" onClick={() => subOne(prod)}>
                  -
                </button>
                <h4> {prod.quantity} </h4>
                <button className="boton" onClick={() => addOne(prod)}>
                  +
                </button>
              </div>
              <h5> Subtotal: </h5>
              <h5> ${prod.price * prod.quantity}.-</h5>
            </div>
          </div>
          <button className="botonDelete" onClick={() => deleteItem(prod.id)}>
            Eliminar
          </button>
        </ul>
      </div>
      <CardDetail
        key={prod.id}
        handleClose={hideModal}
        notInCart={false}
        id={prod.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default CartDetail;
