import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";

const URL = "https://fake-products-eric.herokuapp.com/api/orders";

const Form = () => {
  const { cart, total, clearCart, checkoutOrder } = useContext(CartContext);

  const [formData, setFormData] = useState({
    user: "",
    phone: "",
  });

  const navigate = useNavigate();

  const order = async () => {
    const user = formData.user;
    const phone = formData.phone;

    if (formData.user.length !== 0 && formData.phone.length !== 0) {
      const sendInfo = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          total: total,
          user,
          phone,
        }),
      });
      const response = await sendInfo.json();
      checkoutOrder(user, phone);
      clearCart();
      navigate(`/checkout/${response.id}`);
    } else {
      alert("Por favor ingrese nombre y telefono!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    order();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <input
              type="text"
              name="user"
              placeholder="Nombre"
              onChange={handleChange}
              value={formData.user}
            />
          </li>
          <li>
            <input
              type="text"
              name="phone"
              placeholder="Telefono"
              onChange={handleChange}
              value={formData.phone}
            />
          </li>
          <input type="submit" className="flat-button" value="COMPRAR" />
        </ul>
      </form>
    </div>
  );
};

export default Form;
