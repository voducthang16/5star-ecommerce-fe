import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
import { LoginType } from '~/utils/Types';

let url: string = 'auth';

const signIn = (data: LoginType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/login', data);
};

const AuthService = {
    signIn,
};

export default AuthService;
