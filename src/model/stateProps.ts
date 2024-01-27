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

export type FilteredProp = BasketProp & { like?: boolean; basket?: boolean };

export type CategoryProp = {
  coat: FilteredProp[];
  hoodie: FilteredProp[];
  shirt: FilteredProp[];
  sweater: FilteredProp[];
};

export type CategoryValidProp =
  | "coat"
  | "shirt"
  | "hoodie"
  | "sweater"
  | "like"
  | "basket"
  | null;
