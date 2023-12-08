import { createSlice } from "@reduxjs/toolkit";

const myArray = [];

const initialState = {
  isCartVisible: false,
  items: myArray,
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    addToCart(state, action) {
      state.changed = true;
      const title = action.payload.title,
        id = action.payload.id,
        price = action.payload.price;

      state.totalQuantity++;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      const existingItem = state.items[existingItemIndex];
      if (existingItemIndex > -1) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity: 1,
        });
      }
    },

    removeFromCart(state, action) {
      state.changed = true;

      state.totalQuantity--;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingCartItem = state.items[existingItemIndex];

      if (existingCartItem.quantity === 1) {
        state.items.splice(existingItemIndex, 1);
      } else {
        state.items[existingItemIndex].quantity -= 1;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
