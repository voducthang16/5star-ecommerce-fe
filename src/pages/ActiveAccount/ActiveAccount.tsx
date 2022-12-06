import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { AiOutlineKey } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import Logo from '~/components/Logo';
import InputFieldIcon from '~/layouts/components/CustomField/InputFieldIcon';
import { AuthService } from '~/services';
import { ResponseType } from '~/utils/Types';
import './ActiveAccount.scss';

const initLoginForm = {
    code: '',
};

const ActiveAccount = () => {
    const Navigate = useNavigate();
    const toast = useToast();

    const handleSubmitActive = (values: any) => {
        let email = localStorage.getItem('emailActive');
        if (email) {
            let dataPost = {
                ...values,
                email: email,
            };
            AuthService.ActiveAccount(dataPost).then((res: any) => {
                if (res.statusCode === 201) {
                    toast({
                        position: 'top-right',
                        title: 'Kích hoạt tài khoản thành công !',
                        duration: 2000,
                        status: 'success',
                    });
                    localStorage.removeItem('emailActive');
                    Navigate('/login');
                } else {
                    toast({
                        position: 'top-right',
                        title: 'Sai mã kích hoạt !',
                        description: 'Vui lòng thử lại',
                        duration: 2000,
                        status: 'error',
                    });
                }
            });
        }
    };
    const reSendCode = () => {
        let email = localStorage.getItem('emailActive');
        AuthService.ReActiveAccount({ email }).then((res: ResponseType) => {
            if (res.statusCode === 201) {
                toast({
                    position: 'top-right',
                    title: 'Vui lòng kiểm tra email !',
                    duration: 2000,
                    status: 'success',
                });
            } else {
                toast({
                    position: 'top-right',
                    title: 'Thất bại',
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
                                <h1 className="title font-bold text-3xl text-center my-5">Kích hoạt tài khoản</h1>
                            </div>
                        </div>
                        <Formik initialValues={initLoginForm} onSubmit={(values: any) => handleSubmitActive(values)}>
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
                                            placeholder="Nhập mật mã của bạn.."
                                        />
                                    </div>
                                    <div className="forgot-box flex justify-end my-2">
                                        <div className="forgot text-primary text-base font-semibold">
                                            <p className="cursor-pointer hover:opacity-80" onClick={reSendCode}>
                                                Gửi lại mã
                                            </p>
                                        </div>
                                    </div>
                                    <div className="button-action w-full">
                                        <Button type="submit" colorScheme="twitter" className="w-full py-6">
                                            Kích hoạt
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

export default ActiveAccount;
