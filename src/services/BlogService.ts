import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'blog';

const GetBlogs = (page: number = 0, perPage: number = 9) => {
    return AxiosInstance.get(Config.apiUrl + url + `?page=${page}&perPage=${perPage}&status=1`);
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
    searchBlog,
};

export default BlogService;
