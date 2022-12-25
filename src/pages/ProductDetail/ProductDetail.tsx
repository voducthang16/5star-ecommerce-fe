import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useParams, useLocation } from 'react-router-dom';
import { Mousewheel, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import Breadcrumb from '~/components/Breadcrumb';
import { PackageIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
import Config from '~/config';
import { fetchDetailProductAsync, fetchProductAsync, getDetail, getProducts } from '~/features/product/productSlice';
import Product from '~/layouts/components/Product';
import Rate from '~/layouts/components/Rate';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import './ProductDetail.scss';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import SizeGuideComp from '~/layouts/components/SizeGuideComp';
import { getUser } from '~/features/user/userSlice';
import CartService from '~/services/CartService';
import { ResponseType } from '~/utils/Types';
import { addToCart, getProductInCart, updateToCart } from '~/features/cart/cartSlice';
function ProductDetail() {
    const dispatch = useAppDispatch();
    const detail = useAppSelector(getDetail);
    const [loading, setLoading] = useState(false);
    const [filled, setFilled] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [paginationImage, setPaginationImage] = useState<any>('');
    const { slug } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imgInCart, setImgInCart] = useState<any>('');
    const products = useAppSelector(getProducts);

    const location = useLocation();
    useEffect(() => {
        dispatch(fetchProductAsync({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchDetailProductAsync(slug!));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const infoUser: any = useAppSelector(getUser);
    const productAddCart = useAppSelector(getProductInCart);

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

    const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        let quantity = +e.target.value;
        setQuantity(quantity);
    };
    const lengthImage = detail?.images?.length;

    const color = Object.entries(detail?.classify_1 || {});
    const size = Object.entries(detail?.classify_2 || {});
    const money: Array<any> = [];

    detail?.stocks?.forEach((item: any) => {
        money.push(item.price);
    });
    const toast = useToast();
    const img = detail?.images;
    console.log(img);
    // custom bullets

    const [width, setWidth] = useState(0);
    useEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 1024) {
            setWidth(0);
        } else {
            setWidth(1);
        }
    }, []);

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: any) {
            let string = '';
            string += `<span class=${className}>
                <img src='${Config.apiUrl}upload/${img[index].file_name}'/>
            </span>`;
            return string;
        },
    };

    const requestAddToCart = (idStock: number) => {
        let dataSendRequest: any = {
            id_product: idStock,
            quantity: quantity,
            image: imgInCart,
        };
        CartService.addToCart(dataSendRequest).then((res: ResponseType) => {
            if (res.statusCode === 201) {
                const existProduct = productAddCart.find((item: any) => item.id_product === idStock);
                if (existProduct) {
                    let dataRedux: any = {
                        id_product: idStock,
                        quantity: existProduct.quantity + quantity,
                    };
                    dispatch(updateToCart(dataRedux));
                } else {
                    dispatch(addToCart(dataSendRequest));
                }
                toast({
                    title: 'Thông báo',
                    description: 'Thêm vào giỏ hàng',
                    status: 'success',
                    position: 'bottom-right',
                    duration: 3000,
                    isClosable: true,
                });
            }
        });
    };

    const handleAddToCart = (e: any, idProduct: number, type: number) => {
        e.preventDefault();
        if (infoUser.length === 0) {
            toast({
                title: 'Thông báo',
                description: 'Vui lòng đăng nhập',
                status: 'warning',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        let idColor: number = 0;
        let idSize: number = 0;
        let idAttr: number = 0;
        const colorArray = document.querySelectorAll('.color');
        colorArray.forEach((item: any) => {
            if (item.checked === true) {
                idColor = +item.value;
            }
        });
        const sizeArray = document.querySelectorAll('.size');
        sizeArray.forEach((item: any) => {
            if (item.checked === true) {
                idSize = +item.value;
            }
        });

        if (type === 0) {
            const find_product = products.find((item: any) => item.id === idProduct) as any;
            let stockProduct = find_product?.stocks;
            if (stockProduct?.length === 1) {
                let idAttr = stockProduct[0].id;
                requestAddToCart(idAttr);
            }
        } else if (type === 1) {
            if (idColor) {
                const find_product = products.find((item: any) => item.id === idProduct) as any;
                idAttr = find_product.stocks.find((item: any) => item.id_classify_1 === idColor).id;
                requestAddToCart(idAttr);
            } else {
                toast({
                    title: 'Thông báo',
                    description: 'Vui lòng chọn màu',
                    status: 'warning',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else if (type === 2) {
            if (idColor && idSize) {
                const find_product = products.find((item: any) => item.id === idProduct) as any;
                idAttr = find_product.stocks.find(
                    (item: any) => item.id_classify_1 === idColor && item.id_classify_2 === idSize,
                ).id;
                requestAddToCart(idAttr);
            } else if (idSize) {
                toast({
                    title: 'Thông báo',
                    description: 'Vui lòng chọn màu',
                    status: 'warning',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            } else if (idColor) {
                toast({
                    title: 'Thông báo',
                    description: 'Vui lòng chọn size',
                    status: 'warning',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Thông báo',
                    description: 'Vui lòng chọn thuộc tính',
                    status: 'warning',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return loading ? (
        <Loading />
    ) : (
        <div className="product-detail">
            <Breadcrumb page={'Sản phẩm'} shareUrl={location.pathname} />
            <section className="container pb-10 lg:pb-20">
                <div className="grid grid-cols-12 lg:gap-4 shadow-2xl lg:p-4 rounded-2xl">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="swiper-progressbar">
                            <div style={{ height: `${filled}%` }} className={`progressbar`}></div>
                            <Swiper
                                onSlideChange={(item) => {
                                    setFilled(+(((1 + item.realIndex) / lengthImage) * 100).toFixed(2));
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
                                {img?.map((item: any, index: number) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            className="md:mx-auto object-contain h-full"
                                            src={`${Config.apiUrl}upload/${item.file_name}`}
                                            alt={'Product'}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                        <div className="space-y-4 mt-4 lg:mt-0 px-7 lg:px-0">
                            <h3 className="text-2xl font-bold">{detail?.name}</h3>
                            <h4 className="text-base font-normal flex items-center space-x-2">
                                <PackageIcon width={16} height={16} className="mr-2" />
                                Tình trạng:<span className="inline-block text-[#29b474]">Còn hàng</span>
                            </h4>
                            <div className="flex items-center">
                                <Rate className="flex space-x-1" average={3.7} />
                                <span className="ml-1 inline-block text-sm text-[#aeb4be]">(17)</span>
                                <span className="ml-2 inline-block text-sm text-[#aeb4be]">
                                    Đã bán (web): {detail?.sold}
                                </span>
                            </div>
                            <div className="flex space-x-4 text-base items-end">
                                <span className="font-semibold">{FormatPriceVND(Math.min(...money))}</span>
                                {/* <del className="text-[#c4c4c4]">329.000 VND</del>
                                <span className="text-[#ff3102] text-sm">-50%</span> */}
                            </div>

                            {color?.length > 0 ? (
                                <div>
                                    <p className="mb-2">Màu sắc</p>
                                    <div className="flex space-x-4 items-center text-sm h-10 mt-4">
                                        {color?.reverse()?.map(([key, value]: any, index: any) => (
                                            <div key={index}>
                                                <input
                                                    className="color w-px h-px appearance-none"
                                                    type="radio"
                                                    name="color"
                                                    id={`c_${detail.id}_${value}`}
                                                    value={value}
                                                    onClick={() => {
                                                        setImgInCart(img[index].file_name);
                                                    }}
                                                />
                                                <label
                                                    className="color-label bg-white cursor-pointer relative inline-block w-8 h-8 border-[3px] border-slate-400 shadow-sm rounded-full"
                                                    htmlFor={`c_${detail.id}_${value}`}
                                                >
                                                    <span
                                                        style={{ backgroundColor: `${key}` }}
                                                        className={`absolute inset-1 rounded-full`}
                                                    ></span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {size?.length > 0 ? (
                                <div>
                                    <p className="mb-2">Kích thước</p>
                                    <div className="flex space-x-4 text-sm">
                                        {size?.map(([key, value]: any, index: any) => (
                                            <div key={index}>
                                                <input
                                                    className="size w-px h-px appearance-none"
                                                    type="radio"
                                                    value={value}
                                                    name="size"
                                                    id={`s_${detail.id}_${value}`}
                                                />
                                                <label
                                                    className="size-label bg-white w-8 h-8 text-center cursor-pointer
                                                leading-8 inline-block border border-slate-200 rounded-lg"
                                                    htmlFor={`s_${detail.id}_${value}`}
                                                >
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* Check Size Here */}
                            <Button onClick={onOpen}>Hướng Dẫn Chọn Size</Button>

                            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Hướng Dẫn Chọn Size</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <SizeGuideComp />
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme="red" onClick={onClose}>
                                            Đóng
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>

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
                                        onChange={(e) => changeQuantity(e)}
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
                            <div className="flex items-center space-x-4 pb-6">
                                <Button
                                    onClick={(e) => handleAddToCart(e, detail?.id, detail?.classify_n)}
                                    rightIcon={<HiOutlineShoppingCart />}
                                    colorScheme="teal"
                                    size="lg"
                                    className="text-base py-3 px-5 rounded-lg text-white"
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                                <span>
                                    <AiFillHeart className="fill-[#cccccc] text-3xl" />
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
                            <AccordionItem border="none">
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left" className="text-2xl font-semibold">
                                            Mô tả
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="text-base bg-gray-100 rounded-md text-left !p-4">
                                    <p dangerouslySetInnerHTML={{ __html: detail?.description }}></p>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem border="none">
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left" className="text-2xl font-semibold">
                                            Thông số sản phẩm
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} className="text-base">
                                    {detail?.info_detail?.map((item: any, index: number) => (
                                        <p key={index}>- {item}</p>
                                    ))}
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
                    <div className="col-span-12 lg:col-span-8 flex flex-wrap items-center justify-start gap-2 text-base">
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
                    {/* Loop Here */}
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
                    {/* End Loop */}
                    <div className="flex space-x-4 border-slate-200 border-b py-4">
                        <div className="w-20 h-20">
                            <Image
                                className="w-full object-contain rounded-full"
                                src="https://cartzilla.createx.studio/img/shop/reviews/01.jpg"
                            />
                        </div>
                        <div className="flex flex-col justify-between space-y-2">
                            <span className="text-sm text-gray-600">Tên người dùng</span>
                            <Rate className="flex space-x-1" average={0} />
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
            <section className="py-20 mb-40 border-t border-slate-200">
                <div className="title-heading my-5 text-center mb-10">
                    <h3 className="font-bold text-4xl">Sản phẩm liên quan</h3>
                    <span className="title-divider">
                        <span className="square"></span>
                        <span className="square"></span>
                    </span>
                    <p className="text-tbase text-xl font-normal my-2">Có thể bạn cũng thích những sản phẩm dưới đây</p>
                </div>
                <div className="container">
                    <Swiper slidesPerView={4} spaceBetween={30} navigation={true} modules={[Navigation]}>
                        {products.map((item: any, index: number) => (
                            <SwiperSlide key={index}>
                                <div key={index} className="col-span-1" data-aos="zoom-in" data-aos-delay="200">
                                    <Product
                                        idProduct={item.id}
                                        name={item.name}
                                        slug={item.slug}
                                        color={item.classify_1}
                                        size={item.classify_2}
                                        type={item.classify_n}
                                        images={item.images}
                                        stocks={item.stocks}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;
