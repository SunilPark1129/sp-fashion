import "./purchase.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  FilteredProp,
  ItemObjectProperty,
  checkArrayProp,
} from "../../model/stateProps";
import { getSaleCalculator } from "../../utilities/getSaleCalculator";
import { IMAGE_KEY } from "../../data/key";
import { Link, useNavigate } from "react-router-dom";
import { deleteBasket } from "../../redux/features/basketSlice";
import NoWishListFound from "../../components/nowishlist/NoWishList";
import StatementComponent from "./StatementComponent";
import UserInfoComponent from "./UserInfoComponent";

function PurchasePage() {
  const navigate = useNavigate();
  const basketState = useSelector((store: RootState) => store.basket.results);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<FilteredProp[] | null>(null);
  const [total, setTotal] = useState<string>("0");
  const [displayItems, setDisplayItems] = useState<checkArrayProp>([]);

  const [checkItems, setCheckItems] = useState<ItemObjectProperty>({});
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (basketState) {
      const temp: FilteredProp[] = [];
      basketState.forEach((item) => {
        temp.push(item);
      });
      setData(temp);
      setIsLoading(false);
    }
  }, [basketState]);

  function detailClickHandler(e: React.MouseEvent, item: FilteredProp) {
    e.stopPropagation();
    navigate(`/detail?category=${item.category}&unit=${item.id}&path=purchase`);
  }

  function selectClickHandler(checked: boolean, item: FilteredProp) {
    const { id, category, price, name, sale } = item;

    if (checked) {
      setCheckItems((prev) => ({
        ...prev,
        [id + category]: {
          price:
            sale === 0
              ? Number(price.toFixed(2))
              : Number(
                  Number(
                    getSaleCalculator(String(price), String(sale))
                  ).toFixed(2)
                ),
          name: name,
          hasChecked: checked,
          qty: !prev[id + category]?.qty ? 1 : prev[id + category]?.qty,
          id: id + category,
        },
      }));
    } else {
      setCheckItems((prev) => ({
        ...prev,
        [id + category]: {
          ...prev[id + category],
          hasChecked: checked,
          qty: prev[id + category]?.qty,
        },
      }));
    }
  }

  function deleteHandler(item: FilteredProp) {
    const temp = { ...checkItems };
    delete temp[item.id + item.category];
    setCheckItems({ ...temp });
    dispatch(deleteBasket(item));
  }

  function checkboxChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    item: FilteredProp
  ) {
    const { checked } = e.target;

    selectClickHandler(checked, item);
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
        [id + category]: { ...prev[id + category], qty: "" },
      }));
    }
  }

  useEffect(() => {
    const filterArray: checkArrayProp = Object.values(checkItems).filter(
      ({ hasChecked }) => hasChecked
    );
    const temp = filterArray.reduce((a, b) => {
      if (b.hasChecked) {
        return a + b.price * Number(b.qty === "" ? 1 : b.qty);
      }
      return a;
    }, 0);
    setDisplayItems(filterArray);
    setTotal(temp.toFixed(2));
  }, [checkItems]);

  if (isLoading) return <div className="purchase--loading"></div>;
  if (data && data.length === 0) return <NoWishListFound />;

  return (
    <div className="purchase">
      <div className="wrapper">
        <div className="container">
          <div className={`purchase__lists ${currentStep !== 0 && "disabled"}`}>
            {data &&
              data.map((item) => (
                <label key={item.category + item.id}>
                  <input
                    className="display-none"
                    type="checkbox"
                    name="card"
                    onChange={(e) => checkboxChangeHandler(e, item)}
                    checked={
                      checkItems[item.id + item.category]?.hasChecked ?? false
                    }
                  />
                  <div
                    className={`purchase__lists__checkbox ${
                      checkItems[item.id + item.category]?.hasChecked &&
                      "purchase__lists__checkbox--active"
                    }`}
                  ></div>
                  <div
                    className={`purchase__card ${
                      checkItems[item.id + item.category]?.hasChecked &&
                      "purchase__card--active"
                    }`}
                  >
                    <div className="purchase__card__img">
                      <img
                        src={`${IMAGE_KEY}/tr:w-100${item.image[0]}`}
                        alt={item.name}
                      />
                    </div>
                    <div className={`purchase__card__text`}>
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
                    <div className="purchase__card__btn-box">
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
                    <div className="purchase__card__btn-box">
                      <button
                        className={`purchase__card__btn ${
                          checkItems[item.id + item.category]?.hasChecked &&
                          "purchase__card__btn--active"
                        }`}
                        onClick={() =>
                          selectClickHandler(
                            !checkItems[item.id + item.category]?.hasChecked ??
                              true,
                            item
                          )
                        }
                      >
                        Select
                      </button>
                      <button
                        className="purchase__card__btn"
                        onClick={() => deleteHandler(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </label>
              ))}
          </div>

          {/* purchase form  */}
          <div className="purchase__form">
            <div className="purchase__form__progress">
              <div
                className={`purchase__form__progress__label ${
                  currentStep === 0 && "active"
                }`}
              >
                Statement
              </div>
              <div
                className={`purchase__form__progress__label ${
                  currentStep === 1 && "active"
                }`}
              >
                User Info
              </div>
              <div className="purchase__form__progress__label">Shipping</div>
              <div className="purchase__form__progress__label">Payment</div>
              <div className="purchase__form__progress__line"></div>
            </div>
            <div className="purchase__form__content">
              <div
                className="purchase__form__step"
                style={{ left: `${currentStep * -100}%` }}
              >
                <StatementComponent displayItems={displayItems} total={total} />
                <UserInfoComponent />
              </div>
            </div>
            <div className="purchase__form__next">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Prev
              </button>
              <button
                disabled={
                  currentStep === 1 ||
                  (currentStep === 0 && displayItems.length === 0)
                }
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
