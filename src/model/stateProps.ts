export type BasketProp = {
  id: string;
  name: string;
  sale: number;
  color: string;
  image: string[];
  price: number;
  gender: string;
  category: "coat" | "hoodie" | "shirt" | "sweater";
};

export type CategoryBasketProp = {
  coat: BasketProp[];
  hoodie: BasketProp[];
  shirt: BasketProp[];
  sweater: BasketProp[];
};

export type FilteredProp = BasketProp & { like?: boolean; basket?: boolean };

export type CategoryValidProp =
  | "coat"
  | "shirt"
  | "hoodie"
  | "sweater"
  | "favorite"
  | "purchase"
  | "search"
  | null;

export type ItemProperty = {
  qty: number | string;
  hasChecked: boolean;
  price: number;
  name: string;
  id: string;
};

export type ItemObjectProperty = {
  [key: string]: ItemProperty;
};

export type checkArrayProp = ItemProperty[];
