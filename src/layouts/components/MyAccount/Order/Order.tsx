import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { RiVipCrown2Line } from 'react-icons/ri';
import ModalViewOrder from './ModalViewOrder';

const Order = () => {
    return (
        <div className="tab-order bg-[#f8f8f8] p-6 rounded-md shadow-sm">
            <div className="title inline-block">
                <h3 className="font-semibold">Danh sách đơn hàng</h3>
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
                                    <Tr>
                                        <Td>#29</Td>
                                        <Td>11/08/2022</Td>
                                        <Td>Đang giao</Td>
                                        <Td>739.000đ</Td>
                                        <Td>
                                            <ModalViewOrder />
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>#9283</Td>
                                        <Td>11/08/2022</Td>
                                        <Td>Đang giao</Td>
                                        <Td>739.000đ</Td>
                                        <Td>
                                            <ModalViewOrder />
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
