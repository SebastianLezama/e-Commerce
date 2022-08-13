import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import s from "./Card.module.css";
import { useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import Search from "../Search";
import { categoriesSpanish } from "../../../utils/Productos";

const CardContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const URL = "https://fake-products-eric.herokuapp.com/api/products";
    const fetchCategory = categoryId
      ? `${URL}/category/${categoryId}`
      : `${URL}`;

    fetch(fetchCategory)
      .then((res) => res.json())
      .then((res) => {
        res.map((prod) => (prod.price = prod.price * 20));
        setItems(res);
        setLoading(false);
      });

    setCategory(categoryId);

    return () => {
      setItems([]);
    };
  }, [categoryId]);

  const prodCategory = categoryId && categoriesSpanish[category];

  return (
    <div className="mainContainer">
      <div className={s.cardContainer}>
        <h2>{prodCategory}</h2>
        <Search />
        <CardList items={items} notInCart={true} onProd={true} />
        <div className={s.loading}>{loading && <PropagateLoader />}</div>
      </div>
    </div>
  );
};

export default CardContainer;
