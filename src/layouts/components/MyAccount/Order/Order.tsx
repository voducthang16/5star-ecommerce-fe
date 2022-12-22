import { Badge, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { RiVipCrown2Line } from 'react-icons/ri';
import ModalViewOrder from './ModalViewOrder';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getOrderAsync, getOrder } from '~/features/order/orderSlice';
import { getUser } from '~/features/user/userSlice';
import { useEffect } from 'react';
import { convertDate } from '~/pages/Blog/Blog';
import { FormatPriceVND } from '~/utils/FormatPriceVND';

const Order = () => {
    const dispatch = useAppDispatch();
    const infoUser: any = useAppSelector(getUser);
    const order = useAppSelector(getOrder);
    useEffect(() => {
        if (infoUser.length !== 0) {
            dispatch(getOrderAsync(+infoUser?.id));
        }
    }, []);
    const handleStatus = (status: number) => {
        let resultStatus: any = { name: '', scheme: '' };
        switch (status) {
            case 1:
                resultStatus.name = 'Chưa xử lý';
                resultStatus.scheme = 'red';
                break;
            case 2:
                resultStatus.name = 'Đang xử lý';
                resultStatus.scheme = 'yellow';
                break;
            case 3:
                resultStatus.name = 'Đang giao hàng';
                resultStatus.scheme = 'blue';
                break;
            case 4:
                resultStatus.name = 'Thành công';
                resultStatus.scheme = 'green';
                break;
            case 5:
                resultStatus.name = 'Hủy';
                resultStatus.scheme = 'red';
                break;
            default:
                resultStatus.name = 'Chưa xử lý';
                resultStatus.scheme = 'red';
                break;
        }
        return resultStatus;
    };
    return (
        <div className="tab-order bg-[#f8f8f8] p-6 rounded-md shadow-sm">
            <div className="title inline-block">
                <h3 className="font-bold text-3xl text-tblack">Danh sách đơn hàng</h3>
                <span
                    className="line w-full text-center relative  mt-[-10px] 
                before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-[1px] before:left-0 before:bg-primary"
                >
                    <RiVipCrown2Line className="text-primary text-2xl bg-[#f8f8f8] w-[50px] z-[1] relative left-1/2 -translate-x-1/2" />
                </span>
            </div>
            <div className="content-order">
                <div className="card p-4 py-6 rounded-lg my-3">
                    <div className="table-responsive">
                        {order.length > 0 ? (
                            <>
                                <TableContainer>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Mã Đơn Hàng</Th>
                                                <Th>Ngày Đặt Hàng</Th>
                                                <Th>Trạng thái</Th>
                                                <Th>Tổng tiền</Th>
                                                <Th>Hành động</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody className="text-lg">
                                            {order?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>#{item.id}</Td>
                                                    <Td>{convertDate(item.create_at)}</Td>
                                                    <Td>
                                                        <Badge
                                                            py={2}
                                                            px={3}
                                                            borderRadius="15px !important"
                                                            colorScheme={handleStatus(item?.status).scheme}
                                                        >
                                                            {handleStatus(item?.status).name}
                                                        </Badge>
                                                    </Td>
                                                    <Td>{FormatPriceVND(item.total)}</Td>
                                                    <Td>
                                                        <ModalViewOrder id={item?.id} />
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </>
                        ) : (
                            'Chưa có đơn hàng'
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
