import React, { useContext } from "react";
import "./Cart.scss";
import { CartContext } from "../../context/CartContext";
import CartDetail from "./CartDetail";
import Form from "./Form";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total, clearCart } = useContext(CartContext);

  const Subtotal = () => {
    return cart.map((item) => (
      <div key={item.id} className="subTotal">
        <h6>{item.name}</h6>
        <h6>${item.price * item.quantity}</h6>
      </div>
    ));
  };

  const mapCart = cart.map((p) => <CartDetail key={p.id} prod={p} />);

  const Carrito = () => {
    if (cart.length === 0) {
      return (
        <>
          <h2>No hay productos en tu carrito!</h2>
          <Link to="/productos">
            <button className="buscarButton">Ver productos</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <h2>Carrito de compras</h2>
          {mapCart}
        </>
      );
    }
  };

  return (
    <div className="cartDisplay">
      <div
        className={cart.length === 0 ? "cartContainerEmpty" : "cartContainer"}
      >
        <Carrito />
      </div>
      {cart.length !== 0 && (
        <div className="cartTotalContainer">
          <Form totalPrice={total} cart={cart} clearCart={clearCart} />
          <ul>
            <li key="button">
              <button className="vaciar" onClick={clearCart}>
                Vaciar carrito
              </button>
            </li>
            <li key="subtotal" className="subTotalContainer">
              <Subtotal />
            </li>
            <li key="total" className="total">
              <h2>Total: </h2>
              <h2>${total}</h2>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
