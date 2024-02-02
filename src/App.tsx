import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/home/HomePage";
import Navbar from "./components/navbar/Navbar";
import Shop from "./pages/shop/ShopPage";
import Purchase from "./pages/purchase/PurchasePage";
import Login from "./pages/login/LoginPage";
import Footer from "./components/footer/Footer";
import Favorite from "./pages/favorite/FavoritePage";
import ErrorPage from "./pages/error/ErrorPage";
import Detail from "./pages/detail/DetailPage";
import Search from "./pages/search/SearchPage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { updateLikeState } from "./redux/features/LikeSlice";
import { updateBasketState } from "./redux/features/basketSlice";
import ScrollToTop from "./utilities/ScrollToTop";

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
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <ScrollToTop />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
