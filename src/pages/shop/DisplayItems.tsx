import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import { FilteredProp } from "../../model/stateProps";
import { IMAGE_KEY } from "../../model/imageKey";

type Props = {
  filteredData: FilteredProp[];
};

function DisplayItems({ filteredData }: Props) {
  return (
    <div>
      <ul>
        {filteredData.map((item: FilteredProp) => {
          return <CardComponent item={item} key={item.id + item.category} />;
        })}
      </ul>
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
    <li key={item.id + item.category}>
      {item.name} {item.gender}
      <p>has Like: {item.like ? "true" : "false"}</p>
      <p>has Basket: {item.basket ? "true" : "false"}</p>
      <div>
        {item.image.map((str) => (
          <div key={str}>
            <img src={IMAGE_KEY + str} alt={item.name} />
          </div>
        ))}
      </div>
      <button onClick={() => likeClickHandler(item)}>Like</button>
      <button onClick={() => basketClickHandler(item)}>Basket</button>
    </li>
  );
}

export default DisplayItems;