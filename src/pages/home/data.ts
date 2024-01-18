import img1 from "../../assets/l8.jpg";
import img2 from "../../assets/l23.jpg";

import img3 from "../../assets/l16.jpg";
import img4 from "../../assets/l17.jpg";
import img5 from "../../assets/l20.jpg";
import img6 from "../../assets/l22.jpg";

import img7 from "../../assets/l1.jpg";

import fa1 from "../../assets/fa1.jpg";
import fa2 from "../../assets/fa2.jpg";

type BannerDataProp = {
  id: number;
  heading: string;
  paragraph: string;
  link: { has: boolean | null; label: string; href: string };
  image: any;
};

export const bannerData: BannerDataProp[] = [
  {
    id: 1,
    heading: "gsdj gsd jnkgdsng kjdsng kj.",
    paragraph: "gsaidofg jadsoig jdsigjadsiogg sdag.",
    link: { has: null, label: "", href: "" },
    image: img2,
  },
  {
    id: 2,
    heading: "fasdlfk dsmkglasdm gk sdg gsd.",
    paragraph: "fadskfadsm lkffm lkasf masklf smklf masfkl.",
    link: { has: true, label: "Shop now", href: "/shop/coat-women" },
    image: img1,
  },
  {
    id: 3,
    heading: "Fashion Show",
    paragraph: "Jul.4 - Jul.11",
    link: { has: true, label: "Read more", href: "/" },
    image: fa1,
  },
  {
    id: 4,
    heading: "Coming Soon: Jacket",
    paragraph: "2025 - New Category",
    link: { has: null, label: "", href: "" },
    image: fa2,
  },
];
