import imgSale from "../../assets/banner_sale.jpg";
import imgNew from "../../assets/banner_new.jpg";
import imgRecycle from "../../assets/banner_recycle.jpg";
import imgJacket from "../../assets/banner_jacket.jpg";

type ColorProp = "dark" | "light";

type BannerDataProp = {
  id: string;
  heading: { text: string; color: ColorProp };
  paragraph: { text: string; color: ColorProp };
  link?: {
    has: boolean | null;
    label: string;
    href: string;
    color: ColorProp;
  };
  image: { url: string; alt: string; size: "contain" | "cover" };
  unique?: string;
};

export const bannerData: BannerDataProp[] = [
  {
    id: "1",
    heading: { text: "SALE UP TO 30%", color: "light" },
    paragraph: {
      text: "Plus an Extra 20%-30% Off with Coupons",
      color: "light",
    },
    link: {
      has: true,
      label: "Shop now",
      href: "/shop/coat-women",
      color: "light",
    },
    image: { url: imgSale, size: "cover", alt: "man with a smile" },
  },
  {
    id: "2",
    heading: {
      text: "NEW HOODIE",
      color: "light",
    },
    paragraph: {
      text: "Fancy Clean Designed Woman Hoodie",
      color: "light",
    },
    link: {
      has: true,
      label: "Shop now",
      href: "/shop/coat-women",
      color: "light",
    },
    image: { url: imgNew, size: "cover", alt: "woman with a hoodie" },
  },
  {
    id: "3",
    heading: { text: "RECYCLE DEAL", color: "dark" },
    paragraph: {
      text: "We will give you a 10% discount coupon on the total purchase price",
      color: "light",
    },
    link: { has: true, label: "Read detail", href: "/", color: "light" },
    image: { url: imgRecycle, size: "contain", alt: "clothes on the hanger" },
    unique: "short",
  },
  {
    id: "4",
    heading: { text: "Coming Soon: Jacket", color: "light" },
    paragraph: { text: "2024 - New Category", color: "light" },
    image: { url: imgJacket, size: "contain", alt: "Man with a jacket" },
  },
];
