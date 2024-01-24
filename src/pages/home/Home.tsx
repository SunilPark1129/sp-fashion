import Banner from "./Banner";

function BestSeller() {
  return <section></section>;
}

function Home() {
  return (
    <main className="home">
      {/* banner */}
      <Banner />

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
