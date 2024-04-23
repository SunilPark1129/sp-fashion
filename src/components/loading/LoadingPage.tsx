// skeleton loading page
import "./loadingpage.css";

function LoadingPage() {
  return (
    <div className="loading">
      <div className="wrapper">
        <div className="container">
          <div className="loading__aside">
            <div className="loading__aside__box">
              <div className="loading__aside__box__text"></div>
            </div>
            <div className="loading__aside__box">
              <div className="loading__aside__box__text"></div>
              <div className="loading__aside__box__text"></div>
              <div className="loading__aside__box__text"></div>
            </div>
            <div className="loading__aside__box">
              <div className="loading__aside__box__text"></div>
              <div className="loading__aside__box__text"></div>
            </div>
            <div className="loading__aside__box">
              <div className="loading__aside__box__text"></div>
            </div>
          </div>
          <div className="loading__main">
            {Array.from({ length: 8 }, () => (
              <div className="loading__main__box">
                <div className="loading__main__box__item">
                  <div className="loading__main__box__img"></div>
                  <div className="loading__main__box__text">
                    <div></div>
                  </div>
                </div>
                <div className="loading__main__box__btn">
                  <div className="loading__main__box__svg"></div>
                  <div className="loading__main__box__svg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
