import styles from "~/app/routes/projects/day-2/global-day-2.module.css";
import type { MenuItem as MenuItemType } from "~/app/routes/projects/day-2/types";
import MenuItem from "./MenuItem";

interface MenuProps {
  items: MenuItemType[];
  addToCart: (itemName: string) => void;
}

export default function Menu(props: MenuProps) {
  return (
    <div className={styles.panel}>
      <h1>To Go Menu</h1>
      <ul className={styles.menu}>
        {props.items.map((item) => (
          <MenuItem {...item} key={item.name} addToCart={props.addToCart} />
        ))}
      </ul>
    </div>
  );
}
