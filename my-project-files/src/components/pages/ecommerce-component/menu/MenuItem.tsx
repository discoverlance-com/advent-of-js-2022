import styles from "~/app/routes/projects/day-2/global-day-2.module.css";
import { MenuItem as MenuItemType } from "~/app/routes/projects/day-2/types";

interface MenuItemProps extends MenuItemType {
  addToCart: (itemName: string) => void;
}

export default function MenuItem(props: MenuItemProps) {
  const addToCart = () => {
    console.log("AddToCart in MenuItem");
    props.addToCart(props.name);
  };
  return (
    <li>
      <div className={styles.plate}>
        <img src={props.image} alt={props.alt} className={styles.plate} />
      </div>
      <div className={styles.content}>
        <p className={styles.menuItem}>{props.name}</p>
        <p className={styles.price}>{`$${props.price}`}</p>
        <button className={styles.inCart} onClick={addToCart}>
          <img src="images/check.svg" alt="Check" />
          In Cart
        </button>
      </div>
    </li>
  );
}
