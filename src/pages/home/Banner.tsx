import React, { useState } from "react";
import { bannerData } from "./data";
import "./banner.css";
import { Link } from "react-router-dom";

type SlideIndexProp = {
  nextSlide: (val: number) => void;
  currentIdx: number;
};

function SlideImageComponent({ currentIdx }: { currentIdx: number }) {
  return (
    <>
      {bannerData.map(({ heading, image }, idx) => (
        <div
          key={idx}
          className={`banner__image banner__image--${idx} ${
            currentIdx === idx && "banner__image--active"
          }`}
        >
          <div className="wrapper">
            <div className="banner__image__box">
              <div className="banner__image__bg"></div>
              <img src={image} alt={heading} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function TextComponent({ currentIdx }: { currentIdx: number }) {
  return (
    <section className={`banner__text banner__text--${currentIdx}`}>
      <h2>{bannerData[currentIdx].heading}</h2>
      <p>{bannerData[currentIdx].paragraph}</p>
      {bannerData[currentIdx].link.has && (
        <Link to={bannerData[currentIdx].link.href}>
          {bannerData[currentIdx].link.label}
        </Link>
      )}
    </section>
  );
}

function DotsComponent({ nextSlide, currentIdx }: SlideIndexProp) {
  return (
    <div className={`banner__dots banner__dots--${currentIdx}`}>
      {bannerData.map(({ id }, idx) => (
        <button
          onClick={() => nextSlide(idx)}
          className={`banner__dots__item ${
            currentIdx === idx && "banner__dots__item--active"
          }`}
          key={id}
        ></button>
      ))}
    </div>
  );
}

function ArrowComponent({ nextSlide, currentIdx }: SlideIndexProp) {
  return (
    <div className={`banner__arrow banner__arrow--${currentIdx}`}>
      <button onClick={() => nextSlide(currentIdx - 1)}>
        <svg
          width="11"
          height="13"
          viewBox="0 0 11 13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6.06218L10.5 3.35573e-06L9.53363 2.92914C8.86234 4.9639 8.86234 7.16047 9.53364 9.19522L10.5 12.1244L0 6.06218Z"
            fill="black"
          />
        </svg>
      </button>
      <button onClick={() => nextSlide(currentIdx + 1)}>
        <svg
          width="11"
          height="13"
          viewBox="0 0 11 13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 6.06218L-5.29972e-07 12.1244L0.966364 9.19522C1.63766 7.16046 1.63766 4.96389 0.966364 2.92914L0 -4.5897e-07L10.5 6.06218Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
}

export default function Banner() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  function nextSlide(val: number): void {
    if (val === -1) val = bannerData.length - 1;
    else if (val === bannerData.length) val = 0;
    setCurrentIdx(val);
  }

  return (
    <div className="banner">
      <SlideImageComponent currentIdx={currentIdx} />
      <div className="wrapper">
        <div className="banner__content">
          <TextComponent currentIdx={currentIdx} />
          <div className="banner__transport">
            <DotsComponent nextSlide={nextSlide} currentIdx={currentIdx} />
            <ArrowComponent nextSlide={nextSlide} currentIdx={currentIdx} />
          </div>
        </div>
      </div>
    </div>
  );
}
