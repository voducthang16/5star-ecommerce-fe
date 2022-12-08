import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
import { ResponseType } from '~/utils/Types';
let url: string = 'category';

const getAllCategory = async () => {
    let res = await AxiosInstance.get(Config.apiUrl + url).then((res: ResponseType) => {
        return res;
    });
    return res;
};

const getOneCategory = (slug: string) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + slug);
};

const getCategoryParent = async () => {
    try {
        let resCategory: any = await AxiosInstance.get(Config.apiUrl + url);
        let dataCategory: any = [];
        if (resCategory.statusCode === 200) {
            for (let category of resCategory.data[0]) {
                if (!category.parent_id) {
                    dataCategory.push(category);
                }
            }
            return dataCategory;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCategoryNoParent = async () => {
    let resCategory: any = await AxiosInstance.get(Config.apiUrl + url);
    let dataCategory: any = [];
    if (resCategory.statusCode === 200) {
        for (let category of resCategory.data[0]) {
            if (category.parent_id) {
                dataCategory.push(category);
            }
        }
    }

    return dataCategory;
};
const CategoryService = {
    getAllCategory,
    getOneCategory,
    getCategoryParent,
    getCategoryNoParent,
};

export default CategoryService;
