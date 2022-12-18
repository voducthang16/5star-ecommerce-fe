import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetBlogs from '~/services/BlogService';
import { ResponseType } from '~/utils/Types';
import { RootState } from '../../app/store';

export interface BlogProps {
    id: number;
    title: string;
    content: string;
    image: Array<any>;
    slug: string;
    status: number;
}

export interface BlogState {
    value: Array<BlogProps>;
    detail: any;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: BlogState = {
    value: [],
    detail: {},
    status: 'idle',
};

export const getBlogAsync = createAsyncThunk('blog/getPosts', async () => {
    const response: ResponseType = await GetBlogs.GetBlogs();
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const getBlogDetailAsync = createAsyncThunk('blog/getPostDetail', async (slug: any) => {
    const response: ResponseType = await GetBlogs.getBlogDetail(slug);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchProductAsync.pending, (state) => {
            //     state.status = 'loading';
            // })
            .addCase(getBlogAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                state.value = action.payload.data;
            })
            .addCase(getBlogDetailAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                state.detail = action.payload;
            });
        // .addCase(fetchProductAsync.rejected, (state) => {
        //     state.status = 'failed';
        // })
    },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const getBlogs = (state: RootState) => state.blog.value;
export const getDetail = (state: RootState) => state.blog.detail;
export default blogSlice.reducer;
