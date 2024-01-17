import { bannerData } from "./data";
type Props = {};

function Home({}: Props) {
  return (
    <main className="home">
      {/* banner */}
      <div className="home__banner">
        <div className="wrapper">
          <div className="container">
            {/* banner content */}
            <div className="home__banner__content">
              {bannerData.map(({ id, heading, paragraph, image }) => (
                <section className="home__banner__item" key={id}>
                  <div>
                    <h2>{heading}</h2>
                    <p>{paragraph}</p>
                  </div>
                  <div className="home__banner__image">
                    <img src={image} alt={heading} />
                  </div>
                </section>
              ))}
            </div>
            {/* dots */}
            <div className="home__banner__dots">
              {bannerData.map(({ id }) => (
                <div className="home__banner__dots__item" key={id}>
                  O
                </div>
              ))}
            </div>
            <div className="home__banner__arrow">
              <div>
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
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* content 1 */}
      <article>
        <div>
          <h2>Best Seller</h2>
        </div>
        <div>
          {/* map */}
          <div>
            <img src="" alt="" />
            <div>
              <p>name - gender</p>
              <p>price</p>
            </div>
          </div>
        </div>
      </article>

      {/* content 2 */}
      <article>
        <div>
          <h2>Season Sales</h2>
          <p>checkout... blah gasdfgsdag adsg sg</p>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </article>

      {/* content 3 */}
      <article>
        <div>
          <h2>New Clothes</h2>
        </div>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </article>

      {/* content 4 */}
      <article>
        <div>
          <h2>Recommended</h2>
        </div>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </article>

      {/* content 5 */}
      <article>
        <div>
          <h2>Join Membership</h2>
          <p>gsdfgsdoig msdgisd gsdg sdg</p>
        </div>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </article>
    </main>
  );
}

export default Home;
