import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ChakraProvider,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
    BsArrowRight,
    BsChevronDoubleLeft,
    BsChevronDoubleRight,
    BsClock,
    BsHandThumbsUp,
    BsPerson,
    BsSearch,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Blog() {
    const [blog, setBlog] = useState('');

    const getBlog = () => {};

    return (
        <section className="py-[32px] md:py-[36px] lg:py-[38px] xl:py-[44px]">
            <div className="px-[20px] md:px-[54px] lg:px-[78px] xl:px-[108px] 2xl:px-[124px]">
                <div className="lg:grid lg:gap-6 lg:grid-cols-5 xl:grid-cols-9 2xl:grid-cols-4">
                    {/* blog item */}
                    <div className="lg:order-1 lg:col-span-3 xl:col-span-6 2xl:col-span-3">
                        {/* post item */}
                        <div className="md:grid md:grid-cols-2 2xl:grid-cols-3 md:gap-6">
                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px] min-h-[243px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px] w-full h-full"
                                                src="https://lzd-img-global.slatic.net/g/p/8c0c4fc6c0f5d6ba7a30a85d2aa186e5.jpg_720x720q80.jpg_.webp"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25/02/2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                Polo DSW Polo High Low có thật sự đáng mua?
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://lzd-img-global.slatic.net/g/p/5068c793852e61995e3ff61ba64a5bc8.png_720x720q80.jpg_.webp"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>01/06/2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James Clear</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                Những chi tiết thú vị về chiếc áo DEE Hockey Shirt
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://lzd-img-global.slatic.net/g/p/71347f2ab3821c7c15da9392253c0c97.jpg_720x720q80.jpg_.webp"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://lzd-img-global.slatic.net/g/p/2b0d6f87afa6b02361764574031543d3.png_720x720q80.jpg_.webp"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/1.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/2.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 T8, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>Duy Luan</span>
                                            </span>
                                        </div>
                                        <Link to="#">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                Cách lựa chọn size quần ảo chuẩn nhất
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc thêm
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/3.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/4.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/1.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/2.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/3.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[24px] px-[12px] md:mt-0">
                                <div className="mx-[-12px] border-[1px] border-solid border-[#ececec] rounded-[10px]">
                                    <div className="mb-[15px]">
                                        <Link to="/">
                                            <img
                                                className="rounded-t-[10px]"
                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/blog/4.jpg"
                                                alt="img-blog"
                                            />
                                        </Link>
                                    </div>
                                    <div className="px-[20px] pb-[20px]">
                                        <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                            <span className="flex items-center">
                                                <BsClock className="mr-1 inline w-4 h-4" />
                                                <span>25 Feg, 2022</span>
                                            </span>
                                            <span className="flex items-center">
                                                <BsPerson className="mr-1 inline w-4 h-4" />
                                                <span>James M.Martin</span>
                                            </span>
                                        </div>
                                        <Link to="/">
                                            <h3 className="mt-[10px] mb-[6px] text-[16px] font-[600] leading-6">
                                                How to freeze fresh vegetables while preserving their best qualities.
                                            </h3>
                                        </Link>
                                        <button className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]">
                                            Đọc tiếp
                                            <BsArrowRight className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* pagination */}
                        <nav className="mt-[22px]">
                            <ul className="flex justify-center items-center text-[14px]">
                                <li className="mr-2">
                                    <Link to="/#" className="px-[12px] py-[6px] rounded-[5px]">
                                        <BsChevronDoubleLeft className="w-4 h-4 mr-4" />
                                    </Link>
                                </li>
                                <li className="mr-2">
                                    <Link to="/#" className="px-[12px] py-[6px] rounded-[5px] bg-[#0DA487] text-[#fff]">
                                        1
                                    </Link>
                                </li>
                                <li className="mr-2">
                                    <Link to="/#" className="px-[12px] py-[6px] rounded-[5px]">
                                        2
                                    </Link>
                                </li>
                                <li className="mr-2">
                                    <Link to="/#" className="px-[12px] py-[6px] rounded-[5px]">
                                        3
                                    </Link>
                                </li>
                                <li className="mr-2">
                                    <Link to="/#" className="px-[12px] py-[6px] rounded-[5px]">
                                        <BsChevronDoubleRight className="w-4 h-4 ml-4" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* search and options */}
                    <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-1">
                        {/* search and accordion */}
                        <div className="mt-[24px] lg:mt-0">
                            <div>
                                {/* search */}
                                <div className="py-[5px] w-full relative bg-[#f8f8f8] rounded-[5px]">
                                    <input
                                        className="w-full pl-[20px] pr-[68px] py-[8px] outline-none text-[14px] font-[600] bg-[#f8f8f8]"
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                    />
                                    <div className="w-[2px] h-[20px] bg-[#ccc] absolute right-[54px] top-[25%]"></div>
                                    <BsSearch className="w-[14px] h-[20px] absolute right-[20px] top-[25%] text-[#000] hover:cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Recent post */}
                        <ChakraProvider>
                            <div className="mt-[20px] bg-[#f8f8f8]">
                                <Accordion allowToggle>
                                    <AccordionItem className="p-[6px] md:p-[8px] lg:p-[9px] xl:p-[10px]">
                                        <h2 className="text-[16px] font-[700]">
                                            <AccordionButton className="hover:!bg-[transparent]">
                                                <Box flex="1" textAlign="left">
                                                    Bài viết gần đây
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            <div>
                                                <div className="min-h-[74px] pt-[16px] flex items-center">
                                                    <div className="w-[110px]">
                                                        <Link className="w-full h-full" to="#">
                                                            <img
                                                                className="w-full h-full"
                                                                src="https://lzd-img-global.slatic.net/g/p/3173dccba40c40aa43599a742f678efd.png_200x200q80.png_.webp"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-[15px] w-full">
                                                        <Link to="/">
                                                            <h5 className="text-[16px] font-[600]">
                                                                Áo khoác Davies nam nữ DSW Reflect Track Jacket
                                                            </h5>
                                                        </Link>
                                                        <h6 className="mt-[8px] text-[13px] flex justify-between">
                                                            <span>25 Jan, 2022</span>
                                                            <BsHandThumbsUp className="w-[18px] h-[18px]" />
                                                        </h6>
                                                    </div>
                                                </div>

                                                <div className="min-h-[74px] pt-[16px] flex items-center">
                                                    <div className="w-[110px]">
                                                        <Link className="w-full h-full" to="#">
                                                            <img
                                                                className="w-full h-full"
                                                                src="https://lzd-img-global.slatic.net/g/p/377dcd238e2eb9b4dc6d6255b1db6dc2.png_720x720q80.jpg_.webp"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-[15px] w-full">
                                                        <Link to="/">
                                                            <h5 className="text-[16px] font-[600]">
                                                                Áo bomber bóng chày nam nữ Davies brand
                                                            </h5>
                                                        </Link>
                                                        <h6 className="mt-[8px] text-[13px] flex justify-between">
                                                            <span>25 Jan, 2022</span>
                                                            <BsHandThumbsUp className="w-[18px] h-[18px]" />
                                                        </h6>
                                                    </div>
                                                </div>

                                                <div className="min-h-[74px] pt-[16px] flex items-center">
                                                    <div className="w-[110px]">
                                                        <Link className="w-full h-full" to="#">
                                                            <img
                                                                className="w-full h-full"
                                                                src="https://lzd-img-global.slatic.net/g/p/db1f9e51eae19240195a7c5035335d5b.jpg_720x720q80.jpg_.webp"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-[15px] w-full">
                                                        <Link to="/">
                                                            <h5 className="text-[16px] font-[600]">
                                                                Áo phông nam nữ form rộng tay lỡ
                                                            </h5>
                                                        </Link>
                                                        <h6 className="mt-[8px] text-[13px] flex justify-between">
                                                            <span>25 Jan, 2022</span>
                                                            <BsHandThumbsUp className="w-[18px] h-[18px]" />
                                                        </h6>
                                                    </div>
                                                </div>

                                                <div className="min-h-[74px] pt-[16px] flex items-center">
                                                    <div className="w-[110px]">
                                                        <Link className="w-full h-full" to="#">
                                                            <img
                                                                className="w-full h-full"
                                                                src="https://lzd-img-global.slatic.net/g/p/7589333ae1832ef3741a593fc4e52980.jpg_720x720q80.jpg_.webp
                                                                "
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-[15px] w-full">
                                                        <Link to="/">
                                                            <h5 className="text-[16px] font-[600]">
                                                                Hoodie zip local brand áo khoác nỉ form rộng
                                                            </h5>
                                                        </Link>
                                                        <h6 className="mt-[8px] text-[13px] flex justify-between">
                                                            <span>25 Jan, 2022</span>
                                                            <BsHandThumbsUp className="w-[18px] h-[18px]" />
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ChakraProvider>

                        {/* Category */}
                        <ChakraProvider>
                            <div className="mt-[20px] bg-[#f8f8f8]">
                                <Accordion allowToggle>
                                    <AccordionItem className="p-[6px] md:p-[8px] lg:p-[9px] xl:p-[10px]">
                                        <h2 className="text-[16px] font-[700]">
                                            <AccordionButton className="hover:!bg-[transparent]">
                                                <Box flex="1" textAlign="left">
                                                    Danh mục
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            <ul>
                                                <li className="my-4">
                                                    <Link to="/">
                                                        <div className="flex justify-between">
                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                Latest Recipes
                                                            </h5>
                                                            <span className="w-[24px] h-[24px] text-[#fff] text-[13px] text-center bg-[#0da487] leading-[24px] rounded-[50%]">
                                                                10
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="my-4">
                                                    <Link to="/">
                                                        <div className="flex justify-between">
                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                Latest Recipes
                                                            </h5>
                                                            <span className="w-[24px] h-[24px] text-[#fff] text-[13px] text-center bg-[#0da487] leading-[24px] rounded-[50%]">
                                                                10
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="my-4">
                                                    <Link to="/">
                                                        <div className="flex justify-between">
                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                Latest Recipes
                                                            </h5>
                                                            <span className="w-[24px] h-[24px] text-[#fff] text-[13px] text-center bg-[#0da487] leading-[24px] rounded-[50%]">
                                                                10
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="my-4">
                                                    <Link to="/">
                                                        <div className="flex justify-between">
                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                Latest Recipes
                                                            </h5>
                                                            <span className="w-[24px] h-[24px] text-[#fff] text-[13px] text-center bg-[#0da487] leading-[24px] rounded-[50%]">
                                                                12
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="my-4">
                                                    <Link to="/">
                                                        <div className="flex justify-between">
                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                Latest Recipes
                                                            </h5>
                                                            <span className="w-[24px] h-[24px] text-[#fff] text-[13px] text-center bg-[#0da487] leading-[24px] rounded-[50%]">
                                                                8
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="my-4">
                                                    <Link to="/">
                                                        <div className="flex justify-between">
                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                Latest Recipes
                                                            </h5>
                                                            <span className="w-[24px] h-[24px] text-[#fff] text-[13px] text-center bg-[#0da487] leading-[24px] rounded-[50%]">
                                                                6
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ChakraProvider>

                        {/* Product tags */}
                        <ChakraProvider>
                            <div className="mt-[20px] bg-[#f8f8f8]">
                                <Accordion allowToggle>
                                    <AccordionItem className="p-[6px] md:p-[8px] lg:p-[9px] xl:p-[10px]">
                                        <h2 className="text-[16px] font-[700]">
                                            <AccordionButton className="hover:!bg-[transparent]">
                                                <Box flex="1" textAlign="left">
                                                    Product tags
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            <ul className="mt-2 flex flex-wrap gap-[10px]">
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Fruit Cutting
                                                    </Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Meat
                                                    </Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Orange
                                                    </Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Cake
                                                    </Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Pick Fruit
                                                    </Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Bakery
                                                    </Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Organix Food
                                                    </Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/#" className="text-[13px] text-[#4a5568] block">
                                                        Most Expensive Fruit
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ChakraProvider>

                        {/* Trending products */}
                        <ChakraProvider>
                            <div className="mt-[20px] bg-[#f8f8f8]">
                                <Accordion allowToggle>
                                    <AccordionItem className="p-[6px] md:p-[8px] lg:p-[9px] xl:p-[10px]">
                                        <h2 className="text-[16px] font-[700]">
                                            <AccordionButton className="hover:!bg-[transparent]">
                                                <Box flex="1" textAlign="left">
                                                    Rending products
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            <div>
                                                <div className="py-4 min-h-[74px] pt-[16px] flex items-center">
                                                    <div className="w-[84px]">
                                                        <Link className="w-full h-full" to="#">
                                                            <img
                                                                className="w-[70px] h-[70px]"
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/23.png"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-[15px] w-full">
                                                        <Link to="/">
                                                            <h6 className="text-[13px] font-[600]">
                                                                Meatigo Premium Goat Curry
                                                            </h6>
                                                            <span className="block text-[14px]">450 G</span>
                                                            <h6 className="mt-[6px] text-[13px] text-[#0da487] font-[600]">
                                                                $ 70.00
                                                            </h6>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="py-4 min-h-[74px] pt-[16px] flex items-center">
                                                    <div className="w-[84px]">
                                                        <Link className="w-full h-full" to="#">
                                                            <img
                                                                className="w-[70px] h-[70px]"
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/23.png"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-[15px]">
                                                        <Link to="/">
                                                            <h6 className="text-[13px] font-[600]">
                                                                Meatigo Premium Goat Curry
                                                            </h6>
                                                            <span className="block text-[14px]">450 G</span>
                                                            <h6 className="mt-[6px] text-[13px] text-[#0da487] font-[600]">
                                                                $ 70.00
                                                            </h6>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="py-4 min-h-[74px] pt-[16px] flex items-center">
                                                    <div className="w-[84px]">
                                                        <Link className="w-full h-full" to="#">
                                                            <img
                                                                className="w-[70px] h-[70px]"
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/23.png"
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-[15px]">
                                                        <Link to="/">
                                                            <h6 className="text-[13px] font-[600]">
                                                                Meatigo Premium Goat Curry
                                                            </h6>
                                                            <span className="block text-[14px]">450 G</span>
                                                            <h6 className="mt-[6px] text-[13px] text-[#0da487] font-[600]">
                                                                $ 70.00
                                                            </h6>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </ChakraProvider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;
