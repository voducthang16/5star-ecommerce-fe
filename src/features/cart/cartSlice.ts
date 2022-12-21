import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import CartService from '~/services/CartService';
import { RootState } from '../../app/store';

interface productCartState {
    id_product: number;
    quantity: number;
}

export interface CartState {
    value: Array<any>;
    product: Array<productCartState>;
    fee: number;
    total: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
    value: [],
    product: [],
    fee: 0,
    total: 0,
    status: 'idle',
};

export const getCartAsync = createAsyncThunk('cart/getCart', async () => {
    const response = await CartService.getCart();
    return response.data;
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: any) => {
            state.product.push(action.payload);
        },
        updateToCart: (state, { payload }: any) => {
            let newQuantityCart = state.product.map((item: productCartState) =>
                item.id_product === payload.id_product ? payload : item,
            );
            state.product = newQuantityCart;
        },
        setFee: (state, action: PayloadAction<number>) => {
            state.fee = action.payload;
        },
        clearFee: (state) => {
            state.fee = 0;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCartAsync.fulfilled, (state, action) => {
                state.value = action.payload ? action.payload : [];
            })
            .addCase(getCartAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { addToCart, updateToCart, setFee, clearFee } = cartSlice.actions;

export const getCart = (state: RootState) => state.cart.value;

export const getFee = (state: RootState) => state.cart.fee;
export const getTotalCart = (state: RootState) =>
    state.cart.value.reduce((a: any, b: any) => a + b.price * b.quantity, 0);

export const getProductInCart = (state: RootState) => state.cart.product;

export default cartSlice.reducer;
