import * as Yup from 'yup';

// AUTH SCHEMA

export const LoginSchema = () => {
    return Yup.object({
        username: Yup.string().required('Vui lòng điền tên đăng nhập'),
        password: Yup.string().min(6, 'Mật khẩu phải lớn hơn 6 kí tự').required('Vui lòng điền mật khẩu'),
    });
};

export const ForgotPasswordSchema = () => {
    return Yup.object({
        email: Yup.string().email('Please enter correct email').required('Email is required'),
    });
};

export const ResetPasswordChema = () => {
    return Yup.object({
        newPassword: Yup.string().min(6, 'Password must be more than 6 characters').required('Password is required'),
    });
};

export const registerSchema = () => {
    return Yup.object({
        email: Yup.string().trim().required('Vui lòng nhập email').email('Vui lòng nhập email đúng định dạng'),
        password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải lớn hơn 6 kí tự'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
        first_name: Yup.string().required('Vui lòng họ của bạn'),
        last_name: Yup.string().required('Vui lòng tên của bạn'),
    });
};

export const updateInfoSchema = () => {
    return Yup.object({
        first_name: Yup.string().required('Vui lòng nhập họ của bạn'),
        last_name: Yup.string().required('Vui lòng  nhập tên của bạn'),
        birthday: Yup.string().required('Vui lòng nhập ngày sinh của bạn'),
        phone: Yup.string().required('Vui lòng nhập số điện thoại của bạn'),
    });
};

export const updateAccountSchema = () => {
    return Yup.object({
        password: Yup.string().required('Vui lòng nhập mật khẩu cũ').min(6, 'Mật khẩu phải lớn hơn 6 kí tự'),
        newPassword: Yup.string().required('Vui lòng nhập mật khẩu mới').min(6, 'Mật khẩu phải lớn hơn 6 kí tự'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp'),
    });
};
