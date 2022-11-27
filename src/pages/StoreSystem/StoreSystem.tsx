import './StoreSystem.scss';
import Search from '~/layouts/components/Search';
import Breadcrumb from '~/components/Breadcrumb';
import { AiOutlineComment, AiOutlinePhone, AiOutlineQuestion } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
function StoreSystem() {
    return (
        <div className="store-system overflow-hidden my-10 lg:my-20">
            <div className="container">
                <div className="store-header h-72 lg:h-52 flex flex-col justify-center items-center space-y-4 text-white">
                    <h4 className="text-2xl">Xin chào! Chúng tôi có thể giúp gì cho bạn?</h4>
                    <div className="md:w-4/5 lg:w-3/5">
                        <Search placeholder="Nhập từ khóa để tìm sản phẩm, thương hiệu bạn mong muốn. Ví dụ: 5Star" />
                    </div>
                    <div className="flex md:flex-col lg:flex-row md:space-y-4 justify-center lg:items-center lg:space-x-4 lg:space-y-0">
                        <Link className="flex items-center" to={'tel:0123456789'}>
                            <div className="p-1 bg-white rounded-full">
                                <AiOutlineQuestion className="!fill-black" />
                            </div>
                            <span className="font-bold inline-block mx-2">0123456789</span>
                            <span className="text-base">(Khiếu nại, góp ý)</span>
                        </Link>
                        <Link className="flex items-center" to={'tel:0123456789'}>
                            <div className="p-1 bg-white rounded-full">
                                <AiOutlinePhone className="!fill-black" />
                            </div>
                            <span className="font-bold inline-block mx-2">0123456789</span>
                            <span className="text-base">(Tư vấn)</span>
                        </Link>
                        <Link className="flex items-center" to={'/'}>
                            <div className="p-1 bg-white rounded-full">
                                <AiOutlineComment className="!fill-black" />
                            </div>
                            <span className="font-bold inline-block mx-2">Chat</span>
                        </Link>
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="space-y-2 col-span-1">
                                <h6 className="font-semibold">CỬA HÀNG 5Star (THẢO ĐIỀN)</h6>
                                <span>8h30 - 21h00 (Cả tuần)</span>
                            </div>
                            <div className="space-y-2 col-span-1">
                                <p>Điện thoại: (028) 3535 1505 | (028) 3535 1506</p>
                                <p>Email: 5starthaodien@5star.com.vn</p>
                            </div>
                            <div className="space-y-2 col-span-1">
                                <p>107 - 109 Xa Lộ Hà Nội, Phường Thảo Điền, Quận 2, Thành phố Hồ Chí Minh</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="space-y-2 col-span-1">
                                <h6 className="font-semibold">CỬA HÀNG 5Star (PHÚ MỸ HƯNG)</h6>
                                <span>8h30 - 20h30 (Từ thứ 2 đến thứ 6) & 8h30 - 21h00 (Thứ 7 & Chủ nhật)</span>
                            </div>
                            <div className="space-y-2 col-span-1">
                                <p>Điện thoại: (028) 3535 1505 | (028) 3535 1506</p>
                                <p>Email: 5starpmh@5star.com.vn</p>
                                <p>Fax: Fax: (028) 5413 6659</p>
                            </div>
                            <div className="space-y-2 col-span-1">
                                <p>
                                    CR3 – Khu thương mại Hồ Bán Nguyệt, 111 Tôn Dật Tiên, Phường Tân Phú, Quận 7, Thành
                                    phố Hồ Chí Minh
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreSystem;
