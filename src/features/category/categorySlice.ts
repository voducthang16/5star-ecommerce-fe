import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoryService from '~/services/CategoryService';
import { RootState } from '../../app/store';

export interface CategoryProps {
    id: number;
    name: string;
    slug: string;
    status: number;
    parent_id?: number;
}

export interface CategoryState {
    value: Array<CategoryProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CategoryState = {
    value: [],
    status: 'idle',
};

export const fetchCategoryAsync = createAsyncThunk('category/fetchCategory', async () => {
    const response = await CategoryService.getAllCategory();
    return response.data;
});

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(fetchCategoryAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

// export const { increment, decrement, incrementByAmount } = categorySlice.actions;

export const getCategory = (state: RootState) => state.category.value;
export default categorySlice.reducer;
