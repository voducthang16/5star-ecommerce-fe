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
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getOneInfoUser, getUser } from '~/features/user/userSlice';
import { InputField, RadioField } from '~/layouts/components/CustomField';
import CartService from '~/services/CartService';
import UserService from '~/services/UserService';
import { ResponseType } from '~/utils/Types';
import { updateAddressAccountSchema } from '~/utils/validationSchema';

type ValuesForm = {
    phone: number;
    address: string;
    isDefault: boolean;
};

let initCheckoutForm = {
    address: '',
    phone: 0,
    isDefault: false,
};

const ModalUpdateAddress = ({ children, id }: any) => {
    const [city, setCity] = useState([]);
    const [cityName, setCityName] = useState<any>();
    const [district, setDistrict] = useState([]);
    const [districtName, setDistrictName] = useState<any>();
    const [ward, setWard] = useState([]);
    const [wardName, setWardName] = useState<any>();

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

    const handleOpenUpdate = () => {
        onOpen();
        infoUser?.address.forEach((adr: any) => {
            if (id === adr.id) {
                setCityName({ code: +adr?.cityName?.code });
                getDistrict(+adr?.cityName?.code);
                setDistrictName({ code: +adr?.districtName?.code });
                getWard(+adr?.districtName?.code);
                setWardName({ code: +adr?.wardName?.code });
                initCheckoutForm.phone = adr.phone;
                initCheckoutForm.address = adr.address;
                initCheckoutForm.isDefault = adr.isDefault;
            }
        });
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
            let idAddress = infoUser?.address !== '{}' ? infoUser?.address.length + 1 : 1;
            let dataSendRequest: any = [];
            if (values.isDefault && Object.keys(infoUser?.address).length !== 0) {
                infoUser?.address.forEach((item: any) => {
                    item.isDefault = false;
                    if (item.id === id) {
                        let addressUpdate = {
                            id: idAddress,
                            districtName,
                            cityName,
                            wardName,
                            address: values.address,
                            phone: values.phone,
                            isDefault: Boolean(values.isDefault),
                        };
                        dataSendRequest.push(addressUpdate);
                    } else {
                        dataSendRequest.push(item);
                    }
                });
            }

            UserService.UpdateUser({ address: dataSendRequest }, infoUser.id).then((res: ResponseType) => {
                if (res.statusCode === 200) {
                    dispatch(getOneInfoUser(infoUser.id));
                    onClose();
                    console.log('infoUser.id: ', infoUser.id);
                }
            });
        }
    };
    return (
        <>
            <Button onClick={handleOpenUpdate} p={1} className="p-2 rounded-md border" colorScheme="blue">
                {children}
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <Formik
                    initialValues={initCheckoutForm}
                    enableReinitialize={true}
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
                                            value={+cityName?.code}
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
                                            value={+districtName?.code}
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
                                            value={+wardName?.code}
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
                                                value={true}
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

export default ModalUpdateAddress;
