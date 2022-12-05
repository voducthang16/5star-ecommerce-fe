import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { AddToCartIcon, HeartEmptyIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Config from '~/config';
import { addToCart, getProductInCart, updateToCart } from '~/features/cart/cartSlice';
import { getProducts } from '~/features/product/productSlice';
import CartService from '~/services/CartService';
import { ResponseType } from '~/utils/Types';
import Rate from '../Rate';
import './Product.scss';
interface ProductProps {
    idProduct: number;
    name?: string;
    slug?: string;
    color?: any;
    size?: any;
    images?: any;
    type?: number;
}

function Product({ idProduct, name, slug, color, size, images, type = 0 }: ProductProps) {
    const [imageInCart, setImageInCart] = useState('');

    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    const productAddCart = useAppSelector(getProductInCart);
    const colorArray: any = color ? Object?.entries(color) : '';
    const sizeArray: any = size ? Object?.entries(size) : '';
    const handleChangeImage = (id: number, index: any) => {
        const indexImage = index;
        const element = document.querySelector(`#product_${id}`);
        const images = element?.querySelectorAll(`.images_${id}`);
        images?.forEach((item: any, index) => {
            if (item.classList.contains('z-20')) {
                item.classList.remove('z-20');
            }
            if (index === indexImage) {
                item.classList.add('z-20');
                setImageInCart(item?.src);
            }
        });
    };

    const requestAddToCart = (idStock: number) => {
        let dataSendRequest = {
            id_product: idStock,
            quantity: 1,
            image: imageInCart.split('/')[4],
        };
        CartService.addToCart(dataSendRequest).then((res: ResponseType) => {
            if (res.statusCode === 201) {
                const existProduct = productAddCart.find((item: any) => item.id_product === idStock);
                if (existProduct) {
                    let dataRedux = {
                        id_product: idStock,
                        quantity: existProduct.quantity + 1,
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

    const toast = useToast();

    const handleAddToCart = (e: any, idProduct: number, type: number) => {
        e.preventDefault();
        const idProductParent = idProduct;
        const productParent = document.querySelector(`#product_${idProductParent}`);
        let idColor: number = 0;
        let idSize: number = 0;
        let idAttr: number = 0;
        if (productParent?.querySelectorAll('.color')) {
            const colorArray = productParent?.querySelectorAll('.color');
            colorArray.forEach((item: any) => {
                if (item.checked === true) {
                    idColor = +item.value;
                }
            });
        }
        if (productParent?.querySelectorAll('.size')) {
            const sizeArray = productParent?.querySelectorAll('.size');
            sizeArray.forEach((item: any) => {
                if (item.checked === true) {
                    idSize = +item.value;
                }
            });
        }

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
    return (
        <div id={`product_${idProduct}`} className="group product-hover">
            <div className="relative">
                <div className="wishlist-wrapper absolute z-[21] p-2 top-2 left-2 cursor-pointer bg-[#ffffff] rounded-full">
                    <HeartEmptyIcon width={16} height={16} />
                    <span className="wishlist-text absolute -top-8 block p-1 bg-[#f5deb3] rounded-lg text-sm w-[66px]">
                        Yêu thích
                    </span>
                </div>
                <div
                    onClick={(e) => handleAddToCart(e, idProduct, type)}
                    className="wishlist-wrapper absolute z-[21] p-2 top-2 right-2 cursor-pointer bg-[#ffffff] rounded-full"
                >
                    <AddToCartIcon width={16} height={16} />
                    <span className="wishlist-text absolute -top-8 block p-1 bg-[#f5deb3] rounded-lg text-sm w-[114px]">
                        Thêm sản phẩm
                    </span>
                </div>
                <div className="relative">
                    <div className="relative w-full p-[50%] rounded-3xl">
                        {images?.map((item: any, index: any) => (
                            <Image
                                key={index}
                                className={`images_${idProduct} absolute inset-0 w-full rounded-3xl object-contain bg-[#f1f1f1]`}
                                src={`${Config.apiUrl}upload/${item?.file_name}`}
                                alt="Product"
                            />
                        ))}
                        <div
                            style={{ top: 'calc(100% - 56px)' }}
                            className="product-size-hover absolute p-4 -left-[1px] -right-[1px] transition-all z-30"
                        >
                            {/* size */}
                            {sizeArray.length > 0 ? (
                                <div className="flex justify-around items-center text-sm mb-[10px]">
                                    {sizeArray?.reverse().map(([key, value]: any, index: any) => (
                                        <div key={index}>
                                            <input
                                                className="size w-px h-px appearance-none"
                                                type="radio"
                                                value={value}
                                                name="size"
                                                id={`s_${idProduct}_${value}`}
                                            />
                                            <label
                                                className="size-label bg-white w-8 h-8 text-center 
                                                leading-8 inline-block border border-slate-200 rounded-lg"
                                                htmlFor={`s_${idProduct}_${value}`}
                                            >
                                                {key}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* add to cart */}
                            {/* <div
                                
                                className="flex justify-around items-center text-sm py-3 text-white bg-[#fe696a] rounded-lg"
                            >
                                <button className="flex justify-around items-center">
                                    <AiOutlineShoppingCart className="mr-2" />
                                    Them vao gio hang
                                </button>
                            </div> */}
                        </div>
                    </div>
                    {/* color */}
                    {colorArray.length > 0 ? (
                        <div className="flex space-x-4 items-center text-sm h-10 mt-4">
                            {colorArray?.reverse().map(([key, value]: any, index: any) => (
                                <div key={index}>
                                    <input
                                        className="color w-px h-px appearance-none"
                                        type="radio"
                                        name="color"
                                        id={`c_${idProduct}_${value}`}
                                        value={value}
                                    />
                                    <label
                                        onClick={() => {
                                            handleChangeImage(idProduct, index);
                                        }}
                                        className="color-label bg-white relative inline-block w-8 h-8 border border-slate-200 rounded-full"
                                        htmlFor={`c_${idProduct}_${value}`}
                                    >
                                        <span
                                            style={{ backgroundColor: `${key}` }}
                                            className={`absolute inset-1 rounded-full`}
                                        ></span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="mt-4">
                        <span className="block mb-2 text-sm font-medium text-[#7d879c]">Thể thao</span>
                        <Link className="block text-base font-semibold text-[#373f50]" to={`/product/${slug}`}>
                            {name}
                        </Link>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm">200.000 VND</span>
                            <Rate className="flex space-x-1" average={3.7} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
