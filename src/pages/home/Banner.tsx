import React, { useEffect, useState } from "react";
import { bannerData } from "./data";
import "./banner.css";
import { Link } from "react-router-dom";

type SlideIndexProp = {
  nextSlide: (val: number) => void;
  currentIdx: number;
};

export default function Banner() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [progress, setProgress] = useState("");
  function nextSlide(val: number): void {
    if (val === -1) val = bannerData.length - 1;
    else if (val === bannerData.length) val = 0;
    setCurrentIdx(val);
  }

  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgress("progressbar--active");
    }, 50);

    let prev = currentIdx;
    if (prev > 2) {
      prev = 0;
    } else if (prev < 0) {
      prev = 2;
    } else {
      prev++;
    }

    const timer = setInterval(() => {
      setCurrentIdx(prev);
    }, 8100);

    return () => {
      clearInterval(timer);
      clearTimeout(progressTimer);
      setProgress("");
    };
  }, [currentIdx]);

  return (
    <div>
      <div className="banner">
        <div className="wrapper">
          <SlideImageComponent currentIdx={currentIdx} />
          <div className="banner__content">
            <TextComponent currentIdx={currentIdx} />
            <div className="banner__transport">
              <DotsComponent nextSlide={nextSlide} currentIdx={currentIdx} />
              <ArrowComponent nextSlide={nextSlide} currentIdx={currentIdx} />
            </div>
          </div>
        </div>
      </div>
      <Progressbar progress={progress} />
    </div>
  );
}

function SlideImageComponent({ currentIdx }: { currentIdx: number }) {
  return (
    <>
      {bannerData.map(({ image }, idx) => (
        <div
          key={idx}
          className={`banner__image ${
            currentIdx === idx && "banner__image--active"
          }`}
        >
          <div className="wrapper">
            <div className="banner__image__box">
              <img
                src={image.src}
                alt={image.alt}
                srcSet={image.srcSet}
                sizes={image.sizes}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function TextComponent({ currentIdx }: { currentIdx: number }) {
  return (
    <section className={`banner__text`}>
      <h2 className={`banner__text__color`}>
        {bannerData[currentIdx].heading.text}
      </h2>
      <div className="banner__text__desc">
        <p className={`banner__text__color`}>
          {bannerData[currentIdx].paragraph.text}
        </p>
        {/* TENOIRARY NOT USING */}
        {/* {bannerData[currentIdx].link?.has && (
          <Link
            className={`banner__text__link`}
            to={bannerData[currentIdx].link?.href ?? "/"}
          >
            {bannerData[currentIdx].link?.label}
          </Link>
        )} */}
      </div>
    </section>
  );
}

function DotsComponent({ nextSlide, currentIdx }: SlideIndexProp) {
  return (
    <div className={`banner__dots`}>
      <div className="banner__dots__num">01</div>
      {bannerData.map(({ id }, idx) => (
        <button
          onClick={() => nextSlide(idx)}
          className={`banner__dots__item ${
            currentIdx === idx && "banner__dots__item--active"
          }`}
          key={id}
        ></button>
      ))}
      <div className="banner__dots__num">0{bannerData.length}</div>
    </div>
  );
}

function ArrowComponent({ nextSlide, currentIdx }: SlideIndexProp) {
  return (
    <div className={`banner__arrow`}>
      <button onClick={() => nextSlide(currentIdx - 1)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 1L5 11.4708L19 23" stroke-linecap="round" />
        </svg>
      </button>
      <button onClick={() => nextSlide(currentIdx + 1)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 1L5 11.4708L19 23" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  );
}

function Progressbar({ progress }: { progress: string }) {
  return (
    <div className="progressbar">
      <div className="progressbar__cover">
        <div className={`progressbar__cover__bar ${progress}`}></div>
      </div>
    </div>
  );
}
