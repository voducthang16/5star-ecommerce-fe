import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import Breadcrumb from '~/components/Breadcrumb';
import { AccessoriesIcon, BagIcon, JeansIcon, ShirtIcon, ShoesIcon, WatchIcon } from '~/components/Icons';
import { fetchProductAsync, getProducts } from '~/features/product/productSlice';
import Product from '~/layouts/components/Product';
import './Category.scss';
function Category() {
    const { slug } = useParams();

    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);

    useEffect(() => {
        dispatch(fetchProductAsync());
    }, [dispatch]);

    return (
        <div className="category-page">
            <Breadcrumb page={slug ? `${slug}` : 'Tất cả'} parentPage="Danh mục" share={false} />
            <div className="container pb-20">
                <div className="grid grid-cols-12 gap-5">
                    <div
                        className="filters-wrapper hidden
                        lg:static lg:block lg:col-span-3 bg-white
                        lg:rounded-xl overflow-y-auto lg:overflow-y-hidden
                        "
                    >
                        <div className="lg:px-2 lg:shadow-inner">
                            <div className="filter-title lg:hidden px-6 py-2 border-b border-slate-200 flex justify-between items-center text-2xl">
                                <h4>Filters</h4>
                                <div className="cursor-pointer hide-filters">
                                    <IoMdClose />
                                </div>
                            </div>
                            <div className="pb-4 px-6 border-b border-slate-200" data-aos="fade-up">
                                <h6 className="text-lg font-semibold pt-4">Danh mục</h6>
                                <Accordion allowToggle px={5}>
                                    <AccordionItem borderTop={0}>
                                        <AccordionButton
                                            _hover={{
                                                background: 'white',
                                                color: 'teal.500',
                                            }}
                                            px={0}
                                            py={1}
                                        >
                                            <ShirtIcon className="mr-2" width={48} height={48} />
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                Áo
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Xem Tất Cả</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>T-Shirt</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Sơ Mi</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Thể Thao</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Khoác</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Polo</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem borderTop={0}>
                                        <AccordionButton
                                            _hover={{
                                                background: 'white',
                                                color: 'teal.500',
                                            }}
                                            px={0}
                                            py={1}
                                        >
                                            <JeansIcon className="mr-2" width={48} height={48} />
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                Quần
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Xem Tất Cả</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Shorts</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Jeans</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Thể Thao</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-500">
                                                <span>Tây</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem borderTop={0}>
                                        <AccordionButton
                                            _hover={{
                                                background: 'white',
                                                color: 'teal.500',
                                            }}
                                            px={0}
                                            py={1}
                                        >
                                            <ShoesIcon className="mr-2" width={48} height={48} />
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                Giày
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Xem Tất Cả</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span> Thể thao</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span> Scandals</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span> Sneakers</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span> Dép</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem borderTop={0}>
                                        <AccordionButton
                                            _hover={{
                                                background: 'white',
                                                color: 'teal.500',
                                            }}
                                            px={0}
                                            py={1}
                                        >
                                            <BagIcon className="mr-2" width={48} height={48} />
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                Túi Xách
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Xem Tất Cả</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Balo</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Túi Tote</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Túi Đeo Chéo</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Ví</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem borderTop={0}>
                                        <AccordionButton
                                            _hover={{
                                                background: 'white',
                                                color: 'teal.500',
                                            }}
                                            px={0}
                                            py={1}
                                        >
                                            <WatchIcon className="mr-2" width={48} height={48} />
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                Đồng hồ
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Xem Tất Cả</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Nam</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Nữ</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Thông Minh</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem borderTop={0} borderBottom={0}>
                                        <AccordionButton
                                            _hover={{
                                                background: 'white',
                                                color: 'teal.500',
                                            }}
                                            px={0}
                                            py={1}
                                        >
                                            <AccessoriesIcon className="mr-2" width={48} height={48} />
                                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                                Phụ Kiện
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>

                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Xem Tất Cả</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Móc khóa</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Mắt kính</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Mũ (Nón)</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                        <AccordionPanel fontSize={14} py={2} pl={'44px'}>
                                            <p className="flex justify-between text-gray-400">
                                                <span>Tất (Vớ)</span>
                                                <span>20</span>
                                            </p>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <div
                                className="pb-4 px-6 border-b border-slate-200"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <h6 className="text-lg font-semibold pt-4">Giá</h6>
                                <div className="flex">
                                    <input type="text" className="input flex-1" placeholder="Từ" />
                                    <input type="text" className="input flex-1" placeholder="Đến" />
                                </div>
                                <button className="bg-primary text-center text-base w-full py-3 text-white rounded-lg">
                                    Áp dụng
                                </button>
                            </div>
                            <div
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
                            </div>
                        </div>
                    </div>
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
                        <div>
                            <div className="grid grid-cols-12 gap-4">
                                {products.map((item: any, index) => (
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
                                            images={item.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
