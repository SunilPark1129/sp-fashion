import React, { useEffect, useRef, useState } from "react";
import "./shopaside.css";
import { BasketProp, FilteredProp } from "../../model/stateProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateSort } from "../../redux/features/sortSlice";

type Props = {
  genderFilterData: BasketProp[];
};

type ActivedColorProp = {
  [key: string]: boolean;
};

type ColorProp = {
  hasOpen: boolean;
  colors: string[];
  activedColors: ActivedColorProp;
};

const initColorState = {
  hasOpen: true,
  colors: [],
  activedColors: {},
};

type PriceProp = {
  hasOpen: boolean;
  price: { min: number; max: number };
};

const initPriceState = {
  hasOpen: true,
  price: { min: 0, max: Infinity },
};

type ActivedFiltersProp = {
  name: boolean;
  color: boolean;
  price: boolean;
};

const initActivedFilters = {
  name: false,
  color: false,
  price: false,
};

function ShopAside({ genderFilterData }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [colorState, setColorState] = useState<ColorProp>(initColorState);
  const [priceState, setPriceState] = useState<PriceProp>(initPriceState);

  const [backupColor, setBackupColor] = useState<ColorProp>(initColorState);

  const [activedFilters, setActivedFilters] =
    useState<ActivedFiltersProp>(initActivedFilters);

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // when mounted, get all the colors that array has
    if (colorState.colors.length === 0) {
      const hasColor: ActivedColorProp = {};
      const tempArr: string[] = [];
      genderFilterData.forEach(({ color }) => {
        if (!hasColor.hasOwnProperty(color)) {
          hasColor[color] = false;
          tempArr.push(color);
        }
      });
      setColorState((prev) => ({
        ...prev,
        colors: [...tempArr.sort()],
        activedColors: { ...hasColor },
      }));
      setBackupColor((prev) => ({
        ...prev,
        colors: [...tempArr.sort()],
        activedColors: { ...hasColor },
      }));
    }
  }, []);

  /* button triggers */
  function colorStateClickHandler() {
    setColorState((prev) => ({ ...prev, hasOpen: !prev.hasOpen }));
  }
  function priceStateClickHandler() {
    setPriceState((prev) => ({ ...prev, hasOpen: !prev.hasOpen }));
  }

  // trigger a color
  function postColor(item: string) {
    setColorState((prev: ColorProp) => ({
      ...prev,
      activedColors: {
        ...prev.activedColors,
        [item]: !prev.activedColors[item],
      },
    }));
  }

  useEffect(() => {
    let temp: FilteredProp[] = [];

    /* --------- search term filter ---------- */
    if (searchTerm.trim().length !== 0) {
      setActivedFilters((prev) => ({ ...prev, name: true }));

      const regexp = new RegExp(
        `\\b${searchTerm.replace(/\s+/g, ".*")}.*\\b`,
        "i"
      );
      temp = genderFilterData.filter(({ name }) => name.match(regexp));
    } else {
      setActivedFilters((prev) => ({ ...prev, name: false }));
      temp = [...genderFilterData];
    }

    /* --------- color filter ---------- */
    if (IsColorActived()) {
      temp = temp.filter(({ color }) => colorState.activedColors[color]);
      setActivedFilters((prev) => ({ ...prev, color: true }));
    } else {
      setActivedFilters((prev) => ({ ...prev, color: false }));
    }

    /* --------- price filter ---------- */
    temp = temp.filter(({ price }) => {
      if (priceState.price.min <= price && price <= priceState.price.max) {
        return true;
      } else return false;
    });

    if (priceState.price.min !== 0 || priceState.price.max !== Infinity) {
      setActivedFilters((prev) => ({ ...prev, price: true }));
    } else {
      setActivedFilters((prev) => ({ ...prev, price: false }));
    }

    dispatch(updateSort(temp));
  }, [
    searchTerm,
    colorState.activedColors,
    priceState.price.min,
    priceState.price.max,
  ]);

  function IsColorActived() {
    // check if the color has selected
    for (let v in colorState.activedColors) {
      if (colorState.activedColors[v]) return true;
    }
    return false;
  }

  function priceChangeHandler(val: string, minmax: string) {
    let tempVal: number;

    // if max number is smaller than min
    if (minmax === "max") {
      if (Number(val) < priceState.price.min) {
        tempVal = Infinity;
        setPriceState((prev) => ({
          ...prev,
          price: { ...prev.price, [minmax]: tempVal },
        }));
        return;
      }
    }

    // if value is empty or not a number...
    if (val === "" || String(Number(val)) === "NaN") {
      tempVal = minmax === "min" ? 0 : Infinity;
    } else {
      tempVal = Number(val);
    }

    setPriceState((prev) => ({
      ...prev,
      price: { ...prev.price, [minmax]: tempVal },
    }));
  }

  function sortClearHandler(item: string) {
    if (item === "name") {
      setSearchTerm("");
      setActivedFilters((prev) => ({ ...prev, name: false }));
    } else if (item === "color") {
      setColorState(backupColor);
      setActivedFilters((prev) => ({ ...prev, color: false }));
    } else if (item === "price") {
      setPriceState(initPriceState);
      setActivedFilters((prev) => ({ ...prev, price: false }));
      if (minRef.current && maxRef.current) {
        minRef.current.value = "";
        maxRef.current.value = "";
      }
    } else if (item === "all") {
      setSearchTerm("");
      setColorState(backupColor);
      setPriceState(initPriceState);
      setActivedFilters(initActivedFilters);
      if (minRef.current && maxRef.current) {
        minRef.current.value = "";
        maxRef.current.value = "";
      }
    }
  }

  return (
    <aside className="shop__aside">
      <div className="shop__aside__header">
        <p>Filter Options</p>
      </div>
      <div className="shop__aside__container">
        <div className="shop__aside__search">
          <input
            type="text"
            placeholder="Search Name"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="shop__aside__color">
          <div
            className={`shop__aside__trigger ${
              colorState.hasOpen && "shop__aside__trigger--active"
            }`}
          >
            <button onClick={colorStateClickHandler}>COLOR</button>
            <div>
              {colorState.hasOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="21"
                    y="9"
                    width="6"
                    height="18"
                    rx="1"
                    transform="rotate(90 21 9)"
                    fill="#1E1E1E"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="9"
                    y="3"
                    width="6"
                    height="18"
                    rx="1"
                    fill="#1E1E1E"
                  />
                  <rect
                    x="21"
                    y="9"
                    width="6"
                    height="18"
                    rx="1"
                    transform="rotate(90 21 9)"
                    fill="#1E1E1E"
                  />
                </svg>
              )}
            </div>
          </div>
          {colorState.hasOpen && (
            <div className="shop__aside__color__btn-box">
              {colorState.colors.map((item) => {
                let activedColor = false;
                if (colorState.activedColors[item]) {
                  activedColor = true;
                }
                return (
                  <button
                    className={`shop__aside__color__item ${
                      activedColor && "shop__aside__color__item--active"
                    }`}
                    onClick={() => postColor(item)}
                    key={item}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="shop__aside__price">
          <div
            className={`shop__aside__trigger ${
              priceState.hasOpen && "shop__aside__trigger--active"
            }`}
          >
            <button onClick={priceStateClickHandler}>PRICE</button>
            <div>
              {priceState.hasOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="21"
                    y="9"
                    width="6"
                    height="18"
                    rx="1"
                    transform="rotate(90 21 9)"
                    fill="#1E1E1E"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="9"
                    y="3"
                    width="6"
                    height="18"
                    rx="1"
                    fill="#1E1E1E"
                  />
                  <rect
                    x="21"
                    y="9"
                    width="6"
                    height="18"
                    rx="1"
                    transform="rotate(90 21 9)"
                    fill="#1E1E1E"
                  />
                </svg>
              )}
            </div>
          </div>
          {priceState.hasOpen && (
            <div className="shop__aside__price__input-box">
              <input
                type="text"
                placeholder="min"
                autoComplete="off"
                onChange={(e) => priceChangeHandler(e.target.value, "min")}
                ref={minRef}
              />
              <p>~</p>
              <input
                type="text"
                placeholder="max"
                autoComplete="off"
                onChange={(e) => priceChangeHandler(e.target.value, "max")}
                ref={maxRef}
              />
            </div>
          )}
        </div>
      </div>

      <div className="shop__aside__filters">
        {Object.entries(activedFilters)
          .filter(([_, value]) => value)
          .map(([item]) => (
            <button
              className="shop__aside__filters__btn"
              key={item}
              onClick={() => sortClearHandler(item)}
            >
              {item}
            </button>
          ))}
        {(activedFilters.name ||
          activedFilters.color ||
          activedFilters.price) && (
          <button
            className="shop__aside__filters__btn"
            onClick={() => sortClearHandler("all")}
          >
            clear all
          </button>
        )}
      </div>
    </aside>
  );
}
export default ShopAside;
