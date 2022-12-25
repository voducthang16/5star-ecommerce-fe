import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Helmet } from 'react-helmet-async';
import { IoMdClose } from 'react-icons/io';
import { TiThSmall } from 'react-icons/ti';
import ReactPaginate from 'react-paginate';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import Breadcrumb from '~/components/Breadcrumb';
import { AccessoriesIcon, BagIcon, JeansIcon, ShirtIcon, ShoesIcon, WatchIcon } from '~/components/Icons';
import {
    fetchCategoryAsync,
    fetchSubCategoryAsync,
    getCategory,
    getSubCategory,
} from '~/features/category/categorySlice';

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import LoadingSpin from '~/components/LoadingSpin';
import { fetchProductAsync, getProducts, getStatusFetchProduct, totalProduct } from '~/features/product/productSlice';
import Product from '~/layouts/components/Product';
import './Category.scss';
import { AiOutlineFilter } from 'react-icons/ai';

const PER_PAGE = 9;

function Category() {
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [fromToPrice, setFromToPrice] = useState<any>({ from: '', to: '' });
    const { slug } = useParams();
    // search
    const location = useLocation();
    let keyword: any = '';
    if (location.search) {
        keyword = location.search.substring(9);
    }
    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    const loadingStatus = useAppSelector(getStatusFetchProduct);
    const totalCountProduct = useAppSelector(totalProduct);
    const category = useAppSelector(getCategory);
    const subCategory = useAppSelector(getSubCategory);

    useEffect(() => {
        dispatch(fetchProductAsync({}));
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchCategoryAsync());
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchSubCategoryAsync());
    }, [dispatch]);

    const totalPage = Math.ceil(totalCountProduct / PER_PAGE);
    const handlePageChange = ({ selected }: any) => {
        setPageNumber(selected);
        const fromPrice = fromToPrice.from;
        const toPrice = fromToPrice.to;
        let requestParams = {
            page: selected,
            fromPrice,
            toPrice,
        };
        dispatch(fetchProductAsync(requestParams));
    };

    const applyFilterPrice = () => {
        const fromPrice = fromToPrice.from;
        const toPrice = fromToPrice.to;
        let requestParams = {
            page: pageNumber,
            fromPrice,
            toPrice,
        };
        dispatch(fetchProductAsync(requestParams));
    };

    const handleFilterCategory = (id: number | string) => {
        const fromPrice = fromToPrice.from;
        const toPrice = fromToPrice.to;
        let requestParams = {
            page: pageNumber,
            fromPrice,
            toPrice,
            id_category: id,
        };
        dispatch(fetchProductAsync(requestParams));
    };

    const fetchCategoryNoParent = (id: number) => {
        let subCategoryNew: any = [];
        // eslint-disable-next-line array-callback-return
        const result = subCategory?.filter((item: any) => {
            if (item.parent_id === id) {
                subCategoryNew.push(item);
                return subCategory;
            }
        });
        return result;
    };

    const icons: any = [<JeansIcon />, <ShoesIcon />, <BagIcon />, <ShirtIcon />, <WatchIcon />, <AccessoriesIcon />];

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                {keyword === '' ? <title>Danh mục</title> : <title>Tìm kiếm</title>}
            </Helmet>
            <div className="category-page">
                <Breadcrumb
                    page={slug ? `${slug}` : keyword === '' ? 'Tất cả' : 'Tìm kiếm'}
                    parentPage={keyword === '' ? 'Danh mục' : ''}
                    share={false}
                />
                <div className="container pb-20">
                    {keyword !== '' && (
                        <div className="mb-2">
                            <h5 className="text-lg font-semibold">Kết quả tìm kiếm: {keyword}</h5>
                        </div>
                    )}
                    <div className="grid grid-cols-12 gap-5">
                        <div
                            className="filters-wrapper hidden
                        lg:static lg:block lg:col-span-3 bg-white
                        lg:rounded-xl overflow-y-auto lg:overflow-y-hidden
                        "
                        >
                            <div className="lg:px-2 lg:shadow-inner" data-aos="fade-up">
                                <div className="filter-title lg:hidden px-6 py-2 border-b border-slate-200 flex justify-between items-center text-2xl">
                                    <h4>Lọc</h4>
                                    <div className="cursor-pointer hide-filters">
                                        <IoMdClose />
                                    </div>
                                </div>
                                <div className="pb-4 px-6 border-b border-slate-200">
                                    <h6 className="text-lg font-semibold pt-4">Danh mục</h6>
                                    <div
                                        className="filter-all px-5 mt-5 flex cursor-pointer"
                                        onClick={() => handleFilterCategory('')}
                                    >
                                        <TiThSmall className="ml-[5px] mr-2 text-xl text-primary mb-3" />
                                        <p>Tất cả</p>
                                    </div>
                                    <Accordion allowToggle px={5} borderBottom="transparent">
                                        {category?.map((item: any, index: number) => (
                                            <AccordionItem key={index} borderTop={0}>
                                                <AccordionButton
                                                    _expanded={{ color: '#319795' }}
                                                    _hover={{
                                                        background: 'white',
                                                        color: 'teal.500',
                                                    }}
                                                    px={0}
                                                    py={1}
                                                >
                                                    <span className="icon w-[40px] h-[40px] mr-2">{icons[index]}</span>
                                                    <Box
                                                        display={'flex'}
                                                        justifyContent={'space-between'}
                                                        width={'100%'}
                                                    >
                                                        {item.name}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>

                                                <div className="sub-category border-l-2 border-primary ml-[44px]">
                                                    {fetchCategoryNoParent(item.id)?.map((sub: any, index: number) => (
                                                        <AccordionPanel
                                                            py="4px"
                                                            key={index}
                                                            onClick={() => handleFilterCategory(sub?.id)}
                                                        >
                                                            <p className="flex justify-between text-gray-500  cursor-pointer text-base">
                                                                <motion.span
                                                                    whileHover={{
                                                                        color: '#319795',
                                                                        scale: 1.1,
                                                                        transition: { duration: 0.2 },
                                                                    }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                >
                                                                    {sub.name}
                                                                </motion.span>
                                                            </p>
                                                        </AccordionPanel>
                                                    ))}
                                                </div>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                                <div className="pb-4 px-6 border-b border-slate-200">
                                    <h6 className="text-lg font-semibold pt-4">Giá</h6>
                                    <div className="flex h-[40px] mb-2 gap-2">
                                        <CurrencyInput
                                            placeholder="Từ"
                                            className="input flex-1 border rounded-md"
                                            decimalsLimit={2}
                                            value={fromToPrice?.from || ''}
                                            onValueChange={(value) =>
                                                setFromToPrice({ ...fromToPrice, from: Number(value) })
                                            }
                                        />
                                        <CurrencyInput
                                            placeholder="Đến"
                                            className="input flex-1 border rounded-md"
                                            decimalsLimit={2}
                                            value={fromToPrice?.to || ''}
                                            onValueChange={(value) =>
                                                setFromToPrice({ ...fromToPrice, to: Number(value) })
                                            }
                                        />
                                    </div>
                                    <div className="btn-action flex gap-2">
                                        <button
                                            className="bg-primary text-center text-base w-full py-3 text-white rounded-lg"
                                            onClick={applyFilterPrice}
                                        >
                                            Áp dụng
                                        </button>
                                        {fromToPrice?.from && (
                                            <button
                                                className="bg-red-500 text-center text-base w-full py-3 text-white rounded-lg"
                                                onClick={() => setFromToPrice({ from: '', to: '' })}
                                            >
                                                Hủy
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {/* <div
                                    className="pb-4 px-6 border-b border-slate-200"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <h6 className="text-lg font-semibold pt-4">Thương hiệu</h6>
                                    <div className="space-y-2 max-h-[64px] overflow-y-auto px-2">
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="adidas" id="adidas" />
                                            <label htmlFor="adidas">Adidas</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="nike" id="nike" />
                                            <label htmlFor="nike">nike</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="Puma" id="Puma" />
                                            <label htmlFor="Puma">Puma</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="Ann Taylor" id="Ann Taylor" />
                                            <label htmlFor="Ann Taylor">Ann Taylor</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-4 px-6 border-b border-slate-200">
                                    <h6 className="text-lg font-semibold pt-4">Size</h6>
                                    <div className="space-y-2 max-h-[64px] overflow-y-auto px-2">
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="xs" id="xs" />
                                            <label htmlFor="xs">xs</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="S" id="S" />
                                            <label htmlFor="S">S</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="M" id="M" />
                                            <label htmlFor="M">M</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                        <div className="w-full flex items-center space-x-2 text-base">
                                            <input type="checkbox" name="L" id="L" />
                                            <label htmlFor="L">L</label>
                                            <span className="block !ml-auto">123</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-4 px-3">
                                    <h6 className="text-lg font-semibold pt-4">Màu</h6>
                                </div> */}
                            </div>
                        </div>
                        {loadingStatus === 'loading' ? (
                            <LoadingSpin className="col-span-6" />
                        ) : (
                            <div className="col-span-12 lg:col-span-9">
                                {/* top right */}
                                <div className="text-base mb-4">
                                    <span>Sắp xếp theo: </span>
                                    <select name="" id="">
                                        <option value="1">Giá</option>
                                        <option value="1">abc</option>
                                        <option value="1">abc</option>
                                        <option value="1">abc</option>
                                    </select>
                                </div>
                                <div className="product-list">
                                    <div className="grid grid-cols-12 gap-4">
                                        {products.length > 0 &&
                                            products?.map((item: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="col-span-12 md:col-span-4"
                                                    data-aos="zoom-in-down"
                                                    data-aos-delay="200"
                                                >
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
                                        {products.length === 0 && (
                                            <p className="col-span-12 text-2xl font-semibold text-center">
                                                Không có sản phẩm nào
                                                <AiOutlineFilter className="inline-block text-3xl text-red-500" />
                                            </p>
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
