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
    fullname: string;
    phone: string;
    email: string;
    address: string;
    note: string;
};

const initCheckoutForm = {
    fullname: '',
    phone: '',
    email: '',
    address: '',
    note: '',
};

const ModalUpdateInfo = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmitForm = (values: ValuesForm) => {
        console.log(values);
    };
    return (
        <>
            <Button leftIcon={<FiEdit3 />} onClick={onOpen} colorScheme="teal">
                Cập nhật
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <Formik initialValues={initCheckoutForm} onSubmit={(values: ValuesForm) => handleSubmitForm(values)}>
                    {(formik: FormikProps<ValuesForm>) => (
                        <Form>
                            <ModalContent>
                                <ModalHeader>Cập nhật thông tin cơ bản</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                        <InputField
                                            name="fullname"
                                            placeholder="Họ & tên"
                                            className="flex-1"
                                            label="Họ tên đầy đủ"
                                        />
                                        <InputField name="phone" placeholder="Số điện thoại" label="Số điện thoại" />
                                    </div>
                                    <div className="form-group mt-2">
                                        <InputField
                                            type="email"
                                            name="email"
                                            placeholder="Nhập email của bạn"
                                            label="Email"
                                        />
                                    </div>
                                    <div className="form-group mt-2">
                                        <InputField
                                            type="text"
                                            name="address"
                                            placeholder="Nhập địa chỉ"
                                            label="Địa chỉ"
                                        />
                                    </div>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                                        Đóng
                                    </Button>
                                    <Button variant="ghost" type="submit">
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

export default ModalUpdateInfo;
