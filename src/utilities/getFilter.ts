import { BasketProp, CategoryProp, FilteredProp } from "../model/stateProps";

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

type GetAllProp = {
  data: FilteredProp[];
  likeState?: CategoryProp;
  basket?: CategoryProp;
};

export function getLikeFilter({ data, basket }: GetAllProp): FilteredProp[] {
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

export function getBasketFilter({
  data,
  likeState,
}: GetAllProp): FilteredProp[] {
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
