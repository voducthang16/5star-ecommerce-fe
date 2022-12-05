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
    Input,
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { Form, Formik, FormikProps } from 'formik';
import { InputField } from '~/layouts/components/CustomField';
import { BsPlus } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import CartService from '~/services/CartService';

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

const ModalAddAddress = () => {
    const [city, setCity] = useState([]);
    const [cityName, setCityName] = useState('');
    const [district, setDistrict] = useState([]);
    const [districtName, setDistrictName] = useState('');
    const [ward, setWard] = useState([]);
    const [wardName, setWardName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

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
        console.log(values);
        console.log(districtName);
    };
    return (
        <>
            <Button rightIcon={<BsPlus />} onClick={onOpen} colorScheme="teal" variant="outline">
                Thêm địa chỉ
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
                                                const element = document.querySelectorAll(
                                                    "input[name='type_ship']",
                                                ) as any;
                                                element.forEach((item: any) => {
                                                    if (item.checked) {
                                                        item.checked = false;
                                                    }
                                                });
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
                                        <FormLabel>Địa chỉ cụ thể</FormLabel>
                                        <Input
                                            name="address"
                                            type="text"
                                            placeholder="Ví dụ: 200 Ấp Hòa Thới"
                                            className="flex-1"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <Input
                                            name="phone"
                                            type="text"
                                            placeholder="Số điện thoại của bạn"
                                            className="flex-1"
                                            onChange={(e) => setPhone(e.target.value)}
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

export default ModalAddAddress;
