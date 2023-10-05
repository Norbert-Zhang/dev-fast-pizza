import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;

      // Delete the item with 2 ways
      // 1. way
      // if (item.quantity === 0)
      //   state.cart = state.cart.filter(
      //     (item) => item.pizzaId !== action.payload,
      //   );
      // 2. way
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

// using reselect library to optimize the performance of following select function
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

// using reselect library to optimize the performance of following select function
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
