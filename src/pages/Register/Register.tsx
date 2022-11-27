import { Button, FormControl, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FiUserCheck } from 'react-icons/fi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import Logo from '~/components/Logo';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import './Register.scss';
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

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmitLogin = (values: ValuesForm) => {
        console.log(values);
    };

    const HandleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center h-screen overflow-x-hidden">
            <div className="backgroud hidden w-full max-h-screen bg-primary md:flex justify-center items-center">
                <div className="shape-animations">
                    <div className="shape-1 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px]"></div>
                </div>
                <div className="md:px-[32px] z-10 relative">
                    <Image src={images.vector_register} alt="" className="w-[80%] m-auto" />
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
                                <h1 className="title font-bold text-3xl text-center my-5">Đăng ký</h1>
                                <p className="text-primary font-semibold text-center text-lg">
                                    Hãy đăng ký và thưởng thức
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
                                        <InputFieldIcon
                                            type="text"
                                            name="fullname"
                                            size="md"
                                            icon={<BiUserCircle />}
                                            borderRadius="10px"
                                            paddingY={7}
                                            placeholder="Họ tên đầy đủ.."
                                        />
                                    </div>
                                    <div className="form-group my-3 password">
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
                                    <div className="form-group my-3 password">
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
                                                                    children={<RiLockPasswordFill />}
                                                                />
                                                                <Input
                                                                    {...field}
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    name="password"
                                                                    borderRadius="10px"
                                                                    paddingY={7}
                                                                    placeholder="Xác nhận nmật khẩu.."
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
                                    <div className="forgot-box flex justify-end">
                                        <div className="forgot text-primary text-base font-semibold">
                                            <Link to="">Quên mật khẩu ?</Link>
                                        </div>
                                    </div>
                                    <div className="button-action w-full mt-5">
                                        <Button type="submit" colorScheme="twitter" className="w-full py-6">
                                            Đăng ký
                                        </Button>
                                    </div>
                                    <div className="sign-up mt-3 text-right">
                                        <p className="text-base">
                                            Nếu bạn đã có tài khoản ? <br />
                                            <Link to="/login" className="text-primary font-semibold underline ml-2">
                                                Hãy đăng nhập
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

export default Register;
