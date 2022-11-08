import { RiVipCrown2Line } from 'react-icons/ri';
import images from '~/assets/images';
import Image from '~/components/Image';
import './Info.scss';
import ModalUpdateAccount from './ModalUpdateAccount';
import ModalUpdateInfo from './ModalUpdateInfo';
const Info = () => {
    return (
        <div className="tab-info bg-[#f8f8f8] p-6 rounded-md shadow-sm">
            <div className="title inline-block">
                <h3 className="font-bold text-3xl text-tblack">Thông tin người dùng</h3>
                <span
                    className="line w-full text-center relative  mt-[-10px] 
                before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-[1px] before:left-0 before:bg-primary"
                >
                    <RiVipCrown2Line className="text-primary text-2xl bg-[#f8f8f8] w-[50px] z-[1] relative left-1/2 -translate-x-1/2" />
                </span>
            </div>
            <div className="content">
                <div className="card p-4 py-6 rounded-lg my-3">
                    <div className="grid grid-cols-7">
                        <div className="lg:col-span-4 col-span-7 w-full">
                            <div className="info-title">
                                <p className="text-2xl font-semibold text-tblack">Cơ bản</p>
                            </div>

                            <div className="table-info text-lg text-tbase font-normal mt-2 ml-3 inline-block w-full">
                                <div className="table-responsive overflow-x-auto">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td>Họ & tên: </td>
                                                <td>Nguyễn Văn A</td>
                                            </tr>

                                            <tr>
                                                <td>Ngày sinh: </td>
                                                <td>21/05/1997</td>
                                            </tr>
                                            <tr>
                                                <td>Số điện thoại: </td>
                                                <td>012345678</td>
                                            </tr>
                                            <tr>
                                                <td>Địa chỉ: </td>
                                                <td>
                                                    <span className="no-fill text-primary">Không có</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="action text-right px-2 my-2">
                                    <ModalUpdateInfo />
                                </div>
                            </div>
                            <div className="info-title mt-2">
                                <p className="text-2xl font-semibold text-tblack">Tài khoản</p>
                                <div className="table-info text-lg text-tbase font-normal mt-2 ml-3 inline-block w-full">
                                    <div className="table-responsive overflow-x-auto">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td>Tên đăng nhập: </td>
                                                    <td className="text-primary">nguyenvana@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <td>Mật khẩu: </td>
                                                    <td className="text-primary">
                                                        ●●●●●●●●●●●●
                                                        <span className="ml-2">
                                                            <ModalUpdateAccount />
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:col-span-3 lg:block">
                            <div className="image-myaccount w-full">
                                <Image src={images.profile_account} alt="" className="w-[120%] h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
