import { Button, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import images from '~/assets/images';
import { CodIcon, FastDeliveryIcon, SaveDeliveryIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Config from '~/config';
import { getCart, getCartAsync } from '~/features/cart/cartSlice';
import { getUser } from '~/features/user/userSlice';
import { InputField, TextareaField } from '~/layouts/components/CustomField';
import CartService from '~/services/CartService';
import OrderService from '~/services/OrderService';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import { ResponseType } from '~/utils/Types';
import { orderCartSchema } from '~/utils/validationSchema';
import './Cart.scss';
type ValuesForm = {
    name: string;
    phone: string;
    email: string;
    address: string;
    note: string;
    orderMethod: string;
    payment: string;
};

const initCheckoutForm = {
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    orderMethod: '',
    payment: '',
};

function Cart() {
    const [defaultValue, setDefaultValue] = useState<any>(initCheckoutForm);
    const [city, setCity] = useState([]);
    const [cityName, setCityName] = useState<any>();
    const [district, setDistrict] = useState([]);
    const [districtName, setDistrictName] = useState<any>();
    const [ward, setWard] = useState([]);
    const [wardName, setWardName] = useState<any>();
    const [typeShip, setTypeShip] = useState('');
    const [fee, setFee] = useState(0);

    const dispatch = useAppDispatch();
    const Navigate = useNavigate();
    const toast = useToast();
    const listCart = useAppSelector(getCart);
    const infoUser: any = useAppSelector(getUser);
    console.log('listCart: ', listCart);

    const totalMoney = listCart.reduce((a: any, b: any) => a + b.price, 0);

    const handleRemoveCart = (id: number) => {
        CartService.deleteCart(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                dispatch(getCartAsync());
            }
        });
    };

    const handlePatchValueOrder = () => {
        let name = infoUser?.first_name + ' ' + infoUser?.last_name;
        infoUser?.address.forEach((item: any) => {
            if (item.isDefault) {
                const { address, cityName, wardName, districtName, phone } = item;
                console.log('cityName: ', cityName);
                setCityName(cityName);
                getDistrict(cityName?.code);
                setDistrictName(districtName);
                getWard(districtName?.code);
                setWardName(wardName);
                let email = infoUser.email;
                let newDefaultValues = { name, email, address, cityName, wardName, districtName, phone };
                setDefaultValue(newDefaultValues);
            }
        });
    };

    useEffect(() => {
        handlePatchValueOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoUser]);

    const changeQuantityCart = (e: any, idStock: number, currentQuantity: number, image: string) => {
        let quantity = +e.target.value;
        let newQuantity = quantity - currentQuantity;
        if (idStock && quantity) {
            let dataSendRequest: any = {
                id_product: idStock,
                quantity: newQuantity,
                image,
            };
            CartService.addToCart(dataSendRequest).then((res: ResponseType) => {
                dispatch(getCartAsync());
            });
        }
    };

    const changeQuantityBtn = (idStock: number, currentQuantity: number, type: string, image: string) => {
        if (idStock && currentQuantity) {
            if (type === 'plus') {
                let dataSendRequest: any = {
                    id_product: idStock,
                    quantity: 1,
                    image,
                };
                CartService.addToCart(dataSendRequest).then((res: ResponseType) => {
                    dispatch(getCartAsync());
                });
            } else {
                let dataSendRequest: any = {
                    id_product: idStock,
                    quantity: -1,
                    image,
                };
                CartService.addToCart(dataSendRequest).then((res: ResponseType) => {
                    dispatch(getCartAsync());
                });
            }
        }
    };

    useEffect(() => {
        CartService.getCity()
            .then((res) => setCity(res.data))
            .catch((err) => console.log(err));
    }, []);
    const getDistrict = (cityId: number) => {
        console.log('cityId: ', cityId);
        CartService.getDistrict(cityId)
            .then((res) => setDistrict(res.data.districts))
            .catch((err) => console.log(err));
    };
    const getWard = (districtId: number) => {
        CartService.getWard(districtId)
            .then((res) => setWard(res.data.wards))
            .catch((err) => console.log(err));
    };

    const feeShip = () => {
        if (cityName === '' || districtName === '' || wardName === '') {
        } else {
            // noi giao hang
            const pick_province: string = 'Thành phố Hồ Chí Minh';
            // const pick_district: string = 'Thành phố Thủ Đức';
            // noi nhan hang
            const province: string = cityName.name;
            const district: string = districtName.name;
            const ward: string = wardName.name;
            // const address: string = '';
            const weight: number = 1000;
            const value: number = totalMoney;
            // fly, road
            const transport: string = typeShip;

            axios
                .get(
                    `https://services.giaohangtietkiem.vn/services/shipment/fee?pick_province=${pick_province}&pick_district=${pick_province}&province=${province}&district=${district}&ward=${ward}&weight=${weight}&value=${value}&transport=${transport}`,
                    {
                        headers: {
                            Token: 'Cc65e79D3581e92767Da2D58bC49936E04486383',
                            'Access-Control-Allow-Origin': true,
                        },
                    },
                )
                .then((res) => {
                    setFee(res.data.fee.fee);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleSubmitForm = (values: any) => {
        let products: Array<any> = [];
        if (listCart.length > 0) {
            listCart.forEach((item: any) => {
                products.push({ id_product: item.id, quantity: +item.quantity });
            });
            let address = `${values.address}, ${values?.wardName.name}, ${values?.districtName?.name}, ${values?.cityName?.name}`;
            let dataSendRequest = {
                address,
                name: values.name,
                phone: values.phone,
                note: values.note,
                products,
                payment_method_id: +values?.payment,
                total: totalMoney + fee,
            };
            console.log('dataSendRequest: ', dataSendRequest);
            OrderService.CreateOrder(dataSendRequest).then((res: ResponseType) => {
                console.log('res: ', res);
                if (res.statusCode === 201) {
                    toast({
                        position: 'top-right',
                        title: 'Đặt hàng thành công',
                        duration: 1000,
                        status: 'success',
                    });
                    console.log('+values?.payment: ', +values?.payment);
                    if (+values?.payment === 3) {
                        Navigate('/order-success');
                    } else {
                        OrderService.OrderVnPay(res.data.id).then((res) => {
                            console.log(res);
                        });
                    }
                }
            });
        } else {
            toast({
                position: 'top-right',
                title: 'Chưa có sản phẩm nào trong giỏ hàng',
                duration: 1000,
                status: 'warning',
            });
        }
    };

    return (
        <div className="cart-page">
            {/* <Breadcrumb name={'Sản phẩm'} /> */}
            <div className="container py-10 lg:py-20">
                <div className="grid grid-cols-12 gap-8">
                    <div
                        className="col-span-12 md:col-span-7 relative 
                    after:absolute after:content-[''] after:w-px after:bg-slate-200
                    after:top-0 after:bottom-0 after:-right-5"
                    >
                        <Formik
                            initialValues={defaultValue}
                            enableReinitialize={true}
                            validationSchema={orderCartSchema}
                            onSubmit={(values: ValuesForm) => handleSubmitForm(values)}
                        >
                            {(formik: FormikProps<ValuesForm>) => {
                                return (
                                    <Form className="space-y-5">
                                        <div className="flex flex-wrap space-y-4 lg:space-y-0 flex-col-reverse lg:flex-row justify-between items-center">
                                            <h5 className="text-2xl font-bold">Thông tin vận chuyển</h5>
                                            <p className="text-base">
                                                Bạn đã có tài khoản?{' '}
                                                <Link className="text-primary font-semibold" to={'/login'}>
                                                    Đăng nhập ngay
                                                </Link>
                                            </p>
                                        </div>

                                        <div className="space-y-5">
                                            <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                                <InputField
                                                    name="name"
                                                    label="Họ và tên"
                                                    placeholder="Vd: Nguyễn Văn A"
                                                    className="flex-1"
                                                    p="20px"
                                                />
                                                <InputField
                                                    name="phone"
                                                    placeholder="Vd: 0345678989"
                                                    label="Số điện thoại"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <InputField
                                                    type="email"
                                                    name="email"
                                                    label="Email"
                                                    placeholder="Vd: nguyenvana@gmail.com"
                                                />
                                            </div>
                                            <div className="form-address">
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
                                                            setFee(0);
                                                            const element = document.querySelectorAll(
                                                                "input[name='type_ship']",
                                                            ) as any;
                                                            element.forEach((item: any) => {
                                                                if (item.checked) {
                                                                    item.checked = false;
                                                                }
                                                            });
                                                        }}
                                                        value={+cityName?.code}
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
                                            </div>

                                            <div className="form-group">
                                                <InputField
                                                    type="text"
                                                    name="address"
                                                    label="Nhập địa chỉ cụ thể"
                                                    placeholder="Vd: Ấp 3 Đường Tân Thời"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextareaField
                                                    type="text"
                                                    name="note"
                                                    label="Ghi chú"
                                                    placeholder="Điền ghi chú của bạn vào đây...."
                                                />
                                            </div>
                                        </div>
                                        <div className="order_method">
                                            <h5 className="text-2xl font-bold mb-4">Hình thức giao hàng:</h5>
                                            <div className="space-y-4">
                                                <div
                                                    onClick={() => {
                                                        setTypeShip('road');
                                                        feeShip();
                                                    }}
                                                    className="group"
                                                >
                                                    <input
                                                        className="hidden"
                                                        type="radio"
                                                        value="save"
                                                        name="type_ship"
                                                        id="save"
                                                        onChange={(e) =>
                                                            formik.setFieldValue('orderMethod', e.target.value)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="save"
                                                        className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-primary cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                    >
                                                        <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-primary">
                                                            <span
                                                                className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-primary rounded-full"
                                                            ></span>
                                                        </span>
                                                        <SaveDeliveryIcon width={40} height={40} fillColor1="#319795" />
                                                        <span>Giao hàng tiết kiệm</span>
                                                    </label>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setTypeShip('fly');
                                                        feeShip();
                                                    }}
                                                    className="group"
                                                >
                                                    <input
                                                        className="hidden"
                                                        type="radio"
                                                        name="type_ship"
                                                        id="fast"
                                                        value="fast"
                                                        onChange={(e) =>
                                                            formik.setFieldValue('orderMethod', e.target.value)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="fast"
                                                        className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-primary cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                    >
                                                        <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-primary">
                                                            <span
                                                                className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-primary rounded-full"
                                                            ></span>
                                                        </span>
                                                        <FastDeliveryIcon width={40} height={40} fillColor1="red" />
                                                        <span>Giao hàng nhanh</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order_payment">
                                            <h5 className="text-2xl font-bold mb-4">Hình thức thanh toán</h5>
                                            <div className="space-y-4">
                                                <div className="group">
                                                    <input
                                                        className="hidden"
                                                        type="radio"
                                                        name="type_payment"
                                                        value="3"
                                                        id="cod"
                                                        onChange={(e) =>
                                                            formik.setFieldValue('payment', +e.target.value)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="cod"
                                                        className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-primary cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                    >
                                                        <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-primary">
                                                            <span
                                                                className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-primary rounded-full"
                                                            ></span>
                                                        </span>
                                                        <CodIcon width={35} height={30} />
                                                        <span>Thanh toán khi nhận hàng</span>
                                                    </label>
                                                </div>
                                                {/* <div className="group">
                                                    <input
                                                        className="hidden"
                                                        type="radio"
                                                        name="type_payment"
                                                        id="momo"
                                                        value="momo"
                                                        onChange={(e) =>
                                                            formik.setFieldValue('payment', e.target.value)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="momo"
                                                        className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-primary cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                    >
                                                        <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-primary">
                                                            <span
                                                                className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-primary rounded-full"
                                                            ></span>
                                                        </span>
                                                        <Image src={images.momo} className="w-[35px] h-[35px]" />
                                                        <span>Thanh toán MoMo</span>
                                                    </label>
                                                </div> */}
                                                <div className="group">
                                                    <input
                                                        className="hidden"
                                                        type="radio"
                                                        name="type_payment"
                                                        id="shopee"
                                                        value="4"
                                                        onChange={(e) =>
                                                            formik.setFieldValue('payment', +e.target.value)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="shopee"
                                                        className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-primary cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                    >
                                                        <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-primary">
                                                            <span
                                                                className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-primary rounded-full"
                                                            ></span>
                                                        </span>
                                                        <Image src={images.vnpay} className="w-[40px] h-[40px]" />
                                                        <span>Ví điện tử VNPay</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <Button colorScheme="teal" type="submit" className="!w-full !py-6">
                                            Thanh toán {` `}
                                            {(totalMoney + fee).toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                    {/* src={`${cartItem?.image}${Config.apiUrl}upload/${cartItem?.image}`} */}

                    <div className="col-span-12 md:col-span-5 space-y-5">
                        <h5 className="text-2xl font-bold">Giỏ hàng</h5>
                        <div className="space-y-4 max-h-[256px] overflow-y-auto pr-2">
                            {listCart &&
                                listCart?.map((cartItem: any) => (
                                    <div className="flex relative" key={cartItem.id}>
                                        <div className="w-[30%] flex items-center justify-center">
                                            <Image
                                                className="object-contain w-full mr-3"
                                                src={
                                                    cartItem?.image
                                                        ? `${Config.apiUrl}upload/${cartItem?.image}`
                                                        : `${Config.apiUrl}upload/${cartItem?.product?.images[0].file_name}`
                                                }
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h6 className="text-base font-semibold mr-6">
                                                    {cartItem?.product?.name}
                                                </h6>
                                                <div className="text-base font-light flex items-center space-x-2">
                                                    <p className="color flex items-center">
                                                        {cartItem?.classify_1 && (
                                                            <>
                                                                Màu sắc :
                                                                <span className="ml-1 color-label bg-white relative inline-block w-6 h-6 border shadow-md rounded-full">
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: `${cartItem?.classify_1.attribute}`,
                                                                        }}
                                                                        className={`absolute inset-1 rounded-full`}
                                                                    ></span>
                                                                </span>
                                                            </>
                                                        )}
                                                    </p>
                                                    <p className="size flex items-center">
                                                        {cartItem?.classify_2 && (
                                                            <>
                                                                Kích thước :
                                                                <span className="font-semibold">
                                                                    {cartItem?.classify_2.attribute}
                                                                </span>
                                                            </>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-base">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center w-[140px] quantity-group bg-slate-100 rounded-2xl p-2 shadow-sm mt-2">
                                                        <span
                                                            className="minusBtn text-base p-1 cursor-pointer 
                                                        rounded-full border text-black border-gray-400 ml-2"
                                                            onClick={() =>
                                                                changeQuantityBtn(
                                                                    cartItem?.id,
                                                                    +cartItem.quantity,
                                                                    'minus',
                                                                    cartItem?.image,
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineMinus />
                                                        </span>
                                                        <input
                                                            className="quantity-number w-full border border-slate-200 p-1 text-lg"
                                                            type="number"
                                                            value={+cartItem?.quantity}
                                                            onChange={(e) =>
                                                                changeQuantityCart(
                                                                    e,
                                                                    cartItem?.id,
                                                                    +cartItem.quantity,
                                                                    cartItem?.image,
                                                                )
                                                            }
                                                            min={0}
                                                        />
                                                        <span
                                                            className="plusBtn text-base p-1  cursor-pointer 
                                                        rounded-full border text-black border-gray-400 mr-2"
                                                            onClick={(e) =>
                                                                changeQuantityBtn(
                                                                    cartItem?.id,
                                                                    +cartItem.quantity,
                                                                    'plus',
                                                                    cartItem?.image,
                                                                )
                                                            }
                                                        >
                                                            <AiOutlinePlus />
                                                        </span>
                                                    </div>
                                                    <div className="text-sm">
                                                        <h6 className="font-medium">
                                                            {FormatPriceVND(cartItem?.price * +cartItem?.quantity)}
                                                        </h6>
                                                        <h6 className="text-slate-400">
                                                            {FormatPriceVND(cartItem?.price)}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="absolute top-0 right-0 cursor-pointer"
                                            onClick={() => handleRemoveCart(cartItem?.id)}
                                        >
                                            <IoCloseOutline className="text-slate-400" />
                                        </div>
                                    </div>
                                ))}
                            {listCart.length === 0 && <p>Chưa có sản phẩm nào trong giỏ hàng</p>}
                        </div>
                        <div className="flex pt-4 border-t border-slate-200 gap-2">
                            <Input type="text" placeholder="Mã giảm giá" />
                            <motion.button
                                whileHover={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #000',
                                    color: '#000',
                                    scale: 1.01,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="text-base bg-black text-white min-w-[120px] rounded-2xl"
                            >
                                Áp dụng
                            </motion.button>
                        </div>
                        <div className="text-sm py-4 space-y-4 border-t border-b border-slate-200">
                            <p className="flex justify-between">
                                <span>Tạm tính</span>
                                <span className="text-right">
                                    {FormatPriceVND(totalMoney)}

                                    {/* <br /> (tiết kiệm 80k) */}
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span>Giảm giá</span>
                                <span className="text-right">0đ</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Phí giao hàng</span>
                                <span className="text-right">{FormatPriceVND(fee)}</span>
                            </p>
                        </div>
                        <div>
                            <p className="flex justify-between text-sm">
                                <span>Tổng</span>
                                <span className="text-right">
                                    <span className="!text-2xl">{FormatPriceVND(totalMoney + fee)}</span> <br />
                                    <span className="!text-xs text-red-500">(Đã giảm 21% trên giá gốc)</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
