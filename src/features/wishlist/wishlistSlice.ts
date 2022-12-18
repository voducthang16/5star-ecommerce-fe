import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetWishlist from '~/services/WishlistService';
import { ResponseType } from '~/utils/Types';
import { RootState } from '../../app/store';

export interface WishlistProps {
    id: number;
    name: string;
    description: string;
    info_detail: Array<any>;
    image: Array<any>;
    slug: string;
    status: number;
}

export interface WishlistState {
    value: Array<WishlistProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: WishlistState = {
    value: [],
    status: 'idle',
};

export const getWishlistAsync = createAsyncThunk('wishlist/getWishlist', async (id_user: number) => {
    const response: ResponseType = await GetWishlist.GetWishlist(id_user);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchProductAsync.pending, (state) => {
            //     state.status = 'loading';
            // })
            .addCase(getWishlistAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                state.value = action.payload.data;
            });
        // .addCase(fetchProductAsync.rejected, (state) => {
        //     state.status = 'failed';
        // })
    },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const getWishlist = (state: RootState) => state.wishlist.value;
export default wishlistSlice.reducer;
