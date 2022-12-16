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
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getOneInfoUser, getUser } from '~/features/user/userSlice';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import CartService from '~/services/CartService';
import UserService from '~/services/UserService';
import { ResponseType } from '~/utils/Types';

type ValuesForm = {
    phone: number;
    address: string;
    isDefault: boolean;
};

const initCheckoutForm = {
    address: '',
    phone: 0,
    isDefault: false,
};

const ModalAddAddress = () => {
    const [city, setCity] = useState([]);
    const [cityName, setCityName] = useState<any>({});
    const [district, setDistrict] = useState([]);
    const [districtName, setDistrictName] = useState<any>({});
    const [ward, setWard] = useState([]);
    const [wardName, setWardName] = useState<any>({});

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useAppDispatch();
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
        console.log('values: ', values);
        if (!districtName || !cityName || !wardName) {
            toast({
                position: 'top-right',
                title: 'Vui lòng chọn địa chỉ phù hợp',
                duration: 1000,
                status: 'warning',
            });
        } else {
            let idAddress = Object.keys(infoUser?.address).length !== 0 ? infoUser?.address.length + 1 : 1;
            let dataSendRequest: any = [];
            if (values.isDefault && Object.keys(infoUser?.address).length !== 0) {
                infoUser?.address?.forEach((item: any) => {
                    item.isDefault = false;
                    dataSendRequest.push(item);
                });
            }
            let data = {
                id: idAddress,
                districtName,
                cityName,
                wardName,
                address: values.address,
                phone: values.phone,
                isDefault: Boolean(values.isDefault),
            };
            dataSendRequest.push(data);

            UserService.UpdateUser({ address: dataSendRequest }, infoUser.id).then((res: ResponseType) => {
                if (res.statusCode === 200) {
                    dispatch(getOneInfoUser(infoUser.id));
                    onClose();
                    toast({
                        position: 'top-right',
                        title: 'Thêm địa chỉ thành công',
                        duration: 1000,
                        status: 'success',
                    });
                }
            });
        }
    };
    return (
        <>
            <Button rightIcon={<BsPlus />} onClick={onOpen} colorScheme="teal" variant="outline">
                Thêm địa chỉ
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <Formik
                    initialValues={initCheckoutForm}
                    onSubmit={(values: ValuesForm) => handleSubmitForm(values)}
                    // validationSchema={updateAddressAccountSchema}
                >
                    {(formik: FormikProps<ValuesForm>) => (
                        <Form>
                            <ModalContent>
                                <ModalHeader>Thêm địa chỉ giao hàng</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <div className="flex justify-between space-x-4">
                                        <select
                                            className="border border-slate-200 w-1/3 p-2 outline-none rounded-lg"
                                            onChange={(e) => {
                                                setCityName({
                                                    name: e.target.options[e.target.selectedIndex].id,
                                                    code: +e.target.value,
                                                });
                                                setDistrict([]);
                                                setWard([]);
                                                setDistrictName('');
                                                setWardName('');
                                                getDistrict(+e.target.value);
                                            }}
                                        >
                                            <option hidden>Tỉnh, Thành Phố</option>
                                            {city?.map((item: any, index) => (
                                                <option key={index} value={item.code} id={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            onChange={(e) => {
                                                setDistrictName({
                                                    name: e.target.options[e.target.selectedIndex].id,
                                                    code: +e.target.value,
                                                });
                                                setWard([]);
                                                setWardName('');
                                                getWard(+e.target.value);
                                            }}
                                            className="border border-slate-200 w-1/3 p-2 outline-none rounded-lg"
                                        >
                                            <option hidden>Quận, Huyện</option>
                                            {district?.map((item: any, index) => (
                                                <option key={index} value={item.code} id={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            onChange={(e) => {
                                                setWardName({
                                                    name: e.target.options[e.target.selectedIndex].id,
                                                    code: +e.target.value,
                                                });
                                            }}
                                            className="border border-slate-200 w-1/3 p-2 outline-none rounded-lg"
                                        >
                                            <option hidden>Xã, Phường</option>
                                            {ward?.map((item: any, index) => (
                                                <option key={index} value={item.code} id={item.name}>
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
                                    <div className="form-group mt-3">
                                        <div className="flex gap-2">
                                            <RadioField
                                                label="Mặc định"
                                                name="isDefault"
                                                value="true"
                                                id="isDefault-3"
                                            />
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

export default ModalAddAddress;
