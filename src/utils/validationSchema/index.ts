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
        username: Yup.string()
            .trim()
            .min(6, 'Username must be more than 6 characters')
            .required('Username is required'),
        email: Yup.string().email('Please enter correct email').required('Email is required'),
        password: Yup.string().required('Password must be more than 6 characters'),
        confirmPasswords: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
};
