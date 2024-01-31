import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ShopAside from "../../components/aside/ShopAside";
import { FilteredProp } from "../../model/stateProps";
import Items from "../../components/item/Items";
import Advertisement from "../../components/advertisement/Advertisement";

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
            <NoItemComponent />
          )}
        </div>
        <Advertisement />
      </div>
    </main>
  );
}

function NoItemComponent() {
  return (
    <div className="no-data no-data--fav">
      <div className="wrapper">
        <div className="container">
          <h3>NO WISHLIST...</h3>
          <p>
            You don't have any <span>saved wishlist</span>.
          </p>
          <p>
            Add new items to <span>your favorites</span> to check your wishlist
            anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
