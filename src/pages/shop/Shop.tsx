import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { FilteredProp, CategoryValidProp } from "../../model/stateProps";
import ShopAside from "./ShopAside";
import DisplayItems from "./DisplayItems";
import { getFilter } from "../../utilities/getFilter";

type ParamProp = { id: string | undefined };

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

  const dispatch = useDispatch<AppDispatch>();

  /* request and receive the data from server */
  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );

  /* */
  const likeState: any = useSelector((state: RootState) => state.likeState);
  const basket: any = useSelector((state: RootState) => state.basket);

  useEffect(() => {
    const validCategory = ["coat", "shirt", "hoodie", "sweater"];
    const validGender = ["men", "women"];
    if (paramCategory) {
      // used a validated param
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
    console.log("like:", likeState);
    console.log("brakest:", basket);
  }, [likeState, basket]);

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

  // a component to display current pending stage
  function PendingData() {
    if (wrongParam) return <WrongParamComponent />;
    if (error) return <ErrorComponent err={error} />;
    if (loading || !filteredData) return <LoadingComponent />;
    return <DisplayItems filteredData={filteredData} />;
  }

  return (
    <main>
      <ShopAside />
      <article>
        <PendingData />
      </article>
    </main>
  );
}

function WrongParamComponent() {
  return <div>Wrong Param...</div>;
}

function ErrorComponent({ err }: any) {
  return <div>{err}</div>;
}

function LoadingComponent() {
  return <div>Loading ...</div>;
}

export default Shop;
