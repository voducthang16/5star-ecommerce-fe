import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';

let url: string = 'user';

const CreateUser = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + url, data);
};

const getUser = (id: number) => {
    return AxiosInstance.get(Config.apiUrl + url + '/' + id);
};

const UpdateUser = (data: any, id: number) => {
    return AxiosInstance.put(Config.apiUrl + url + '/' + id, data);
};

const UserService = {
    CreateUser,
    UpdateUser,
    getUser,
};

export default UserService;
