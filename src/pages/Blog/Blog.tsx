import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ChakraProvider,
} from '@chakra-ui/react';
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
import { getBlogAsync, getBlogs } from '~/features/blog/blogSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useEffect } from 'react';
import Image from '~/components/Image';
import Config from '~/config';
export const convertDate = (create_at: any) => {
    let date = new Date(create_at);
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let dt: any = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return `${dt}/${month}/${year}`;
};
function Blog() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBlogAsync());
    }, [dispatch]);
    const blogs = useAppSelector(getBlogs);

    return (
        <section className="py-[32px] md:py-[36px] lg:py-[38px] xl:py-[44px]">
            <div className="px-[20px] md:px-[54px] lg:px-[78px] xl:px-[108px] 2xl:px-[124px]">
                <div className="lg:grid lg:gap-6 lg:grid-cols-5 xl:grid-cols-9 2xl:grid-cols-4">
                    {/* blog item */}
                    <div className="lg:order-1 lg:col-span-3 xl:col-span-6 2xl:col-span-3">
                        {/* post item */}
                        <div className="md:grid md:grid-cols-2 2xl:grid-cols-3 md:gap-6">
                            {blogs.map((item: any, index: number) => (
                                <div key={index} className="mt-6 px-3 md:mt-0">
                                    <div className="mx-[-12px] border border-slate-200 overflow-hidden rounded-[10px]">
                                        <div className="mb-[15px]">
                                            <Link
                                                className="flex items-center justify-center"
                                                to={`/blog/${item?.slug}`}
                                            >
                                                <Image
                                                    className="min-h-[250px] max-h-[250px] object-contain"
                                                    src={`${Config.apiUrl}upload/${item?.media.file_name}`}
                                                />
                                            </Link>
                                        </div>
                                        <div className="px-[20px] pb-[20px]">
                                            <div className="flex align-center gap-[15px] text-[13px] uppercase">
                                                <span className="flex items-center">
                                                    <BsClock className="mr-1 inline w-4 h-4" />
                                                    <span>{convertDate(item?.create_at)}</span>
                                                </span>
                                                <span className="flex items-center">
                                                    <BsPerson className="mr-1 inline w-4 h-4" />
                                                    <span>James M.Martin</span>
                                                </span>
                                            </div>
                                            <Link to={`/blog/${item?.slug}`}>
                                                <h3 className="mt-[10px] mb-4 text-base font-[600] leading-6">
                                                    {item?.title}
                                                </h3>
                                            </Link>
                                            <Link
                                                to={`/blog/${item?.slug}`}
                                                className="mt-[8px] px-[22px] py-[10px] rounded-[5px] text-[14px] bg-[#e6f6f3] text-[#0da487] hover:bg-[#0DA487] hover:text-[#fff]"
                                            >
                                                Đọc tiếp
                                                <BsArrowRight className="inline ml-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;
