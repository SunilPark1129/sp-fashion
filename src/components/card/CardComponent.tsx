import { useEffect, useRef, useState } from "react";
import { CategoryValidProp, FilteredProp } from "../../model/stateProps";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addLikeState, deleteLikeState } from "../../redux/features/LikeSlice";
import { addBasket, deleteBasket } from "../../redux/features/basketSlice";
import { IMAGE_KEY } from "../../data/key";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";

export default function CardComponent({
  item,
  selectedCategory,
}: {
  item: FilteredProp;
  selectedCategory: CategoryValidProp;
}) {
  const [isImgReady, setIsImgReady] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // when image is onloaded, display image on the screen
  useEffect(() => {
    if (!imgRef.current || isImgReady) return;
    let image = document.createElement("img");
    image.src = imgRef.current.src;
    image.onload = function () {
      setIsImgReady(true);
    };
  }, [imgRef]);

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
      `/product?category=${category}&unit=${unit}&path=${selectedCategory}${str}`
    );
  }
  // ?tr=bl-10
  return (
    <section
      className="card__content__item"
      onClick={() => itemClickHandler(item.category, item.id)}
      key={item.id + item.category}
    >
      <div className="card__content__item__img">
        <div className={`img-ready ${isImgReady && "img-ready--active"}`}>
          <img
            src={`${IMAGE_KEY}${item.image[0]}?tr=w-400&tr=bl-10`}
            srcSet={`${IMAGE_KEY}${item.image[0]}?tr=w-250&tr=bl-10 250w, ${IMAGE_KEY}${item.image[0]}?tr=w-400&tr=bl-10 400w`}
            sizes="(max-width: 500px) 250px, 400px"
            alt={item.name}
          />
        </div>
        <img
          src={`${IMAGE_KEY}/tr:w-400${item.image[0]}`}
          srcSet={`${IMAGE_KEY}/tr:w-250${item.image[0]} 250w, ${IMAGE_KEY}/tr:w-400${item.image[0]} 400w`}
          sizes="(max-width: 500px) 250px, 400px"
          alt={item.name}
          loading="lazy"
          ref={imgRef}
        />
        <div className="card__content__item__btn">
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
      <div className="card__content__item__info">
        <h3 className="card__content__item__name">{item.name}</h3>
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
