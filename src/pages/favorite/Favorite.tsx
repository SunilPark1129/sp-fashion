import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ShopAside from "../../components/aside/ShopAside";
import { FilteredProp } from "../../model/stateProps";
import Items from "../../components/item/Items";
import Advertisement from "../../components/advertisement/Advertisement";
import NoWishListFound from "../../components/nowishlist/NoWishList";

type Props = {};

function Favorite({}: Props) {
  const likeState = useSelector((store: RootState) => store.likeState.results);
  const [filteredData, setFilteredData] = useState<FilteredProp[]>([]);

  useEffect(() => {
    let temp: FilteredProp[] = [];
    likeState.forEach((item) => {
      temp.push(item);
    });
    setFilteredData(temp);
  }, [likeState]);

  return (
    <main className="shop">
      <div className="wrapper">
        <div className="container">
          {filteredData.length !== 0 ? (
            <>
              <ShopAside filteredData={filteredData} />
              <Items selectedCategory={"favorite"} />
            </>
          ) : (
            <NoWishListFound />
          )}
        </div>
        <Advertisement />
      </div>
    </main>
  );
}

export default Favorite;
