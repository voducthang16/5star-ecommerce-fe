import { Button } from '@chakra-ui/react';
import { HiShoppingCart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.scss';

function OrderSuccess() {
    const Navigate = useNavigate();
    return (
        <section className="order-success-comp">
            <div className="px-5 py-10 bg-[#f7f7f7]">
                {/* image */}
                <div className="mx-[137px]">
                    <div className="mx-auto mb-5 relative w-[100px]">
                        <img
                            className="w-full"
                            src="https://themes.pixelstrap.com/oslo/assets/svg/order-success.svg"
                            alt=""
                        />
                        <img
                            className="w-[33%] absolute top-0 right-0 img-animation"
                            src="https://themes.pixelstrap.com/oslo/assets/svg/check.svg"
                            alt=""
                        />
                    </div>
                </div>

                {/* content */}
                <div className="text-center">
                    <h1 className="my-5 text-2xl text-primary font-[500]">
                        Đơn hàng của bạn đã được xác nhận thành công
                    </h1>
                    <Button colorScheme={'teal'} size="lg" rightIcon={<HiShoppingCart />} onClick={() => Navigate('/')}>
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default OrderSuccess;
