import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineDelete, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BiMessageSquareCheck } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoReorderThreeSharp } from 'react-icons/io5';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { RiUserSharedLine } from 'react-icons/ri';
import { TbUserCircle } from 'react-icons/tb';
import { Link, NavLink } from 'react-router-dom';
import { FourSquaresIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Logo from '~/components/Logo';
import Search from '../Search';
import './Header.scss';
function Header() {
    let activeStyle = {
        color: '#0097a7',
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

    useEffect(() => {
        handleScroll();
    }, []);

    const handleShowNavbar = () => {
        const navbar = document.querySelector('.navbar');
        navbar!.classList.toggle('!block');
    };
    const handleShowNavbarMobile = () => {
        const navbarMobile = document.querySelector('.navbar-mobile');
        navbarMobile!.classList.toggle('!block');
    };
    return (
        <header>
            <div className="header-wrapper relative z-[100]">
                <div className="header bg-white border-b border-slate-200 shadow max-h-36">
                    <div className="container h-20">
                        <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 h-20">
                            <div className="col-span-1 lg:col-span-2 flex items-center">
                                <Link to={'/'}>
                                    <Logo />
                                </Link>
                            </div>
                            <div className="hidden lg:col-span-4 lg:flex lg:items-center">
                                <Search />
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
                                        <Link to={'/my-account/wish-list'}>
                                            <Button className="!p-3 !rounded-full !bg-transparent hover:!bg-hover hover:text-primary">
                                                <Tooltip label="Yêu thích">
                                                    <div className="icon relative text-2xl">
                                                        <AiOutlineHeart />
                                                        <span className="badge-notif-header">9</span>
                                                    </div>
                                                </Tooltip>
                                            </Button>
                                        </Link>
                                    </li>
                                    <li className="icon-header-wrapper">
                                        <div className="notification relative z-20">
                                            <Popover>
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
                                                                    <Link to="" className="link-icon-header">
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
                                            </Popover>
                                        </div>
                                    </li>
                                    <li onClick={handleShowNavbarMobile} className="icon-header-wrapper lg:hidden">
                                        <IoReorderThreeSharp className="text-2xl" />
                                    </li>
                                    <li className="hidden lg:block icon-header-wrapper">
                                        <div className="notification relative z-20">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button className="!p-3 !rounded-full !bg-transparent hover:!bg-hover hover:text-primary">
                                                        <Tooltip label="Tài khoản">
                                                            <div className="icon relative text-2xl">
                                                                <AiOutlineUser />
                                                                <span className="badge-notif-header">9</span>
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
                                                            <li>
                                                                <Link to="/my-account" className="link-icon-header">
                                                                    <span className="icon text-primary p-1 text-2xl mr-2">
                                                                        <MdOutlineManageAccounts />
                                                                    </span>
                                                                    <span className="title font-medium">
                                                                        Tài khoản của tôi
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/login" className="link-icon-header">
                                                                    <span className="icon text-primary p-1 text-2xl mr-2">
                                                                        <TbUserCircle />
                                                                    </span>
                                                                    <span className="title font-medium">Đăng nhập</span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/register" className="link-icon-header">
                                                                    <span className="icon text-primary p-1 text-2xl mr-2">
                                                                        <RiUserSharedLine />
                                                                    </span>
                                                                    <span className="title font-medium">Đăng ký</span>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </li>
                                    <li className="hidden lg:block icon-header-wrapper relative">
                                        <Link to={'/cart'}>
                                            <Button className="!p-3 !rounded-full !bg-transparent hover:!bg-hover hover:text-primary">
                                                <Tooltip label="Giỏ hàng">
                                                    <div className="icon relative text-2xl">
                                                        <AiOutlineShoppingCart />

                                                        <span className="badge-notif-header">9</span>
                                                    </div>
                                                </Tooltip>
                                            </Button>
                                        </Link>
                                        <div className="cart-hover absolute top-full pt-4 right-0 w-[400px]">
                                            <div className="bg-white rounded-xl p-4 cart-hover-wrapper cursor-default">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="cursor-text">2 sản phẩm</span>
                                                    <Link className="text-[#2f5acf]" to={'/cart'}>
                                                        Xem tất cả
                                                    </Link>
                                                </div>
                                                {/* list product in cart */}
                                                <div className="max-h-[250px] overflow-y-auto">
                                                    <div className="flex space-x-2 py-4 mr-2 border-b border-slate-200">
                                                        <Link to={'/'} className="w-[30%]">
                                                            <Image
                                                                className="w-full object-contain"
                                                                src={
                                                                    'https://cartzilla.createx.studio/img/shop/cart/widget/02.jpg'
                                                                }
                                                            />
                                                        </Link>
                                                        <Link
                                                            to={'/'}
                                                            className="flex-1 text-base flex flex-col justify-around"
                                                        >
                                                            <h6>
                                                                Áo Polo nam thể thao thoáng khí, nhuộm sạch Cleandye
                                                            </h6>
                                                            <span className="text-xs">Xanh Aqua/2XL</span>
                                                            <p className="flex items-center space-x-2">
                                                                <span className="text-[#2f5acf]">300.000 VND</span>
                                                                <span>x</span>
                                                                <span>2</span>
                                                            </p>
                                                        </Link>
                                                        <div className="flex items-center justify-center hover:text-red-600 cursor-pointer">
                                                            <AiOutlineDelete />
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2 py-4 mr-2 border-b border-slate-200">
                                                        <Link to={'/'} className="w-[30%]">
                                                            <Image
                                                                className="w-full object-contain"
                                                                src={
                                                                    'https://cartzilla.createx.studio/img/shop/cart/widget/02.jpg'
                                                                }
                                                            />
                                                        </Link>
                                                        <Link
                                                            to={'/'}
                                                            className="flex-1 text-base flex flex-col justify-around"
                                                        >
                                                            <h6>
                                                                Áo Polo nam thể thao thoáng khí, nhuộm sạch Cleandye
                                                            </h6>
                                                            <span className="text-xs">Xanh Aqua/2XL</span>
                                                            <p className="flex items-center space-x-2">
                                                                <span className="text-[#2f5acf]">300.000 VND</span>
                                                                <span>x</span>
                                                                <span>2</span>
                                                            </p>
                                                        </Link>
                                                        <div className="flex items-center justify-center hover:text-red-600 cursor-pointer">
                                                            <AiOutlineDelete />
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2 py-4 mr-2 border-b border-slate-200">
                                                        <Link to={'/'} className="w-[30%]">
                                                            <Image
                                                                className="w-full object-contain"
                                                                src={
                                                                    'https://cartzilla.createx.studio/img/shop/cart/widget/02.jpg'
                                                                }
                                                            />
                                                        </Link>
                                                        <Link
                                                            to={'/'}
                                                            className="flex-1 text-base flex flex-col justify-around"
                                                        >
                                                            <h6>
                                                                Áo Polo nam thể thao thoáng khí, nhuộm sạch Cleandye
                                                            </h6>
                                                            <span className="text-xs">Xanh Aqua/2XL</span>
                                                            <p className="flex items-center space-x-2">
                                                                <span className="text-[#2f5acf]">300.000 VND</span>
                                                                <span>x</span>
                                                                <span>2</span>
                                                            </p>
                                                        </Link>
                                                        <div className="flex items-center justify-center hover:text-red-600 cursor-pointer">
                                                            <AiOutlineDelete />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block navbar container h-16">
                        <div className="grid grid-cols-8 gap-4 h-16">
                            <div className="col-span-2 flex items-center space-x-4">
                                <FourSquaresIcon width={16} height={16} />
                                <h4 className="text-base">Loại</h4>
                            </div>
                            <div className="col-span-4 flex items-center">
                                <ul className="flex text-base space-x-8">
                                    <li>
                                        <Link
                                            className="hover:text-primary font-semibold duration-300 transition-all"
                                            to="/"
                                        >
                                            Trang chủ
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link className="hover:text-[#fe696a] transition-all" to="/product/detail">
                                            Product Detail
                                        </Link>
                                    </li> */}

                                    <li>
                                        <Link
                                            className="hover:text-primary font-semibold duration-300 transition-all"
                                            to="/about"
                                        >
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="hover:text-primary font-semibold duration-300 transition-all"
                                            to="/category"
                                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                        >
                                            Danh mục
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Link
                                            className="hover:text-primary font-semibold duration-300 transition-all"
                                            to="/contact"
                                        >
                                            Liên hệ
                                        </Link>
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
                                            Departments
                                        </a>
                                    </li>
                                    <li className="py-2 px-4 bg-slate-50 rounded-md">
                                        <a className="transition-all" href="/">
                                            Home
                                        </a>
                                    </li>
                                    <li className="py-2 px-4 bg-slate-50 rounded-md">
                                        <a className="transition-all" href="/">
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
