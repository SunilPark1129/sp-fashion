import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { FilteredProp, LikeStateProp } from "../../model/stateProps";
import ShopAside from "./ShopAside";
import DisplayItems from "./DisplayItems";

type ParamProp = { id: string | undefined };

type CategoryProp = "coat" | "shirt" | "hoodie" | "sweater";

function Shop() {
  /* param states */
  const { id }: any = useParams<ParamProp>();
  const [paramCategory, paramGender] = id.split("-");
  const [wrongParam, setWrongParam] = useState(false);

  /* resources to fetch and filter */
  const [selectedCategory, setSelectedCategory] = useState<CategoryProp | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<FilteredProp[] | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  /* request and receive the data from server */
  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );

  /* */
  const likeState: LikeStateProp = useSelector(
    (state: RootState) => state.likeState
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
      console.log("fetching HTTP notification...");
      dispatch(requestHTTP(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    console.log(likeState);
  }, [likeState]);

  useEffect(() => {
    // filtering the received data
    if (selectedCategory && data.length !== 0) {
      console.log("filtering notification...");
      const convertGender = selectedGender === "men" ? "male" : "female";
      const temp = data
        .filter(({ gender }) => gender === convertGender)
        .map((item) => {
          let hasLike = false;
          likeState[selectedCategory].forEach(({ id }) => {
            if (id === item.id) hasLike = true;
          });
          return { ...item, like: hasLike };
        });
      setFilteredData(temp);
    }
  }, [selectedGender, data, likeState]);

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
