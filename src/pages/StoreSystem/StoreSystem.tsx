import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlinePhone, AiOutlineQuestion, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import Config from '~/config';
import { Debounce } from '~/utils/Debouce';
import './StoreSystem.scss';
function StoreSystem() {
    const [list, setList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const getStoreSystem = () => {
        axios
            .get(`${Config.apiUrl}store-system`)
            .then((res: any) => {
                if (res.data.statusCode === 200) {
                    setList(res.data.data.data);
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getStoreSystem();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        axios
            .get(`${Config.apiUrl}store-system?address=${value}`)
            .then((res: any) => {
                setList(res.data.data.data);
            })
            .catch((err) => console.log(err));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(Debounce(handleSearch, 1000), []);

    return (
        <div className="store-system overflow-hidden my-10 lg:my-20">
            <Breadcrumb page="Hệ Thống Cửa Hàng 5Star" category={false} share={false} />

            <div className="container">
                <div className="store-header h-72 lg:h-52 flex flex-col justify-center items-center space-y-4 text-white">
                    <h4 className="text-2xl">Xin chào! Chúng tôi có thể giúp gì cho bạn?</h4>
                    <div className="md:w-4/5 lg:w-3/5">
                        <input
                            className="input-search input-form !text-black text-lg"
                            type="text"
                            placeholder={'Nhập từ khóa để tìm sản phẩm, thương hiệu bạn mong muốn. Ví dụ: 5Star'}
                            onChange={debounceSearch}
                        />
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
                            <span className="font-bold inline-block mx-2">+84 364303995</span>
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
                <div>
                    <div className="my-10 text-base space-y-6">
                        {list?.map((item: any, index: number) => (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-lg" key={index}>
                                <div className="space-y-2 col-span-1">
                                    <h6 className="font-semibold">{item.name}</h6>
                                    <span>
                                        {item.time} - ({item.open_close})
                                    </span>
                                </div>
                                <div className="space-y-2 col-span-1">
                                    <p>
                                        <span className="font-bold">Điện thoại: </span>
                                        {item.phone}
                                    </p>
                                    <p>
                                        <span className="font-bold">Email: </span>
                                        {item.email}
                                    </p>
                                </div>
                                <div className="space-y-2 col-span-1">
                                    <p>
                                        <span className="font-bold">Địa chỉ: </span>
                                        {item.address}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {list?.length === 0 && (
                            <p className="text-center font-semibold text-lg">Hiện không tồn tại cửa hàng này</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreSystem;
