import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import {
  FilteredProp,
  CategoryValidProp,
  CategoryProp,
} from "../../model/stateProps";
import ShopAside from "./ShopAside";
import Items from "./Items";
import { getFilter } from "../../utilities/getFilter";
import "./shop.css";

type ParamProp = { id: string | undefined };

const validCategory = ["coat", "shirt", "hoodie", "sweater"];
const validGender = ["men", "women"];

function Shop() {
  /* param states */
  const { id }: any = useParams<ParamProp>();
  const [paramCategory, paramGender] = id.split("-");
  const [wrongParam, setWrongParam] = useState(false);

  /* resources to fetch and filter */
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValidProp>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<FilteredProp[] | null>(null);

  /* request and receive the data from server */
  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );

  /* GET like & basket lists */
  const likeState: CategoryProp = useSelector(
    (state: RootState) => state.likeState
  );
  const basket: CategoryProp = useSelector((state: RootState) => state.basket);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (paramCategory) {
      // check if current id params are validated
      if (
        !validCategory.includes(paramCategory) ||
        !validGender.includes(paramGender)
      ) {
        setWrongParam(true);
      } else {
        setSelectedCategory(paramCategory);
        setSelectedGender(paramGender);
      }
    }
    return () => {
      setWrongParam(false);
    };
  }, [id]);

  useEffect(() => {
    // new HTTP request
    if (selectedCategory && !wrongParam) {
      console.log("fetching HTTP notification...");
      dispatch(requestHTTP(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    // filtering the received data
    if (selectedCategory && data.length !== 0) {
      console.log("filtering notification...");
      const convertGender = selectedGender === "men" ? "male" : "female";

      const res = getFilter(
        convertGender,
        data,
        likeState[selectedCategory],
        basket[selectedCategory]
      );
      setFilteredData(res);
    }
  }, [selectedGender, data, likeState, basket]);

  // components to display current pending stage
  function PendingData() {
    if (wrongParam) return <WrongParamComponent />;
    if (error) return <ErrorComponent err={error} />;
    if (loading || !filteredData) return <LoadingComponent />;
    return <Items filteredData={filteredData} />;
  }

  return (
    <main className="shop">
      <div className="wrapper">
        <div className="container">
          <ShopAside />
          <PendingData />
        </div>
      </div>
    </main>
  );
}

/* When id param is not validated */
function WrongParamComponent() {
  return <div>Wrong Param...</div>;
}

/* When received an error from fetching */
function ErrorComponent({ err }: any) {
  return <div>{err}</div>;
}

/* When currently pending */
function LoadingComponent() {
  return <div>Loading ...</div>;
}

export default Shop;
