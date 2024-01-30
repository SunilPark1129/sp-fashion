import { BasketProp, CategoryProp, FilteredProp } from "../model/stateProps";

/* ------------ filtering item (for shop page) ------------- */
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
  return [...temp].reverse();
}
/* ------------ filtering single item (for purchase page) ------------- */
export function getSingleFilter(
  data: BasketProp,
  likeState: FilteredProp[],
  basket: FilteredProp[]
): FilteredProp {
  let hasLike = false;
  let hasBasket = false;
  likeState.forEach(({ id }) => {
    if (id === data.id) hasLike = true;
  });
  basket.forEach(({ id }) => {
    if (id === data.id) hasBasket = true;
  });
  return { ...data, like: hasLike, basket: hasBasket };
}

/* ------------ filtering likes (for favorite page) ------------- */
export function getLikeFilter(
  data: FilteredProp[],
  basket: CategoryProp
): FilteredProp[] {
  if (!basket) return [];

  const temp = data.map((item) => {
    let hasBasket = false;
    if (basket[item.category].find(({ id }) => item.id === id)) {
      hasBasket = true;
    }
    return { ...item, basket: hasBasket };
  });

  return [...temp].reverse();
}

/* ------------ filtering baskets (not worked on it yet) ------------- */
export function getBasketFilter(
  data: FilteredProp[],
  likeState: CategoryProp
): FilteredProp[] {
  if (!likeState) return [];

  const temp = data.map((item) => {
    let hasLike = false;
    if (likeState[item.category].find(({ id }) => item.id === id)) {
      hasLike = true;
    }
    return { ...item, like: hasLike };
  });

  return [...temp].reverse();
}

/* ------------ filtering all (for search page) ------------- */
export function getAllFilter(
  data: BasketProp[],
  likeState: CategoryProp,
  basket: CategoryProp
): FilteredProp[] {
  let getAllWishLists: {
    [key: string]: { hasLike: boolean; hasBasket: boolean };
  } = {};

  // put all user's wishlists into one variable
  Object.values(likeState).forEach((array: FilteredProp[]) => {
    array.forEach((item) => {
      getAllWishLists[item.id + item.category] = {
        hasLike: true,
        hasBasket: false,
      };
    });
  });
  Object.values(basket).forEach((array: FilteredProp[]) => {
    array.forEach((item) => {
      if (getAllWishLists[item.id + item.category]) {
        getAllWishLists[item.id + item.category] = {
          hasLike: true,
          hasBasket: true,
        };
      } else {
        getAllWishLists[item.id + item.category] = {
          hasLike: false,
          hasBasket: true,
        };
      }
    });
  });

  const temp = data.map((item) => {
    let like = false;
    let basket = false;
    if (getAllWishLists[item.id + item.category]) {
      like = getAllWishLists[item.id + item.category].hasLike;
      basket = getAllWishLists[item.id + item.category].hasBasket;
    }
    return { ...item, like, basket };
  });

  return [...temp].reverse();
}
