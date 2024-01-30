import "./errorpage.css";

function ErrorPage() {
  return (
    <section className="errorpage">
      <div className="wrapper">
        <div className="container">
          <div className="errorpage__text">
            <h3>PAGE 404</h3>
            <p>The current address is for a non-existent page.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
