import { BasketProp, FilteredProp } from "../model/stateProps";

/* filter only */
export function getFilter(
  data: BasketProp[],
  likeState: FilteredProp[],
  basket: FilteredProp[]
): FilteredProp[] {
  const temp = data.map((item) => {
    let hasLike = false;
    let hasBasket = false;
    likeState.forEach(({ id }) => {
      if (id === item.id) hasLike = true;
    });
    basket.forEach(({ id }) => {
      if (id === item.id) hasBasket = true;
    });
    return { ...item, like: hasLike, basket: hasBasket };
  });
  return temp.reverse();
}
