import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { AiOutlineKey } from 'react-icons/ai';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import Logo from '~/components/Logo';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import { registerSchema } from '~/utils/validationSchema';
import './NewPassword.scss';

const initNewPassword = {
    code: '',
    newPass: '',
    confirmPass: '',
};

const NewPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    const Navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = (values: any) => {
        let email = localStorage.getItem('emailActive');
        let dataPost = {
            ...values,
            email: email,
        };

        AuthService.ResetPassword(dataPost).then((res: any) => {
            if (res.statusCode === 201) {
                toast({
                    position: 'top-right',
                    title: 'Lấy lại mật khẩu thành công',
                    duration: 2000,
                    status: 'success',
                });
                localStorage.removeItem('emailActive');
                Navigate('/login');
            } else {
                toast({
                    position: 'top-right',
                    title: 'Sai mã kích hoạt',
                    duration: 2000,
                    status: 'error',
                });
            }
        });
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
                            <div className="login-text my-4 m-auto">
                                <h1 className="title font-bold text-3xl text-center my-5">Lấy lại mật khẩu</h1>
                            </div>
                        </div>
                        <Formik initialValues={initNewPassword} onSubmit={(values: any) => handleSubmit(values)}>
                            {(formik: FormikProps<any>) => (
                                <Form className=" max-w-[400px] m-auto">
                                    <div className="form-group">
                                        <InputFieldIcon
                                            type="text"
                                            name="code"
                                            size="md"
                                            icon={<AiOutlineKey />}
                                            borderRadius="10px"
                                            paddingY={7}
                                            placeholder="Nhập mã kích hoạt.."
                                        />
                                    </div>

                                    <div className="form-group my-3 password">
                                        <FormControl>
                                            <Field name="newPass">
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
                                    <div className="form-group my-3 password">
                                        <FormControl>
                                            <Field name="confirmPass">
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
                                                                    type={showConfirmPw ? 'text' : 'password'}
                                                                    borderRadius="10px"
                                                                    paddingY={7}
                                                                    placeholder="Xác nhận mật khẩu.."
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
                                                                        onClick={() => setShowConfirmPw(!showConfirmPw)}
                                                                    >
                                                                        {showConfirmPw ? <HiEyeOff /> : <HiEye />}
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
                                    <div className="button-action w-full mt-5">
                                        <Button type="submit" colorScheme="twitter" className="w-full py-6">
                                            Đổi mật khẩu
                                        </Button>
                                    </div>
                                    <div className="sign-up mt-3 text-right">
                                        <p className="text-base">
                                            <Link to="/login" className="text-primary font-semibold underline ml-2">
                                                Đăng nhập
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

export default NewPassword;
