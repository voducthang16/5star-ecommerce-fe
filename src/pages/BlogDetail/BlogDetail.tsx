import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ChakraProvider,
} from '@chakra-ui/react';

import { BsCalendar4, BsChatLeft, BsFillReplyFill, BsHandThumbsUp, BsPerson, BsSearch } from 'react-icons/bs';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { getBlogDetailAsync, getDetail } from '~/features/blog/blogSlice';
import { useEffect, useRef, useState } from 'react';
import { convertDate } from '../Blog/Blog';
import { Helmet } from 'react-helmet-async';
import CommentService from '~/services/CommentService';
import { getUser } from '~/features/user/userSlice';
import Image from '~/components/Image';
import Config from '~/config';
function BlogDetail() {
    const dispatch = useAppDispatch();
    const inputRef = useRef(null);

    const { slug } = useParams();
    const [list, setList] = useState<any>([]);
    const [renderCmt, setRenderCmt] = useState<any>([]);
    useEffect(() => {
        dispatch(getBlogDetailAsync(slug!));
    }, [dispatch]);
    const detail = useAppSelector(getDetail);
    // const infoUser = useAppDispatch(getUser);
    const onSubmit = (e: any) => {
        e.preventDefault();
        const inputElement = inputRef.current as any;
        let content: any = inputElement.value;
        const id = detail?.id;
        const data = {
            body: content,
            parent_id: null,
            blog_id: id,
        };
        CommentService.PostComment(data)
            .then((res) => {
                inputElement.value = '';
                getComments(id);
            })
            .catch((err) => console.log(err));
    };
    const onSubmitReply = (e: any, id: any) => {
        e.preventDefault();
        const idCmt = id;
        const idBlog = detail?.id;
        const replyWrapper = document.querySelector(`.cmt-${id}`) as any;
        const content = document.querySelector(`.cmt-input-${id}`) as any;
        const data = {
            body: content.value,
            parent_id: idCmt,
            blog_id: idBlog,
        };
        CommentService.PostComment(data)
            .then((res) => {
                content.value = '';
                getComments(idBlog);
                replyWrapper.classList.toggle('hidden');
            })
            .catch((err) => console.log(err));
    };
    const getComments = (id: any) => {
        CommentService.GetComment(id)
            .then((res: any) => {
                let parentTemp: any = [];
                let a: any = {};
                res.data.forEach((item: any) => {
                    if (item.parent_id === null) {
                        parentTemp.push(item);
                    }
                });
                res.data.forEach((item: any) => {
                    if (item.parent_id) {
                        let b = parentTemp.find((parentItem: any) => parentItem.id === item.parent_id);
                        if (b.childComment.length > 0) {
                            b.childComment.push(item);
                        } else {
                            b.childComment = [];
                            b.childComment.push(item);
                        }
                        parentTemp.map((parentElm: any) => (parentElm.id === b.id ? b : parentElm));
                    }
                });
                setRenderCmt(parentTemp);
                setList(res.data);
            })
            .catch((err) => console.log(err));
    };
    const location = useLocation();
    let pathname: any = location.pathname;
    useEffect(() => {
        if (pathname.includes(slug!)) {
            getComments(detail?.id);
        }
    }, [detail]);
    const showComment = (id: any) => {
        const cmtElm: any = document.querySelector(`.cmt-${id}`);
        cmtElm?.classList.toggle('hidden');
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{detail?.title}</title>
            </Helmet>
            <section className="px-[20px] py-[32px] md:px-[54px] lg:px-[78px] xl:px-[108px] xl:py-[44px] 2xl:px-[124px]">
                <div className="lg:grid lg:grid-cols-7 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-1 2xl:col-span-1">
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
                                                        <Link className="w-full h-full" to="/">
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
                                                        <Link className="w-full h-full" to="/">
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
                                                        <Link className="w-full h-full" to="/">
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
                                                    <Link to="/">Fruit Cutting</Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/">Meat</Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/">Orange</Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/">Cake</Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/">Pick Fruit</Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/">Bakery</Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/">Organix Food</Link>
                                                </li>
                                                <li className="px-[9px] py-[4px] inline-block bg-[#fff] rounded-[3px]">
                                                    <Link to="/">Most Expensive Fruit</Link>
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
                                                        <Link className="w-full h-full" to="/">
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
                                                        <Link className="w-full h-full" to="/">
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

                    {/* blog content */}
                    <div className="lg:col-span-4 xl:col-span-2 2xl:col-span-3">
                        <div
                            className={`relative mb-[24px] py-[8px] w-full h-[390px] 
                            bg-cover bg-center bg-no-repeat transition-filter duration-[400ms] ease-in rounded-[5px] object-cover`}
                        >
                            <Image
                                className="absolute top-0 right-0 bottom-0 left-1/2 -translate-x-1/2 w-ful h-full"
                                src={`${Config.apiUrl}upload/${detail?.media.file_name}`}
                                alt=""
                            />
                            <div className="w-full absolute bottom-0 px-[15px] pt-[55px] pb-[40px] bg-gradient-to-r from-[#fff0] to-[#ffffff]">
                                {/* <ul className="text-[14px] flex justify-center capitalize">
                                <li className="relative">backpack</li>
                                <li className="relative before:content-[''] before:absolute before:w-[15px] before:h-[1px] before:top-[50%] before:translate-y-[-50%] before:bg-[#222] before:left-[-24px]">
                                    life style
                                </li>
                                <li className="relative before:content-[''] before:absolute before:w-[15px] before:h-[1px] before:top-[50%] before:translate-y-[-50%] before:bg-[#222] before:left-[-24px]">
                                    organic
                                </li>
                            </ul> */}
                                <h2 className="my-[10px] text-[22px] text-[#222222] text-center font-[700]">
                                    {detail?.title}
                                </h2>
                                <ul className="text-[14px] flex gap-4 justify-center">
                                    <li>
                                        <div className="flex items-center">
                                            <BsPerson className="w-[16px] h-[16px] mr-[3px]" />
                                            <span>Caroline</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <BsCalendar4 className="w-[16px] h-[16px] mr-[3px]" />
                                            <span>{convertDate(detail?.create_at)}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <BsChatLeft className="w-[16px] h-[16px] mr-[3px]" />
                                            <span>{list.length > 0 ? list.length : 0} nhận xét</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* blog detail contain */}
                        <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
                        {/* comments */}
                        <div>
                            <div className="mt-[40px] mb-[10px]">
                                <h3 className="text-[22px] font-[700]">Bình luận</h3>
                            </div>
                            <div className="mt-[24px]">
                                <ul className="space-y-4">
                                    {renderCmt.map((item: any, index: number) => (
                                        <li key={index}>
                                            {/* parent cmt */}
                                            <div>
                                                <div className="flex justify-between">
                                                    <div className="flex">
                                                        <div className="h-[60px] w-[60px] mr-[20px]">
                                                            <img
                                                                className="w-full h-full rounded-[50%]"
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/1.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-[6px] text-[13px]">10/18/2022</h6>
                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                Vo Duc Thang
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => showComment(item.id)} className="flex">
                                                        <BsFillReplyFill className="mr-[10px] w-[18px] h-[18px] text-[#777] hover:cursor-pointer" />
                                                        <span className="text-[14px] text-[#0da487] hover:cursor-pointer">
                                                            Trả lời
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* reply cmt */}
                                                <div className={`cmt-${item.id} hidden mt-4 p-[18px] bg-[#f8f8f8]`}>
                                                    <div className="mb-[10px]">
                                                        <h3 className="text-[22px] text-[#4a5568] font-[700] capitalize">
                                                            trả lời bình luận
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <form onSubmit={(e) => onSubmitReply(e, item.id)}>
                                                            <div className="mt-4">
                                                                <textarea
                                                                    className={`cmt-input-${item.id} w-full text-[14px] text-[#212529] px-[12px] py-[9px] outline-none`}
                                                                    rows={4}
                                                                    placeholder="Bình luận của bạn"
                                                                ></textarea>
                                                            </div>
                                                            <div className="mt-[16px] ">
                                                                <button
                                                                    type="submit"
                                                                    className="px-[32px] py-[8px] text-[14px] text-center text-[#fff] bg-[#ff5858] rounded-[3px]"
                                                                >
                                                                    Gửi
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                {/* content cmt */}
                                                <p className="my-3 text-sm">{item.body}</p>
                                            </div>
                                            {/* rep cmt */}
                                            <div className="ml-20 space-y-4">
                                                {item.childComment.length > 0 && (
                                                    <>
                                                        {item.childComment.map((itemChild: any, index: number) => (
                                                            <div key={index}>
                                                                <div className="flex justify-between">
                                                                    <div className="flex">
                                                                        <div className="h-[60px] w-[60px] mr-[20px]">
                                                                            <Image
                                                                                className="w-full h-full rounded-[50%]"
                                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/3.jpg"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <h6 className="mb-[6px] text-[13px]">
                                                                                30 Jan, 2022
                                                                            </h6>
                                                                            <h5 className="text-[15px] text-[#4a5568] font-[600]">
                                                                                Glenn Greer
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-3 text-sm">{itemChild.body}</p>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* comment */}
                        <div className="mt-4 p-[18px] bg-[#f8f8f8]">
                            <div className="mb-[10px]">
                                <h3 className="text-[22px] text-[#4a5568] font-[700] capitalize">bình luận</h3>
                            </div>
                            <div>
                                <form onSubmit={onSubmit}>
                                    <div className="mt-4">
                                        <textarea
                                            ref={inputRef}
                                            className="w-full text-[14px] text-[#212529] px-[12px] py-[9px] outline-none"
                                            rows={4}
                                            placeholder="Bình luận của bạn"
                                        ></textarea>
                                    </div>
                                    <div className="mt-[16px] ">
                                        <button
                                            type="submit"
                                            className="px-[32px] py-[8px] text-[14px] text-center text-[#fff] bg-[#ff5858] rounded-[3px]"
                                        >
                                            Gửi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogDetail;
