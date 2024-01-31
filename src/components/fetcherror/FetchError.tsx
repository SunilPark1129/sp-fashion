import "./fetcherror.css";
type Props = { error: string | null };

function FetchError({ error }: Props) {
  return (
    <div className="fetch-error">
      <div className="wrapper">
        <div className="container">
          <div className="fetch-error__text">
            <h4>Connection Issue</h4>
            <div>
              <p>
                Currently, we have found an issue that interacting between
                client and server connection.
              </p>
              <p>Response Status: {error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchError;
