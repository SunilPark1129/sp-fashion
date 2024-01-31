import "./purchase.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { FilteredProp } from "../../model/stateProps";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";
import { IMAGE_KEY } from "../../data/key";
import { useNavigate } from "react-router-dom";
import { deleteBasket } from "../../redux/features/basketSlice";

type Props = {};

type checkItemsProp = {
  [key: string]: {
    qty: number | string | null;
    hasChecked: boolean;
    price: number;
    name: string;
  };
};

function Purchase({}: Props) {
  const navigate = useNavigate();
  const basketState = useSelector((store: RootState) => store.basket.results);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<FilteredProp[] | null>(null);

  const [checkItems, setCheckItems] = useState<checkItemsProp>({});

  useEffect(() => {
    if (basketState) {
      const temp: FilteredProp[] = [];
      basketState.forEach((item) => {
        temp.push(item);
      });
      setData(temp);
    }
  }, [basketState]);

  function detailClickHandler(e: React.MouseEvent, item: FilteredProp) {
    e.stopPropagation();
    navigate(`/detail?category=${item.category}&unit=${item.id}&path=purchase`);
  }

  function deleteHandler(item: FilteredProp) {
    const temp = checkItems;
    delete temp[item.id + item.category];
    setCheckItems(temp);
    dispatch(deleteBasket(item));
  }

  function checkboxChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    item: FilteredProp
  ) {
    const { checked } = e.target;
    const { id, category, price, name } = item;

    if (checked) {
      setCheckItems((prev) => ({
        ...prev,
        [id + category]: {
          price: price,
          name: name,
          hasChecked: checked,
          qty: prev[id + category]?.qty ?? 1,
        },
      }));
    } else {
      setCheckItems((prev) => ({
        ...prev,
        [id + category]: {
          price: price,
          name: name,
          hasChecked: checked,
          qty: prev[id + category]?.qty,
        },
      }));
    }
  }

  function qtyChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    item: FilteredProp
  ) {
    const { value } = e.target;
    const { id, category } = item;

    if (value.match(/[1-9]/i)) {
      setCheckItems((prev) => ({
        ...prev,
        [id + category]: { ...prev[id + category], qty: Number(value) },
      }));
    } else {
      setCheckItems((prev) => ({
        ...prev,
        [id + category]: { ...prev[id + category], qty: null },
      }));
    }
  }

  return (
    <div className="purchase">
      <div className="wrapper">
        <div className="container">
          <div className="purchase__lists">
            {data &&
              data.map((item) => (
                <label key={item.category + item.id}>
                  <input
                    type="checkbox"
                    name="card"
                    onChange={(e) => checkboxChangeHandler(e, item)}
                    checked={
                      checkItems[item.id + item.category]?.hasChecked ?? false
                    }
                  />
                  <div className="purchase__card">
                    <div className="purchase__card__img">
                      <img src={IMAGE_KEY + item.image[0]} alt={item.name} />
                    </div>
                    <div className="purchase__card__text">
                      <p>{item.name}</p>
                      <p className="purchase__card__text__model">
                        Model:{" "}
                        {item.id +
                          item.gender.slice(0, 2).toUpperCase() +
                          item.category.slice(0, 2).toUpperCase() +
                          item.color.slice(0, 2).toUpperCase()}
                      </p>
                      <p>
                        $
                        {item.sale === 0
                          ? item.price.toFixed(2)
                          : getSaleCalculator(
                              String(item.price),
                              String(item.sale)
                            )}
                      </p>
                    </div>
                    <div className="purchase__card__btn">
                      <label htmlFor="qty">
                        QTY:{" "}
                        <input
                          type="text"
                          id="qty"
                          autoComplete="off"
                          maxLength={1}
                          placeholder="1"
                          onChange={(e) => qtyChangeHandler(e, item)}
                          disabled={
                            !checkItems[item.id + item.category]?.hasChecked ??
                            false
                          }
                          value={checkItems[item.id + item.category]?.qty ?? ""}
                        />
                      </label>
                      <button
                        className="purchase__card__btn"
                        onClick={(e) => detailClickHandler(e, item)}
                      >
                        Detail
                      </button>
                    </div>
                    <button
                      className="purchase__card__delete"
                      onClick={() => deleteHandler(item)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="15.818"
                          y="4"
                          width="5.57105"
                          height="16.7132"
                          rx="1"
                          transform="rotate(45 15.818 4)"
                          fill="#1E1E1E"
                        />
                        <rect
                          x="19.7573"
                          y="15.818"
                          width="5.57105"
                          height="16.7132"
                          rx="1"
                          transform="rotate(135 19.7573 15.818)"
                          fill="#1E1E1E"
                        />
                      </svg>
                    </button>
                  </div>
                </label>
              ))}
          </div>
          {/* <div>
            {Object.values(checkItems).map((item) => (
              <p>{item.name}</p>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Purchase;
