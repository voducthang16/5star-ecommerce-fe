import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

export interface CartState {
    value: number;
    product: number;
    stock: any;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
    value: 0,
    product: 0,
    stock: {},
    status: 'idle',
};

// export const fetchProductAsync = createAsyncThunk('product/fetchProducts', async () => {
//     const response = await CartService.addToCart();
//     return response.data;
// });

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        product_parent: (state, action: PayloadAction<number>) => {
            state.product = action.payload;
        },

        insertSize: (state, action: any) => {
            const { value, idProduct } = action.payload;
            console.log('idProduct SIZE: ', idProduct);
            console.log('state Product SIZE', state.product);
            if (idProduct === state.product) {
                state.stock.idTemp = idProduct;
            }
            if (idProduct !== state.product) {
                state.stock.size = null;
                state.stock.color = null;
                state.stock.size = value;
            } else {
                state.stock.size = null;
                state.stock.size = value;
            }
        },

        insertColor: (state, action: any) => {
            const { value, idProduct } = action.payload;
            console.log('idProduct COLOR ', idProduct);
            console.log('state Product COLOR', state.product);
            if (idProduct !== state.product) {
                state.stock.color = null;
                state.stock.size = null;
                state.stock.color = value;
            } else {
                state.stock.color = null;
                state.stock.color = value;
            }
        },
    },

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(incrementAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(incrementAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             state.value += action.payload;
    //         })
    //         .addCase(incrementAsync.rejected, (state) => {
    //             state.status = 'failed';
    //         });
    // },
});

export const { insertSize, insertColor, product_parent } = cartSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default cartSlice.reducer;
