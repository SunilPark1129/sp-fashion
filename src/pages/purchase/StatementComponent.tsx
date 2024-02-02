import { checkArrayProp } from "../../model/stateProps";

export default function StatementComponent({
  displayItems,
  total,
}: {
  displayItems: checkArrayProp;
  total: string;
}) {
  return (
    <section className="purchase__form__step__page purchase__form__text">
      <div>
        <h2>Statement</h2>
      </div>
      <div className="purchase__form__invoice">
        <p>Invoice:</p>
        <div className="purchase__form__invoice__box">
          {displayItems.length === 0 ? (
            <div
              className="purchase__form__invoice__item"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
          ) : (
            displayItems.map(({ id, name, qty, price }) => (
              <div className="purchase__form__invoice__item" key={id}>
                <p>{name}</p>
                <p>{qty}</p>
                <p>${(price * Number(qty)).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="purchase__form__total">
        <p>
          <span>Total Items</span>: {displayItems.length}
        </p>
        <p>
          <span>Total Price</span>: ${total}
        </p>
      </div>
    </section>
  );
}
