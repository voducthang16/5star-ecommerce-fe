import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
    value: Array<any>;
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
        addUser: (state, action: any) => {
            state.value = action.payload;
        },
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

export const { addUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user.value;

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = getProducts(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default userSlice.reducer;
