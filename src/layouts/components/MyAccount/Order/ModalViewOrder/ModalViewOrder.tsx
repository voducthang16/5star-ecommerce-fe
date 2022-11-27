import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { FaRegEye } from 'react-icons/fa';

const ModalViewOrder = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} colorScheme="twitter">
                <FaRegEye className="text-xl" />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Đơn hàng #22</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>BODY</ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Đóng
                        </Button>
                        <Button variant="ghost" type="submit">
                            Cập nhật
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalViewOrder;
