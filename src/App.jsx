import "./App.css";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import CardContainer from "./components/Productos/Cards/CardContainer";
import Favorites from "./components/Productos/Favorites";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/productos" element={<CardContainer />} />
          <Route path="/category/:categoryId" element={<CardContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favs" element={<Favorites />} />
          <Route path="/checkout/:responseId" element={<Checkout />} />
          <Route path="/productos/search/:input" element={<CardContainer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
