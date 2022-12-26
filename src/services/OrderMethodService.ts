import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';

let url: string = 'payment-method';

const getList = () => {
    return AxiosInstance.get(Config.apiUrl + url);
};

const OrderMethod = {
    getList,
};

export default OrderMethod;
