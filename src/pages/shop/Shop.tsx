import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { BasketProp, CategoryValidProp } from "../../model/stateProps";
import ShopAside from "../../components/aside/ShopAside";
import Items from "../../components/item/Items";
import "./shop.css";

const validCategory = ["coat", "shirt", "hoodie", "sweater"];
const validGender = ["men", "women"];

function Shop() {
  /* param states */
  const [param] = useSearchParams();
  const paramCategory: any = param.get("category");
  const paramGender: any = param.get("gender");

  const [wrongParam, setWrongParam] = useState(false);

  /* resources to fetch and filter */
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValidProp>(null);
  const [genderFilterData, setGenderFilterData] = useState<BasketProp[] | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  /* request and receive the data from server */
  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );

  const dispatch = useDispatch<AppDispatch>();

  // check if current id params are validated
  useEffect(() => {
    if (
      validCategory.includes(paramCategory) &&
      validGender.includes(paramGender)
    ) {
      setSelectedCategory(paramCategory);
      setSelectedGender(paramGender);
    } else {
      setWrongParam(true);
    }

    return () => {
      setWrongParam(false);
    };
  }, [paramCategory, paramGender]);

  useEffect(() => {
    // new HTTP request
    if (selectedCategory && !wrongParam) {
      dispatch(requestHTTP(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    // filtering the received data
    if (selectedCategory && Array.isArray(data) && data) {
      const convertGender = selectedGender === "men" ? "male" : "female";
      const res = data.filter(({ gender }) => gender === convertGender);
      setGenderFilterData(res);
    }
  }, [selectedGender, data]);

  return (
    <main className="shop">
      <div className="wrapper">
        <div className="container">
          <PendingData
            wrongParam={wrongParam}
            error={error}
            loading={loading}
            genderFilterData={genderFilterData}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </main>
  );
}

type PendingProp = {
  wrongParam: boolean;
  error: string | undefined;
  loading: boolean;
  genderFilterData: BasketProp[] | null;
  selectedCategory: CategoryValidProp;
};

// components to display current pending stage
function PendingData({
  wrongParam,
  error,
  loading,
  genderFilterData,
  selectedCategory,
}: PendingProp) {
  if (wrongParam) return <WrongParamComponent />;
  if (error) return <ErrorComponent err={error} />;
  if (loading) return <LoadingComponent />;
  return (
    <>
      <ShopAside filteredData={genderFilterData} />
      <Items selectedCategory={selectedCategory} />
    </>
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
