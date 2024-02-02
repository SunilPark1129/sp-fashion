import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import { CategoryValidProp, FilteredProp } from "../../model/stateProps";
import { IMAGE_KEY } from "../../data/key";
import "./card.css";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";
import { getFilter } from "../../utilities/getFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cleanupSort } from "../../redux/features/sortSlice";
import CardComponent from "./CardComponent";
import EmptyItemComponent from "../emptyItem/EmptyItemComponent";

type Props = {
  selectedCategory: CategoryValidProp;
};

function Card({ selectedCategory }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [displayData, setDisplayData] = useState<FilteredProp[] | null>(null);
  const [keptData, setKeptData] = useState<FilteredProp[] | null>(null);

  /* GET like & basket lists */
  const likeState: FilteredProp[] = useSelector(
    (store: RootState) => store.likeState.results
  );
  const basketState: FilteredProp[] = useSelector(
    (store: RootState) => store.basket.results
  );
  const data = useSelector((store: RootState) => store.getSort.data);

  // check and set wishlists for individual items if there states are true
  function getAutoFilter(data: FilteredProp[]) {
    if (!selectedCategory || !data) return null;
    let temp;
    temp = getFilter(data, likeState, basketState);
    return temp;
  }

  // when requested a new data (move to other link)
  useEffect(() => {
    if (!selectedCategory || !data) return;
    let temp = getAutoFilter(data);
    setDisplayData(temp);
  }, [data]);

  // when like or basket trigger has been clicked
  useEffect(() => {
    if (!selectedCategory || !keptData) return;
    let temp = getAutoFilter(keptData);
    setDisplayData(temp);
  }, [likeState, basketState]);

  // keep new data into keptData state
  // - data state will be cleanup to reduce the re-rendering purpose
  useEffect(() => {
    if (data) {
      setKeptData(data);
    }
  }, [data]);

  // cleanup the state
  useEffect(() => {
    dispatch(cleanupSort());
  }, [displayData]);

  return (
    <div className="card">
      {displayData ? (
        displayData.length !== 0 ? (
          <div className="card__content">
            {displayData.map((item: FilteredProp) => {
              return (
                <CardComponent
                  key={item.id + item.category}
                  item={item}
                  selectedCategory={selectedCategory}
                />
              );
            })}
          </div>
        ) : (
          <EmptyItemComponent />
        )
      ) : null}
    </div>
  );
}

export default Card;
