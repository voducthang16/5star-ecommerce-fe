import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'rating';

const GetRateByIdProduct = (id: string) => {
    return AxiosInstance.get(Config.apiUrl + url + '?id_product=' + id);
};

const GetAverageRating = (id: string) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id + '/statistic');
};

const filterRateProduct = (id_product: any, rate: any) => {
    return AxiosInstance.get(Config.apiUrl + url + `?id_product=${id_product}&rating=${rate}`);
};

const getRate5Star = () => {
    return AxiosInstance.get(Config.apiUrl + url + '?rating=5');
};

const RatingService = {
    GetRateByIdProduct,
    GetAverageRating,
    filterRateProduct,
    getRate5Star,
};

export default RatingService;
