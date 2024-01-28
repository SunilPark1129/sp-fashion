import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../data/key";
import { BasketProp, FilteredProp } from "../../model/stateProps";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Detail() {
  const location = useLocation();
  const [params] = useSearchParams();
  // console.log("detail:", location);
  const [data, setData] = useState<BasketProp>();
  const [filteredData, setFilteredData] = useState<FilteredProp>();

  const likeArray = useSelector((store: RootState) => store.likeState);
  const basketArray = useSelector((store: RootState) => store.basket);

  useEffect(() => {
    const categoryParam = params.get("category");
    const unitParam = params.get("unit");

    async function requestUnit(category: any, unit: any) {
      setData(
        await fetch(`${BASE_URL}/results/${category}/${unit - 1}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(likeArray);
            return data;
          })
      );
    }

    if (categoryParam && unitParam) {
      requestUnit(categoryParam, unitParam);
    }
  }, [params]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) return null;
  const { id, name, sale, color, image, price, gender, category } = data;

  return <div>{name}</div>;
}

export default Detail;
