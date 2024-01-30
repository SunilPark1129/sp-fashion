import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import {
  CategoryProp,
  CategoryValidProp,
  FilteredProp,
} from "../../model/stateProps";
import { IMAGE_KEY } from "../../data/key";
import "./items.css";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";
import {
  getLikeFilter,
  getFilter,
  getBasketFilter,
  getAllFilter,
} from "../../utilities/getFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cleanupSort } from "../../redux/features/sortSlice";

type Props = {
  selectedCategory: CategoryValidProp;
};

function Items({ selectedCategory }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [displayData, setDisplayData] = useState<FilteredProp[] | null>(null);
  const [keptData, setKeptData] = useState<FilteredProp[] | null>(null);

  /* GET like & basket lists */
  const likeState: CategoryProp = useSelector(
    (store: RootState) => store.likeState.results
  );
  const basket: CategoryProp = useSelector(
    (store: RootState) => store.basket.results
  );
  const data = useSelector((store: RootState) => store.getSort.data);

  // check and set wishlists for individual items if there states are true
  function getAutoFilter(data: FilteredProp[]) {
    if (!selectedCategory || !data) return null;
    let temp;
    if (selectedCategory === "favorite") {
      temp = getLikeFilter(data, basket);
    } else if (selectedCategory === "purchase") {
      temp = getBasketFilter(data, likeState);
    } else if (selectedCategory === "search") {
      temp = getAllFilter(data, likeState, basket);
    } else {
      temp = getFilter(
        data,
        likeState[selectedCategory],
        basket[selectedCategory]
      );
    }
    return temp;
  }

  // when requested a new data (move to other link)
  useEffect(() => {
    if (!selectedCategory || !data) return;
    let temp = getAutoFilter(data);
    setDisplayData(temp);
  }, [data]);

  // when like or basket trigger has been clicked
  useEffect(() => {
    if (!selectedCategory || !keptData) return;
    let temp = getAutoFilter(keptData);
    setDisplayData(temp);
  }, [likeState, basket]);

  // keep new data into keptData state
  // - data state will be cleanup to reduce the re-rendering purpose
  useEffect(() => {
    if (data) {
      setKeptData(data);
    }
  }, [data]);

  // cleanup the state
  useEffect(() => {
    dispatch(cleanupSort());
  }, [displayData]);

  return (
    <div className="items">
      {displayData ? (
        displayData.length !== 0 ? (
          <div className="items__content">
            {displayData.map((item: FilteredProp) => {
              return (
                <CardComponent
                  key={item.id + item.category}
                  item={item}
                  selectedCategory={selectedCategory}
                />
              );
            })}
          </div>
        ) : (
          <NoItemComponent />
        )
      ) : null}
    </div>
  );
}

function NoItemComponent() {
  return (
    <section className="no-data">
      <div className="wrapper">
        <div className="container">
          <h3>NO ITEM</h3>
          <p>No clothes have been found...</p>
        </div>
      </div>
    </section>
  );
}

function CardComponent({
  item,
  selectedCategory,
}: {
  item: FilteredProp;
  selectedCategory: CategoryValidProp;
}) {
  const [isImgReady, setIsImgReady] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const hasMounted = useRef<boolean | null>(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // when image is onloaded, display image on the screen
  useEffect(() => {
    if (!imgRef.current || hasMounted.current) return;
    hasMounted.current = true;
    let image = document.createElement("img");
    image.src = imgRef.current.src;
    image.onload = function () {
      setIsImgReady(true);
    };

    return () => {
      hasMounted.current = true;
      setIsImgReady(false);
    };
  }, [hasMounted.current]);

  const dispatch = useDispatch<AppDispatch>();

  function likeClickHandler(payload: FilteredProp) {
    if (payload.like === false) {
      dispatch(addLikeState(payload));
    } else {
      dispatch(deleteLikeState(payload));
    }
  }

  function basketClickHandler(payload: FilteredProp) {
    if (payload.basket === false) {
      dispatch(addBasket(payload));
    } else {
      dispatch(deleteBasket(payload));
    }
  }

  function itemClickHandler(category: string, unit: string) {
    const searchTerm = params.get("term");
    let str: string | null = "";
    if (selectedCategory === "search") {
      str = `&term=${searchTerm}`;
    }
    navigate(
      `/detail?category=${category}&unit=${unit}&path=${selectedCategory}${str}`
    );
  }

  return (
    <section
      className="items__content__item"
      onClick={() => itemClickHandler(item.category, item.id)}
      key={item.id + item.category}
    >
      <div className="items__content__item__img">
        <img
          src={IMAGE_KEY + item.image[0]}
          alt={item.name}
          loading="lazy"
          ref={imgRef}
        />
        <div className={`img-ready ${isImgReady && "img-ready--active"}`}></div>
        <div className="items__content__item__btn">
          <button
            className={`btn-svg btn-svg--like ${
              item.like && "btn-svg--like--active"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              likeClickHandler(item);
            }}
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
          <button
            className={`btn-svg btn-svg--basket ${
              item.basket && "btn-svg--basket--active"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              basketClickHandler(item);
            }}
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
        </div>
      </div>
      <div className="items__content__item__info">
        <h3 className="items__content__item__name">{item.name}</h3>
        {item.sale === 0 ? (
          <p>${item.price.toFixed(2)}</p>
        ) : (
          <p className="sale">
            <span className="cross">${item.price}</span>
            <span className="saleoff">-{item.sale}%</span>$
            {getSaleCalculator(String(item.price), String(item.sale))}
          </p>
        )}
      </div>
    </section>
  );
}

export default Items;
