import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
import { AddToCart } from '~/utils/Types';
import axios from 'axios';
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

const getCity = () => {
    return axios.get('https://provinces.open-api.vn/api/p/');
};

const getDistrict = (code: number) => {
    return axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
};

const getWard = (code: number) => {
    return axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
};

const getCoupon = (code: string) => {
    return AxiosInstance.get(Config.apiUrl + 'coupon/?code=' + code);
};

const ClearCart = () => {
    return AxiosInstance.delete(Config.apiUrl + 'cart/clear-cart');
};

const CartService = {
    addToCart,
    getCart,
    deleteCart,
    getCity,
    getDistrict,
    getWard,
    getCoupon,
    ClearCart,
};

export default CartService;
