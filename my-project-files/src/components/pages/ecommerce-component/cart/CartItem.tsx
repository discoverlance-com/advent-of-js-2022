import styles from "~/app/routes/projects/day-2/global-day-2.module.css";
import { CartItem as CartItemType } from "~/app/routes/projects/day-2/types";

interface CartItemProps extends CartItemType {}

export default function CartItem(props: CartItemProps) {
  //console.log(props);
  return (
    <li>
      <div className={styles.plate}>
        <img src={props.image} alt={props.alt} className={styles.plate} />
        <div className={styles.quantity}>{props.count}</div>
      </div>
      <div className={styles.content}>
        <p className={styles.menuItem}>{props.name}</p>
        <p className={styles.price}>{`$${props.price}`}</p>
      </div>
      <div className={styles.quantity__wrapper}>
        <button className={styles.decrease}>
          <img src="/images/chevron.svg" />
        </button>
        <div className={styles.quantity}>{props.count}</div>
        <button className={styles.increase}>
          <img src="/images/chevron.svg" />
        </button>
      </div>
      <div className={styles.subtotal}>{`$${Number(
        (props.count * props.price).toFixed(2)
      )}`}</div>
    </li>
  );
}
