import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
import { AddToCart } from '~/utils/Types';

let url: string = 'cart';

const addToCart = (data: AddToCart) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const getCart = () => {
    return AxiosInstance.get(Config.apiUrl + url);
};

const deleteCart = (id: number) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const CartService = {
    addToCart,
    getCart,
    deleteCart,
};

export default CartService;
