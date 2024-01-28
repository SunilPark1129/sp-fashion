import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BASE_URL, IMAGE_KEY } from "../../data/key";
import { CategoryProp, FilteredProp } from "../../model/stateProps";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getSingleFilter } from "../../utilities/getFilter";
import { useDispatch } from "react-redux";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";

function Detail() {
  const [params] = useSearchParams();
  const [data, setData] = useState<FilteredProp | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const likeState: CategoryProp = useSelector(
    (state: RootState) => state.likeState
  );
  const basket: CategoryProp = useSelector((state: RootState) => state.basket);

  useEffect(() => {
    const categoryParam = params.get("category");
    const unitParam = params.get("unit");

    async function requestUnit(category: string, unit: string) {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_URL}/results/${category}/${Number(unit) - 1}`
      )
        .then((res) => res.json())
        .then((data) => {
          const filtered = getSingleFilter(
            data,
            likeState[category as keyof typeof likeState],
            basket[category as keyof typeof basket]
          );
          setIsLoading(false);
          setError(null);
          return filtered;
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
          return null;
        });
      setData(res);
    }

    if (categoryParam && unitParam) {
      requestUnit(categoryParam, unitParam);
    }

    return () => {
      setIsLoading(false);
      setError(null);
    };
  }, [params]);

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Error:{error}</div>;
  return <DisplayComponent data={data} />;
}

type DisplayProp = {
  data: FilteredProp;
};

function DisplayComponent({ data }: DisplayProp) {
  const dispatch = useDispatch();
  const [like, setLike] = useState<boolean | undefined>(data.like);
  const [basket, setBasket] = useState<boolean | undefined>(data.basket);
  const { id, name, sale, color, image, price, gender, category } = data;

  function likeClickHandler() {
    if (like) {
      dispatch(deleteLikeState(data));
      setLike(false);
    } else {
      dispatch(addLikeState(data));
      setLike(true);
    }
  }

  function basketClickHandler() {
    if (basket) {
      dispatch(deleteBasket(data));
      setBasket(false);
    } else {
      dispatch(addBasket(data));
      setBasket(true);
    }
  }

  return (
    <div>
      {/* image */}
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          {image.map((item, idx) => (
            <div key={idx}>
              <img src={IMAGE_KEY + item} alt={name} />
            </div>
          ))}
        </div>
      </div>
      {/* text */}
      <div>
        <div>
          <h2>{name}</h2>
          <p>Gender: {gender}</p>
          <p>Category: {category}</p>
          <p>Color: {color}</p>
        </div>
        <div>
          <div>Size</div>
          <div>
            <div>X-Small</div>
            <div>Small</div>
            <div>Medium</div>
            <div>Large</div>
            <div>X-Large</div>
          </div>
        </div>
        <div>
          {sale === 0 ? (
            <p>Price: ${price.toFixed(2)}</p>
          ) : (
            <>
              <p>Sale: {sale}%</p>
              <p className="sale">
                Price: <span className="cross">${price}</span>$
                {getSaleCalculator(String(price), String(sale))}
              </p>
            </>
          )}
        </div>
      </div>
      {/* Purchase */}
      <div>
        <div>
          <label htmlFor="free-shipping">
            <input type="radio" name="shipping" id="free-shipping" checked />
            Free Shipping
            <span>Delivered within a week</span>
          </label>
          <label htmlFor="fast-shipping">
            <input type="radio" name="shipping" id="fast-shipping" />
            Fast Shipping
            <span>Delivered within 1 to 3 business days</span>
          </label>
        </div>
        <Link to={"/purchase"}>Purchase Cloth</Link>
        <div onClick={basketClickHandler}>
          <button
            className={`btn-svg btn-svg--basket ${
              basket && "btn-svg--basket--active"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 3H4V21H20V3ZM9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7L16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843Z"
                stroke="black"
              />
            </svg>
          </button>
          Add to Bag
        </div>
        <div onClick={likeClickHandler}>
          <button
            className={`btn-svg btn-svg--like ${
              like && "btn-svg--like--active"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.7935 19.8932L3.97038 12.07C2.00987 10.1095 2.00988 6.93087 3.97037 4.97037C5.93087 3.00988 9.1095 3.00988 11.07 4.97037L11.4236 4.61682L11.07 4.97038L11.4402 5.34061L11.7938 5.69416L12.1474 5.3406L12.5136 4.97429C14.4741 3.01386 17.6526 3.01386 19.613 4.97429C21.5734 6.93472 21.5734 10.1132 19.613 12.0736L11.7935 19.8932Z" />
            </svg>
          </button>
          Add to Wish List
        </div>
      </div>
    </div>
  );
}

export default Detail;
