import { BasketProp, FilteredProp } from "../model/stateProps";

function getBoolean(item: BasketProp, wishlist: FilteredProp[]) {
  for (let { id, category } of wishlist) {
    if (id === item.id) {
      if (category === item.category) {
        return true;
      }
    }
  }
  return false;
}

/* ------------ filtering item (for shop page) ------------- */
export function getFilter(
  data: BasketProp[] | FilteredProp[],
  likeState: FilteredProp[],
  basketState: FilteredProp[]
): FilteredProp[] {
  const temp = data.map((item) => {
    const hasLike = getBoolean(item, likeState);
    const hasBasket = getBoolean(item, basketState);
    return { ...item, like: hasLike, basket: hasBasket };
  });
  return [...temp].reverse();
}
