import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export interface CartItem extends IProduct{
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
}

const initialCartItems =localStorage.getItem("cartItem");
if (initialCartItems) {
    initialState.cartItems = JSON.parse(initialCartItems);
}

const saveItemsToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem("cartItem", JSON.stringify(items));
  };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.cartItems.find(
                (product) => product.id === action.payload.id
              );
              if (existingItem) {
                existingItem.quantity += 1;
                saveItemsToLocalStorage(state.cartItems);
                return;
              } else {
                state.cartItems.push(action.payload);
                saveItemsToLocalStorage(state.cartItems);
              }
              toast.success("Item added Successfully");
        },
        removeProductFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(
                (product) => product.id !== action.payload
            )
        },
        incrementQty: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(
              (product) => product.id === action.payload
            );
            if (item) {
              item.quantity += 1;
              saveItemsToLocalStorage(state.cartItems);
            }
          },
          decrementQty: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(
              (product) => product.id === action.payload
            );
            if (item && item.quantity > 1) {
              item.quantity -= 1;
              saveItemsToLocalStorage(state.cartItems);
            } else {
              state.cartItems = state.cartItems.filter(
                (product) => product.id !== action.payload
              );
              saveItemsToLocalStorage(state.cartItems);
              toast.success("Item Removed Successfully");
            }
          },
    }
});

export const { addProductToCart, removeProductFromCart, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;