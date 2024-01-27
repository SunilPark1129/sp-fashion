import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { BasketProp, CategoryValidProp } from "../../model/stateProps";
import ShopAside from "../../components/aside/ShopAside";
import Items from "../../components/item/Items";
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
  const [genderFilterData, setGenderFilterData] = useState<BasketProp[]>([]);

  /* request and receive the data from server */
  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );

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
      dispatch(requestHTTP(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    // filtering the received data
    if (selectedCategory && data.length !== 0) {
      const convertGender = selectedGender === "men" ? "male" : "female";
      const res = data.filter(({ gender }) => gender === convertGender);
      setGenderFilterData(res);
    }
  }, [selectedGender, data]);

  // components to display current pending stage
  function PendingData() {
    if (wrongParam) return <WrongParamComponent />;
    if (error) return <ErrorComponent err={error} />;
    if (loading || genderFilterData.length === 0) return <LoadingComponent />;
    return (
      <>
        <ShopAside filteredData={genderFilterData} />
        <Items selectedCategory={selectedCategory} />
      </>
    );
  }

  return (
    <main className="shop">
      <div className="wrapper">
        <div className="container">
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
