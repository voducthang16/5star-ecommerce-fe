import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'blog';

const GetBlogs = (page: number = 0, perPage: number = 9) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}&status=1`);
};

const GetAllBlogs = ({ page = 0, perPage = 9, title = '', orderBy = '', type = 'ASC' }: any) => {
    return AxiosInstance.get(
        Config.apiUrl +
            url +
            `?page=${page}&perPage=${perPage}&title=${title}&status=1&orderBy=${orderBy}&orderType=${type}`,
    );
};

const getBlogDetail = (slug: any) => {
    return AxiosInstance.get(Config.apiUrl + url + `/${slug}`);
};

const searchBlog = (keyword: string) => {
    return AxiosInstance.get(Config.apiUrl + url + `?title=${keyword}`);
};

const BlogService = {
    GetBlogs,
    getBlogDetail,
    GetAllBlogs,
    searchBlog,
};

export default BlogService;
