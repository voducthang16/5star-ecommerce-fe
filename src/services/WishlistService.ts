import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'wishlist';

const GetWishlist = (id_user: number) => {
    return AxiosInstance.get(Config.apiUrl + url + `?id_user=${id_user}`);
};

const createWishlist = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const deleteProductInWishlist = (id: any) => {
    return AxiosInstance.delete(Config.apiUrl + url + '/' + id);
};

const WishlistService = {
    GetWishlist,
    createWishlist,
};

export default WishlistService;
