import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { MyData } from "../../redux/features/getSlice";
import ShopAside from "./ShopAside";
import DisplayItems from "./DisplayItems";

type ParamProp = { id: string | undefined };

function Shop() {
  /* param states */
  const { id }: any = useParams<ParamProp>();
  const [paramCategory, paramGender] = id.split("-");
  const [wrongParam, setWrongParam] = useState(false);

  /* resources to fetch and filter */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<MyData[] | null>(null);

  /* request and receive the data from server */
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );

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
      dispatch(requestHTTP(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    // filtering the received data
    if (selectedCategory && data.length !== 0) {
      const convertGender = selectedGender === "men" ? "male" : "female";
      const temp = data.filter(({ gender }) => gender === convertGender);
      setFilteredData(temp);
    }
  }, [selectedGender, data]);

  // a component to display current pending stage
  function PendingData() {
    if (wrongParam) return <WrongParamComponent />;
    if (error) return <ErrorComponent err={error} />;
    if (loading || !filteredData) return <LoadingComponent />;
    return <DisplayItems filteredData={filteredData} />;
  }

  return (
    <div>
      <ShopAside />
      <div>
        <PendingData />
      </div>
    </div>
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
