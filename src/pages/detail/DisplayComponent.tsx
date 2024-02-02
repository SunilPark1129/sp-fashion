import { useEffect, useState } from "react";
import { FilteredProp } from "../../model/stateProps";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { IMAGE_KEY } from "../../data/key";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";

type DisplayProp = {
  data: FilteredProp;
  pathParam: string | null;
  termParam: string | null;
};

const sizes = ["SIZE", "X-Small", "Small", "Medium", "Large", "X-Large"];

type TPosProp = {
  x: number;
  y: number;
};
const initTPos: TPosProp = {
  x: 0,
  y: 0,
};

const shopLists = ["coat", "shirt", "hoodie", "sweater"];

export default function DisplayComponent({
  data,
  pathParam,
  termParam,
}: DisplayProp) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [like, setLike] = useState<boolean | undefined>(data.like);
  const [basket, setBasket] = useState<boolean | undefined>(data.basket);
  const { id, name, sale, color, image, price, gender, category } = data;

  const [currentImg, setCurrentImg] = useState<number>(0);
  const [currentSize, setCurrentSize] = useState<number>(0);
  const [hasSizeModalOpened, setHasSizeModalOpened] = useState<boolean>(false);
  const [shippingMethod, setShippingMethod] = useState<string>("free-shipping");

  const [hasSelectedSize, setHasSelectedSize] = useState<boolean>(false);

  /* ------------- size handlers ------------ */
  function hasClickedSize(e: any) {
    // if size content is not clicked then focus-out
    if (!e?.target?.className.includes("detail__text__size__cover")) {
      setHasSizeModalOpened(false);
    }
  }
  // cleanup reference type
  useEffect(() => {
    if (hasSizeModalOpened) {
      document.addEventListener("click", hasClickedSize);
    }
    if (!hasSizeModalOpened) {
      document.removeEventListener("click", hasClickedSize);
    }
    return () => document.removeEventListener("click", hasClickedSize);
  }, [hasSizeModalOpened]);

  /* ----------- wish-list click handler ---------- */
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

  function purchaseClickHandler() {
    if (currentSize !== 0) {
      navigate("/login");
    }
    setHasSelectedSize(true);
  }

  let path;
  let label;
  if (pathParam && shopLists.includes(pathParam)) {
    const str = gender === "male" ? "men" : "women";
    path = `/shop?category=${pathParam}&gender=${str}`;
    label = "shop";
  } else if (pathParam === "favorite") {
    path = `/favorite`;
    label = "favorite";
  } else if (pathParam === "search") {
    path = `/search?term=${termParam}`;
    label = "search";
  } else if (pathParam === "purchase") {
    path = `/purchase`;
    label = "purchase";
  }
  return (
    <main className="detail">
      <div className="wrapper">
        <div className="detail__path">
          <Link to={"/"}>home</Link>
          <span>&#62;</span>
          <Link to={`${path}`}>{label}</Link>
          <span>&#62;</span>
          <p>detail</p>
        </div>
        <div className="container">
          {/* image */}
          <div className="detail__imgs">
            <div className="detail__imgs__front">
              {image.map((item, idx) => (
                <div
                  key={id + "/" + idx}
                  className={`detail__imgs__front__item ${
                    currentImg === idx && "detail__imgs__front__item--active"
                  }`}
                >
                  <ZoomInImageComponent item={IMAGE_KEY + item} />
                </div>
              ))}
            </div>
            <div className="detail__imgs__select">
              {image.map((item, idx) => (
                <div
                  key={idx}
                  className={`detail__imgs__select__item ${
                    currentImg === idx && "detail__imgs__select__item--active"
                  }`}
                  onClick={() => setCurrentImg(idx)}
                >
                  <img src={IMAGE_KEY + item} alt={name} />
                </div>
              ))}
            </div>
          </div>

          {/* text */}
          <div className="detail__text">
            {/* info */}
            <div className="detail__text__info">
              <h1>{name}</h1>
              <p>
                Model: {id}
                {gender.slice(0, 2).toUpperCase()}
                {category.slice(0, 2).toUpperCase()}
                {color.slice(0, 2).toUpperCase()}
              </p>
            </div>

            {/* trait */}
            <div className="detail__text__trait">
              <p>
                Color: <span>{color}</span>
              </p>
              <p>
                Gender: <span>{gender}</span>
              </p>
              <p>
                Category: <span>{category}</span>
              </p>
            </div>
            <div className="detail__text__sale">
              {sale === 0 ? (
                <p>Price: ${price.toFixed(2)}</p>
              ) : (
                <>
                  <p className="hasSale">Sale: {sale}%</p>
                  <p className="sale">
                    Price: <span className="cross">${price}</span>$
                    {getSaleCalculator(String(price), String(sale))}
                  </p>
                </>
              )}
            </div>

            {/* size */}
            <div
              className="detail__text__size"
              onClick={() => setHasSizeModalOpened((prev) => !prev)}
            >
              <div className="detail__text__size__cover">
                {currentSize === 0
                  ? sizes[currentSize]
                  : `SIZE: ${sizes[currentSize]}`}
              </div>
              <div
                className={`detail__text__size__item ${
                  hasSizeModalOpened && "detail__text__size__item--active"
                }`}
              >
                {sizes.slice(1).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentSize(idx + 1)}
                    className={`${
                      currentSize === idx + 1 &&
                      "detail__text__size__item__active"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p
              className={`detail__text__warning ${
                hasSelectedSize &&
                currentSize === 0 &&
                "detail__text__warning--active"
              }`}
            >
              *Please select a size.
            </p>

            {/* shipping */}
            <div className="detail__text__shipping">
              <label htmlFor="free-shipping">
                <input
                  type="radio"
                  name="shipping"
                  id="free-shipping"
                  checked={shippingMethod === "free-shipping"}
                  onChange={(e) => setShippingMethod(e.target.id)}
                />
                Free Shipping
                <span>Delivered within a week</span>
              </label>
              <label htmlFor="fast-shipping">
                <input
                  type="radio"
                  name="shipping"
                  id="fast-shipping"
                  checked={shippingMethod === "fast-shipping"}
                  onChange={(e) => setShippingMethod(e.target.id)}
                />
                Fast Shipping
                <span>Delivered within 1 to 3 business days</span>
              </label>
            </div>
            <p
              className={`detail__text__warning ${
                shippingMethod === "fast-shipping" &&
                "detail__text__warning--active"
              }`}
            >
              *Business Day - Monday through Friday from 9 a.m. to 5 p.m.
            </p>

            {/* purchase */}
            <div className="detail__text__purchase">
              <button
                className="detail__text__purchase__link"
                onClick={purchaseClickHandler}
              >
                Buy Now
              </button>
              <div
                className="detail__text__purchase__btn"
                onClick={basketClickHandler}
              >
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
              <div
                className="detail__text__purchase__btn"
                onClick={likeClickHandler}
              >
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
        </div>
      </div>
    </main>
  );
}

let timer: ReturnType<typeof setTimeout>;

function ZoomInImageComponent({ item }: { item: string }) {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [tPos, setTPos] = useState<TPosProp>(initTPos);
  const [isMoveAble, setIsMoveAble] = useState<boolean>(false);
  const [firstPos, setFirstPos] = useState<TPosProp>(initTPos);

  function zoomInHandler(e: any) {
    const { layerX, layerY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = e.target;
    const halfWidth = offsetWidth / 2;
    const halfHeight = offsetHeight / 2;

    const halfLeft = layerX - halfWidth;
    const halfTop = layerY - halfHeight;

    setTPos({ x: halfLeft, y: halfTop });
    setIsMoving(true);
  }

  function zoomInLeaveHandler() {
    setTPos(initTPos);
    setIsMoving(false);
  }

  useEffect(() => {
    if (isMoving) {
      setFirstPos(tPos);
      timer = setTimeout(() => {
        setIsMoveAble(true);
      }, 300);
    } else {
      setIsMoveAble(false);
      clearTimeout(timer);
      setFirstPos(initTPos);
    }
  }, [isMoving]);

  return (
    <div
      className="detail__imgs__front__item__user-select-prevention"
      onPointerMove={zoomInHandler}
      onPointerLeave={zoomInLeaveHandler}
      onPointerUp={() => {}}
      onPointerDown={() => {}}
    >
      <img
        src={item}
        alt={"img"}
        style={{
          transition: `${
            isMoveAble
              ? "transform 0.3s"
              : "transform 0.3s, left 0.2s, top 0.2s"
          }`,
          left: `${isMoveAble ? -tPos.x / 2 : -firstPos.x / 2}px`,
          top: `${isMoveAble ? -tPos.y / 2 : -firstPos.y / 2}px`,
          transform: `scale(${isMoving ? 2 : 1})`,
        }}
      />
    </div>
  );
}
