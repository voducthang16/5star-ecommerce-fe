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
    useToast,
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { Form, Formik, FormikProps } from 'formik';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import { updateInfoSchema } from '~/utils/validationSchema';
import UserService from '~/services/UserService';
import { ResponseType } from '~/utils/Types';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getOneInfoUser, getUser } from '~/features/user/userSlice';
import { useEffect, useState } from 'react';

type ValuesForm = {
    first_name: string;
    last_name: string;
    phone: string;
    birth_day: string;
    gender: string;
};

let initCheckoutForm = {
    first_name: '',
    last_name: '',
    phone: '',
    birth_day: '',
    gender: 'Nam',
};

const ModalUpdateInfo = () => {
    const [initField, setInitField] = useState<ValuesForm>(initCheckoutForm);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const toast = useToast();

    const infoUser: any = useAppSelector(getUser);

    useEffect(() => {
        let newValue = {
            first_name: infoUser?.first_name || '',
            last_name: infoUser?.last_name || '',
            phone: infoUser?.phone || '',
            birth_day: infoUser?.birth_day || '',
            gender: infoUser?.gender || 'Nam',
        };
        setInitField(newValue);
    }, [infoUser]);

    const handleSubmitForm = (values: ValuesForm) => {
        console.log('values: ', values);
        UserService.UpdateUser(values, infoUser?.id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                dispatch(getOneInfoUser(infoUser?.id));
                onClose();
                toast({
                    position: 'top-right',
                    title: 'Cập nhật thành công',
                    duration: 1000,
                    status: 'success',
                });
            }
        });
    };
    return (
        <>
            <Button leftIcon={<FiEdit3 />} onClick={onOpen} colorScheme="teal">
                Cập nhật
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <Formik
                    initialValues={initField}
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
                                            name="birth_day"
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
