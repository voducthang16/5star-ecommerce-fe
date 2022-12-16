import { BiRightArrowAlt } from 'react-icons/bi';
import { BsCartCheck } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import images from '~/assets/images';
import Breadcrumb from '~/components/Breadcrumb';
import Image from '~/components/Image';
import Rate from '~/layouts/components/Rate';
import { fourStepAbout } from '~/utils/DataMockup/AboutPageData';
import './About.scss';
import { Helmet } from 'react-helmet-async';
function About() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Giới thiệu</title>
            </Helmet>
            <section className="about-comp mt-5">
                <Breadcrumb page="Giới thiệu" />
                <div className="container mt-10">
                    <div className="mb-[32px] grid grid-cols-2 gap-5 lg:gap-20">
                        <div className="flex justify-center gap-5 col-span-2 lg:col-span-1">
                            <div className="image-banner-1 max-w-[400px] h-[90%]" data-aos="zoom-in-up">
                                <Image
                                    src={images.about_man_jean}
                                    alt=""
                                    className="rounded-bl-[50px] rounded-tr-[50px] w-full h-full object-cover object-center overflow-hidden"
                                />
                            </div>
                            <div className="image-banner-2 max-w-[400px] h-[90%]" data-aos="zoom-in-up">
                                <Image
                                    alt=""
                                    src={images.about_women}
                                    className="rounded-tl-[50px] rounded-br-[50px] w-full h-full overflow-hidden object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="mt-[16px] lg:px-[24px] col-span-2 lg:col-span-1 px-5">
                            <div data-aos="fade-up">
                                <h4
                                    className="mb-[8px] text-xl font-semibold capitalize text-primary"
                                    data-aos="fade-up"
                                >
                                    Về chúng tôi
                                </h4>
                                <h2
                                    className="mb-[12px] text-[28px] capitalize font-semibold text-[#222222]"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    Chúng tôi tạo ra những sản phẩm độc đáo
                                </h2>
                            </div>
                            <div>
                                <p
                                    className="text-lg text-justify leading-6 text-[#4a5568] font-normal"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    5star là lựa chọn hàng đầu dành cho các tín đồ thời trang Streetwear sành điệu. Sứ
                                    mệnh của 5star là trao quyền cho thế hệ trẻ toàn thế giới tự do thể hiện phong cách
                                    thông qua thời trang, thương hiệu vượt qua ranh giới của thời trang streetwear bằng
                                    cách không ngừng sáng tạo các trang phục với các bộ sưu tập độc đáo.
                                </p>
                                <ul className="mt-[32px]" data-aos="fade-up">
                                    {fourStepAbout.map((item: any, index: number) => (
                                        <li
                                            className="my-5"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 200}
                                            key={index}
                                        >
                                            <div className="flex">
                                                <div className="icon text-primary mr-3">{item?.icon}</div>
                                                <div className="">
                                                    <h5 className="text-lg font-semibold text-[#222222]">
                                                        {item?.title}
                                                    </h5>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-[32px] px-[28px] bg-[#f8f8f8]">
                    <div className="text-center">
                        <h4 className="mb-[8px] text-xl font-semibold capitalize text-primary" data-aos="fade-up">
                            Chúng tôi làm được gì
                        </h4>
                        <h2 className="mb-[28px] text-[23px]" data-aos="fade-up" data-aos-delay="300">
                            Chúng tôi được khách hàng tin cậy
                        </h2>
                    </div>
                    <div className="px-[14px] mb-[30px]">
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
                        >
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <SwiperSlide key={index}>
                                    <div className="item-slider cursor-pointer" data-aos="zoom-in-up">
                                        <div className="p-[28px] rounded-[22px] bg-[#fff] mr-[12px]">
                                            <span className="icon text-[3rem] text-primary mb-2 inline-block">
                                                <BsCartCheck />
                                            </span>
                                            <h4 className="text-[22px]">Khách hàng hạnh phúc</h4>
                                            <p className="text-[14px] leading-[1.7]">
                                                Mục tiêu của chúng tôi là mang đến trải nghiệm tốt nhất cho người tiêu
                                                dùng và làm họ hạnh phúc
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div
                    className="py-[16px] container bg-slate-50 shadow-sm rounded-3xl px-[16px] lg:pt-10 mt-20 mb-[80px]"
                    data-aos="fade-down"
                    data-aos-duration="1000"
                >
                    <div className="relative flex flex-col lg:flex-row rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
                        <div className="absolute inset-0">
                            <Image
                                src={images.about_bg_dot}
                                alt=""
                                className="absolute w-full h-full object-contain object-bottom dark:opacity-5"
                            />
                        </div>
                        <div className="lg:w-[50%] max-w-lg relative">
                            <h2 className="font-semibold text-4xl md:text-5xl">Đừng bỏ lỡ những ưu đãi đặc biệt</h2>
                            <span className="text-[16px] block mt-5 text-neutral-500 dark:text-neutral-400">
                                Đăng ký nhận tin mới nhất, combo tiết kiệm, mã giảm giá ...
                            </span>
                            <ul className="space-y-4 mt-10">
                                <li className="flex items-center space-x-4">
                                    <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-purple-800 bg-purple-100">
                                        01
                                    </span>
                                    <span className="text-[16px] font-medium text-neutral-700 dark:text-neutral-300">
                                        Combo tiết kiệm
                                    </span>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-blue-800 bg-blue-100">
                                        02
                                    </span>
                                    <span className="text-[16px] font-medium text-neutral-700 dark:text-neutral-300">
                                        Freeship
                                    </span>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-red-800 bg-red-100">
                                        03
                                    </span>
                                    <span className="text-[16px] font-medium text-neutral-700 dark:text-neutral-300">
                                        Tạp chí cao cấp
                                    </span>
                                </li>
                            </ul>
                            <form className="mt-10 relative max-w-sm">
                                <input
                                    type="email"
                                    className="w-full rounded-xl px-3 py-2 outline-none text-base focus:outline-primary border border-tbase"
                                    aria-required="true"
                                    placeholder="Nhập email"
                                />
                                <button
                                    className="absolute right-0 top-[5px] bg-black rounded-full text-white p-2 px-3 text-xl 
                                hover:opacity-80 transition-all duration-200"
                                    type="button"
                                >
                                    <BiRightArrowAlt />
                                </button>
                            </form>
                        </div>
                        <div
                            className="nc-NcImage relative block lg:absolute lg:right-0 lg:bottom-[-16px] mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
                            data-nc-id="NcImage"
                        >
                            <Image src={images.about_man} alt="" className="object-cover w-full h-full" />
                        </div>
                    </div>
                </div>

                <div className="py-[32px] px-[12px] bg-[#f8f8f8]">
                    <div className="text-center">
                        <h4 className="mb-[8px] text-xl font-semibold capitalize text-primary" data-aos="fade-up">
                            Các đánh giá từ khách hàng
                        </h4>
                        <h2 className="mb-[28px] text-[23px]" data-aos="fade-up" data-aos-delay="300">
                            Mọi người nói gì ?
                        </h2>
                    </div>
                    <div className="mb-[30px]">
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
                                dynamicBullets: true,
                            }}
                            modules={[]}
                        >
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <SwiperSlide key={index}>
                                    <div className="item-slider cursor-pointer" data-aos="zoom-in-up">
                                        <div className="p-[18px] rounded-[10px] bg-[#fff] mr-[12px]">
                                            <Rate className="flex space-x-1" average={4} />
                                            <h3 className="mt-[10px] mb-[13px] text-[20px] font-[400] leading-6">
                                                Đánh giá chất lượng
                                            </h3>
                                            <p className="mb-6 text-sm text-[#4a5568]">
                                                Sản phẩm chất lượng, trao đổi trả hàng uy tín. Áo đẹp chuẩn form người,
                                                mẫu mã đa dạng. Mọi người nên ủng hộ để cửa hàng ngày càng phát triển ạ
                                                !
                                            </p>
                                            <div className="flex">
                                                <div className="w-[66px] mr-[12px]">
                                                    <img
                                                        className="w-full h-full object-contain rounded-[8px]"
                                                        src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/1.jpg"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="flex flex-col justify-center">
                                                    <h4 className="text-[16px] text-primary font-[700]">
                                                        Nguyễn Thị Loan
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
