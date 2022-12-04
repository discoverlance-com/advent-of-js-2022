export const TAX_AMOUNT = 0.0975;
export const calculateTax = (subtotal: number) => {
  return Number((subtotal * TAX_AMOUNT).toFixed(2));
};
