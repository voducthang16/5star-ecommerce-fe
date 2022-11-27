import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsHandbag, BsHeart } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { Info, Order } from '~/layouts/components/MyAccount';
import './MyAccount.scss';
import { Tooltip } from '@chakra-ui/react';
import Image from '~/components/Image';
import images from '~/assets/images';
import Wishlist from '~/layouts/components/MyAccount/Wishlist';
const MyAccount = () => {
    const location: any = useLocation();
    const Navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(() => {
        const pathLink = location.pathname.split('/')[2];
        switch (pathLink) {
            case 'wish-list':
                return 2;
            case 'info':
                return 0;
            case 'order':
                return 1;
            default:
                return 0;
        }
    });

    // END STATE

    const handleChangeAvatar = (event: any) => {
        let files = event?.target?.files[0];
        console.log(files);
    };

    const handleLogout = () => {
        Navigate('/login');
        localStorage.removeItem('access_token');
    };

    return (
        <div className="my-account-component">
            <Breadcrumb share={false} page="Quản lý tài khoản" />
            <div className="container pb-[50px]">
                <Tabs isManual variant="soft-rounded" colorScheme="green" defaultIndex={tabIndex}>
                    <div className="grid grid-cols-12 mt-10">
                        <div
                            className="box-tabs col-span-12 md:col-span-3 w-full mr-2 bg-[#f8f8f8] rounded-md h-fit"
                            data-aos="fade-up"
                        >
                            <div className="top border-b border-gray-200 flex justify-center flex-col items-center py-4">
                                <div className="avatar-upload w-[100px] h-[100px] relative border border-gray-300 rounded-full cursor-pointer">
                                    <Image
                                        src={images.avatarDefault}
                                        alt=""
                                        className="shadow-md w-full h-full rounded-full bg-[#f8f8f8] object-contain border border-gray-500 p-1"
                                    />

                                    <Tooltip label="Cập nhật ảnh đại diện" hasArrow>
                                        <div className="cover-input absolute bottom-0 right-0 bg-white w-[30px] h-[30px] text-center rounded-full shadow-md">
                                            <label
                                                htmlFor="uploadAvatar"
                                                className="h-fit text-lg text-gray-500 flex items-center justify-center cursor-pointer"
                                            >
                                                <GoPencil className="text-center mt-[5px]" />
                                            </label>
                                            <input
                                                type="file"
                                                id="uploadAvatar"
                                                className="opacity-0 w-0"
                                                onChange={(e) => handleChangeAvatar(e)}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>

                                <div className="fullname">
                                    <h3 className="text-lg font-semibold mt-2 text-[#4a5568]">Nguyễn Văn A</h3>
                                </div>
                            </div>
                            <TabList className="!flex-col !border-none">
                                <Link to="/my-account/info">
                                    <Tab
                                        className="tab-col-item mt-4"
                                        _selected={{ color: 'white', bg: '#319795', borderLeft: '4px solid #066D84' }}
                                    >
                                        <span className="text-xl mr-2">
                                            <BiUser />
                                        </span>
                                        Thông tin cá nhân
                                    </Tab>
                                </Link>
                                <Link to="/my-account/order">
                                    <Tab
                                        className="tab-col-item"
                                        _selected={{ color: 'white', bg: '#319795', borderLeft: '4px solid #066D84' }}
                                    >
                                        <span className="text-xl mr-2">
                                            <BsHandbag />
                                        </span>
                                        Danh sách đơn hàng
                                    </Tab>
                                </Link>
                                <Link to="/my-account/wish-list">
                                    <Tab
                                        className="tab-col-item"
                                        _selected={{ color: 'white', bg: '#319795', borderLeft: '4px solid #066D84' }}
                                    >
                                        <span className="text-xl mr-2">
                                            <BsHeart />
                                        </span>
                                        Sản phẩm yêu thích
                                    </Tab>
                                </Link>

                                <Tab
                                    className="tab-col-item"
                                    onClick={handleLogout}
                                    _selected={{ color: 'white', bg: '#319795', borderLeft: '4px solid #066D84' }}
                                >
                                    <span className="text-xl mr-2">
                                        <MdLogout />
                                    </span>
                                    Đăng xuất
                                </Tab>
                            </TabList>
                        </div>

                        <div
                            className="content col-span-12 md:col-span-9 w-full h-full"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className="tab-content md:pl-[50px] mt-5 md:mt-0">
                                <TabPanels>
                                    <TabPanel padding={0}>
                                        <Info />
                                    </TabPanel>
                                    <TabPanel padding={0}>
                                        <Order />
                                    </TabPanel>
                                    <TabPanel padding={0}>
                                        <Wishlist />
                                    </TabPanel>
                                </TabPanels>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default MyAccount;
