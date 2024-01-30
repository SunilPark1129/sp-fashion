import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ShopAside from "../../components/aside/ShopAside";
import { BasketProp, CategoryValidProp } from "../../model/stateProps";
import Items from "../../components/item/Items";
import { requestHTTPAll } from "../../redux/features/getAllSlice";
import { useSearchParams } from "react-router-dom";
import LoadingPage from "../../components/loading/LoadingPage";

const b: CategoryValidProp = "coat";
function Search() {
  const dispatch = useDispatch<AppDispatch>();
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
    if (loading) return <LoadingPage />;
    return (
      <>
        <ShopAside filteredData={filteredData} />
        <Items selectedCategory={"search"} />
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

export default Search;
