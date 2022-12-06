import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { FiEdit3 } from 'react-icons/fi';
import { useAppSelector } from '~/app/hooks';
import { getUser } from '~/features/user/userSlice';
import { InputField } from '~/layouts/components/CustomField';
import { AuthService } from '~/services';
import { ResponseType } from '~/utils/Types';
import { updateAccountSchema } from '~/utils/validationSchema';
type ValuesForm = {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

const initCheckoutForm = {
    password: '',
    newPassword: '',
    confirmPassword: '',
};
const ModalUpdateAccount = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const infoUser: any = useAppSelector(getUser);
    const toast = useToast();

    const handleSubmitForm = (values: ValuesForm) => {
        let dataPost = {
            ...values,
            username: infoUser.email,
        };

        AuthService.updatePassword(dataPost).then((res: ResponseType) => {
            console.log('res: ', res);
            if (res.statusCode === 201) {
                toast({
                    position: 'top-right',
                    title: 'Đổi mật khẩu thành công',
                    duration: 2000,
                    status: 'success',
                });
                onClose();
            } else {
                toast({
                    position: 'top-right',
                    title: 'Mật khẩu cũ không chính xác',
                    duration: 2000,
                    status: 'warning',
                });
            }
        });
    };
    return (
        <>
            <Button onClick={onOpen} colorScheme="teal">
                <FiEdit3 />
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <Formik
                    initialValues={initCheckoutForm}
                    validationSchema={updateAccountSchema}
                    onSubmit={(values: ValuesForm) => handleSubmitForm(values)}
                >
                    {(formik: FormikProps<ValuesForm>) => (
                        <Form>
                            <ModalContent>
                                <ModalHeader>Cập nhật thông tin tài khoản</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <div className="form-group">
                                        <InputField
                                            name="password"
                                            type="password"
                                            label="Mật khẩu cũ"
                                            placeholder="Mật khẩu cũ"
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="form-group my-2">
                                        <InputField
                                            label="Mật khẩu mới"
                                            name="newPassword"
                                            type="password"
                                            placeholder="Mật khẩu mới"
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <InputField
                                            label="Xác nhận mật khẩu mới"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Xác nhận mật khẩu mới"
                                            className="flex-1"
                                        />
                                    </div>
                                </ModalBody>

                                <ModalFooter>
                                    <Button variant="ghost" mr={3} onClick={onClose}>
                                        Đóng
                                    </Button>
                                    <Button colorScheme="blue" type="submit">
                                        Cập nhật
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default ModalUpdateAccount;
