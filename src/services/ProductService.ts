import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';

let url: string = 'product';

const getAllProduct = async () => {
    let dataAllProduct = await AxiosInstance.get(Config.apiUrl + url).then((resAllProduct: any) => {
        if (resAllProduct.statusCode === 200) {
            resAllProduct.data.forEach((res: any) => {
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
                // console.log(
                //     `${res.id}: ${Object.entries(res.classify_1).length} - ${JSON.stringify(res.classify_1)} - ${
                //         Object.entries(res.classify_1).length > 0
                //     }`,
                // );
                // console.log(
                //     `${res.id}: ${Object.entries(res.classify_2).length} - ${JSON.stringify(res.classify_2)} - ${
                //         Object.entries(res.classify_2).length > 0
                //     }`,
                // );
                // console.log(
                //     `${res.id}: ${
                //         Object.entries(res.classify_1).length > 0 && Object.entries(res.classify_2).length > 0
                //     }`,
                // );
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
};

export default ProductService;
