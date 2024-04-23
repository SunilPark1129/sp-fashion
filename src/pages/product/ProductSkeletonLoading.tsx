import "./productSkeletonLoading.css";

function ProductSkeletonLoading() {
  return (
    <div className="wrapper">
      <div className="product-loading">
        <div className="product-loading__route">
          <div className="product-loading__route__path"></div>
          <div className="product-loading__route__path"></div>
          <div className="product-loading__route__path"></div>
        </div>
        <div className="product-loading__container">
          <div className="product-loading__imgs">
            <div className="product-loading__imgs__box">
              <div className="product-loading__imgs__box__sm"></div>
              <div className="product-loading__imgs__box__sm"></div>
            </div>
            <div className="product-loading__imgs__lg"></div>
          </div>
          <div className="product-loading__texts">
            <div className="product-loading__texts__box">
              <div className="product-loading__texts__box__paragraph"></div>
              <div className="product-loading__texts__box__paragraph"></div>
            </div>
            <div className="product-loading__texts__box">
              <div className="product-loading__texts__box__paragraph"></div>
              <div className="product-loading__texts__box__paragraph"></div>
              <div className="product-loading__texts__box__paragraph"></div>
            </div>
            <div className="product-loading__texts__box">
              <div className="product-loading__texts__box__paragraph"></div>
              <div className="product-loading__texts__box__paragraph"></div>
            </div>
            <div className="product-loading__texts__box">
              <div className="product-loading__texts__box__btn"></div>
              <div className="product-loading__texts__box__btn"></div>
            </div>
            <div className="product-loading__texts__box">
              <div className="product-loading__texts__box__btn"></div>
              <div className="product-loading__texts__box__btn"></div>
              <div className="product-loading__texts__box__btn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeletonLoading;
