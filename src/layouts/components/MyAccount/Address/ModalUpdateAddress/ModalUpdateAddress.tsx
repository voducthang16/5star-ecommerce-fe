import {
    Button,
    FormLabel,
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
import { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useAppSelector } from '~/app/hooks';
import { getUser } from '~/features/user/userSlice';
import { InputField } from '~/layouts/components/CustomField';
import CartService from '~/services/CartService';
import UserService from '~/services/UserService';
import { ResponseType } from '~/utils/Types';
import { updateAddressAccountSchema } from '~/utils/validationSchema';

type ValuesForm = {
    phone: number;
    address: string;
};

const initCheckoutForm = {
    address: '',
    phone: 0,
};

const ModalUpdateAddress = ({ children }: any) => {
    const [city, setCity] = useState([]);
    const [cityName, setCityName] = useState('');
    const [district, setDistrict] = useState([]);
    const [districtName, setDistrictName] = useState('');
    const [ward, setWard] = useState([]);
    const [wardName, setWardName] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const infoUser: any = useAppSelector(getUser);

    useEffect(() => {
        CartService.getCity()
            .then((res) => setCity(res.data))
            .catch((err) => console.log(err));
    }, []);
    const getDistrict = (cityId: number) => {
        CartService.getDistrict(cityId)
            .then((res) => setDistrict(res.data.districts))
            .catch((err) => console.log(err));
    };
    const getWard = (districtId: number) => {
        CartService.getWard(districtId)
            .then((res) => setWard(res.data.wards))
            .catch((err) => console.log(err));
    };

    const handleSubmitForm = (values: ValuesForm) => {
        if (!districtName || !cityName || !wardName) {
            toast({
                position: 'top-right',
                title: 'Vui lòng chọn địa chỉ phù hợp',
                duration: 1000,
                status: 'warning',
            });
        } else {
            let dataSendRequest = {
                address: {
                    districtName,
                    cityName,
                    wardName,
                    address: values.address,
                    phone: values.phone,
                    isDefault: false,
                },
            };

            UserService.UpdateUser(dataSendRequest, infoUser.id).then((res: ResponseType) => {
                console.log(res);
            });
        }
    };
    return (
        <>
            <Button onClick={onOpen} p={1} className="p-2 rounded-md border" colorScheme="blue">
                {children}
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <Formik
                    initialValues={initCheckoutForm}
                    onSubmit={(values: ValuesForm) => handleSubmitForm(values)}
                    validationSchema={updateAddressAccountSchema}
                >
                    {(formik: FormikProps<ValuesForm>) => (
                        <Form>
                            <ModalContent>
                                <ModalHeader>Cập nhật địa chỉ giao hàng</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <div className="flex justify-between space-x-4">
                                        <select
                                            className="border border-slate-200 w-1/3 p-2 outline-none rounded-lg"
                                            onChange={(e) => {
                                                setCityName(e.target.options[e.target.selectedIndex].text);
                                                setDistrict([]);
                                                setWard([]);
                                                setDistrictName('');
                                                setWardName('');
                                                getDistrict(+e.target.value);
                                            }}
                                        >
                                            <option hidden>Tỉnh, Thành Phố</option>
                                            {city?.map((item: any, index) => (
                                                <option key={index} value={item.code}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            onChange={(e) => {
                                                setDistrictName(e.target.options[e.target.selectedIndex].text);
                                                setWard([]);
                                                setWardName('');
                                                getWard(+e.target.value);
                                            }}
                                            className="border border-slate-200 w-1/3 p-2 outline-none rounded-lg"
                                        >
                                            <option hidden>Quận, Huyện</option>
                                            {district?.map((item: any, index) => (
                                                <option key={index} value={item.code}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            onChange={(e) => {
                                                setWardName(e.target.options[e.target.selectedIndex].text);
                                            }}
                                            className="border border-slate-200 w-1/3 p-2 outline-none rounded-lg"
                                        >
                                            <option hidden>Xã, Phường</option>
                                            {ward?.map((item: any, index) => (
                                                <option key={index} value={item.code}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <InputField
                                            name="address"
                                            type="text"
                                            label="Địa chỉ cụ thể"
                                            placeholder="Ví dụ: 200 Ấp Hòa Thới"
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <InputField
                                            name="phone"
                                            label="Số điện thoại"
                                            type="text"
                                            placeholder="Số điện thoại của bạn"
                                            className="flex-1"
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

export default ModalUpdateAddress;
