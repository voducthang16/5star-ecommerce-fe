import {
    Button,
    Checkbox,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { AiOutlineGooglePlus } from 'react-icons/ai';
import { FiUserCheck } from 'react-icons/fi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdOutlineFacebook } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

import Image from '~/components/Image';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
type ValuesForm = {
    username: string;
    password: string;
    rememberPassword: boolean;
};

const initLoginForm = {
    username: '',
    password: '',
    rememberPassword: false,
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmitLogin = (values: ValuesForm) => {
        console.log(values);
    };

    const HandleTogglePassword = () => {
        console.log('click');

        setShowPassword(!showPassword);
    };
    console.log(showPassword);

    return (
        <div className="flex justify-center h-screen">
            <div className="backgroud hidden w-full max-h-screen bg-primary md:flex justify-center items-center">
                <div className="md:px-[32px]">
                    <Image src={images.vector_login} alt="" />
                </div>
            </div>
            <div className="login-form bg-primary md:bg-[#f8f8f8] md:w-full w-full md:h-full">
                <div className="form m-auto h-full flex items-center justify-center flex-col w-full">
                    <div className="card login p-4 md:bg-transparent lg:w-2/4 w-3/4">
                        <div className="login-top m-autoflex flex-col items-center my-4">
                            <div className="logo my-5 flex items-center justify-center">
                                <img
                                    src="https://themes.pixelstrap.com/fastkart/assets/images/logo/1.png"
                                    alt=""
                                    width="200px"
                                />
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
                            onSubmit={(values: ValuesForm) => handleSubmitLogin(values)}
                        >
                            {(formik: FormikProps<ValuesForm>) => (
                                <Form className=" max-w-[400px] m-auto">
                                    <div className="form-group">
                                        <InputFieldIcon
                                            type="text"
                                            name="username"
                                            size="md"
                                            icon={<FiUserCheck />}
                                            borderRadius="10px"
                                            paddingY={7}
                                            placeholder="Tên đăng nhập.."
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
                                                                className="error w-full text-left"
                                                            />
                                                        </>
                                                    );
                                                }}
                                            </Field>
                                        </FormControl>
                                    </div>
                                    <div className="forgot-box flex justify-between">
                                        <Field name="rememberPassword">
                                            {(props: any) => {
                                                const { field } = props;
                                                return <Checkbox {...field}>Nhớ mật khẩu</Checkbox>;
                                            }}
                                        </Field>
                                        <div className="forgot text-primary text-base font-semibold">
                                            <Link to="">Quên mật khẩu ?</Link>
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
                                                <Button colorScheme="facebook" width="100%">
                                                    <MdOutlineFacebook className="text-xl mx-1" /> Facebook
                                                </Button>
                                            </div>
                                            <div className="google w-full">
                                                <Button colorScheme="red" width="100%">
                                                    <AiOutlineGooglePlus className="text-xl mx-1" /> Google
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sign-up mt-3 text-right">
                                        <p className="text-base">
                                            Nếu bạn chưa có tài khoản ? <br />
                                            <Link to="" className="text-primary font-semibold underline ml-2">
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
