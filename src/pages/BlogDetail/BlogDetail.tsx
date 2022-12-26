import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ChakraProvider,
} from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BsCalendar4, BsChatLeft, BsFillReplyFill, BsHandThumbsUp, BsPerson, BsSearch } from 'react-icons/bs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import Image from '~/components/Image';
import Config from '~/config';
import { getBlogDetailAsync, getDetail } from '~/features/blog/blogSlice';
import CommentService from '~/services/CommentService';
import { convertDate } from '../Blog/Blog';
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
                console.log(res);
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
    console.log(detail);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{detail?.title}</title>
            </Helmet>
            <section className="px-[20px] py-[32px] md:px-[54px] lg:px-[78px] xl:px-[108px] xl:py-[44px] 2xl:px-[124px]">
                <div className="lg:grid lg:grid-cols-7 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4 m-auto">
                    {/* blog content */}
                    <div className="lg:col-span-7 xl:col-span-3 2xl:col-span-4">
                        <div
                            className={`relative mb-[24px] py-[8px] w-full h-[390px] 
                            bg-cover bg-center bg-no-repeat transition-filter duration-[400ms] ease-in rounded-[5px] object-cover`}
                        >
                            <Image
                                className="absolute top-0 right-0 bottom-0 left-1/2 -translate-x-1/2 w-ful h-full"
                                src={`${Config.apiUrl}upload/${detail?.media?.file_name}`}
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
