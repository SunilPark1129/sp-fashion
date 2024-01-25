import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import { FilteredProp } from "../../model/stateProps";
import { IMAGE_KEY } from "../../data/key";
import "./items.css";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";

type Props = {
  filteredData: FilteredProp[];
};

function Items({ filteredData }: Props) {
  const reversedData = [...filteredData].reverse();
  return (
    <div className="shop__category">
      <div className="shop__category__box">
        {reversedData.map((item: FilteredProp) => {
          return <CardComponent item={item} key={item.id + item.category} />;
        })}
      </div>
    </div>
  );
}

function CardComponent({ item }: { item: FilteredProp }) {
  const dispatch = useDispatch<AppDispatch>();

  function likeClickHandler(payload: FilteredProp) {
    if (payload.like === false) {
      dispatch(addLikeState(payload));
    } else {
      dispatch(deleteLikeState(payload));
    }
  }

  function basketClickHandler(payload: FilteredProp) {
    if (payload.basket === false) {
      dispatch(addBasket(payload));
    } else {
      dispatch(deleteBasket(payload));
    }
  }

  function itemClickHandler() {
    console.log("clicked");
  }

  // id: string;
  // name: string;
  // sale: number;
  // color: string;
  // image: string;
  // price: number;
  // gender: string;
  // member: number;
  // category: string;

  return (
    <section
      className="shop__category__box__item"
      onClick={itemClickHandler}
      key={item.id + item.category}
    >
      <div className="shop__category__box__item__img">
        <img src={IMAGE_KEY + item.image[0]} alt={item.name} loading="lazy" />
        <div className="shop__category__box__item__btn">
          <button
            className={`btn-svg btn-svg--like ${
              item.like && "btn-svg--like--active"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              likeClickHandler(item);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.7935 19.8932L3.97038 12.07C2.00987 10.1095 2.00988 6.93087 3.97037 4.97037C5.93087 3.00988 9.1095 3.00988 11.07 4.97037L11.4236 4.61682L11.07 4.97038L11.4402 5.34061L11.7938 5.69416L12.1474 5.3406L12.5136 4.97429C14.4741 3.01386 17.6526 3.01386 19.613 4.97429C21.5734 6.93472 21.5734 10.1132 19.613 12.0736L11.7935 19.8932Z" />
            </svg>
          </button>
          <button
            className={`btn-svg btn-svg--basket ${
              item.basket && "btn-svg--basket--active"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              basketClickHandler(item);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 3H4V21H20V3ZM9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7L16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843Z"
                stroke="black"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="shop__category__box__item__info">
        <h3 className="shop__category__box__item__name">{item.name}</h3>
        {item.sale === 0 ? (
          <p>${item.price.toFixed(2)}</p>
        ) : (
          <p className="sale">
            <span className="cross">${item.price}</span>
            <span className="saleoff">-{item.sale}%</span>$
            {getSaleCalculator(String(item.price), String(item.sale))}
          </p>
        )}
      </div>
    </section>
  );
}

export default Items;
