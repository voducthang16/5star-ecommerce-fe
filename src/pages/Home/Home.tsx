import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import images from '~/assets/images';
import { Vector } from '~/components/Icons';
import Image from '~/components/Image';
import Product from '~/layouts/components/Product';
// import ProductService from '~/services/ProductService';
import { configSlide, fourStep, specialProduct, threeSmallSlide, sixSmallSlide } from '~/utils/DataMockup/HomePageData';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { fetchProductAsync, getProducts } from '~/features/product/productSlice';
import './Home.scss';
import { Helmet } from 'react-helmet-async';
import ProductService from '~/services/ProductService';
import { ResponseType } from '~/utils/Types';
import { FormatPriceVND } from '~/utils/FormatPriceVND';
import Config from '~/config';

function Home() {
    const [productSold, setProductSold] = useState<any>([]);
    const [productNew, setProductNew] = useState<any>([]);
    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);

    useEffect(() => {
        dispatch(fetchProductAsync({ page: 0, perPage: 8 }));
    }, [dispatch]);

    const getProductTopSold = () => {
        ProductService.getProductOrderBy({ orderBy: 'sold', perPage: 5 }).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setProductSold(res.data.data);
            }
        });
    };

    const getProductTopNew = () => {
        ProductService.getProductOrderBy({ orderBy: 'create_at', perPage: 5 }).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setProductNew(res.data.data);
            }
        });
    };

    useEffect(() => {
        getProductTopNew();
        getProductTopSold();
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Trang chủ</title>
            </Helmet>
            <div className="home overflow-hidden">
                {/* Big Slide */}
                <section className="bg-[#e3ffe6] ">
                    <div className=" !px-3 !md:px-0">
                        <div className="grid grid-cols-9 lg:gap-x-6">
                            <div className="hidden lg:block lg:col-span-2">
                                <div className="py-8 flex flex-col h-full justify-around items-center">
                                    {threeSmallSlide.map((item: any, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-[#ffcca2] px-4 pt-4 my-1 rounded-lg w-[80%]"
                                        >
                                            <Image className="w-2/5" src={item.img} alt={'Small Banner'} />
                                            <div>
                                                <h4 className="text-lg">{item.title}</h4>
                                                <Link
                                                    to={item.link}
                                                    className="inline-flex items-center text-base text-pink-500"
                                                >
                                                    Xem thêm <AiOutlineArrowRight className="ml-2" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="slide-hero col-span-9 lg:col-span-7">
                                <Swiper
                                    spaceBetween={30}
                                    grabCursor={true}
                                    effect={'creative'}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    creativeEffect={{
                                        prev: {
                                            translate: ['-120%', 0, -500],
                                        },
                                        next: {
                                            translate: ['120%', 0, -500],
                                        },
                                    }}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    navigation={true}
                                    modules={[Autoplay, Pagination, Navigation, EffectCreative]}
                                >
                                    {configSlide.map((slide: any, index: number) => (
                                        <SwiperSlide key={index}>
                                            <div className="relative pt-12 lg:py-44 cursor-pointer">
                                                <div className="pb-8 lg:pb-0">
                                                    <span className="desc-active block text-base md:text-xl text-slate-700 font-medium">
                                                        Trong mùa hè này, chúng tôi đang có 🔥
                                                    </span>
                                                    <h2
                                                        className="title-active mt-6 font-semibold text-3xl sm:text-4xl md:text-5xl w-[70%]
                                                    xl:text-5xl 2xl:text-6xl !leading-[114%] text-slate-900 relative z-10 break-words"
                                                    >
                                                        {slide.title}
                                                    </h2>
                                                    <Link
                                                        className="relative h-auto inline-flex items-center justify-center 
                                                            rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-6 
                                                            sm:py-5 sm:px-9 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 
                                                            text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 
                                                            focus:ring-offset-2 focus:ring-primary-6000 mt-10 link-active"
                                                        rel="noopener noreferrer"
                                                        to="/"
                                                    >
                                                        <span>Mua ngay</span>
                                                        <span>
                                                            <BsSearch className="ml-2 text-xl" />
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="lg:absolute lg:top-0 lg:bottom-0 lg:-right-[1rem] lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl z-[5]">
                                                    <Image
                                                        className="w-full h-full object-contain object-right-top img-active"
                                                        src={slide.logo}
                                                        alt="Slide"
                                                    />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 Slide  */}
                <section className="px-5 my-10 lg:my-20 ">
                    <div className="bg-white h-60">
                        <Swiper
                            spaceBetween={30}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                },
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            className="h-60"
                        >
                            {sixSmallSlide.map((item: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="relative h-full box-border overflow-hidden rounded-2xl group"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                    >
                                        <div className="absolute inset-0 opacity-0 bg-black/10 group-hover:opacity-40 cursor-pointer transition-opacity"></div>
                                        <div className="h-full p-6 flex justify-between bg-[#fefce8]">
                                            <div>
                                                <span className="block mb-2 text-sm text-slate-700">{item.brand}</span>
                                                <h2 className="text-lg md:text-2xl text-slate-900 font-semibold">
                                                    {item.title}
                                                </h2>
                                                <Link
                                                    to={item.link}
                                                    className="inline-block relative z-20 px-6 py-3 mt-4 bg-white text-sm font-medium rounded-full shadow-lg hover:bg-gray-100"
                                                >
                                                    Xem tất cả
                                                </Link>
                                            </div>
                                            <div className="min-w-[50%] flex items-center justify-center">
                                                <Image
                                                    className="w-full object-contain md:w-1/2"
                                                    src={item.img}
                                                    alt="Product"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* List Product */}
                <section className="container ">
                    <div className="py-10">
                        <div className="title-heading my-5 text-center">
                            <h3 className="uppercase font-bold text-4xl">sản phẩm nổi bật</h3>
                            <span className="title-divider">
                                <span className="square"></span>
                                <span className="square"></span>
                            </span>
                            <p className="text-tbase text-xl font-normal my-2">
                                Những sản phẩm thời trang nổi bật, được giới trẻ ưa thích nhất
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-10">
                            {products.map((item: any, index: number) => (
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
                            ))}
                        </div>
                    </div>
                </section>

                {/* SPECIAL PRODUCT IMAGE */}
                <section className="special-products container">
                    <div className="py-10 lg:py-20">
                        <div className="title-heading my-5 text-center mb-10">
                            <h3 className="uppercase font-bold text-4xl" data-aos="fade-up" data-aos-delay="100">
                                Danh mục đặc biệt
                            </h3>
                            <span className="title-divider">
                                <span className="square"></span>
                                <span className="square"></span>
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full">
                            {specialProduct.map((item, index: number) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    className={`lookbook-item relative col-span-2 h-fit
                                text-right overflow-hidden rounded-md cursor-pointer ${item.column}`}
                                >
                                    <Link to={item.link} className="">
                                        <div
                                            className="content absolute bottom-6 left-2/4 -translate-x-2/4 w-[90%] p-3 
                                    shadow-md text-center bg-white opacity-80"
                                        >
                                            <h3
                                                className="text-lg font-semibold text-tbase"
                                                data-aos="fade-down"
                                                data-aos-delay="200"
                                            >
                                                {/* {item.title} */}
                                            </h3>
                                            <h2
                                                className="text-xl text-tblack font-bold"
                                                data-aos="fade-up"
                                                data-aos-delay="200"
                                            >
                                                {item.title}
                                            </h2>
                                        </div>
                                        <Image src={item.image} className="h-auto w-full object-cover object-center" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Sale */}
                <section className="sale ">
                    <div className="py-10 lg:py-20">
                        <div className="p-10 bg-[#f6f8fa] rounded-2xl shadow-sm">
                            <div className="container grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                                <div className="col-span-1">
                                    <div className="h-full flex flex-col justify-center">
                                        <div>
                                            <h6
                                                className="inline-block text-lg px-2 py-1 bg-[#f34770] text-white rounded-md mb-5"
                                                data-aos="fade-up"
                                                data-aos-delay="200"
                                            >
                                                Ưu đãi giới hạn
                                            </h6>
                                        </div>
                                        <h4
                                            className="text-4xl mt-2 font-semibold uppercase"
                                            data-aos="fade-up"
                                            data-aos-delay="200"
                                        >
                                            Tất cả
                                        </h4>
                                        <h3
                                            className="text-4xl mt-2 font-semibold uppercase my-3"
                                            data-aos="fade-up"
                                            data-aos-delay="200"
                                        >
                                            sản phẩm mới nhất
                                        </h3>
                                        <p className="text-xl mb-5" data-aos="fade-up" data-aos-delay="200">
                                            Đang giảm giá. Nhanh tay nào!
                                        </p>
                                        <Countdown date="2022-12-30T01:02:03" renderer={renderer} />
                                        <div className="mt-6">
                                            <Link to="/">
                                                <Button
                                                    colorScheme="teal"
                                                    className="!py-[25px] !px-[50px] !text-2xl"
                                                    data-aos="fade-up"
                                                    data-aos-delay="200"
                                                >
                                                    Mua ngay
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="image-sale-big col-span-1 flex items-center justify-center p-5 relative">
                                    <Image
                                        data-aos="fade-up"
                                        data-aos-delay="200"
                                        className="object-cover max-w-full w-[70%] h-auto z-[2] relative"
                                        src={'https://uiuxom.com/ulina/html/images/home1/7.png'}
                                        alt={'Sale Product'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 4 Step */}

                <section className="container">
                    <div className="py-10 lg:py-20">
                        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 xl:gap-20">
                            <div className="hidden md:block absolute inset-x-0 top-5">
                                <Vector className="w-full" />
                            </div>
                            {fourStep.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="relative flex flex-col items-center max-w-xs mx-auto"
                                    data-aos="fade-left"
                                    data-aos-delay={index * 200}
                                >
                                    <div className="mb-4 sm:mb-6 max-w-[140px] mx-auto">
                                        <Image src={item.image} alt="Step 1" />
                                    </div>
                                    <div className="text-center space-y-5">
                                        <span
                                            className={`inline-flex px-2.5 py-1 rounded-full font-medium text-base relative ${item.color}`}
                                        >
                                            Bước {index + 1}
                                        </span>
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <span className="block text-slate-600 dark:text-slate-400 text-base leading-6">
                                            {item.sub_title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Best Accessories */}
                <section className="container py-10 lg:py-24 ">
                    <div className="title-heading my-5 text-center mb-10">
                        <h3 className="uppercase font-bold text-4xl" data-aos="fade-up" data-aos-delay="200">
                            Thương hiệu yêu thích
                        </h3>
                        <span className="title-divider" data-aos="fade-up" data-aos-delay="300">
                            <span className="square"></span>
                            <span className="square"></span>
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 md:gap-x-6">
                        <div className="col-span-1">
                            <h3 className="mb-4 text-base font-medium" data-aos="fade-up" data-aos-delay="200">
                                Bán chạy nhất
                            </h3>
                            <div className="space-y-2">
                                {productSold?.map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="pb-2 flex items-center space-x-4 border-b border-slate-200"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 200}
                                    >
                                        <div className="min-w-[64px] h-16">
                                            <Image
                                                src={`${Config.apiUrl}upload/${item?.images[0]?.file_name}`}
                                                alt={'Product'}
                                                className={'w-full h-full object-contain'}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-2">
                                            <h5 className="text-sm font-semibold text-gray-700">{item?.name}</h5>
                                            <span className="text-xs font-medium text-blue-700/90">
                                                {FormatPriceVND(item?.stocks[0].price)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <h3 className="mb-4 text-base font-medium">Hàng mới</h3>
                            <div className="space-y-2">
                                {productNew?.map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="pb-2 flex items-center space-x-4 border-b border-slate-200"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 200}
                                    >
                                        <div className="min-w-[64px] h-16">
                                            <Image
                                                src={`${Config.apiUrl}upload/${item?.images[0]?.file_name}`}
                                                alt={'Product'}
                                                className={'w-full h-full object-contain'}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-2">
                                            <h5 className="text-sm font-semibold text-gray-700">{item?.name}</h5>
                                            <span className="text-xs font-medium text-blue-700/90">
                                                {FormatPriceVND(item?.stocks[0].price)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden lg:block lg:col-span-1">
                            <Image className="w-full object-contain" src={images.b_banner} alt={'Best Accessories'} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
        <span>
            <div className="ulinaCountDown is-countdown">
                <span className="countdown-row countdown-show flex gap-5 text-center">
                    <span className="countdown-section flex flex-col text-center justify-center">
                        <span className="countdown-amount bg-[#fff] text-xl h-[60px] w-[60px] rounded-full p-4 text-center shadow-sm">
                            {days}
                        </span>
                        <span className="countdown-period">Ngày</span>
                    </span>
                    <span className="countdown-section flex flex-col">
                        <span className="countdown-amount bg-[#fff] text-xl h-[60px] w-[60px] rounded-full p-4 text-center shadow-sm">
                            {hours}
                        </span>
                        <span className="countdown-period">Giờ</span>
                    </span>
                    <span className="countdown-section flex flex-col">
                        <span className="countdown-amount bg-[#fff] text-xl h-[60px] w-[60px] rounded-full p-4 text-center shadow-sm">
                            {minutes}
                        </span>
                        <span className="countdown-period">Phút</span>
                    </span>
                    <span className="countdown-section flex flex-col">
                        <span className="countdown-amount bg-[#fff] text-xl h-[60px] w-[60px] rounded-full p-4 text-center shadow-sm">
                            {seconds}
                        </span>
                        <span className="countdown-period">Giây</span>
                    </span>
                </span>
            </div>
        </span>
    );
};
