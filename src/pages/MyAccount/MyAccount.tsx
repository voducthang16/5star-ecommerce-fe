import { Tab, TabList, TabPanel, TabPanels, Tabs, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsHandbag, BsHeart } from 'react-icons/bs';
import { GoLocation, GoPencil } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import images from '~/assets/images';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
import Config from '~/config';
import { getOneInfoUser, getUser, resetUser } from '~/features/user/userSlice';
import { Info, Order } from '~/layouts/components/MyAccount';
import Address from '~/layouts/components/MyAccount/Address';
import Wishlist from '~/layouts/components/MyAccount/Wishlist';
import UploadService from '~/services/UploadService';
import UserService from '~/services/UserService';
import './MyAccount.scss';
const MyAccount = () => {
    const [loading, setLoading] = useState(false);
    const location: any = useLocation();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const infoUser: any = useAppSelector(getUser);

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

    const handleChangeAvatar = async (event: any) => {
        let files = event?.target?.files[0];
        if (files) {
            const idAvatar = await UploadService.requestUploadImage(files);
            if (idAvatar) {
                const dataSend = {
                    avatar_id: idAvatar,
                };
                UserService.UpdateUser(dataSend, infoUser.id).then((res: any) => {
                    if (res.statusCode === 200) {
                        dispatch(getOneInfoUser(infoUser?.id));
                    }
                });
            }
        }
    };

    const handleLogout = () => {
        Navigate('/login');
        localStorage.removeItem('access_token');
        dispatch(resetUser([]));
    };

    useEffect(() => {
        setLoading(true);
        if (infoUser.length === 0) {
            Navigate('/');
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="my-account-component">
            <Breadcrumb share={false} page="Quản lý tài khoản" />
            {loading ? (
                <Loading />
            ) : (
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
                                            src={
                                                `${Config.apiUrl}upload/${infoUser?.avatar?.file_name}` ||
                                                `${images?.avatarDefault}`
                                            }
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
                                                    accept="image/*"
                                                    onChange={(e) => handleChangeAvatar(e)}
                                                />
                                            </div>
                                        </Tooltip>
                                    </div>

                                    <div className="fullname">
                                        <h3 className="text-lg font-semibold mt-2 text-[#4a5568]">
                                            {infoUser && infoUser?.first_name + ' ' + infoUser?.last_name}
                                        </h3>
                                    </div>
                                </div>
                                <TabList className="!flex-col !border-none">
                                    <NavLink to="/my-account/info">
                                        <Tab
                                            className="tab-col-item mt-4"
                                            _selected={{
                                                color: 'white',
                                                bg: '#319795',
                                                borderLeft: '4px solid #066D84',
                                            }}
                                        >
                                            <span className="text-xl mr-2">
                                                <BiUser />
                                            </span>
                                            Thông tin cá nhân
                                        </Tab>
                                    </NavLink>
                                    <NavLink to="/my-account/order">
                                        <Tab
                                            className="tab-col-item"
                                            _selected={{
                                                color: 'white',
                                                bg: '#319795',
                                                borderLeft: '4px solid #066D84',
                                            }}
                                        >
                                            <span className="text-xl mr-2">
                                                <BsHandbag />
                                            </span>
                                            Danh sách đơn hàng
                                        </Tab>
                                    </NavLink>
                                    <NavLink to="">
                                        <Tab
                                            className="tab-col-item"
                                            _selected={{
                                                color: 'white',
                                                bg: '#319795',
                                                borderLeft: '4px solid #066D84',
                                            }}
                                        >
                                            <span className="text-xl mr-2">
                                                <GoLocation />
                                            </span>
                                            Địa chỉ của tôi
                                        </Tab>
                                    </NavLink>
                                    <NavLink to="/my-account/wish-list">
                                        <Tab
                                            className="tab-col-item"
                                            _selected={{
                                                color: 'white',
                                                bg: '#319795',
                                                borderLeft: '4px solid #066D84',
                                            }}
                                        >
                                            <span className="text-xl mr-2">
                                                <BsHeart />
                                            </span>
                                            Sản phẩm yêu thích
                                        </Tab>
                                    </NavLink>

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
                                            <Address />
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
            )}
        </div>
    );
};

export default MyAccount;
