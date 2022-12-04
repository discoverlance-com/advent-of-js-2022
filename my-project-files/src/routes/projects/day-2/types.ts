export interface MenuItem {
  name: string;
  image: string;
  price: number;
  alt: string;
  count: number;
  total: number;
}

export interface CartItem extends MenuItem {}

export interface InitialStoreState {
  menuItems: Array<MenuItem>;
  cart: {
    items: Array<CartItem>;
    subtotal: number;
    total: number;
    tax: number;
  };
}

export type CART_STORE_ACTIONS =
  | { type: "add"; payload: InitialStoreState }
  | { type: "remove"; payload: { item: CartItem["name"] } }
  | { type: "delete"; payload: { item: CartItem["name"] } };
