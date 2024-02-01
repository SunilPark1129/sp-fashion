import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Shop from "./pages/shop/Shop";
import Contact from "./pages/contact/Contact";

import Purchase from "./pages/purchase/Purchase";
import Login from "./pages/login/Login";
import Footer from "./components/footer/Footer";
import Favorite from "./pages/favorite/Favorite";
import ErrorPage from "./pages/error/ErrorPage";
import Detail from "./pages/detail/Detail";
import Career from "./pages/career/Career";
import Search from "./pages/search/Search";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { updateLikeState } from "./redux/features/LikeSlice";
import { updateBasketState } from "./redux/features/basketSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getLikeStorage: string | undefined = Cookies.get(
      "project-sp1129-like-wishlist"
    );

    if (getLikeStorage) {
      const { state } = JSON.parse(getLikeStorage);
      if (state) {
        dispatch(updateLikeState(state));
      }
    }

    const getBasketStorage: string | undefined = Cookies.get(
      "project-sp1129-basket-wishlist"
    );

    if (getBasketStorage) {
      const { state } = JSON.parse(getBasketStorage);
      if (state) {
        dispatch(updateBasketState(state));
      }
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
