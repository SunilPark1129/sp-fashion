import "./home.css";

import Banner from "./Banner";

import {
  bestSellerPic1,
  bestSellerPic2,
  bestSellerPic3,
  bestSellerPic4,
  bestSellerPic5,
  bestSellerPic6,
  bestSellerPic7,
  bestSellerPic8,
  bestSalePic1,
  bestSalePic2,
  bestSalePic3,
  bestSalePic4,
  bestSalePic5,
  bestSalePic6,
  bestSalePic7,
  bestSalePic8,
  recommendedPic,
} from "../../assets/imgURL";

import { getSaleCalculator } from "../../utilities/getSaleCalculator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateLikeState } from "../../redux/features/LikeSlice";
import { updateBasketState } from "../../redux/features/basketSlice";
import { useState } from "react";
import Advertisement from "../../components/advertisement/Advertisement";
import Cookies from "js-cookie";
import { brandNewPic } from "../../assets/imgURL";
import { IMAGE_KEY } from "../../data/key";

function HomePage() {
  return (
    <main className="home">
      <Banner />

      <Recommended />

      <div className="break"></div>

      <BestSeller />

      <div className="break"></div>

      <BrandNew />

      <div className="break"></div>

      <SeasonSales />

      <div className="break"></div>

      <div className="wrapper">
        <Advertisement />
      </div>

      <div className="break"></div>

      <RemoveCookie />

      <div className="break"></div>
    </main>
  );
}

