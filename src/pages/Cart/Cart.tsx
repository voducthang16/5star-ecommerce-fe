import { Form, Formik, FormikProps } from 'formik';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Breadcrumb from '~/components/Breadcrumb';
import { CodIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { InputField } from '~/layouts/components/CustomField';
import './Cart.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
    useEffect(() => {
        axios
            .get('https://provinces.open-api.vn/api/p/')
            .then((res) => {
                setCity(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const getDistrict = (cityId: number) => {
        axios
            .get(`https://provinces.open-api.vn/api/p/${cityId}?depth=2`)
            .then((res) => {
                setDistrict(res.data.districts);
            })
            .catch((err) => console.log(err));
    };
    const getWard = (districtId: number) => {
        axios
            .get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
            .then((res) => {
                setWard(res.data.wards);
            })
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
        const value: number = 300000;
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
                                            <InputField name="fullname" placeholder="Họ & Tên" className="flex-1" />
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
                                                <option value="0" hidden>
                                                    Tỉnh, Thành Phố
                                                </option>
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
                                                <option value="0" hidden>
                                                    Quận, Huyện
                                                </option>
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
                                                <option value="0" hidden>
                                                    Xã, Phường
                                                </option>
                                                {ward?.map((item: any, index) => (
                                                    <option key={index} value={item.code}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <InputField type="text" name="address" placeholder="Nhập Địa Chỉ" />
                                        </div>
                                        <div className="flex justify-between">
                                            <h6>Hình thức giao hàng: </h6>

                                            <div
                                                onClick={() => {
                                                    setTypeShip('road');
                                                    feeShip();
                                                }}
                                                className="flex items-center space-x-2"
                                            >
                                                <label htmlFor="save">Giao hàng tiết kiệm</label>
                                                <input type="radio" name="type_ship" id="save" />
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setTypeShip('fly');
                                                    feeShip();
                                                }}
                                                className="flex items-center space-x-2"
                                            >
                                                <label htmlFor="fast">Giao hàng nhanh</label>
                                                <input type="radio" name="type_ship" id="fast" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
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
                                        Thanh toán{' '}
                                        {fee.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}{' '}
                                        (COD)
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="col-span-12 md:col-span-5 space-y-5">
                        <h5 className="text-2xl font-bold">Giỏ hàng</h5>
                        <div className="space-y-4 max-h-[256px] overflow-y-auto pr-2">
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
                                            Quần Short Quần Short Quần Short Quần Short
                                        </h6>
                                        <span className="block text-base font-light">Xanh Aqua / 2XL</span>
                                    </div>
                                    <div className="text-base">
                                        <div>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">Xanh Aqua</option>
                                                <option value="">Xanh</option>
                                            </select>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">XL</option>
                                                <option value="">2XL</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center w-[120px] quantity-group bg-slate-100 rounded-2xl p-2 shadow-sm mt-2">
                                                <span className="minusBtn text-base p-1 cursor-pointer rounded-full border text-black border-gray-400 ml-2">
                                                    <AiOutlineMinus />
                                                </span>
                                                <input
                                                    className="quantity-number w-full border border-slate-200 p-1"
                                                    type="number"
                                                    value={1}
                                                    min={0}
                                                />
                                                <span className="plusBtn text-base p-1  cursor-pointer rounded-full border text-black border-gray-400 mr-2">
                                                    <AiOutlinePlus />
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                <h6 className="font-medium">149.000đ</h6>
                                                <del className="text-slate-400">159.000đ</del>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0">
                                    <IoCloseOutline className="text-slate-400" />
                                </div>
                            </div>
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
                                            Quần Short Quần Short Quần Short Quần Short
                                        </h6>
                                        <span className="block text-base font-light">Xanh Aqua / 2XL</span>
                                    </div>
                                    <div className="text-base">
                                        <div>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">Xanh Aqua</option>
                                                <option value="">Xanh</option>
                                            </select>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">XL</option>
                                                <option value="">2XL</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center w-2/5">
                                                <span>
                                                    <AiOutlineMinus />
                                                </span>
                                                <input
                                                    className="w-full border border-slate-200 p-1"
                                                    type="number"
                                                    value={1}
                                                />
                                                <span>
                                                    <AiOutlinePlus />
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                <h6 className="font-medium">149.000đ</h6>
                                                <del className="text-slate-400">159.000đ</del>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0">
                                    <IoCloseOutline className="text-slate-400" />
                                </div>
                            </div>
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
                                            Quần Short Quần Short Quần Short Quần Short
                                        </h6>
                                        <span className="block text-base font-light">Xanh Aqua / 2XL</span>
                                    </div>
                                    <div className="text-base">
                                        <div>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">Xanh Aqua</option>
                                                <option value="">Xanh</option>
                                            </select>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">XL</option>
                                                <option value="">2XL</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center w-2/5">
                                                <span>
                                                    <AiOutlineMinus />
                                                </span>
                                                <input
                                                    className="w-full border border-slate-200 p-1"
                                                    type="number"
                                                    value={1}
                                                />
                                                <span>
                                                    <AiOutlinePlus />
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                <h6 className="font-medium">149.000đ</h6>
                                                <del className="text-slate-400">159.000đ</del>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0">
                                    <IoCloseOutline className="text-slate-400" />
                                </div>
                            </div>
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
                                            Quần Short Quần Short Quần Short Quần Short
                                        </h6>
                                        <span className="block text-base font-light">Xanh Aqua / 2XL</span>
                                    </div>
                                    <div className="text-base">
                                        <div>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">Xanh Aqua</option>
                                                <option value="">Xanh</option>
                                            </select>
                                            <select className="border border-slate-200" name="" id="">
                                                <option value="">XL</option>
                                                <option value="">2XL</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center w-2/5">
                                                <span>
                                                    <AiOutlineMinus />
                                                </span>
                                                <input
                                                    className="w-full border border-slate-200 p-1"
                                                    type="number"
                                                    value={1}
                                                />
                                                <span>
                                                    <AiOutlinePlus />
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                <h6 className="font-medium">149.000đ</h6>
                                                <del className="text-slate-400">159.000đ</del>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0">
                                    <IoCloseOutline className="text-slate-400" />
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-4 border-t border-slate-200">
                            <input type="text" className="input input-form !rounded-2xl" placeholder="Mã giảm giá" />
                            <button className="text-base bg-slate-400 min-w-[120px] rounded-2xl">Áp dụng</button>
                        </div>
                        <div className="text-sm py-4 space-y-4 border-t border-b border-slate-200">
                            <p className="flex justify-between">
                                <span>Tạm tính</span>
                                <span className="text-right">
                                    298.000đ <br /> (tiết kiệm 80k)
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
                                    <span className="!text-2xl">298.000đ</span> <br />{' '}
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
