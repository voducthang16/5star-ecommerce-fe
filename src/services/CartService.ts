import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
import { AddToCart } from '~/utils/Types';

let url: string = 'cart';

const addToCart = (data: AddToCart) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const CartService = {
    addToCart,
};

export default CartService;
