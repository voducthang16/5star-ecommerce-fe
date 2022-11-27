import './OrderSuccess.scss';

function OrderSuccess() {
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
                    <h1 className="mb-[10px] text-[20px] text-[#0f8fac] font-[500] lg:text-[22px] xl:text-[24px]">
                        Order Success
                    </h1>
                    <h5 className="mb-[6px] text-[14px] text-[#767676] font-[500] leading-[20px] xl:text-[15px]">
                        Payment Is Successfully Processsed And Your Order Is On The Way
                    </h5>
                    <h6 className="text-[14px] text[#262834] font-[600] tracking-[1.1px]">
                        Transaction ID:267676GHERT105467
                    </h6>
                </div>
            </div>
        </section>
    );
}

export default OrderSuccess;
