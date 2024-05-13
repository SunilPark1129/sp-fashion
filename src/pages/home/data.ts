// import imgSale from "./assets/banner_sale.jpg";
// import imgNew from "./assets/banner_new.jpg";
// import imgRecycle from "./assets/banner_recycle.jpg";
// import imgJacket from "./assets/banner_jacket.jpg";
import {
  bannerSalePic,
  bannerNewPic,
  bannerRecyclePic,
  bannerJacketPic,
} from "../../assets/imgURL";
import { IMAGE_KEY } from "../../data/key";

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
  image: {
    src: string;
    alt: string;
    srcSet: string;
    sizes: string;
    objectFit: "contain" | "cover";
  };
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
      href: "/shop?category=shirt&gender=men",
      color: "light",
    },
    image: {
      src: `${IMAGE_KEY}/tr:w-3200${bannerSalePic}`,
      srcSet: `${IMAGE_KEY}/tr:w-600${bannerSalePic} 600w, ${IMAGE_KEY}/tr:w-1300${bannerSalePic} 1300w,${IMAGE_KEY}/tr:w-1920${bannerSalePic} 1920w, ${IMAGE_KEY}/tr:w-3200${bannerSalePic} 3200w`,
      sizes:
        "(max-width: 600) 600px, (max-width: 1300) 1300px, (max-width: 1920) 1920px, 3200px",
      objectFit: "cover",
      alt: "man with a smile",
    },
  },
  {
    id: "2",
    heading: {
      text: "CHECK OUT NEW HOODIE",
      color: "light",
    },
    paragraph: {
      text: "Fancy Clean Designed Woman Hoodie",
      color: "light",
    },
    link: {
      has: true,
      label: "Shop now",
      href: "/shop?category=hoodie&gender=women",
      color: "light",
    },
    image: {
      src: `${IMAGE_KEY}/tr:w-3200${bannerNewPic}`,
      srcSet: `${IMAGE_KEY}/tr:w-600${bannerNewPic} 600w, ${IMAGE_KEY}/tr:w-1300${bannerNewPic} 1300w,${IMAGE_KEY}/tr:w-1920${bannerNewPic} 1920w, ${IMAGE_KEY}/tr:w-3200${bannerNewPic} 3200w`,
      sizes:
        "(max-width: 600px) 600px, (max-width: 1300px) 1300px, (max-width: 1920px) 1920px, 3200px",
      objectFit: "cover",
      alt: "woman with a hoodie",
    },
  },
  {
    id: "3",
    heading: { text: "RECYCLE DEAL", color: "dark" },
    paragraph: {
      text: "We will give you a 5% discount coupon on the total purchase price",
      color: "light",
    },
    link: { has: true, label: "Read detail", href: "/login", color: "light" },
    image: {
      src: `${IMAGE_KEY}/tr:w-1900${bannerRecyclePic}`,
      srcSet: `${IMAGE_KEY}/tr:w-800${bannerRecyclePic} 1200w, ${IMAGE_KEY}/tr:w-1201${bannerRecyclePic} 1201w`,
      sizes: "(max-width: 1200px) 1200px, 1201px",
      objectFit: "contain",
      alt: "clothes on the hanger",
    },
    unique: "short",
  },
  {
    id: "4",
    heading: { text: "Coming Soon: Jacket", color: "light" },
    paragraph: {
      text: "New clothing styles will be added in 2024. We'll ensure they come with great designs and quality",
      color: "light",
    },
    image: {
      src: `${IMAGE_KEY}/tr:w-1900${bannerJacketPic}`,
      srcSet: `${IMAGE_KEY}/tr:w-800${bannerJacketPic} 1200w, ${IMAGE_KEY}/tr:w-1201${bannerJacketPic} 1201w`,
      sizes: "(max-width: 1200px) 1200px, 1201px",
      objectFit: "contain",
      alt: "Man with a jacket",
    },
  },
];
