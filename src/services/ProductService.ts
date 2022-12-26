import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';

let url: string = 'product';

const getAll = async ({}: any) => {
    let dataAllProduct = await AxiosInstance.get(Config.apiUrl + url + `?status=1`).then((resAllProduct: any) => {
        if (resAllProduct.statusCode === 200) {
            resAllProduct.data.data.forEach((res: any) => {
                let hash: any = {};
                let hash2: any = {};
                res.stocks.forEach((stock: any) => {
                    if (!hash[stock?.classify_1?.attribute]) {
                        hash[stock?.classify_1?.attribute] = stock.id_classify_1;
                    }
                    if (!hash2[stock?.classify_2?.attribute]) {
                        hash2[stock?.classify_2?.attribute] = stock.id_classify_2;
                    }
                });
                res.classify_1 = hash;
                Object.keys(res.classify_1).forEach(
                    (key) => res.classify_1[key] === null && delete res.classify_1[key],
                );
                res.classify_2 = hash2;
                Object.keys(res.classify_2).forEach(
                    (key) => res.classify_2[key] === null && delete res.classify_2[key],
                );
                if (Object.entries(res.classify_1).length > 0 && Object.entries(res.classify_2).length > 0) {
                    res.classify_n = 2;
                } else if (Object.entries(res.classify_1).length === 0 && Object.entries(res.classify_2).length === 0) {
                    res.classify_n = 0;
                } else {
                    res.classify_n = 1;
                }
            });
            return resAllProduct;
        }
    });
    return dataAllProduct;
};

const getAllProduct = async ({
    page = 0,
    fromPrice = '',
    toPrice = '',
    perPage = 8,
    name = '',
    id_category = '',
    orderType = 'ASC',
    orderBy = '',
}: any) => {
    let dataAllProduct = await AxiosInstance.get(
        Config.apiUrl +
            url +
            `?page=${page}&perPage=${perPage}&price_from=${fromPrice}&price_to=${toPrice}&id_category=${id_category}&name=${name}&orderType=${orderType}&orderBy=${orderBy}&status=1`,
    ).then((resAllProduct: any) => {
        if (resAllProduct.statusCode === 200) {
            resAllProduct.data.data.forEach((res: any) => {
                let hash: any = {};
                let hash2: any = {};
                res.stocks.forEach((stock: any) => {
                    if (!hash[stock?.classify_1?.attribute]) {
                        hash[stock?.classify_1?.attribute] = stock.id_classify_1;
                    }
                    if (!hash2[stock?.classify_2?.attribute]) {
                        hash2[stock?.classify_2?.attribute] = stock.id_classify_2;
                    }
                });
                res.classify_1 = hash;
                Object.keys(res.classify_1).forEach(
                    (key) => res.classify_1[key] === null && delete res.classify_1[key],
                );
                res.classify_2 = hash2;
                Object.keys(res.classify_2).forEach(
                    (key) => res.classify_2[key] === null && delete res.classify_2[key],
                );
                if (Object.entries(res.classify_1).length > 0 && Object.entries(res.classify_2).length > 0) {
                    res.classify_n = 2;
                } else if (Object.entries(res.classify_1).length === 0 && Object.entries(res.classify_2).length === 0) {
                    res.classify_n = 0;
                } else {
                    res.classify_n = 1;
                }
            });
            return resAllProduct;
        }
    });
    return dataAllProduct;
};

const getOneProduct = async (slug: string) => {
    let result = await AxiosInstance.get(Config.apiUrl + url + '/' + slug).then((res: any) => {
        if (res.statusCode === 200) {
            let hash: any = {};
            let hash2: any = {};
            res.data.stocks.forEach((stock: any) => {
                if (!hash[stock?.classify_1?.attribute]) {
                    hash[stock?.classify_1?.attribute] = stock.id_classify_1;
                }
                if (!hash2[stock?.classify_2?.attribute]) {
                    hash2[stock?.classify_2?.attribute] = stock.id_classify_2;
                }
            });
            res.data.classify_1 = hash;
            Object.keys(res.data.classify_1).forEach(
                (key) => res.data.classify_1[key] === null && delete res.data.classify_1[key],
            );
            res.data.classify_2 = hash2;
            Object.keys(res.data.classify_2).forEach(
                (key) => res.data.classify_2[key] === null && delete res.data.classify_2[key],
            );
            if (Object.entries(res.data.classify_1).length > 0 && Object.entries(res.data.classify_2).length > 0) {
                res.data.classify_n = 2;
            } else if (
                Object.entries(res.data.classify_1).length === 0 &&
                Object.entries(res.data.classify_2).length === 0
            ) {
                res.data.classify_n = 0;
            } else {
                res.data.classify_n = 1;
            }
        }
        return res;
    });
    return result;
};

const getProductOrderBy = ({ orderBy, perPage = 5 }: any) => {
    return AxiosInstance.get(Config.apiUrl + url + `?perPage=${perPage}&orderBy=${orderBy}&orderType=DESC`);
};

const getAllProductLq = async ({ fromPrice = '', toPrice = '', id_category = '' }: any) => {
    let dataAllProduct = await AxiosInstance.get(
        Config.apiUrl + url + `?price_from=${fromPrice}&price_to=${toPrice}&id_category=${id_category}&status=1`,
    ).then((resAllProduct: any) => {
        if (resAllProduct.statusCode === 200) {
            resAllProduct.data.data.forEach((res: any) => {
                let hash: any = {};
                let hash2: any = {};
                res.stocks.forEach((stock: any) => {
                    if (!hash[stock?.classify_1?.attribute]) {
                        hash[stock?.classify_1?.attribute] = stock.id_classify_1;
                    }
                    if (!hash2[stock?.classify_2?.attribute]) {
                        hash2[stock?.classify_2?.attribute] = stock.id_classify_2;
                    }
                });
                res.classify_1 = hash;
                Object.keys(res.classify_1).forEach(
                    (key) => res.classify_1[key] === null && delete res.classify_1[key],
                );
                res.classify_2 = hash2;
                Object.keys(res.classify_2).forEach(
                    (key) => res.classify_2[key] === null && delete res.classify_2[key],
                );
                if (Object.entries(res.classify_1).length > 0 && Object.entries(res.classify_2).length > 0) {
                    res.classify_n = 2;
                } else if (Object.entries(res.classify_1).length === 0 && Object.entries(res.classify_2).length === 0) {
                    res.classify_n = 0;
                } else {
                    res.classify_n = 1;
                }
            });
            return resAllProduct;
        }
    });
    return dataAllProduct;
};

const ProductService = {
    getAllProduct,
    getOneProduct,
    getProductOrderBy,
    getAll,
    getAllProductLq,
};

export default ProductService;
