import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { requestHTTP } from "../../redux/features/getSlice";

type Props = {};

function Purchase({}: Props) {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.getPost
  );
  const dispatch = useDispatch<AppDispatch>();

  function getData(category: string) {
    dispatch(requestHTTP(category));
  }
  useEffect(() => {
    getData("coat");
  }, []);

  return <div>Purchase</div>;
}

export default Purchase;
