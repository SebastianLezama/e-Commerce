import React from "react";
import s from "./Cards/Card.module.css";

const Shipping = ({ priceValue, minShippingValue }) => {
  const cuota = (price, numOfCuota) => {
    return numOfCuota + "x $ " + (price / numOfCuota).toFixed(2);
  };
  const Cuotas = () => {
    if (priceValue >= 4000) {
      return <>{cuota(priceValue, 6)}</>;
    } else if (priceValue > 1000) {
      return <>{cuota(priceValue, 3)}</>;
    }
  };

  const Envios = () => {
    if (priceValue >= minShippingValue) {
      return <>Envío gratis</>;
    }
  };

  return (
    <div className={s.shipping}>
      <h6>
        <Cuotas />
      </h6>
      <h6>
        <Envios />
      </h6>
    </div>
  );
};

export default Shipping;
