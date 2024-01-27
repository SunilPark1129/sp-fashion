import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import ShopAside from "../../components/aside/ShopAside";
import { FilteredProp } from "../../model/stateProps";
import Items from "../../components/item/Items";

type Props = {};

function Favorite({}: Props) {
  const likes = useSelector((store: RootState) => store.likeState);
  const [filteredData, setFilteredData] = useState<FilteredProp[]>([]);

  useEffect(() => {
    let temp: FilteredProp[] = [];
    Object.entries(likes).forEach(([_, array]) => {
      array.forEach((item) => {
        temp.push(item);
      });
    });
    setFilteredData(temp);
  }, [likes]);

  return (
    <main className="shop">
      <div className="wrapper">
        <div className="container">
          {filteredData.length !== 0 && (
            <>
              <ShopAside filteredData={filteredData} />
              <Items selectedCategory={"like"} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Favorite;
