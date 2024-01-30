import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Shop from "./pages/shop/Shop";
import Contact from "./pages/contact/Contact";

import Purchase from "./pages/purchase/Purchase";
import Login from "./pages/login/Login";
import Footer from "./components/footer/Footer";
import Favorite from "./pages/favorite/Favorite";
import User from "./pages/login/user/User";
import ErrorPage from "./pages/error/ErrorPage";
import Detail from "./pages/detail/Detail";
import Career from "./pages/career/Career";
import Search from "./pages/search/Search";

function App() {
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
          <Route path="/login/user" element={<User />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
