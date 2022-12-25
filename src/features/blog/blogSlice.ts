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
    recent: any;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: BlogState = {
    value: [],
    detail: {},
    recent: [],
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

export const searchBlogAsync = createAsyncThunk('blog/searchPosts', async (keyword: string) => {
    const response: ResponseType = await GetBlogs.searchBlog(keyword);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        recentPost: (state) => {
            const temp = state.value.sort(
                (a: any, b: any) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime(),
            );

            const tempB = temp.slice(0, 3);
            state.recent = tempB;
        },
    },
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
            })
            .addCase(searchBlogAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                state.value = action.payload.data;
            });
        // .addCase(fetchProductAsync.rejected, (state) => {
        //     state.status = 'failed';
        // })
    },
});

export const { recentPost } = blogSlice.actions;

export const getBlogs = (state: RootState) => state.blog.value;
export const getRecentPost = (state: RootState) => state.blog.recent;
export const getDetail = (state: RootState) => state.blog.detail;
export default blogSlice.reducer;
