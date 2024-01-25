import "./home.css";

import Banner from "./Banner";
import bestSeller1 from "./assets/home_bestseller_1.jpg";
import bestSeller2 from "./assets/home_bestseller_7.jpg";
import bestSeller3 from "./assets/home_bestseller_12.jpg";
import bestSeller4 from "./assets/home_bestseller_15.jpg";
import brandNewLarge from "./assets/home_brandnew_large.jpg";
import sale1 from "./assets/home_sale_1.jpg";
import sale2 from "./assets/home_sale_2.jpg";
import sale3 from "./assets/home_sale_3.jpg";
import sale4 from "./assets/home_sale_4.jpg";

import { getSaleCalculator } from "../../utilities/getSaleCalculator";

function BestSeller() {
  const bestSellerArray = [
    {
      img: bestSeller1,
      category: "COAT",
      name: "Short Simple Designed Woman Coat",
      price: "360",
      sale: "0",
      id: "38",
    },
    {
      img: bestSeller2,
      category: "HOODIE",
      name: "Fancy Clean Designed Woman Hoodie",
      price: "220",
      sale: "0",
      id: "24",
    },
    {
      img: bestSeller3,
      category: "SHIRT",
      name: "Overfit Simple Designed Man Shirt",
      price: "42",
      sale: "10",
      id: "9",
    },
    {
      img: bestSeller4,
      category: "SWEATER",
      name: "Cowl Neck Fancy Woman Sweater",
      price: "148",
      sale: "10",
      id: "19",
    },
  ];

  function itemClickHandler(id: string) {
    console.log(id);
  }

  return (
    <section className="home__main-section home__section">
      <div className="wrapper">
        <div>
          <h2>BEST SELLTER of the year</h2>
        </div>
        <div className="container">
          <div className="home__section__box">
            {bestSellerArray.map(({ img, category, name, price, sale, id }) => (
              <div
                key={id + name}
                className="home__section__item"
                onClick={() => itemClickHandler(id)}
              >
                <div className="home__section__img">
                  <img src={img} alt={name} />
                </div>
                <div className="home__section__text">
                  <p>{category}</p>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SeasonSales() {
  const bestSellerArray = [
    {
      img: sale1,
      category: "COAT",
      name: "Fancy Simple Man Coat",
      price: "320",
      sale: "25",
      id: "8",
    },
    {
      img: sale2,
      category: "HOODIE",
      name: "Fancy Smooth Woman Hoodie",
      price: "180",
      sale: "20",
      id: "20",
    },
    {
      img: sale3,
      category: "SHIRT",
      name: "Open Neck Designed Woman Shirt",
      price: "52",
      sale: "25",
      id: "3",
    },
    {
      img: sale4,
      category: "SWEATER",
      name: "Thin Cable Knit Woman Sweater",
      price: "78",
      sale: "30",
      id: "20",
    },
  ];

  function itemClickHandler(id: string) {
    console.log(id);
  }

  return (
    <section className="home__main-section home__section">
      <div className="wrapper">
        <div>
          <h2>BIG SALES</h2>
        </div>
        <div className="container">
          <div className="home__section__box">
            {bestSellerArray.map(({ img, category, name, price, sale, id }) => (
              <div
                key={id + name}
                className="home__section__item"
                onClick={() => itemClickHandler(id)}
              >
                <div className="home__section__img">
                  <img src={img} alt={name} />
                </div>
                <div className="home__section__text">
                  <p>{category}</p>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandNew() {
  return (
    <section className="home__main-section home__brand-new">
      <div className="wrapper">
        <div>
          <h2>Brand New</h2>
        </div>
        <div className="container">
          <div className="home__brand-new__img">
            <img src={brandNewLarge} alt="" />
          </div>
          <div className="home__brand-new__text">
            <p>Short Fashioned Woman Coat</p>
            <p>$364</p>
            <button>See detail</button>
            {/* 41 */}
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main className="home">
      <Banner />

      <BestSeller />

      <BrandNew />

      <SeasonSales />
    </main>
  );
}

export default Home;
