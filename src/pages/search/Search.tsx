import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ShopAside from "../../components/aside/ShopAside";
import {
  BasketProp,
  CategoryValidProp,
  FilteredProp,
} from "../../model/stateProps";
import Items from "../../components/item/Items";
import { requestHTTPAll } from "../../redux/features/getAllSlice";
import { useSearchParams } from "react-router-dom";

type Props = {};

const validCategory = ["coat", "shirt", "hoodie", "sweater"];
const validGender = ["men", "women"];

const b: CategoryValidProp = "coat";
function Search({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [paramEmpty, setParamEmpty] = useState();
  //   const [selectedCategory, setSelectedCategory] =
  //     useState<CategoryValidProp>(null);
  const { loading, data, error } = useSelector(
    (store: RootState) => store.getAllPost
  );

  const [param] = useSearchParams();

  const searchTerm: any = param.get("term");

  const [filteredData, setFilteredData] = useState<BasketProp[]>([]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(requestHTTPAll());
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const regexp = new RegExp(
        `\\b${searchTerm.replace(/\s+/g, ".*")}.*\\b`,
        "i"
      );
      const temp: BasketProp[] = data.filter((item) => item.name.match(regexp));
      setFilteredData(temp);
    }
  }, [data]);

  // components to display current pending stage
  function PendingData() {
    if (!searchTerm) return <NeedTermComponent />;
    if (error) return <ErrorComponent err={error} />;
    if (loading) return <LoadingComponent />;
    return (
      <>
        <ShopAside filteredData={filteredData} />
        <Items selectedCategory={"all"} />
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
function NeedTermComponent() {
  return <div>need a search term...</div>;
}

/* When received an error from fetching */
function ErrorComponent({ err }: any) {
  return <div>{err}</div>;
}

/* When currently pending */
function LoadingComponent() {
  return <div>Loading ...</div>;
}

export default Search;