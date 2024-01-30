import React from "react";
import "./detailloading.css";

function DetailLoading() {
  return (
    <div className="wrapper">
      <div className="detail-loading">
        <div className="detail-loading__route">
          <div className="detail-loading__route__path"></div>
          <div className="detail-loading__route__path"></div>
          <div className="detail-loading__route__path"></div>
        </div>
        <div className="detail-loading__container">
          <div className="detail-loading__imgs">
            <div className="detail-loading__imgs__lg"></div>
            <div className="detail-loading__imgs__box">
              <div className="detail-loading__imgs__box__sm"></div>
              <div className="detail-loading__imgs__box__sm"></div>
            </div>
          </div>
          <div className="detail-loading__texts">
            <div className="detail-loading__texts__box">
              <div className="detail-loading__texts__box__paragraph"></div>
              <div className="detail-loading__texts__box__paragraph"></div>
            </div>
            <div className="detail-loading__texts__box">
              <div className="detail-loading__texts__box__paragraph"></div>
              <div className="detail-loading__texts__box__paragraph"></div>
              <div className="detail-loading__texts__box__paragraph"></div>
            </div>
            <div className="detail-loading__texts__box">
              <div className="detail-loading__texts__box__paragraph"></div>
              <div className="detail-loading__texts__box__paragraph"></div>
            </div>
            <div className="detail-loading__texts__box">
              <div className="detail-loading__texts__box__btn"></div>
              <div className="detail-loading__texts__box__btn"></div>
            </div>
            <div className="detail-loading__texts__box">
              <div className="detail-loading__texts__box__btn"></div>
              <div className="detail-loading__texts__box__btn"></div>
              <div className="detail-loading__texts__box__btn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailLoading;
