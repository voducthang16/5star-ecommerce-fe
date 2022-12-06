import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { FiUserCheck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import Logo from '~/components/Logo';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import './ForgotPassword.scss';

const initLoginForm = {
    email: '',
};

const ForgotPassword = () => {
    const Navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = (values: any) => {
        AuthService.ForgotPassword(values).then((res: any) => {
            if (res.statusCode === 201) {
                toast({
                    position: 'top-right',
                    title: 'Vui lòng kiểm tra email !',
                    duration: 2000,
                    status: 'success',
                });
                localStorage.setItem('emailActive', values.email);
                Navigate('/new-password');
            } else {
                toast({
                    position: 'top-right',
                    title: 'Email không tồn tại !',
                    description: 'Vui lòng thử lại',
                    duration: 2000,
                    status: 'error',
                });
            }
        });
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
                                <h1 className="title font-bold text-3xl text-center my-5">Quên mật khẩu</h1>
                            </div>
                        </div>
                        <Formik initialValues={initLoginForm} onSubmit={(values: any) => handleSubmit(values)}>
                            {(formik: FormikProps<any>) => (
                                <Form className=" max-w-[400px] m-auto">
                                    <div className="form-group">
                                        <InputFieldIcon
                                            type="text"
                                            name="email"
                                            size="md"
                                            icon={<FiUserCheck />}
                                            borderRadius="10px"
                                            paddingY={7}
                                            placeholder="Nhập email của bạn.."
                                        />
                                    </div>

                                    <div className="button-action w-full my-3">
                                        <Button type="submit" colorScheme="twitter" className="w-full py-6">
                                            Lấy lại mật khẩu
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

export default ForgotPassword;
