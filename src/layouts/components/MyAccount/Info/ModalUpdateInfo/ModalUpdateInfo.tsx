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
    FormLabel,
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { Form, Formik, FormikProps } from 'formik';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import { updateInfoSchema } from '~/utils/validationSchema';

type ValuesForm = {
    first_name: string;
    last_name: string;
    phone: string;
    birthday: string;
    gender: string;
};

const initCheckoutForm = {
    first_name: '',
    last_name: '',
    phone: '',
    birthday: '',
    gender: 'Nam',
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
                <Formik
                    initialValues={initCheckoutForm}
                    validationSchema={updateInfoSchema}
                    onSubmit={(values: ValuesForm) => handleSubmitForm(values)}
                >
                    {(formik: FormikProps<ValuesForm>) => (
                        <Form>
                            <ModalContent>
                                <ModalHeader>Cập nhật thông tin cơ bản</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                        <InputField
                                            name="first_name"
                                            placeholder="Nhập họ của bạn"
                                            className="flex-1"
                                            label="Họ"
                                        />
                                        <InputField name="last_name" placeholder="Nhập tên của bạn" label="Tên" />
                                    </div>
                                    <div className="form-group mt-2">
                                        <InputField
                                            type="date"
                                            name="birthday"
                                            placeholder="Ngày sinh"
                                            label="Ngày sinh"
                                        />
                                    </div>
                                    <div className="form-group mt-2">
                                        <InputField
                                            type="text"
                                            name="phone"
                                            placeholder="Nhập số điện thoại của bạn"
                                            label="Số điện thoại"
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <FormLabel>Giới tính</FormLabel>
                                        <div className=" flex gap-2">
                                            <RadioField label="Nam" name="gender" value="Nam" id="gender-3" />
                                            <RadioField label="Nữ" name="gender" value="Nữ" id="gender-4" />
                                            <RadioField label="Khác" name="gender" value="Khác" id="gender-5" />
                                        </div>
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
