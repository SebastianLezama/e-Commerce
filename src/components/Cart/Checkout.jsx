import "./Cart.scss";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Checkout.scss";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { responseId } = useParams();
  const { checkoutDetail } = useContext(CartContext);

  function copyCheckoutCode() {
    const copyText = document.getElementById("codigoPedido");

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  }

  const Details = () => {
    return checkoutDetail[1]["items"].map((item, index) => (
      <div className="orderItems" key={index}>
        <h6>
          {item.quantity}x {item.name}
        </h6>
        <h6>${item.price * item.quantity}</h6>
      </div>
    ));
  };

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(checkoutDetail));
  }, [checkoutDetail]);

  return (
    <div className="checkoutContainer">
      <div className="checkout">
        <div>
          <h3>Gracias por tu compra {checkoutDetail[0]["user"]}!</h3>
          <h5>Éste es tu código para que puedas seguir el envío:</h5>
        </div>
        <div>
          <input
            className="codigoPedido"
            type="text"
            defaultValue={responseId}
            id="codigoPedido"
          ></input>
          <button className="copyButton" onClick={() => copyCheckoutCode()}>
            Copiar código
          </button>
        </div>
      </div>
      <Link to="/productos" className="flatButton">
        <h2>Seguir Comprando</h2>
      </Link>
      <div className="checkoutItems">
        <h3>Tu pedido por ${checkoutDetail[0]["total"]}:</h3>
        <Details />
      </div>
    </div>
  );
};

export default Checkout;
