import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'order';

const CreateOrder = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const OrderVnPay = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + `/${id}/order-payment-vnpay`);
};

const OrderService = {
    CreateOrder,
    OrderVnPay,
};

export default OrderService;
