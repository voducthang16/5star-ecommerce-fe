import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '~/features/product/productSlice';
import cartReducer from '~/features/cart/cartSlice';
import userReducer from '~/features/user/userSlice';
import categoryReducer from '~/features/category/categorySlice';
import wishlistReducer from '~/features/wishlist/wishlistSlice';
import blogReducer from '~/features/blog/blogSlice';
import orderReducer from '~/features/order/orderSlice';
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    counter: counterReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    blog: blogReducer,
    order: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
