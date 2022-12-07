import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'category';
const getAllCategory = async () => {
    let res = await AxiosInstance.get(Config.apiUrl + url).then((res: any) => {
        return res;
    });
    return res;
};
const CategoryService = {
    getAllCategory,
};

export default CategoryService;
