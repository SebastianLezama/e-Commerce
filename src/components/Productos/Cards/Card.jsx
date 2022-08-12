import React, { useState, useCallback, useEffect } from "react";
import Shipping from "../Shipping";
import s from "./Card.module.css";
import CardDetail from "./CardDetail";

const Card = ({ prod, notInCart, onMain, onProd }) => {
  const [showModal, setShowModal] = useState(false);
  const [width, setWidth] = useState(false);
  const [grow, setGrow] = useState(false);

  const minShippingValue = 2000;

  const handleClick = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const onMouseEnter = () => {
    prod.price >= minShippingValue && setGrow(true);
  };
  const onMouseLeave = () => {
    setGrow(false);
  };

  const checkWidth = useCallback(() => {
    const updatedWidth = window.innerWidth;
    setWidth(updatedWidth);
  }, []);

  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [width, checkWidth]);

  const GrowCard = () => {
    if (width < 960 || onProd) {
      return (
        <Shipping priceValue={prod.price} minShippingValue={minShippingValue} />
      );
    }
    if (grow) {
      return (
        <Shipping priceValue={prod.price} minShippingValue={minShippingValue} />
      );
    }
  };

  const handleClass = () => {
    if (grow) {
      return s.cardMain;
    } else if (onMain) {
      return s.cardMainCopy;
    } else {
      return s.card;
    }
  };

  return (
    <>
      <div
        className={handleClass()}
        onClick={() => handleClick()}
        onMouseEnter={onMain && onMouseEnter}
        onMouseLeave={onMain && onMouseLeave}
      >
        <img src={prod.img} alt={prod.name} />
        <div className={s.info}>
          <h3>{prod.name}</h3>
          <h4>Precio: $ {prod.price}</h4>
          <GrowCard />
        </div>
      </div>
      <CardDetail
        key={prod.id}
        handleClose={hideModal}
        notInCart={notInCart}
        id={prod.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Card;
