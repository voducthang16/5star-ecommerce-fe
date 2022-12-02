import { Button } from '@chakra-ui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { RiVipCrown2Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import ModalAddAddress from './ModalAddAddress';

const Address = () => {
    return (
        <div className="tab-order bg-[#f8f8f8] p-6 rounded-md shadow-sm">
            <div className="title inline-block">
                <h3 className="font-bold text-3xl text-tblack">Danh sách địa chỉ</h3>
                <span
                    className="line w-full text-center relative  mt-[-10px] 
                before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-[1px] before:left-0 before:bg-primary"
                >
                    <RiVipCrown2Line className="text-primary text-2xl bg-[#f8f8f8] w-[50px] z-[1] relative left-1/2 -translate-x-1/2" />
                </span>
            </div>
            <div className="content-address">
                <div className="action-add-address flex justify-end w-full">
                    <ModalAddAddress />
                </div>

                <div className="address-list mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                        className="address-item relative text-left col-span-1 p-4 border 
                    w-fit rounded-xl border-gray-300 shadow-sm active active:bg-primary active:text-white"
                    >
                        <div className="icon-active absolute right-5 top-[50%] translate-y-[-50%]">
                            <AiOutlineCheckCircle className="text-3xl text-primary active:text-white" />
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="col-span-10">
                                <div className="address-name flex gap-2 mt-2">
                                    <p className="font-semibold">
                                        Địa chỉ:
                                        <span className="ml-1">292 Ấp Hựu Lộc, Long Hựu Tây, Cần Đước, Long An</span>
                                    </p>
                                </div>
                                <div className="address-mobile flex gap-2">
                                    <p className="font-semibold">
                                        Số điện thoại:
                                        <span className="ml-1">0364303998</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="action-edit flex gap-2 mt-2 text-xl">
                            <Button p={1} className="p-2 rounded-md border" colorScheme="blue">
                                <TbEdit />
                            </Button>
                            <Button p={1} className="p-2 rounded-md border" colorScheme="red">
                                <MdDeleteOutline />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
