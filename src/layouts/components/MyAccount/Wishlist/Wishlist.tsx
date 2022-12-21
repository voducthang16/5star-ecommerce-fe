import { RiVipCrown2Line } from 'react-icons/ri';
import { DeleteIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getWishlist, getWishlistAsync } from '~/features/wishlist/wishlistSlice';
import './Wishlist.scss';
import { Link } from 'react-router-dom';
const Wishlist = () => {
    const dispatch = useAppDispatch();
    const wishlist = useAppSelector(getWishlist);
    return (
        <div className="tab-wishlist bg-[#f8f8f8] p-6 rounded-md shadow-sm">
            <div className="title inline-block">
                <h3 className="font-bold text-3xl text-tblack">Sản phẩm yêu thích</h3>
                <span
                    className="line w-full text-center relative  mt-[-10px] 
                before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-[1px] before:left-0 before:bg-primary"
                >
                    <RiVipCrown2Line className="text-primary text-2xl bg-[#f8f8f8] w-[50px] z-[1] relative left-1/2 -translate-x-1/2" />
                </span>
            </div>
            <div>
                {wishlist.length > 0 ? (
                    <>
                        {wishlist.map((item: any, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-center space-y-4 py-4 border-b border-slate-200"
                            >
                                <Image
                                    className="w-[160px] lg:w-40 mr-4 rounded-lg"
                                    src="https://i.imgur.com/TnQejuQ.jpg"
                                    alt="Product"
                                />
                                <div className="flex-1 flex flex-col justify-around items-center md:items-baseline">
                                    <Link
                                        to={`/product/${item.stocks.product.slug}`}
                                        className="text-2xl font-semibold"
                                    >
                                        {item.stocks.product.name}
                                    </Link>
                                    <h6 className="text-lg font-normal">Thể Thao</h6>
                                    <span className="text-base text-secondary">{item.stocks.price}</span>
                                </div>
                                <div className="ml-4">
                                    <div
                                        className="flex items-center text-lg space-x-4 py-1 px-4 group transition-all hover:bg-[#f34770] hover:text-white
                        text-[#f34770] rounded-lg border border-[#f34770] cursor-pointer"
                                    >
                                        <span>Xóa</span>
                                        <DeleteIcon
                                            className="fill-[#f34770] group-hover:fill-white transition-all"
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div>Chưa có sản phẩm</div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
