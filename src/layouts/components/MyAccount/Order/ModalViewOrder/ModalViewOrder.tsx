import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import Image from '~/components/Image';
import Config from '~/config';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
export const subString = (str: string, length: number = 30) => {
    if (str) {
        if (str.length > 30) {
            return str.substring(0, length) + '...';
        } else {
            return str;
        }
    } else {
        return '';
    }
};
interface OrderDetailProps {
    id?: number;
}

const ModalViewOrder = ({ id }: OrderDetailProps) => {
    const [flag, setFlag] = useState(false);
    const [list, setList] = useState<any>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        if (isOpen) {
            axios
                .get(Config.apiUrl + 'order' + `/${id}`)
                .then((res: any) => {
                    console.log(res.data.data);
                    setList(res.data.data);
                })
                .catch((err) => console.log(err));
        }
    }, [isOpen]);
    return (
        <>
            <Button
                onClick={() => {
                    onOpen();
                    setFlag(true);
                }}
                colorScheme="twitter"
            >
                <FaRegEye className="text-xl" />
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setFlag(false);
                }}
                size="4xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Đơn hàng #{id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="content grid grid-cols-1 mt-5 gap-5">
                            <div className="list-product col-span-1">
                                <div className="header-prod bg-primary w-full px-4 py-2 rounded-xl">
                                    <p className="text-bold text-xl text-white">Sản phẩm</p>
                                </div>
                                <div className="product px-4 mt-2">
                                    <Table variant="unstyled" borderBottom="1px solid #cccccc69">
                                        <Thead>
                                            <Tr>
                                                <Th className="!text-base">#</Th>
                                                <Th className="!text-base">Ảnh</Th>
                                                <Th className="!text-base">Tên sản phẩm</Th>
                                                <Th className="!text-base w-[25%]">Số lượng</Th>
                                                <Th className="!text-base">Giá</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {list?.details?.map((item: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>
                                                        {item?.product_info?.product?.images?.length > 0 && (
                                                            <Image
                                                                className="w-[150px] h-[120px] object-cover"
                                                                alt="Ảnh"
                                                                src={`${Config.apiUrl}upload/${item?.product_info?.product?.images[0].file_name}`}
                                                            />
                                                        )}
                                                    </Td>
                                                    <Td>{subString(item?.product_info?.product?.name, 40)}</Td>
                                                    <Td>{`${item?.quantity} x ${FormatPriceVND(item?.price || 0)}`}</Td>
                                                    <Td>{FormatPriceVND(item?.price * item?.quantity || 0)}</Td>
                                                </Tr>
                                            ))}
                                            <Tr>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td>
                                                    <p className="text-lg text-primary font-semibold">Tổng tiền</p>
                                                </Td>
                                                <Td></Td>
                                                <Td>
                                                    <p className="text-lg font-semibold">
                                                        {FormatPriceVND(list.total || 0)}
                                                    </p>
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                onClose();
                                setFlag(false);
                            }}
                        >
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalViewOrder;
