import React from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import s from "./Card.module.css";

const CardList = ({ items, notInCart, onMain, onProd }) => {
  const { input } = useParams();

  const filterItems = (prod, text) => {
    if (!text) {
      return prod;
    }

    return prod.filter((prod) => prod.name.toLowerCase().includes(input));
  };

  const filteredItems = input ? filterItems(items, input) : items;
  const data = filteredItems.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <div className={s.CardList}>
      {data.map((prod) => (
        <Card
          prod={prod}
          key={prod.id}
          notInCart={notInCart}
          onMain={onMain}
          onProd={onProd}
        />
      ))}
    </div>
  );
};

export default CardList;
