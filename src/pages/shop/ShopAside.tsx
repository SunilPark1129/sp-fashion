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

function ShopAside({ genderFilterData }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [colorState, setColorState] = useState<ColorProp>(initColorState);
  const [priceState, setPriceState] = useState<PriceProp>(initPriceState);

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
      const regexp = new RegExp(
        `\\b${searchTerm.replace(/\s+/g, ".*")}.*\\b`,
        "i"
      );
      temp = genderFilterData.filter(({ name }) => name.match(regexp));
    } else {
      temp = [...genderFilterData];
    }

    /* --------- color filter ---------- */
    if (IsColorActived()) {
      temp = temp.filter(({ color }) => colorState.activedColors[color]);
    }

    /* --------- price filter ---------- */
    temp = temp.filter(({ price }) => {
      if (priceState.price.min <= price && price <= priceState.price.max) {
        return true;
      } else return false;
    });

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

  return (
    <aside className="shop__aside">
      <p>filter aside here</p>
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
