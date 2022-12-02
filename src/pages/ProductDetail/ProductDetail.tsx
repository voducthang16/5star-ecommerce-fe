import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoNotifications } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { Mousewheel, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Breadcrumb from '~/components/Breadcrumb';
import { PackageIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
import Rate from '~/layouts/components/Rate';
import './ProductDetail.scss';
function ProductDetail() {
    const [loading, setLoading] = useState(true);
    const [filled, setFilled] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleQuantity = (type: string) => {
        if (type === 'asc') {
            setQuantity(quantity + 1);
        } else {
            if (quantity <= 1) {
                setQuantity(1);
            } else {
                setQuantity(quantity - 1);
            }
        }
    };

    const length = 3;
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    const { slug } = useParams();
    const productFakeData = [
        {
            id: 'product_1',
            color: ['#a78bfa', '#facc15', '#2c3b54'],
            images: [
                'https://cartzilla.createx.studio/img/shop/catalog/01.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/02.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/03.jpg',
            ],
        },
        {
            id: 'product_2',
            color: ['#fb923c', '#38bdf8', '#4ade80'],
            images: [
                'https://cartzilla.createx.studio/img/shop/catalog/01.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/02.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/03.jpg',
            ],
        },
        {
            id: 'product_3',
            color: ['#fb923c', '#38bdf8', '#4ade80'],
            images: [
                'https://cartzilla.createx.studio/img/shop/catalog/01.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/02.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/03.jpg',
            ],
        },
        {
            id: 'product_4',
            color: ['#fb923c', '#38bdf8', '#4ade80'],
            images: [
                'https://cartzilla.createx.studio/img/shop/catalog/01.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/02.jpg',
                'https://cartzilla.createx.studio/img/shop/catalog/03.jpg',
            ],
        },
    ];
    const img = [
        'https://i.imgur.com/zHTIVMk.jpg',
        'https://i.imgur.com/sPnmn3M.jpg',
        'https://i.imgur.com/TnQejuQ.jpg',
    ];
    // custom bullets
    const pagination = {
        clickable: true,
        renderBullet: function (index: any, className: any) {
            let string = '';
            string += `<span class=${className}>
                <img src="${img[index]}"/>
            </span>`;
            return string;
        },
    };
    const [width, setWidth] = useState(0);

    return loading ? (
        <Loading />
    ) : (
        <div className="product-detail">
            <Breadcrumb page={'Sản phẩm'} />
            <section className="container pb-10 lg:pb-20">
                <div className="grid grid-cols-12 lg:gap-4 shadow-2xl lg:p-4 rounded-2xl">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="swiper-progressbar">
                            <div style={{ height: `${filled}%` }} className={`progressbar`}></div>
                            <Swiper
                                onSlideChange={(item) => {
                                    setFilled(+(((1 + item.realIndex) / length) * 100).toFixed(2));
                                }}
                                direction={width > 0 ? 'vertical' : 'horizontal'}
                                slidesPerView={1}
                                spaceBetween={width > 0 ? 30 : 0}
                                mousewheel={true}
                                loop={true}
                                pagination={pagination}
                                modules={[Mousewheel, Pagination]}
                                className="md:w-full md:h-[500px]"
                            >
                                {img.map((item: any, index) => (
                                    <SwiperSlide>
                                        <Image
                                            className="md:mx-auto object-contain h-full"
                                            src={`${item}`}
                                            alt={'Product'}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                        <div className="space-y-4 mt-4 lg:mt-0 px-2 lg:px-0">
                            <h3 className="text-2xl font-bold">Áo Polo Nam thời trang mát mẻ</h3>
                            <h4 className="text-base font-normal flex items-center space-x-2">
                                <PackageIcon width={16} height={16} className="mr-2" />
                                Tình trạng:<span className="inline-block text-[#29b474]">Còn hàng</span>
                            </h4>
                            <div className="flex items-center">
                                <Rate className="flex space-x-1" average={3.7} />
                                <span className="ml-1 inline-block text-sm text-[#aeb4be]">(17)</span>
                                <span className="ml-2 inline-block text-sm text-[#aeb4be]">Đã bán(web): 12345</span>
                            </div>
                            <div className="flex space-x-4 text-base items-end">
                                <span className="font-semibold">289.000 VND</span>
                                <del className="text-[#c4c4c4]">329.000 VND</del>
                                <span className="text-[#ff3102] text-sm">-50%</span>
                            </div>
                            <div className="text-base">
                                <span>Màu sắc: ĐỎ</span>
                                <div className="mt-2 flex space-x-2">
                                    <span className="inline-block w-16 h-16 border border-slate-200 p-1 rounded-lg">
                                        <Image
                                            className="object-contain w-full h-full"
                                            src="https://levents.asia/wp-content/uploads/2022/08/z3745138708990_ae6f522e0a05800faa5a33c159841f4b-1536x1536.jpg"
                                        />
                                    </span>
                                    <span className="inline-block w-16 h-16 border border-slate-200 p-1 rounded-lg">
                                        <Image
                                            className="object-contain w-full h-full"
                                            src="https://levents.asia/wp-content/uploads/2022/08/z3745138708990_ae6f522e0a05800faa5a33c159841f4b-1536x1536.jpg"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="text-base">
                                <span>Kích thước</span>
                                <div className="mt-2 flex items-center space-x-4">
                                    <div className="py-2 rounded-lg bg-slate-700 text-white min-w-[60px] text-center">
                                        S
                                    </div>
                                    <div className="py-2 rounded-lg bg-slate-700 text-white min-w-[60px] text-center">
                                        M
                                    </div>
                                    <div className="py-2 rounded-lg bg-slate-700 text-white min-w-[60px] text-center">
                                        L
                                    </div>
                                    <div className="py-2 rounded-lg bg-slate-700 text-white min-w-[60px] text-center">
                                        XL
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center w-[150px] quantity-group bg-slate-100 rounded-2xl p-2 py-3 shadow-sm">
                                    <span
                                        className="minusBtn text-base p-1 cursor-pointer rounded-full border text-black border-gray-400 ml-2 hover:bg-black hover:text-white transition-all duration-200"
                                        onClick={() => handleQuantity('dec')}
                                    >
                                        <AiOutlineMinus />
                                    </span>
                                    <input
                                        className="quantity-number w-full border border-slate-200 p-1"
                                        type="number"
                                        value={quantity}
                                        min={0}
                                    />
                                    <span
                                        className="plusBtn text-base p-1  cursor-pointer rounded-full border text-black border-gray-400 mr-2  hover:bg-black hover:text-white transition-all duration-200"
                                        onClick={() => handleQuantity('asc')}
                                    >
                                        <AiOutlinePlus />
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600/90">100 sản phẩm</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="text-base py-3 px-5 bg-pink-400 rounded-lg text-white">
                                    Thêm vào giỏ hàng
                                </button>
                                <span>
                                    <AiFillHeart className="fill-[#cccccc]" />
                                </span>
                                <span>
                                    <IoNotifications className="fill-[#cccccc]" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="border-t border-b border-slate-200 py-10 lg:py-20">
                <div className="container">
                    <div className="mx-4 lg:mx-20">
                        <h5 className="text-4xl mb-4 font-bold text-gray-900">Chi tiết sản phẩm</h5>
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left" className="text-2xl font-semibold">
                                            Mô tả
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="text-base">
                                    Giới thiệu đến bạn chiếc áo polo nam chiếc áo sẽ giúp cho các chàng trai trở nên
                                    lịch lãm, sang trọng và trẻ trung hơn. Với collection này thì Coolmate sẽ mang cho
                                    bạn một mẫu áo polo nam với nhưng họa tiết đơn giản nhưng rất trẻ trung và dễ mix đồ
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left" className="text-2xl font-semibold">
                                            Thông số sản phẩm
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="text-base">
                                    <p>- Chất liệu: 97% Cotton USA + 3% Spandex </p>
                                    <p>
                                        - Với chất liệu Cotton USA chất lượng cao, mang lại sự mềm mại và thấm hút mồ
                                        hôi tốt
                                    </p>
                                    <p>- Co giãn 4 chiều mang lại sự thoải mái khi mặc</p>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>
            <section className="container pb-10 lg:pb-20">
                <div className="grid grid-cols-12 gap-5 py-10 lg:py-20 border-b border-slate-200">
                    <div className="col-span-12 lg:col-span-4">
                        <h6 className="text-2xl text-gray-800 font-bold mb-4">70 Đánh giá</h6>
                        <div className="flex text-base items-center space-x-2">
                            <Rate className="flex space-x-1" average={4.5} />
                            <span>4.5</span>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8 flex flex-wrap items-center justify-between text-base">
                        <div className="w-24 py-2 my-2 font-semibold text-center rounded-lg border border-slate-500">
                            Tất cả
                        </div>
                        <div className="w-24 py-2 my-2 font-semibold text-center rounded-lg border border-slate-500">
                            5 Sao
                        </div>
                        <div className="w-24 py-2 my-2 font-semibold text-center rounded-lg border border-slate-500">
                            4 Sao
                        </div>
                        <div className="w-24 py-2 my-2 font-semibold text-center rounded-lg border border-slate-500">
                            3 Sao
                        </div>
                        <div className="w-24 py-2 my-2 font-semibold text-center rounded-lg border border-slate-500">
                            2 Sao
                        </div>
                        <div className="w-24 py-2 my-2 font-semibold text-center rounded-lg border border-slate-500">
                            1 Sao
                        </div>
                    </div>
                </div>
                <div className="mt-10 lg:mt-20">
                    <div className="flex space-x-4 border-slate-200 border-b py-4">
                        <div className="w-20 h-20">
                            <Image
                                className="w-full object-contain rounded-full"
                                src="https://cartzilla.createx.studio/img/shop/reviews/01.jpg"
                            />
                        </div>
                        <div className="flex flex-col justify-between space-y-2">
                            <span className="text-sm text-gray-600">Tên người dùng</span>
                            <Rate className="flex space-x-1" average={3} />
                            <div className="text-base">10.10.2022</div>
                            <p className="text-base">Phản hồi</p>
                        </div>
                    </div>
                    <div className="flex space-x-4 border-slate-200 border-b py-4 last:border-b-0">
                        <div className="w-20 h-20">
                            <Image
                                className="w-full object-contain rounded-full"
                                src="https://cartzilla.createx.studio/img/shop/reviews/01.jpg"
                            />
                        </div>
                        <div className="flex flex-col justify-between space-y-2">
                            <span className="text-sm text-gray-600">Tên người dùng</span>
                            <Rate className="flex space-x-1" average={4} />

                            <div className="text-base">10.10.2022</div>
                            <p className="text-base">Feedback</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* San pham lien quan */}
            {/* <section className="py-20 mb-40 border-t border-slate-200">
                <div className="container">
                    <Swiper slidesPerView={4} spaceBetween={30} navigation={true} modules={[Navigation]}>
                        {productFakeData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Rate average={5} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section> */}
        </div>
    );
}

export default ProductDetail;
