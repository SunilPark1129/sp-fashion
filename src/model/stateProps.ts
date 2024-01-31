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
