import { Input } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import images from '~/assets/images';
import { CodIcon, FastDeliveryIcon, SaveDeliveryIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { getCart, getCartAsync } from '~/features/cart/cartSlice';
import { motion } from 'framer-motion';
import { InputField } from '~/layouts/components/CustomField';
import CartService from '~/services/CartService';
import { ResponseType } from '~/utils/Types';
import './Cart.scss';
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

function Cart() {
    const handleSubmitForm = (values: ValuesForm) => {
        console.log(values);
    };

    const [city, setCity] = useState([]);
    const [cityName, setCityName] = useState('');
    const [district, setDistrict] = useState([]);
    const [districtName, setDistrictName] = useState('');
    const [ward, setWard] = useState([]);
    const [wardName, setWardName] = useState('');
    const [typeShip, setTypeShip] = useState('');
    const [fee, setFee] = useState(0);
    const dispatch = useAppDispatch();
    const listCart = useAppSelector(getCart);

    const totalMoney = listCart.reduce((a: any, b: any) => a + b.price, 0);
    const handleRemoveCart = (id: number) => {
        CartService.deleteCart(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                dispatch(getCartAsync());
            }
        });
    };

    const changeQuantityCart = (e: any, idStock: number) => {
        let quantity = +e.target.value;
        if (idStock && quantity) {
            let dataSendRequest = {
                id_product: idStock,
                quantity: quantity,
            };
            CartService.addToCart(dataSendRequest).then((res: ResponseType) => {
                console.log(res);
                dispatch(getCartAsync());
            });
        }
    };
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
    const feeShip = () => {
        // noi giao hang
        const pick_province: string = 'Thành phố Hồ Chí Minh';
        const pick_district: string = 'Thành phố Thủ Đức';
        // noi nhan hang
        const province: string = cityName;
        const district: string = districtName;
        const ward: string = wardName;
        const address: string = '';
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
                console.log(res.data);
                setFee(res.data.fee.fee);
            })
            .catch((err) => console.log(err));
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
                            initialValues={initCheckoutForm}
                            onSubmit={(values: ValuesForm) => handleSubmitForm(values)}
                        >
                            {(formik: FormikProps<ValuesForm>) => (
                                <Form className="space-y-5">
                                    <div className="flex flex-wrap space-y-4 lg:space-y-0 flex-col-reverse lg:flex-row justify-between items-center">
                                        <h5 className="text-2xl font-bold">Thông tin vận chuyển</h5>
                                        <p className="text-base">
                                            Bạn đã có tài khoản?{' '}
                                            <Link className="text-[#2659ff] font-semibold" to={'/login'}>
                                                Đăng nhập ngay
                                            </Link>
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="form-group grid gird-cols-1 md:grid-cols-2 gap-2">
                                            <InputField
                                                name="fullname"
                                                placeholder="Họ & Tên"
                                                className="flex-1"
                                                p="20px"
                                            />
                                            <InputField name="phone" placeholder="Số Điện Thoại" />
                                        </div>
                                        <div className="form-group">
                                            <InputField type="email" name="email" placeholder="Nhập Email Của Bạn" />
                                        </div>
                                        <div className="flex justify-between space-x-4">
                                            <select
                                                className="border border-slate-200 w-1/3 p-2 outline-none rounded-lg"
                                                onChange={(e) => {
                                                    setCityName(e.target.options[e.target.selectedIndex].text);
                                                    setDistrict([]);
                                                    setWard([]);
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
                                        <div>
                                            <InputField type="text" name="address" placeholder="Nhập địa chỉ cụ thể" />
                                        </div>
                                    </div>
                                    <div className="order_method">
                                        <h5 className="text-2xl font-bold mb-4">Hình thức giao hàng:</h5>
                                        <div className="space-y-4">
                                            <div className="group">
                                                <input className="hidden" type="radio" name="type_ship" id="save" />
                                                <label
                                                    onClick={() => {
                                                        setTypeShip('road');
                                                        feeShip();
                                                    }}
                                                    htmlFor="save"
                                                    className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-[#2f5acf] cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                >
                                                    <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-[#2f5acf]">
                                                        <span
                                                            className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-[#2f5acf] rounded-full"
                                                        ></span>
                                                    </span>
                                                    <SaveDeliveryIcon width={40} height={40} fillColor1="#319795" />
                                                    <span>Giao hàng tiết kiệm</span>
                                                </label>
                                            </div>
                                            <div className="group">
                                                <input className="hidden" type="radio" name="type_ship" id="fast" />
                                                <label
                                                    onClick={() => {
                                                        setTypeShip('fly');
                                                        feeShip();
                                                    }}
                                                    htmlFor="fast"
                                                    className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-[#2f5acf] cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                >
                                                    <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-[#2f5acf]">
                                                        <span
                                                            className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-[#2f5acf] rounded-full"
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
                                                <input className="hidden" type="radio" name="type_payment" id="cod" />
                                                <label
                                                    htmlFor="cod"
                                                    className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-[#2f5acf] cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                >
                                                    <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-[#2f5acf]">
                                                        <span
                                                            className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-[#2f5acf] rounded-full"
                                                        ></span>
                                                    </span>
                                                    <CodIcon width={35} height={30} />
                                                    <span>Thanh toán khi nhận hàng</span>
                                                </label>
                                            </div>
                                            <div className="group">
                                                <input className="hidden" type="radio" name="type_payment" id="momo" />
                                                <label
                                                    htmlFor="momo"
                                                    className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-[#2f5acf] cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                >
                                                    <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-[#2f5acf]">
                                                        <span
                                                            className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-[#2f5acf] rounded-full"
                                                        ></span>
                                                    </span>
                                                    <Image src={images.momo} className="w-[35px] h-[35px]" />
                                                    <span>Thanh toán MoMo</span>
                                                </label>
                                            </div>
                                            <div className="group">
                                                <input
                                                    className="hidden"
                                                    type="radio"
                                                    name="type_payment"
                                                    id="shopee"
                                                />
                                                <label
                                                    htmlFor="shopee"
                                                    className="flex items-center p-4 opacity-80 hover:opacity-100 hover:border-[#2f5acf] cursor-pointer 
                                        border border-slate-300 rounded-lg text-base space-x-8 transition-all"
                                                >
                                                    <span className="relative block w-5 h-5 rounded-full border border-[#d9d9d9] group-hover:border-[#2f5acf]">
                                                        <span
                                                            className="checkmark hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        w-[10px] h-[10px] bg-[#2f5acf] rounded-full"
                                                        ></span>
                                                    </span>
                                                    <Image src={images.spepay} className="w-[35px] h-[35px]" />
                                                    <span>Ví điện tử ShopeePay</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="input rounded-lg !bg-black text-white">
                                        Thanh toán {` `}
                                        {(totalMoney + fee).toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                        (COD)
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="col-span-12 md:col-span-5 space-y-5">
                        <h5 className="text-2xl font-bold">Giỏ hàng</h5>
                        <div className="space-y-4 max-h-[256px] overflow-y-auto pr-2">
                            {listCart &&
                                listCart?.map((cartItem: any) => (
                                    <div className="flex relative">
                                        <div className="w-[30%] flex items-center justify-center">
                                            <Image
                                                className="object-contain w-full"
                                                src="https://cartzilla.createx.studio/img/shop/catalog/03.jpg"
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
                                                                <span>{cartItem?.classify_2.attribute}</span>
                                                            </>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-base">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center w-[140px] quantity-group bg-slate-100 rounded-2xl p-2 shadow-sm mt-2">
                                                        <span className="minusBtn text-base p-1 cursor-pointer rounded-full border text-black border-gray-400 ml-2">
                                                            <AiOutlineMinus />
                                                        </span>
                                                        <input
                                                            className="quantity-number w-full border border-slate-200 p-1 text-lg"
                                                            type="number"
                                                            defaultValue={+cartItem?.quantity}
                                                            value={+cartItem?.quantity}
                                                            onChange={(e) => changeQuantityCart(e, cartItem?.id)}
                                                            min={0}
                                                        />
                                                        <span className="plusBtn text-base p-1  cursor-pointer rounded-full border text-black border-gray-400 mr-2">
                                                            <AiOutlinePlus />
                                                        </span>
                                                    </div>
                                                    <div className="text-sm">
                                                        <h6 className="font-medium">
                                                            {cartItem?.price.toLocaleString('it-IT', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}
                                                        </h6>
                                                        <del className="text-slate-400">
                                                            {(cartItem?.price + 9000).toLocaleString('it-IT', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}
                                                        </del>
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
                                    {totalMoney.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                    {/* <br /> (tiết kiệm 80k) */}
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span>Giảm giá</span>
                                <span className="text-right">0đ</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Phí giao hàng</span>
                                <span className="text-right">
                                    {fee.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="flex justify-between text-sm">
                                <span>Tổng</span>
                                <span className="text-right">
                                    <span className="!text-2xl">
                                        {(totalMoney + fee).toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>{' '}
                                    <br />
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
