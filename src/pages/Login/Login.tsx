import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { FiUserCheck } from 'react-icons/fi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdOutlineFacebook } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import images from '~/assets/images';
import Image from '~/components/Image';
import Logo from '~/components/Logo';
import { addUser } from '~/features/user/userSlice';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import { LoginType, ResponseType } from '~/utils/Types';
import { LoginSchema } from '~/utils/validationSchema';
import './Login.scss';

const initLoginForm = {
    username: '',
    password: '',
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    // END STATE
    const dispatch = useAppDispatch();
    const Navigate = useNavigate();
    const toast = useToast();

    // HANDLE LOGIC
    const handleSubmitLogin = (values: LoginType) => {
        AuthService.signIn(values).then(
            (res: ResponseType) => {
                if (res.statusCode === 200) {
                    let accessToken = res?.data?.accessToken;
                    if (accessToken) {
                        localStorage.setItem('access_token', accessToken);
                        Navigate('/');
                        dispatch(addUser(res?.data?.user_info.profile));
                        toast({
                            position: 'top-right',
                            title: 'Đăng nhập thành công',
                            duration: 1000,
                            status: 'success',
                        });
                    }
                } else {
                    toast({
                        position: 'top-right',
                        title: 'Đăng nhập thất bại',
                        duration: 1000,
                        status: 'error',
                    });
                }
            },
            (err) => {
                console.log(err);
            },
        );
    };

    const responseFacebook = (response: any) => {
        const { userID, accessToken } = response;
        if (accessToken && userID) {
            let dataPost = {
                uid: userID,
                token: accessToken,
            };
            AuthService.LoginFacebook(dataPost).then((res: ResponseType) => {
                if (res.statusCode === 200) {
                    let accessToken = res?.data?.accessToken;
                    if (accessToken) {
                        localStorage.setItem('access_token', accessToken);
                        Navigate('/');
                        dispatch(addUser(res?.data?.user_info));
                        toast({
                            position: 'top-right',
                            title: 'Đăng nhập thành công',
                            duration: 1000,
                            status: 'success',
                        });
                    }
                } else {
                    toast({
                        position: 'top-right',
                        title: 'Đăng nhập thất bại',
                        duration: 1000,
                        status: 'error',
                    });
                }
            });
        }
    };

    const responseGoogle = (response: any) => {
        const { credential } = response;
        if (credential) {
            AuthService.LoginGoogle({ token: credential }).then((res: ResponseType) => {
                console.log(res);
                if (res.statusCode === 200) {
                    let accessToken = res?.data?.accessToken;
                    if (accessToken) {
                        localStorage.setItem('access_token', accessToken);
                        Navigate('/');
                        dispatch(addUser(res?.data?.user_info));
                        toast({
                            position: 'top-right',
                            title: 'Đăng nhập thành công',
                            duration: 1000,
                            status: 'success',
                        });
                    }
                } else {
                    toast({
                        position: 'top-right',
                        title: 'Đăng nhập thất bại',
                        duration: 1000,
                        status: 'error',
                    });
                }
            });
        }
    };
    const HandleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center h-screen overflow-x-hidden">
            <div className="hidden w-full max-h-screen bg-primary md:flex justify-center items-center">
                <div className="shape-animations">
                    <div className="shape-1 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"></div>
                </div>
                <div className="md:px-[32px] z-10 relative">
                    <Image src={images.vector_login} alt="" className="w-[80%] m-auto" />
                </div>
            </div>
            <div className="login-form bg-primary md:bg-[#f8f8f8] md:w-full w-full h-full">
                <div className="form m-auto h-full flex items-center justify-center flex-col w-full">
                    <div className="card login p-4 md:bg-transparent lg:w-2/4 w-3/4">
                        <div className="login-top m-autoflex flex-col items-center my-4">
                            <div className="logo my-5 flex items-center justify-center">
                                <Logo />
                            </div>
                            <div className="login-text my-5 m-auto">
                                <h1 className="title font-bold text-3xl text-center my-5">Đăng nhập</h1>
                                <p className="text-primary font-semibold text-center text-lg">
                                    Chào mừng bạn đến với 5Star
                                </p>
                            </div>
                        </div>
                        <Formik
                            initialValues={initLoginForm}
                            validationSchema={LoginSchema}
                            onSubmit={(values: LoginType) => handleSubmitLogin(values)}
                        >
                            {(formik: FormikProps<LoginType>) => (
                                <Form className=" max-w-[400px] m-auto">
                                    <div className="form-group">
                                        <InputFieldIcon
                                            type="text"
                                            name="username"
                                            size="md"
                                            icon={<FiUserCheck />}
                                            borderRadius="10px"
                                            paddingY={7}
                                            placeholder="Nhập email của bạn.."
                                        />
                                    </div>
                                    <div className="form-group my-3">
                                        <FormControl>
                                            <Field name="password">
                                                {(props: any) => {
                                                    const { field, meta } = props;
                                                    return (
                                                        <>
                                                            <InputGroup>
                                                                <InputLeftElement
                                                                    pointerEvents="none"
                                                                    height="100%"
                                                                    left="5px"
                                                                    fontWeight="bold"
                                                                    fontSize="20px"
                                                                    color="#636e72"
                                                                    children={<RiLockPasswordLine />}
                                                                />
                                                                <Input
                                                                    {...field}
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    name="password"
                                                                    borderRadius="10px"
                                                                    paddingY={7}
                                                                    placeholder="Nhập mật khẩu.."
                                                                    borderRight="2px solid var(--primary)"
                                                                    className={`${
                                                                        meta.touched && meta.error && 'is-invalid'
                                                                    }`}
                                                                />
                                                                <InputRightElement
                                                                    height="100%"
                                                                    right="10px"
                                                                    fontWeight="bold"
                                                                    fontSize="20px"
                                                                >
                                                                    <Button
                                                                        h="1.75rem"
                                                                        size="sm"
                                                                        fontSize="lg"
                                                                        onClick={HandleTogglePassword}
                                                                    >
                                                                        {showPassword ? <HiEyeOff /> : <HiEye />}
                                                                    </Button>
                                                                </InputRightElement>
                                                            </InputGroup>

                                                            <ErrorMessage
                                                                component="div"
                                                                name={field.name}
                                                                className="error-validate"
                                                            />
                                                        </>
                                                    );
                                                }}
                                            </Field>
                                        </FormControl>
                                    </div>
                                    <div className="forgot-box flex justify-between">
                                        {/* <Field name="rememberPassword">
                                            {(props: any) => {
                                                const { field } = props;
                                                return <Checkbox {...field}>Nhớ mật khẩu</Checkbox>;
                                            }}
                                        </Field> */}
                                        <div className="forgot text-primary text-base font-semibold">
                                            <Link to="/forgot-password">Quên mật khẩu ?</Link>
                                        </div>
                                    </div>
                                    <div className="button-action w-full mt-5">
                                        <Button type="submit" colorScheme="twitter" className="w-full py-6">
                                            Đăng nhập
                                        </Button>
                                    </div>
                                    <div className="login-other mt-3">
                                        <p className="text-base text-tbase">Hoặc đăng nhập với :</p>
                                        <div className="login-social flex gap-2 grid-cols-2 w-full flex-wrap md:flex-nowrap">
                                            <div className="facebook w-full">
                                                <FacebookLogin
                                                    appId="694046029102732"
                                                    fields="name,email,picture"
                                                    callback={responseFacebook}
                                                    render={(renderProps: any) => {
                                                        return (
                                                            <Button
                                                                colorScheme="facebook"
                                                                width="100%"
                                                                onClick={renderProps.onClick}
                                                            >
                                                                <MdOutlineFacebook className="text-xl mx-1" /> Facebook
                                                            </Button>
                                                        );
                                                    }}
                                                ></FacebookLogin>
                                            </div>
                                            <div className="google w-full">
                                                <GoogleOAuthProvider clientId="256312378406-ddmilb0u3on67nqau1aat7ci6c53q9t6.apps.googleusercontent.com">
                                                    <GoogleLogin onSuccess={responseGoogle} />
                                                    {/* <Button colorScheme="red" width="100%" onClick={responseGoogle}>
                                                    <AiOutlineGooglePlus className="text-xl mx-1" /> Google
                                                </Button> */}
                                                </GoogleOAuthProvider>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sign-up mt-3 text-right">
                                        <p className="text-base">
                                            Nếu bạn chưa có tài khoản ? <br />
                                            <Link to="/register" className="text-primary font-semibold underline ml-2">
                                                Hãy đăng ký
                                            </Link>
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
