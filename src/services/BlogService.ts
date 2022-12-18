import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'blog';

const GetBlogs = (page: number = 0, perPage: number = 9) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}&status=1`);
};

const OrderVnPay = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + `/${id}/order-payment-vnpay`);
};

const BlogService = {
    GetBlogs,
    OrderVnPay,
};

export default BlogService;
