import styles from "~/app/routes/projects/day-2/global-day-2.module.css";
import { CartItem as CartItemType } from "~/app/routes/projects/day-2/types";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

interface CartProps {
  items: CartItemType[];
  subtotal: number;
  total: number;
  tax: number;
}

export default function Cart(props: CartProps) {
  //console.log({ items: props.items });
  return (
    <div className={`${styles.panel} ${styles.cart}`}>
      <h1>Your Cart</h1>

      {props.items && props.items.length < 1 && (
        <p className={styles.empty}>Your cart is empty.</p>
      )}

      <ul className={styles.cartSummary}>
        {props.items.length >= 1 &&
          props.items.map((item) => <CartItem key={item.alt} {...item} />)}
      </ul>

      <div className={styles.totals}>
        <CartTotals
          total={props.total}
          subtotal={props.subtotal}
          tax={props.tax}
        />
      </div>
    </div>
  );
}
