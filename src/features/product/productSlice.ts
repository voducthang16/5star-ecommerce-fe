import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductService from '~/services/ProductService';
import { ResponseType } from '~/utils/Types';
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
    search: Array<ProductProps>;
    total: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
    value: [],
    total: 0,
    detail: {},
    search: [],
    status: 'idle',
};

export const fetchProductAsync = createAsyncThunk('product/fetchProducts', async (filter: any = '') => {
    const { page, fromPrice, toPrice } = filter;
    const response: ResponseType = await ProductService.getAllProduct(page, fromPrice, toPrice);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const fetchDetailProductAsync = createAsyncThunk('product/fetchDetailProducts', async (slug: string) => {
    const response = await ProductService.getOneProduct(slug);
    return response.data;
});

export const searchProductAsync = createAsyncThunk('product/searchProducts', async (keyword: any) => {
    // const { page, keyword } = filter;
    const response: ResponseType = await ProductService.searchProduct(keyword);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                state.value = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(fetchProductAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchDetailProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.detail = action.payload;
            })
            .addCase(searchProductAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                state.search = action.payload.data;
            });
    },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const getProducts = (state: RootState) => state.product.value;
export const totalProduct = (state: RootState) => state.product.total;
export const getDetail = (state: RootState) => state.product.detail;
export const getSearch = (state: RootState) => state.product.search;
export default productSlice.reducer;
