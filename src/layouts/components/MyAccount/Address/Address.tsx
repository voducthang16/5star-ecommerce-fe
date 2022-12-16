import { Button, useToast } from '@chakra-ui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { RiVipCrown2Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getUser } from '~/features/user/userSlice';
import ModalAddAddress from './ModalAddAddress';
import ModalUpdateAddress from './ModalUpdateAddress';

const Address = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const infoUser: any = useAppSelector(getUser);

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
                    {Object.keys(infoUser?.address).length !== 0 &&
                        infoUser?.address?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={`address-item relative text-left col-span-1 p-4 border 
                    w-fit rounded-xl border-gray-300 shadow-sm ${item?.isDefault ? '!border-2 !border-primary' : ''}`}
                            >
                                {item?.isDefault && (
                                    <div className="icon-active absolute right-5 top-[50%] translate-y-[-50%]">
                                        <AiOutlineCheckCircle className="text-4xl text-primary" />
                                    </div>
                                )}

                                <div className="grid grid-cols-12">
                                    <div className="col-span-10">
                                        <div className="address-name flex gap-2 mt-2">
                                            <p className="font-semibold">
                                                Địa chỉ:
                                                <span className="ml-1 active-hover:text-red-500">
                                                    {item?.address}, {item?.wardName?.name}, {item?.districtName?.name},{' '}
                                                    {item?.cityName?.name}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="address-mobile flex gap-2">
                                            <p className="font-semibold">
                                                Số điện thoại:
                                                <span className="ml-1">{item?.phone}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="action-edit flex gap-2 mt-2 text-xl">
                                    <ModalUpdateAddress id={item?.id}>
                                        <TbEdit />
                                    </ModalUpdateAddress>
                                    <Button p={1} className="p-2 rounded-md border" colorScheme="red">
                                        <MdDeleteOutline />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    {Object.keys(infoUser?.address).length === 0 && (
                        <p className="text-xl">Chưa có thông tin địa chỉ giao hàng nào !</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Address;
