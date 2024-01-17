export type BasketProp = {
  id: string;
  name: string;
  sale: number;
  color: string;
  image: string;
  price: number;
  gender: string;
  member: number;
  category: string;
};

export type FilteredProp = BasketProp & { like: boolean };

export type LikeStateProp = {
  coat: FilteredProp[];
  hoodie: FilteredProp[];
  shirt: FilteredProp[];
  sweater: FilteredProp[];
};
