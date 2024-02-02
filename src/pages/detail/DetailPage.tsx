import "./detail.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL, IMAGE_KEY } from "../../data/key";
import { FilteredProp } from "../../model/stateProps";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getFilter } from "../../utilities/getFilter";
import { useDispatch } from "react-redux";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";
import DetailLoading from "./DetailLoading";
import FetchError from "../../components/fetcherror/FetchError";
import DisplayComponent from "./DisplayComponent";

function DetailPage() {
  const [params] = useSearchParams();
  const [data, setData] = useState<FilteredProp | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const likeState: FilteredProp[] = useSelector(
    (store: RootState) => store.likeState.results
  );
  const basketState: FilteredProp[] = useSelector(
    (store: RootState) => store.basket.results
  );
  const pathParam: string | null = params.get("path");
  const termParam: string | null = params.get("term");

  useEffect(() => {
    const categoryParam = params.get("category");
    const unitParam = params.get("unit");

    async function requestUnit(category: string, unit: string) {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_URL}/results/${category}/${Number(unit) - 1}`
      )
        .then((res) => res.json())
        .then((data) => {
          const filtered = getFilter([data], likeState, basketState);
          setIsLoading(false);
          setError(null);
          return filtered;
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
          return null;
        });
      if (res) setData(res[0]);
    }

    if (categoryParam && unitParam) {
      requestUnit(categoryParam, unitParam);
    }

    return () => {
      setIsLoading(false);
      setError(null);
    };
  }, [params]);

  if (isLoading) return <DetailLoading />;
  if (!data || error) return <FetchError error={error} />;
  return (
    <DisplayComponent data={data} pathParam={pathParam} termParam={termParam} />
  );
}

export default DetailPage;
