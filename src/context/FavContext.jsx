import { createContext, useCallback, useEffect, useState } from "react";
import { getLocalStorage } from "./CartContext";

export const FavContext = createContext();

const FavProvider = (props) => {
  const [favs, setFavs] = useState(getLocalStorage("favItems"));
  const [favsItems, setFavsItems] = useState(0);

  const clearFavs = () => {
    setFavs([]);
  };

  const isInFavs = (id) => {
    return favs.some((prod) => prod.id === id);
  };

  const addToFavs = (item) => {
    if (!isInFavs(item.id)) {
      setFavs([...favs, { ...item }]);
    }
  };

  const removeFromFavs = (id) => {
    const filteredProd = favs.filter((prod) => prod.id !== id);
    setFavs(filteredProd);
  };

  const favsItemsCounter = useCallback(() => {
    const favsCopy = [...favs];
    let count = 0;
    favsCopy.forEach(() => (count += 1));
    setFavsItems(count);
  }, [favs]);

  useEffect(() => {
    favsItemsCounter();
    localStorage.setItem("favItems", JSON.stringify(favs));
  }, [favs, favsItemsCounter]);

  return (
    <FavContext.Provider
      value={{
        favs,
        favsItems,
        clearFavs,
        addToFavs,
        removeFromFavs,
        isInFavs,
      }}
    >
      {props.children}
    </FavContext.Provider>
  );
};

export default FavProvider;
