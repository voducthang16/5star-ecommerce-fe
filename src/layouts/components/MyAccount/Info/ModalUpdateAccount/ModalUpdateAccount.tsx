import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { Form, Formik, FormikProps } from 'formik';
import { InputField } from '~/layouts/components/CustomField';
type ValuesForm = {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
};

const initCheckoutForm = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
};
const ModalUpdateAccount = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmitForm = (values: ValuesForm) => {
        console.log(values);
    };
    return (
        <>
            <Button onClick={onOpen} colorScheme="teal">
                <FiEdit3 />
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <Formik initialValues={initCheckoutForm} onSubmit={(values: ValuesForm) => handleSubmitForm(values)}>
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
                                            name="confirmNewPassword"
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
