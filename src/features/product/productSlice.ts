import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductService from '~/services/ProductService';
import { RootState } from '../../app/store';

export interface ProductProps {
    id: number;
    name: string;
    description: string;
    info_detail: Array<any>;
    image: Array<any>;
    slug: string;
    sold: number;
    status: number;
}

export interface ProductState {
    value: Array<ProductProps>;
    detail: any;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
    value: [],
    detail: {},
    status: 'idle',
};

export const fetchProductAsync = createAsyncThunk('product/fetchProducts', async () => {
    const response = await ProductService.getAllProduct();
    return response.data;
});

export const fetchDetailProductAsync = createAsyncThunk('product/fetchDetailProducts', async (slug: string) => {
    const response = await ProductService.getOneProduct(slug);
    return response.data;
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(fetchProductAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchDetailProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.detail = action.payload;
            });
    },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const getProducts = (state: RootState) => state.product.value;
export const getDetail = (state: RootState) => state.product.detail;
export default productSlice.reducer;
