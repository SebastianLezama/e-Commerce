import React from "react";
import { Link } from "react-router-dom";
import "./DropDown.css";
import { categoriesFromApi } from "../../../utils/Productos";

export const MapCategories = ({ categories, className }) => {
  return (
    <>
      {categories.map((cat, index) => (
        <li key={index}>
          <Link className={className} to={`/${cat.value}`}>
            {cat.label}
          </Link>
        </li>
      ))}
    </>
  );
};

const DropDown = () => {
  return (
    <ul className="dropdown-menu">
      <MapCategories categories={categoriesFromApi} className="dropdown-link" />
    </ul>
  );
};

export default DropDown;
