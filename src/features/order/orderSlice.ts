import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from '~/services/OrderService';
import { ResponseType } from '~/utils/Types';
import { RootState } from '../../app/store';

export interface OrderProps {
    id: number;
    name: string;
    description: string;
    info_detail: Array<any>;
    image: Array<any>;
    slug: string;
    status: number;
}

export interface OrderState {
    value: Array<OrderProps>;
    detail: any;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: OrderState = {
    value: [],
    detail: [],
    status: 'idle',
};

export const getOrderAsync = createAsyncThunk('order/getOrder', async (id_user: number) => {
    const response: ResponseType = await OrderService.getOrderByUserId(id_user);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const getOrderDetailAsync = createAsyncThunk('order/getOrderDetail', async (id_order: number) => {
    const response: ResponseType = await OrderService.getOrderByUserId(id_order);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchProductAsync.pending, (state) => {
            //     state.status = 'loading';
            // })
            .addCase(getOrderAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(getOrderDetailAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                console.log(action.payload);
                state.detail = action.payload;
            });
        // .addCase(fetchProductAsync.rejected, (state) => {
        //     state.status = 'failed';
        // })
    },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const getOrder = (state: RootState) => state.order.value;
export const getOrderDetail = (state: RootState) => state.order.detail;
export default orderSlice.reducer;
