import React, { createContext, useCallback, useEffect, useState } from "react";

export const CartContext = createContext();

export const getLocalStorage = (name) => {
  const localData = localStorage.getItem(name);
  return localData ? JSON.parse(localData) : [];
};

const CartProvider = (props) => {
  const [cart, setCart] = useState(getLocalStorage("items"));

  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [checkoutDetail, setCheckoutDetail] = useState(
    getLocalStorage("checkout")
  );

  const deleteItem = (id) => {
    const filteredProd = cart.filter((prod) => prod.id !== id);
    setCart(filteredProd);
  };

  const addItem = (item, quantity) => {
    const addNew = cart.map((prod) =>
      prod.id === item.id
        ? { ...prod, quantity: prod.quantity + quantity }
        : prod
    );
    setCart(addNew);
  };

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const filteredItem = (item) => {
    return cart.find((prod) => prod.id === item.id);
  };

  const checkStock = (item, quantity) => {
    return item.stock >= filteredItem(item).quantity + quantity;
  };

  const addToCart = (item, quantity) => {
    if (isInCart(item.id)) {
      if (checkStock(item, quantity)) {
        addItem(item, quantity);
      } else {
        alert("No hay suficiente stock!");
      }
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const calcTotal = useCallback(() => {
    const cartCopy = [...cart];
    let count = 0;
    cartCopy.forEach((p) => (count += p.quantity * p.price));
    setTotal(count);
  }, [cart]);

  const cartItemsCounter = useCallback(() => {
    const cartCopy = [...cart];
    let count = 0;
    cartCopy.forEach((p) => (count += p.quantity));
    setCartItems(count);
  }, [cart]);

  const addOne = (item) => {
    if (item.quantity < item.stock) {
      item.quantity += 1;
      setCart([...cart]);
    }
  };

  const subOne = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCart([...cart]);
    }
  };

  const stockCart = (item) => {
    if (cart) {
      if (isInCart(item.id)) {
        return filteredItem(item).quantity;
      } else {
        return 0;
      }
    }
  };

  const checkoutOrder = (user, phone) => {
    setCheckoutDetail([
      { user: user, phone: phone, total: total },
      { items: [...cart] },
    ]);
  };

  useEffect(() => {
    calcTotal();
    cartItemsCounter();
    localStorage.setItem("items", JSON.stringify(cart));
  }, [cart, calcTotal, cartItemsCounter]);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        checkoutDetail,
        addOne,
        subOne,
        isInCart,
        addToCart,
        clearCart,
        deleteItem,
        calcTotal,
        stockCart,
        checkoutOrder,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
