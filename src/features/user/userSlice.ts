import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface UserProps {
    id: number;
    name: string;
    description: string;
    info_detail: Array<any>;
    image: Array<any>;
    slug: string;
    sold: number;
    status: number;
}

export interface UserState {
    value: Array<UserProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    value: [],
    status: 'idle',
};

export const userSlice = createSlice({
    name: 'user',
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
        // builder
        //     .addCase(fetchProductAsync.pending, (state) => {
        //         state.status = 'loading';
        //     })
        //     .addCase(fetchProductAsync.fulfilled, (state, action) => {
        //         state.status = 'idle';
        //         state.value = action.payload;
        //     })
        //     .addCase(fetchProductAsync.rejected, (state) => {
        //         state.status = 'failed';
        //     });
    },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const getProducts = (state: RootState) => state.product.value;

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = getProducts(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default userSlice.reducer;
