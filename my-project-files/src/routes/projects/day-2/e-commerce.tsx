import { useCallback, useReducer } from "react";
import Swal from "sweetalert2";

import Cart from "~/app/components/pages/ecommerce-component/cart/Cart";
import Menu from "~/app/components/pages/ecommerce-component/menu/Menu";
import { calculateTax } from "~/app/lib/e-commerce/cart";
import { menuItems } from "~/app/lib/e-commerce/menu";
import styles from "./global-day-2.module.css";
import type { InitialStoreState, CART_STORE_ACTIONS } from "./types";

const initialStoreState: InitialStoreState = {
  menuItems: JSON.parse(
    JSON.stringify(menuItems.sort((a, b) => a.name.localeCompare(b.name)))
  ),
  cart: {
    items: [],
    subtotal: 0,
    total: 0,
    tax: 0,
  },
};

function storeReducer(state: InitialStoreState, action: CART_STORE_ACTIONS) {
  const { cart, menuItems } = action.payload;
  switch (action.type) {
    case "add":
      return {
        menuItems: menuItems.sort((a, b) => a.name.localeCompare(b.name)),
        cart,
      };
    case "remove":
      return {
        menuItems: menuItems.sort((a, b) => a.name.localeCompare(b.name)),
        cart,
      };
    case "delete":
      return {
        menuItems: menuItems.sort((a, b) => a.name.localeCompare(b.name)),
        cart,
      };
    default:
      throw new Error();
  }
}

export default function Ecommerce() {
  const [state, dispatch] = useReducer(storeReducer, initialStoreState);

  const addToCart = useCallback(
    (itemName: string) => {
      const item =
        state.cart.items.find((data) => data.name === itemName) ||
        state.menuItems.find((data) => data.name === itemName);
      if (!item) {
        // send alert
        Swal.fire({
          title: "Sorry",
          text: "The item is not available",
          icon: "error",
          toast: true,
          timer: 2000,
          showConfirmButton: false,
          position: "top-right",
        });
        return;
      }
      if (item.total === 0) {
        Swal.fire({
          title: "Sorry",
          text: "Sorry we have no more of " + item.name,
          icon: "error",
          toast: true,
          timer: 2000,
          showConfirmButton: false,
          position: "top-right",
        });
        return;
      }

      const subtotal = state.cart.subtotal + item.price;
      const tax = calculateTax(subtotal);
      const total = subtotal + tax;

      const newItems = state.cart.items;

      if (!state.cart.items.find((data) => data.name === item.name)) {
        newItems.push(item);
      }

      const items = [
        ...newItems.map((data) => {
          if (data.name === item.name) {
            data["count"] = data["count"] + 1;
            data["total"] = data["total"] - 1;
          }
          return { ...data };
        }),
      ];
      const newMenuItems = state.menuItems.filter(
        (data) => data.name !== item.name
      );

      dispatch({
        type: "add",
        payload: {
          menuItems: newMenuItems,
          cart: { items, total, subtotal, tax },
        },
      });
    },
    [state]
  );

  const removeFromCart = useCallback(
    (itemName: string) => {
      const item = state.cart.items.find((data) => data.name === itemName);
      if (!item) {
        // send alert
        Swal.fire({
          title: "Sorry",
          text: "The item is not available",
          icon: "error",
          toast: true,
          timer: 2000,
          showConfirmButton: false,
          position: "top-right",
        });
        return;
      }
      if (item.count === 1) {
        const newSubtotal = state.cart.subtotal - item.price;
        const newTax = calculateTax(newSubtotal);
        const newTotal = newSubtotal + newTax;
        const payload = {
          menuItems: [
            ...state.menuItems,
            { ...menuItems.find((data) => data.name === item.name)! },
          ],
          cart: {
            total: newTotal,
            tax: newTax,
            subtotal: newSubtotal,
            items: [
              ...state.cart.items.filter((data) => data.name !== item.name),
            ],
          },
        };
        dispatch({ type: "delete", payload });
        return;
      }

      const newSubtotal = state.cart.subtotal - item.price;
      const newTax = calculateTax(newSubtotal);
      const newTotal = newSubtotal + newTax;

      const payload = {
        menuItems: state.menuItems,
        cart: {
          total: newTotal,
          tax: newTax,
          subtotal: newSubtotal,
          items: [
            ...state.cart.items.map((data) => {
              if (data.name === item.name) {
                data["count"] = data["count"] - 1;
                data["total"] = data["total"] + 1;
              }
              return { ...data };
            }),
          ],
        },
      };

      dispatch({ type: "remove", payload });
    },
    [state]
  );
  return (
    <div className={styles.ecommerce}>
      <div className={`${styles.wrapper} ${styles.menu}`}>
        <Menu items={state.menuItems} addToCart={addToCart} />

        <Cart
          {...state.cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </div>
    </div>
  );
}
