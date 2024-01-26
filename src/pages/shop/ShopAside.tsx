import React, { useEffect, useState } from "react";
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
  hasOpen: false,
  colors: [],
  activedColors: {},
};

type PriceProp = {
  hasOpen: boolean;
  price: { min: number; max: number };
};

const initPriceState = {
  hasOpen: false,
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
    }
    //  else if (item === "all") {
    //   setSearchTerm("");
    //   setColorState(initColorState);
    //   setPriceState(initPriceState);
    //   setActivedFilters(initActivedFilters);
    // }
  }

  return (
    <aside className="shop__aside">
      <div>
        <p>Filter</p>
      </div>
      <div>
        {Object.entries(activedFilters)
          .filter(([_, value]) => value)
          .map(([item]) => (
            <div key={item} onClick={() => sortClearHandler(item)}>
              {item}
            </div>
          ))}
      </div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search Name"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div>
          <button onClick={colorStateClickHandler}>Color</button>
          <div>{colorState.hasOpen ? "-" : "+"}</div>
        </div>
        {colorState.hasOpen && (
          <div>
            {colorState.colors.map((item) => {
              let activedColor = false;
              if (colorState.activedColors[item]) {
                activedColor = true;
              }
              return (
                <div key={item}>
                  <button
                    style={{ background: activedColor ? "red" : "transparent" }}
                    onClick={() => postColor(item)}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div>
          <div>
            <button onClick={priceStateClickHandler}>Price</button>
            <div>{priceState.hasOpen ? "-" : "+"}</div>
          </div>
          {priceState.hasOpen && (
            <div>
              <input
                type="text"
                placeholder="min"
                autoComplete="off"
                onChange={(e) => priceChangeHandler(e.target.value, "min")}
              />
              <input
                type="text"
                placeholder="max"
                autoComplete="off"
                onChange={(e) => priceChangeHandler(e.target.value, "max")}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
export default ShopAside;
