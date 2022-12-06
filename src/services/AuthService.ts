import Config from '~/config';
import AxiosInstance from '~/utils/AxiosInstance';
import { LoginType, RegisterType } from '~/utils/Types';

let url: string = 'auth';

const signIn = (data: LoginType) => {
    return AxiosInstance.post(Config.apiUrl + url + '/login', data);
};

const Register = (data: RegisterType) => {
    return AxiosInstance.post(Config.apiUrl + 'internalaccount', data);
};

const ActiveAccount = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + 'internalaccount/active', data);
};

const ReActiveAccount = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + 'internalaccount/get-active', data);
};

const ForgotPassword = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + 'internalaccount/forgot-password', data);
};

const ResetPassword = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + 'internalaccount/reset-password', data);
};

const updatePassword = (data: any) => {
    return AxiosInstance.post(Config.apiUrl + 'internalaccount/update-password', data);
};

const AuthService = {
    signIn,
    Register,
    ActiveAccount,
    ReActiveAccount,
    ForgotPassword,
    ResetPassword,
    updatePassword,
};

export default AuthService;
