import './StoreSystem.scss';
import Search from '~/layouts/components/Search';
import Breadcrumb from '~/components/Breadcrumb';
import { AiOutlineComment, AiOutlinePhone, AiOutlineQuestion, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Config from '~/config';
function StoreSystem() {
    const [list, setList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const getStoreSystem = () => {
        axios
            .get(`${Config.apiUrl}store-system`)
            .then((res: any) => {
                setList(res.data.data.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getStoreSystem();
    }, []);
    const onSubmit = (e: any) => {
        e.preventDefault();
        axios
            .get(`${Config.apiUrl}store-system?name=${keyword}`)
            .then((res: any) => {
                setList(res.data.data.data);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="store-system overflow-hidden my-10 lg:my-20">
            <div className="container">
                <div className="store-header h-72 lg:h-52 flex flex-col justify-center items-center space-y-4 text-white">
                    <h4 className="text-2xl">Xin chào! Chúng tôi có thể giúp gì cho bạn?</h4>
                    <div className="md:w-4/5 lg:w-3/5">
                        <form className="relative flex-1" onSubmit={onSubmit}>
                            <input
                                className="input-search input-form !text-black"
                                type="text"
                                placeholder={'Nhập từ khóa để tìm sản phẩm, thương hiệu bạn mong muốn. Ví dụ: 5Star'}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                    if (e.target.value === '') {
                                        getStoreSystem();
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-4 -translate-y-1/2 p-1 hover:bg-slate-100 hover:transition-all hover:rounded-full hover:cursor-pointer"
                            >
                                <AiOutlineSearch className="text-2xl !text-black" />
                            </button>
                        </form>
                        {/* <Search placeholder="" /> */}
                    </div>
                    <div className="flex md:flex-col lg:flex-row md:space-y-4 justify-center lg:items-center lg:space-x-4 lg:space-y-0">
                        <Link className="flex items-center" to={'tel:0123456789'}>
                            <div className="p-1 bg-white rounded-full">
                                <AiOutlineQuestion className="!fill-black" />
                            </div>
                            <span className="font-bold inline-block mx-2">+84 364303989</span>
                            <span className="text-base">(Khiếu nại, góp ý)</span>
                        </Link>
                        <Link className="flex items-center" to={'tel:0123456789'}>
                            <div className="p-1 bg-white rounded-full">
                                <AiOutlinePhone className="!fill-black" />
                            </div>
                            <span className="font-bold inline-block mx-2">+84 35587987785</span>
                            <span className="text-base">(Tư vấn)</span>
                        </Link>
                        {/* <Link className="flex items-center" to={'/'}>
                            <div className="p-1 bg-white rounded-full">
                                <AiOutlineComment className="!fill-black" />
                            </div>
                            <span className="font-bold inline-block mx-2">Chat</span>
                        </Link> */}
                    </div>
                </div>
                <Breadcrumb page="Hệ Thống Cửa Hàng 5Star" category={false} share={false} />
                <div>
                    <Image
                        src="https://hotro.hasaki.vn/images/graphics/banner_hethong.jpg"
                        alt="Map"
                        className="w-full object-contain"
                    />
                    <div className="mt-10 text-base space-y-6">
                        <h5 className="!text-lg font-semibold">Hồ Chí Minh</h5>
                        {list.map((item: any, index: number) => (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div key={index} className="space-y-2 col-span-1">
                                    <h6 className="font-semibold">{item.name}</h6>
                                    <span>
                                        {item.time} - {item.open_close}
                                    </span>
                                </div>
                                <div className="space-y-2 col-span-1">
                                    <p>Điện thoại: {item.phone}</p>
                                    <p>Email: {item.email}</p>
                                </div>
                                <div className="space-y-2 col-span-1">
                                    <p>{item.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreSystem;
