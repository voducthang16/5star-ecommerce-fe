import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
import { LoginType, RegisterType } from '~/utils/Types';

let url: string = 'auth';

const signIn = (data: LoginType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/login', data);
};

const Login = (data: RegisterType) => {
    return AxiosInstance.post(Config.apiUrl + 'internalaccount', data);
};

const AuthService = {
    signIn,
    Login,
};

export default AuthService;
