import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestHTTP } from "../../redux/features/getSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { MyData } from "../../redux/features/getSlice";
import ShopAside from "./ShopAside";
import DisplayItems from "./DisplayItems";
type Props = {};

type IdProp = { id: string | undefined };

function Shop({}: Props) {
  const { id }: any = useParams<IdProp>();
  const [paramCategory, paramGender] = id.split("-");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    paramCategory
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(
    paramGender
  );
  const [filteredData, setFilteredData] = useState<MyData[] | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );

  useEffect(() => {
    setSelectedCategory(paramCategory);
    setSelectedGender(paramGender);
  }, [id]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(requestHTTP(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && data.length !== 0) {
      const convertGender = selectedGender === "men" ? "male" : "female";
      const temp = data.filter(({ gender }) => gender === convertGender);
      setFilteredData(temp);
    }
  }, [selectedGender, data]);

  function PendingData() {
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

function ErrorComponent(err: any) {
  return <div>{err}</div>;
}

function LoadingComponent() {
  return <div>Loading ...</div>;
}

export default Shop;
