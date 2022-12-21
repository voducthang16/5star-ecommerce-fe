import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
let url: string = 'comment';

const GetComment = (id: any) => {
    return AxiosInstance.get(Config.apiUrl + 'blog/' + id + '/comment');
};

const PostComment = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const BlogService = {
    GetComment,
    PostComment,
};

export default BlogService;
