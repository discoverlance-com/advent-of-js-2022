import { useCallback, useReducer } from "react";
import Swal from "sweetalert2";

import Cart from "~/app/components/pages/ecommerce-component/cart/Cart";
import Menu from "~/app/components/pages/ecommerce-component/menu/Menu";
import { calculateTax } from "~/app/lib/e-commerce/cart";
import { menuItems } from "~/app/lib/e-commerce/menu";
import styles from "./global-day-2.module.css";
import type { InitialStoreState, CART_STORE_ACTIONS, CartItem } from "./types";

const initialStoreState: InitialStoreState = {
  menuItems: menuItems,
  cart: {
    items: [],
    subtotal: 0,
    total: 0,
    tax: 0,
  },
};

function storeReducer(state: InitialStoreState, action: CART_STORE_ACTIONS) {
  switch (action.type) {
    case "add":
      return {
        ...action.payload,
      };
    case "remove":
      const foundItem = state.menuItems.find(
        (data) => data.name === action.payload.item
      );
      if (!foundItem) {
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
        return state;
      }

      const newSubtotal = state.cart.subtotal - foundItem.price;
      const newTax = calculateTax(newSubtotal);
      const newTotal = newSubtotal + newTax;
      return {
        menuItems: state.menuItems,
        cart: {
          total: newTotal,
          tax: newTax,
          subtotal: newSubtotal,
          items: [
            ...state.cart.items.map((data) => {
              if (data.name === foundItem.name) {
                data["count"] = data["count"] - 1;
                data["total"] = data["total"] + 1;
              }
              return { ...data };
            }),
          ],
        },
      };
    case "delete":
      const deleteItem = state.menuItems.find(
        (data) => data.name === action.payload.item
      );
      if (!deleteItem) {
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
        return state;
      }
      return {
        menuItems: state.menuItems,
        cart: {
          total: state.cart.total,
          tax: state.cart.tax,
          subtotal: state.cart.subtotal,
          items: [
            ...state.cart.items.filter((data) => data.name !== deleteItem.name),
          ],
        },
      };
    default:
      throw new Error();
  }
}

export default function Ecommerce() {
  const [state, dispatch] = useReducer(storeReducer, initialStoreState);

  const addToCart = useCallback(
    (itemName: string) => {
      console.log("AddToCart in Action ADD");
      const item = state.menuItems.find((data) => data.name === itemName);
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
      if (item.count === item.total) {
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
          console.log("Mapping", data);
          if (data.name === item.name) {
            data["count"] = data["count"] + 1;
            data["total"] = data["total"] - 1;
          }
          return { ...data };
        }),
      ];
      const menuItems = state.menuItems.filter(
        (data) => data.name !== item.name
      );

      dispatch({
        type: "add",
        payload: { menuItems, cart: { items, total, subtotal, tax } },
      });
    },
    [state]
  );
  return (
    <div className={styles.ecommerce}>
      <div className={`${styles.wrapper} ${styles.menu}`}>
        <Menu items={state.menuItems} addToCart={addToCart} />

        <Cart {...state.cart} />
      </div>
    </div>
  );
}
