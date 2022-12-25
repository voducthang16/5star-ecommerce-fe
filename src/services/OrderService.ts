import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'order';

const CreateOrder = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const OrderVnPay = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + `/${id}/order-payment-vnpay`);
};

const getOrderByUserId = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + `?user_id=${id}`);
};

const getOrderDetail = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + `/${id}`);
};

const RatingProduct = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + 'rating', data);
};

const OrderService = {
    CreateOrder,
    OrderVnPay,
    getOrderByUserId,
    getOrderDetail,
    RatingProduct,
};

export default OrderService;