/* ------------------------ BestSeller Component ------------------------*/
function BestSeller() {
  const bestSellerArray = [
    {
      img: bestSellerPic1,
      category: "coat",
      name: "Short Simple Designed Woman Coat",
      price: "360",
      sale: "0",
      id: "38",
    },
    {
      img: bestSellerPic5,
      category: "coat",
      name: "Short Fancy Man Coat",
      price: "360",
      sale: "0",
      id: "37",
    },
    {
      img: bestSellerPic2,
      category: "hoodie",
      name: "Fancy Clean Designed Woman Hoodie",
      price: "220",
      sale: "0",
      id: "24",
    },
    {
      img: bestSellerPic6,
      category: "hoodie",
      name: "Fancy Designed Man Hoodie",
      price: "144",
      sale: "5",
      id: "17",
    },
    {
      img: bestSellerPic7,
      category: "shirt",
      name: "Fancy Cleaned Simple Designed Woman Shirt",
      price: "60",
      sale: "0",
      id: "24",
    },
    {
      img: bestSellerPic3,
      category: "shirt",
      name: "Overfit Simple Designed Man Shirt",
      price: "42",
      sale: "10",
      id: "9",
    },
    {
      img: bestSellerPic4,
      category: "sweater",
      name: "Cowl Neck Fancy Woman Sweater",
      price: "148",
      sale: "10",
      id: "19",
    },
    {
      img: bestSellerPic8,
      category: "sweater",
      name: "Clean Designed Man to Man Sweater",
      price: "56",
      sale: "0",
      id: "17",
    },
  ];

  return (
    <section className="home__main-section home__section">
      <div className="wrapper">
        <div className="container">
          <h2>
            BEST <span>SELLTER</span>
          </h2>
          <div className="home__section__box">
            {bestSellerArray.map(({ img, category, name, price, sale, id }) => (
              <Link
                key={id + category}
                to={`/product?category=${category}&unit=${id}&path=${category}`}
                className="home__section__item"
              >
                <div className="home__section__img">
                  <img
                    src={`${IMAGE_KEY}/tr:w-500${img}`}
                    srcSet={`${IMAGE_KEY}/tr:w-300${img} 300w, ${IMAGE_KEY}/tr:w-500${img} 500w`}
                    sizes="(max-width: 740px) 300px, 500px"
                    alt={name}
                  />
                </div>
                <div className="home__section__text">
                  <p>{name}</p>
                  {sale === "0" ? (
                    <p>${price}</p>
                  ) : (
                    <p className="home__section__text__sale sale">
                      <span className="cross">${price}</span>
                      <span className="saleoff">-{sale}%</span>$
                      {getSaleCalculator(price, sale)}
                    </p>
                  )}
                  <p>{category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ SeasonSales Component ------------------------*/
function SeasonSales() {
  const bestSellerArray = [
    {
      img: bestSalePic5,
      category: "coat",
      name: "Fur Woman Coat",
      price: "192",
      sale: "20",
      id: "1",
    },
    {
      img: bestSalePic1,
      category: "coat",
      name: "Fancy Simple Man Coat",
      price: "320",
      sale: "25",
      id: "8",
    },
    {
      img: bestSalePic2,
      category: "hoodie",
      name: "Fancy Smooth Woman Hoodie",
      price: "180",
      sale: "20",
      id: "20",
    },
    {
      img: bestSalePic6,
      category: "hoodie",
      name: "Thick Designed Man Hoodie",
      price: "104",
      sale: "10",
      id: "9",
    },
    {
      img: bestSalePic3,
      category: "shirt",
      name: "Open Neck Designed Woman Shirt",
      price: "52",
      sale: "25",
      id: "3",
    },
    {
      img: bestSalePic7,
      category: "shirt",
      name: "Fancy Simple Designed Man Shirt",
      price: "66",
      sale: "10",
      id: "17",
    },
    {
      img: bestSalePic4,
      category: "sweater",
      name: "Thin Cable Knit Woman Sweater",
      price: "78",
      sale: "30",
      id: "20",
    },
    {
      img: bestSalePic8,
      category: "sweater",
      name: "Thick Aran Man Sweater",
      price: "114",
      sale: "10",
      id: "5",
    },
  ];

  return (
    <section className="home__main-section home__section">
      <div className="wrapper">
        <div className="container">
          <h2>
            BIG <span>SALES</span>
          </h2>
          <div className="home__section__box">
            {bestSellerArray.map(({ img, category, name, price, sale, id }) => (
              <Link
                key={id + category}
                to={`/product?category=${category}&unit=${id}&path=${category}`}
                className="home__section__item"
              >
                <div className="home__section__img">
                  <img
                    src={`${IMAGE_KEY}/tr:w-500${img}`}
                    srcSet={`${IMAGE_KEY}/tr:w-300${img} 300w, ${IMAGE_KEY}/tr:w-500${img} 500w`}
                    sizes="(max-width: 740px) 300px, 500px"
                    alt={name}
                  />
                </div>
                <div className="home__section__text">
                  <p>{name}</p>
                  {sale === "0" ? (
                    <p>${price}</p>
                  ) : (
                    <p className="home__section__text__sale sale">
                      <span className="cross">${price}</span>
                      <span className="saleoff">-{sale}%</span>$
                      {getSaleCalculator(price, sale)}
                    </p>
                  )}
                  <p>{category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ BrandNew Component ------------------------*/
function BrandNew() {
  return (
    <section className="home__main-section home__brand-new">
      <div className="wrapper">
        <h2>BRAND NEW</h2>
        <Link
          className="container"
          to={`/product?category=coat&unit=41&path=coat`}
        >
          <div className="home__brand-new__img">
            <img
              src={`${IMAGE_KEY}/tr:w-1300${brandNewPic}`}
              srcSet={`${IMAGE_KEY}/tr:w-500${brandNewPic} 500w, ${IMAGE_KEY}/tr:w-900${brandNewPic} 900w, ${IMAGE_KEY}/tr:w-1300${brandNewPic} 1300w`}
              sizes="(max-width: 500px) 500px, (max-width: 1200px) 900px, 1300px"
              alt="woman with a coat smiling"
            />
          </div>
          <div className="home__brand-new__text">
            <p>Short Fashioned Woman Coat</p>
            <p>$364</p>
            {/* <div className="role-link">See detail</div> */}
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------ Recommended Component ------------------------*/
function Recommended() {
  return (
    <section className="home__main-section home__brand-new">
      <div className="wrapper">
        <h2>TODAY's PICK</h2>
        <Link
          className="container"
          to={`/product?category=shirt&unit=18&path=shirt`}
        >
          <div className="home__brand-new__img">
            <img
              src={`${IMAGE_KEY}/tr:w-1300${recommendedPic}`}
              srcSet={`${IMAGE_KEY}/tr:w-500${recommendedPic} 500w, ${IMAGE_KEY}/tr:w-900${recommendedPic} 900w, ${IMAGE_KEY}/tr:w-1300${recommendedPic} 1300w`}
              sizes="(max-width: 500px) 500px, (max-width: 1200px) 900px, 1300px"
              alt="woman with a coat smiling"
            />
          </div>
          <div className="home__brand-new__text">
            <div></div>
            <p>Designed Crop Top Woman Shirt</p>
            <p>$49.50</p>
            {/* <div className="role-link">See detail</div> */}
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------ Remove Cookie Component ------------------------*/
function RemoveCookie() {
  const [hasData, setHasData] = useState<string | undefined>(
    Cookies.get("project-sp1129-like-wishlist") ||
      Cookies.get("project-sp1129-basket-wishlist")
  );
  const dispatch = useDispatch<AppDispatch>();

  function deleteCacheHandler() {
    // remove all caches
    Cookies.remove("project-sp1129-like-wishlist");
    Cookies.remove("project-sp1129-basket-wishlist");

    // passing the initial state to update the current state management
    dispatch(updateLikeState([]));
    dispatch(updateBasketState([]));
    setHasData(
      Cookies.get("project-sp1129-like-wishlist") ||
        Cookies.get("project-sp1129-basket-wishlist")
    );
  }
  return (
    <section className="remove-cookie">
      <div className="wrapper">
        <div className="container">
          <div className="remove-cookie__text">
            <h3>Remove All Caches</h3>
            <div>
              <p>
                This website has been created for the purpose of a project, so I
                added this section.
              </p>
              <p>
                Every time you click like or basket button, your wishlist is
                stored in cookies. All cookies are automatically removed after 7
                days, or you can manually delete them by clicking the delete
                button below.
              </p>
            </div>
          </div>
          <div className="remove-cookie__text__btn-box">
            <button onClick={deleteCacheHandler}>DELETE</button>
            <p>
              Currently data is in cookie:{" "}
              <span>{hasData ? "true" : "false"}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
