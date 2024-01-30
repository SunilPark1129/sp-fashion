import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { BasketProp, CategoryValidProp } from "../../model/stateProps";
import ShopAside from "../../components/aside/ShopAside";
import Items from "../../components/item/Items";
import "./shop.css";
import LoadingPage from "../../components/loading/LoadingPage";
import Advertisement from "../../components/advertisement/Advertisement";

const validCategory = ["coat", "shirt", "hoodie", "sweater"];
const validGender = ["men", "women"];

function Shop() {
  const navigate = useNavigate();

  /* param states */
  const [param] = useSearchParams();
  const paramCategory: any = param.get("category");
  const paramGender: any = param.get("gender");

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValidProp>(null);
  const [genderFilterData, setGenderFilterData] = useState<BasketProp[] | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  /* request and receive the data from server */
  const { data, loading, error } = useSelector(
    (store: RootState) => store.getPost
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
      navigate("/404page");
    }
  }, [paramCategory, paramGender]);

  useEffect(() => {
    // new HTTP request
    if (selectedCategory) {
      console.log("ren");
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
            error={error}
            loading={loading}
            genderFilterData={genderFilterData}
            selectedCategory={selectedCategory}
          />
        </div>
        <Advertisement />
      </div>
    </main>
  );
}

type PendingProp = {
  error: string | undefined;
  loading: boolean;
  genderFilterData: BasketProp[] | null;
  selectedCategory: CategoryValidProp;
};

// components to display current pending stage
function PendingData({
  error,
  loading,
  genderFilterData,
  selectedCategory,
}: PendingProp) {
  if (error) return <ErrorComponent err={error} />;
  if (loading) return <LoadingPage />;
  return (
    <>
      <ShopAside filteredData={genderFilterData} />
      <Items selectedCategory={selectedCategory} />
    </>
  );
}

/* When received an error from fetching */
function ErrorComponent({ err }: any) {
  return <div>{err}</div>;
}

export default Shop;
