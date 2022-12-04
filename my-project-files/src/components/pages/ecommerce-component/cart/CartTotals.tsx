import styles from "~/app/routes/projects/day-2/global-day-2.module.css";

interface CartTotalsProps {
  subtotal: number;
  total: number;
  tax: number;
}

export default function CartTotals(props: CartTotalsProps) {
  return (
    <>
      <div className={styles.lineItem}>
        <div className={styles.label}>Subtotal:</div>
        <div className={`${styles.amount} ${styles.price} ${styles.subtotal}`}>
          {`$${props.subtotal}`}
        </div>
      </div>
      <div className={styles.lineItem}>
        <div className={styles.label}>Tax:</div>
        <div className={`${styles.amount} ${styles.price} ${styles.tax}`}>
          ${props.tax}
        </div>
      </div>
      <div className={`${styles.lineItem} ${styles.total}`}>
        <div className={styles.label}>Total:</div>
        <div className={`${styles.amount} ${styles.price} ${styles.total}`}>
          {`$${props.total}`}
        </div>
      </div>
    </>
  );
}
