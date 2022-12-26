import { useCallback, useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsArrowRight, BsClock, BsHandThumbsUp, BsPerson, BsSearch } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import Image from '~/components/Image';
import Config from '~/config';
import BlogService from '~/services/BlogService';
import { Debounce } from '~/utils/Debouce';
import { subString } from '~/utils/MinString';
import { ResponseType } from '~/utils/Types';
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
    const [blog, setBlog] = useState<any>([]);
    const [recentBlog, setRecentBlog] = useState<any>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const dispatch = useAppDispatch();
    // END STATE
    const totalPage = Math.ceil(totalCount / 9);

    const handlePageChange = ({ selected }: any) => {
        setPageNumber(selected);
        BlogService.GetAllBlogs({ page: selected }).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setBlog(res.data.data);
                setTotalCount(res.data.total);
            }
        });
    };

    const getAllBlog = () => {
        BlogService.GetAllBlogs({}).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setBlog(res.data.data);
                setTotalCount(res.data.total);
            }
        });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        BlogService.GetAllBlogs({ title: value }).then((res: ResponseType) => {
            if (res.statusCode === 200) {
                setBlog(res.data.data);
                setTotalCount(res.data.total);
            }
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(Debounce(handleSearch, 1000), []);

    const getRecentBlog = () => {
        BlogService.GetAllBlogs({ orderBy: 'create_at', type: 'DESC', perPage: 8 }).then((res: ResponseType) => {
            console.log('res: ', res);
            if (res.statusCode === 200) {
                setRecentBlog(res.data.data);
            }
        });
    };

    useEffect(() => {
        getAllBlog();
        getRecentBlog();
    }, []);

    return (
        <section className="py-[32px] md:py-[36px] lg:py-[38px] xl:py-[44px]">
            <div className="px-[20px] md:px-[54px] lg:px-[78px] xl:px-[108px] 2xl:px-[124px]">
                <div className="lg:grid lg:gap-6 lg:grid-cols-5 xl:grid-cols-9 2xl:grid-cols-4">
                    {/* blog item */}
                    <div className="lg:order-1 lg:col-span-3 xl:col-span-6 2xl:col-span-3">
                        {/* post item */}
                        <div className="md:grid md:grid-cols-2 2xl:grid-cols-3 md:gap-6">
                            {blog?.length > 0 ? (
                                <>
                                    {blog?.map((item: any, index: number) => (
                                        <div key={index} className="mt-6 px-3 md:mt-0">
                                            <div className="mx-[-12px] border border-slate-200 overflow-hidden rounded-[10px]">
                                                <div className="mb-[15px]">
                                                    <Link
                                                        className="flex items-center justify-center"
                                                        to={`/blog/${item?.slug}`}
                                                    >
                                                        <Image
                                                            className="h-[250px] object-contain"
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
                                                            <span>
                                                                {item?.user?.first_name} {item?.user?.last_name}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <Link to={`/blog/${item?.slug}`}>
                                                        <h3 className="mt-[10px] mb-4 text-base font-[600] leading-6">
                                                            {subString(item?.title, 70)}
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
                                </>
                            ) : (
                                <div>Không có bài viết</div>
                            )}
                        </div>

                        <div className="pagination-feature">
                            {totalPage > 0 && (
                                <div className="pagination-feature flex">
                                    <ReactPaginate
                                        previousLabel={<BiChevronLeft className="inline text-xl" />}
                                        nextLabel={<BiChevronRight className="inline text-xl" />}
                                        pageCount={totalPage}
                                        onPageChange={handlePageChange}
                                        activeClassName={'page-item active'}
                                        disabledClassName={'page-item disabled'}
                                        containerClassName={'pagination'}
                                        previousLinkClassName={'page-link'}
                                        nextLinkClassName={'page-link'}
                                        pageLinkClassName={'page-link'}
                                    />
                                </div>
                            )}
                        </div>
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
                                        onChange={debounceSearch}
                                    />
                                    <input type="submit" hidden />
                                    <div className="w-[2px] h-[20px] bg-[#ccc] absolute right-[54px] top-[25%]"></div>
                                    <button type="submit">
                                        <BsSearch className="w-[14px] h-[20px] absolute right-[20px] top-[25%] text-[#000] hover:cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent post */}
                        <div className="post-list-left">
                            <div className="title my-3 mt-5">
                                <h3 className="text-lg font-semibold">Bài viết gần đây</h3>
                            </div>
                            {recentBlog?.map((item: any, index: number) => (
                                <div className="min-h-[74px] pt-[16px] flex items-center" key={index}>
                                    <div className="w-[110px]">
                                        <Link className="w-full h-full" to="#">
                                            <Image
                                                className="w-full h-full"
                                                src={`${Config.apiUrl}upload/${item?.media.file_name}`}
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                    <div className="pl-[15px] w-full">
                                        <Link to="/">
                                            <h5 className="text-[16px] font-[600]">{item.title}</h5>
                                        </Link>
                                        <h6 className="mt-[8px] text-[13px] flex justify-between">
                                            <span>{convertDate(item?.create_at)}</span>
                                            <BsHandThumbsUp className="w-[18px] h-[18px]" />
                                        </h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;
