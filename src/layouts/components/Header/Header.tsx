import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BiMessageSquareCheck } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoReorderThreeSharp } from 'react-icons/io5';
import { MdOutlineDelete, MdOutlineManageAccounts } from 'react-icons/md';
import { RiUserSharedLine } from 'react-icons/ri';
import { TbUserCircle } from 'react-icons/tb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { FourSquaresIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Logo from '~/components/Logo';
import Config from '~/config';
import { getCart, getCartAsync, getProductInCart } from '~/features/cart/cartSlice';
import { getUser, resetUser } from '~/features/user/userSlice';
import { getWishlist, getWishlistAsync } from '~/features/wishlist/wishlistSlice';
import CartService from '~/services/CartService';
import { ResponseType } from '~/utils/Types';
import Search from '../Search';
import './Header.scss';
function Header() {
    const dispatch = useAppDispatch();
    const listCart = useAppSelector(getCart);
    const productInCart = useAppSelector(getProductInCart);
    const infoUser: any = useAppSelector(getUser);

    const Navigate = useNavigate();

    useEffect(() => {
        handleScroll();
    }, []);
    useEffect(() => {
        dispatch(getCartAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productInCart]);

    const toast = useToast();
    const navigate = useNavigate();
    const handleRemoveCart = (id: number) => {
        CartService.deleteCart(id).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                dispatch(getCartAsync());
            }
        });
    };
    useEffect(() => {
        dispatch(getWishlistAsync(infoUser?.id));
    }, [dispatch]);
    const wishlist = useAppSelector(getWishlist);
    const handleLogout = () => {
        Navigate('/login');
        localStorage.removeItem('access_token');
        dispatch(resetUser([]));
    };

    const handleSearch = (values: any) => {
        console.log(values);
    };

    return (
        <header className="header-wrapper relative z-[100]">
            <div className="header bg-white border-b border-slate-200 shadow max-h-36">
                <div className="container h-20">
                    <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 h-20">
                        <div className="col-span-1 lg:col-span-2 flex items-center">
                            <Link to={'/'}>
                                <Logo className="w-[150px] h-auto" />
                            </Link>
                        </div>
                        <div className="hidden lg:col-span-4 lg:flex lg:items-center">
                            <Search placeholder="Nhập từ khóa để tìm kiếm sản phẩm..." handleSearch={handleSearch} />
                        </div>
                        <div className="col-span-1 lg:col-span-2 flex items-center">
                            <ul className="flex-1 flex justify-end lg:space-x-2 xl:space-x-6">
                                <li onClick={handleShowNavbar} className="hidden icon-header-wrapper three-sharp">
                                    <Button className="!p-3 !rounded-full !bg-transparent hover:text-primary">
                                        <div className="icon relative text-2xl">
                                            <IoReorderThreeSharp />
                                        </div>
                                    </Button>
                                </li>
                                <li className="hidden lg:block icon-header-wrapper">
                                    <p
                                        onClick={() => {
                                            if (infoUser?.length === 0) {
                                                toast({
                                                    title: 'Thông báo',
                                                    description: 'Bạn phải đăng nhập để xem trang này',
                                                    status: 'warning',
                                                    position: 'bottom-right',
                                                    duration: 1500,
                                                    isClosable: true,
                                                });
                                                setTimeout(() => {
                                                    navigate('/login');
                                                }, 1500);
                                            } else {
                                                navigate('/my-account/wish-list');
                                            }
                                        }}
                                    >
                                        <Button className="!p-3 !rounded-full !bg-transparent hover:!bg-hover hover:text-primary">
                                            <Tooltip label="Yêu thích">
                                                <div className="icon relative text-2xl">
                                                    <AiOutlineHeart />
                                                    {infoUser?.length !== 0 && (
                                                        <span className="badge-notif-header">
                                                            {wishlist.length > 0 ? wishlist.length : 0}
                                                        </span>
                                                    )}
                                                </div>
                                            </Tooltip>
                                        </Button>
                                    </p>
                                </li>
                                {/* <li className="icon-header-wrapper">
                                    <div className="notification relative z-20">
                                        <Popover closeOnBlur={true}>
                                            {({ isOpen, onClose }) => (
                                                <>
                                                    <PopoverTrigger>
                                                        <Button className="!p-3 !bg-transparent hover:!bg-hover hover:text-primary !rounded-full">
                                                            <Tooltip label="Thông báo">
                                                                <div className="icon relative text-2xl">
                                                                    <IoMdNotificationsOutline />
                                                                    <span className="badge-notif-header">3</span>
                                                                </div>
                                                            </Tooltip>
                                                            <span className="pulse"></span>
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="mr-[70px]">
                                                        <div className="menu-dropdown bg-white text-base shadow-xl rounded-md">
                                                            <div className="dropdown-header-title p-3 border-b">
                                                                <h3 className="text-base font-medium">Thông báo</h3>
                                                            </div>
                                                            <ul className="list-menu p-2 py-3 z-50">
                                                                {[1].map((menu, index) => (
                                                                    <li key={index}>
                                                                        <Link
                                                                            to=""
                                                                            className="link-icon-header"
                                                                            onClick={onClose}
                                                                        >
                                                                            <span className="icon bg-primary p-1 rounded-md text-white text-xl mr-2">
                                                                                <BiMessageSquareCheck />
                                                                            </span>
                                                                            <span className="title font-medium">
                                                                                Bạn vừa nhận một tin nhắn mới
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </PopoverContent>
                                                </>
                                            )}
                                        </Popover>
                                    </div>
                                </li> */}
                                <li onClick={handleShowNavbarMobile} className="icon-header-wrapper lg:hidden">
                                    <Button className="!p-2 !rounded-full !bg-transparent hover:!bg-hover hover:text-primary">
                                        <div className="icon relative text-2xl">
                                            <IoReorderThreeSharp className="text-2xl" />
                                        </div>
                                    </Button>
                                </li>
                                <li className="hidden lg:block icon-header-wrapper">
                                    <div className="notification relative z-20">
                                        <Popover>
                                            {({ isOpen, onClose }) => (
                                                <>
                                                    <PopoverTrigger>
                                                        <Button className="!p-3 !rounded-full !bg-transparent hover:!bg-hover hover:text-primary">
                                                            <Tooltip label="Tài khoản">
                                                                <div className="icon relative text-2xl">
                                                                    <AiOutlineUser />
                                                                </div>
                                                            </Tooltip>
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="mr-[70px]" width="250px">
                                                        <div className="menu-dropdown bg-white text-base shadow-xl rounded-md">
                                                            <div className="dropdown-header-title p-3 border-b">
                                                                <h3 className="text-base font-medium">Tài khoản</h3>
                                                            </div>
                                                            <ul className="list-menu p-2 py-3 z-50">
                                                                {infoUser.length !== 0 && (
                                                                    <li>
                                                                        <Link
                                                                            to="/my-account"
                                                                            className="link-icon-header"
                                                                            onClick={onClose}
                                                                        >
                                                                            <span className="icon text-primary p-1 text-2xl mr-2">
                                                                                <MdOutlineManageAccounts />
                                                                            </span>
                                                                            <span className="title font-medium">
                                                                                Tài khoản của tôi
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                )}
                                                                {infoUser.length === 0 && (
                                                                    <li>
                                                                        <Link
                                                                            to="/login"
                                                                            className="link-icon-header"
                                                                            onClick={onClose}
                                                                        >
                                                                            <span className="icon text-primary p-1 text-2xl mr-2">
                                                                                <TbUserCircle />
                                                                            </span>
                                                                            <span className="title font-medium">
                                                                                Đăng nhập
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                )}
                                                                {infoUser.length === 0 && (
                                                                    <li>
                                                                        <Link
                                                                            to="/register"
                                                                            className="link-icon-header"
                                                                            onClick={onClose}
                                                                        >
                                                                            <span className="icon text-primary p-1 text-2xl mr-2">
                                                                                <RiUserSharedLine />
                                                                            </span>
                                                                            <span className="title font-medium">
                                                                                Đăng ký
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                )}
                                                                {infoUser.length !== 0 && (
                                                                    <li
                                                                        className="link-icon-header"
                                                                        onClick={() => {
                                                                            onClose();
                                                                            handleLogout();
                                                                        }}
                                                                    >
                                                                        <span className="icon text-primary p-1 text-2xl mr-2">
                                                                            <FiLogOut />
                                                                        </span>
                                                                        <span className="title font-medium">
                                                                            Đăng xuất
                                                                        </span>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </PopoverContent>
                                                </>
                                            )}
                                        </Popover>
                                    </div>
                                </li>
                                <li className="hidden lg:block icon-header-wrapper relative">
                                    <p
                                        onClick={() => {
                                            if (infoUser?.length === 0) {
                                                toast({
                                                    title: 'Thông báo',
                                                    description: 'Bạn phải đăng nhập để xem trang này',
                                                    status: 'warning',
                                                    position: 'bottom-right',
                                                    duration: 1500,
                                                    isClosable: true,
                                                });
                                                setTimeout(() => {
                                                    navigate('/login');
                                                }, 1500);
                                            } else {
                                                navigate('/cart');
                                            }
                                        }}
                                    >
                                        <Button className="!p-3 !rounded-full !bg-transparent hover:!bg-hover hover:text-primary">
                                            <div className="icon relative text-2xl">
                                                <AiOutlineShoppingCart />
                                                {infoUser?.length !== 0 && (
                                                    <span className="badge-notif-header">
                                                        {listCart?.length > 0 ? listCart?.length : 0}{' '}
                                                    </span>
                                                )}
                                            </div>
                                        </Button>
                                    </p>
                                    <div className="cart-hover absolute top-full pt-4 right-0 w-[400px]">
                                        <div
                                            className={`${
                                                infoUser?.length !== 0 &&
                                                'bg-white rounded-xl p-4 cart-hover-wrapper cursor-default'
                                            }`}
                                        >
                                            {/* {infoUser?.length !== 0 && (
                                                    <span className="badge-notif-header">
                                                        {listCart?.length > 0 ? listCart?.length : 0}{' '}
                                                    </span>
                                                )} */}
                                            {infoUser?.length !== 0 && (
                                                <>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span className="cursor-text">
                                                            {listCart?.length > 0 ? listCart?.length : 0} Sản phẩm
                                                        </span>
                                                        <Link className="text-[#2f5acf]" to={'/cart'}>
                                                            Xem tất cả
                                                        </Link>
                                                    </div>
                                                    {/* list product in cart */}
                                                    <div className="max-h-[250px] overflow-y-auto">
                                                        {listCart?.length > 0 &&
                                                            listCart?.map((cartItem: any) => (
                                                                <div
                                                                    key={cartItem?.id}
                                                                    className="flex space-x-2 py-4 mr-2 border-b border-slate-200"
                                                                >
                                                                    <Link to={'/'} className="w-[30%]">
                                                                        <Image
                                                                            className="w-full object-contain"
                                                                            src={
                                                                                cartItem?.image
                                                                                    ? `${Config.apiUrl}upload/${cartItem?.image}`
                                                                                    : `${Config.apiUrl}upload/${cartItem?.product?.images[0].file_name}`
                                                                            }
                                                                        />
                                                                    </Link>
                                                                    <Link
                                                                        to={'/'}
                                                                        className="flex-1 text-base flex flex-col justify-around"
                                                                    >
                                                                        <h6>{cartItem?.product?.name}</h6>
                                                                        <div className="flex items-center">
                                                                            {cartItem?.classify_1 && (
                                                                                <span className="color-label bg-white relative inline-block w-6 h-6 border shadow-md rounded-full">
                                                                                    <span
                                                                                        style={{
                                                                                            backgroundColor: `${cartItem?.classify_1.attribute}`,
                                                                                        }}
                                                                                        className={`absolute inset-1 rounded-full`}
                                                                                    ></span>
                                                                                </span>
                                                                            )}
                                                                            {cartItem?.classify_2 && (
                                                                                <>
                                                                                    <span className="ml-1 font-semibold">
                                                                                        -{' '}
                                                                                        {cartItem?.classify_2.attribute}
                                                                                    </span>
                                                                                </>
                                                                            )}
                                                                        </div>

                                                                        <p className="flex items-center space-x-2">
                                                                            <span className="text-[#2f5acf]">
                                                                                {cartItem?.price.toLocaleString(
                                                                                    'it-IT',
                                                                                    {
                                                                                        style: 'currency',
                                                                                        currency: 'VND',
                                                                                    },
                                                                                )}
                                                                            </span>
                                                                            <span>x</span>
                                                                            <span>{+cartItem?.quantity}</span>
                                                                        </p>
                                                                    </Link>
                                                                    <div
                                                                        onClick={() => handleRemoveCart(cartItem?.id)}
                                                                        className="flex items-center text-2xl justify-center hover:text-red-600 cursor-pointer"
                                                                    >
                                                                        <MdOutlineDelete />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        {listCart.length === 0 && (
                                                            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* MENU */}
                <div className="hidden lg:block navbar container h-16">
                    <div className="grid grid-cols-8 gap-4 h-16">
                        <div className="col-span-2 flex items-center space-x-4">
                            <FourSquaresIcon width={16} height={16} />
                            <h4 className="text-base">Loại</h4>
                        </div>
                        <div className="col-span-4 flex items-center">
                            <ul className="flex text-base space-x-8">
                                <li>
                                    <NavLink
                                        className="hover:text-primary font-semibold duration-300 transition-all"
                                        to="/"
                                    >
                                        Trang chủ
                                    </NavLink>
                                </li>
                                {/* <li>
                                        <Link className="hover:text-[#fe696a] transition-all" to="/product/detail">
                                            Product Detail
                                        </Link>
                                    </li> */}

                                <li>
                                    <NavLink
                                        className="hover:text-primary font-semibold duration-300 transition-all"
                                        to="/about"
                                    >
                                        Giới thiệu
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="hover:text-primary font-semibold duration-300 transition-all"
                                        to="/category"
                                    >
                                        Sản phẩm
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="hover:text-primary font-semibold duration-300 transition-all"
                                        to="/blog"
                                    >
                                        Bài viết
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="hover:text-primary font-semibold duration-300 transition-all"
                                        to="/contact"
                                    >
                                        Liên hệ
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Navbar On Mobile */}
                <div className="navbar-mobile hidden md:hidden absolute left-0 right-0 z-10 bg-white border-b border-slate-200">
                    <div className="container">
                        <div className="py-6">
                            <Search />
                            <ul className="flex flex-col text-base space-y-2 mt-2">
                                <li className="py-2 px-4 bg-slate-50 rounded-md">
                                    <a className="transition-all" href="/">
                                        Loại
                                    </a>
                                </li>
                                <li className="py-2 px-4 bg-slate-50 rounded-md">
                                    <Link to={'/'} className="transition-all">
                                        Trang chủ
                                    </Link>
                                </li>
                                <li className="py-2 px-4 bg-slate-50 rounded-md">
                                    <Link to={'/about'} className="transition-all">
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li className="py-2 px-4 bg-slate-50 rounded-md">
                                    <Link to={'/category'} className="transition-all">
                                        Danh mục
                                    </Link>
                                </li>
                                <li className="py-2 px-4 bg-slate-50 rounded-md">
                                    <Link to={'/contact'} className="transition-all">
                                        Liên hệ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

const handleShowNavbar = () => {
    const navbar = document.querySelector('.navbar');
    navbar!.classList.toggle('!block');
};
const handleShowNavbarMobile = () => {
    const navbarMobile = document.querySelector('.navbar-mobile');
    navbarMobile!.classList.toggle('!block');
};

const handleScroll = () => {
    const windowWidth = window.innerWidth;

    document.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header!.classList.toggle('sticky', window.scrollY > 200);

        if (document.querySelector('.header-scroll')) {
            const headerScroll = document.querySelector('.header-scroll');
            if (windowWidth < 1024) {
                headerScroll!.classList.toggle('sticky-mt-20', window.scrollY > 200);
            } else {
                headerScroll!.classList.toggle('sticky-mt-36', window.scrollY > 200);
            }
        }
    });
};
