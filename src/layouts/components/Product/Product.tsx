import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import Image from '~/components/Image';
import Config from '~/config';
import { addToCart, getProductInCart, updateToCart } from '~/features/cart/cartSlice';
import { getProducts } from '~/features/product/productSlice';
import CartService from '~/services/CartService';
import WishlistService from '~/services/WishlistService';
import { ResponseType } from '~/utils/Types';
import { motion, useAnimation } from 'framer-motion';
import Rate from '../Rate';
import './Product.scss';
import { getUser } from '~/features/user/userSlice';
import { getWishlist, getWishlistAsync } from '~/features/wishlist/wishlistSlice';
interface ProductProps {
    idProduct: number;
    name?: string;
    slug?: string;
    color?: any;
    size?: any;
    images?: any;
    type?: number;
    stocks?: any;
}
const variants = {
    hover: {
        x: 0,
        scale: [1.1, 1],
    },
    initial: {
        x: 200,
        scale: 1,
    },
};
function Product({ idProduct, name, slug, color, size, images, type = 0, stocks }: ProductProps) {
    const [imageInCart, setImageInCart] = useState('');

    const dispatch = useAppDispatch();
    const products = useAppSelector(getProducts);
    const productAddCart = useAppSelector(getProductInCart);
    const colorArray: any = color ? Object?.entries(color) : '';
    const sizeArray: any = size ? Object?.entries(size) : '';
    const moneyArray: any = [];
    const infoUser: any = useAppSelector(getUser);
    const wishlist = useAppSelector(getWishlist);

    const checkProductInWishlist = (id: number) => {
        let flag = false;
        wishlist?.find((item: any) => {
            if (item.id_product === id) {
                flag = true;
            }
        });
        return flag;
    };

    stocks.forEach((item: any) => {
        moneyArray.push(item.price);
    });
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
        let dataSendRequest: any = {
            id_product: idStock,
            quantity: 1,
            image: imageInCart.split('/')[4],
        };
        CartService.addToCart(dataSendRequest).then((res: ResponseType) => {
            if (res.statusCode === 201) {
                const existProduct = productAddCart.find((item: any) => item.id_product === idStock);
                if (existProduct) {
                    let dataRedux: any = {
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
        if (infoUser.length === 0) {
            toast({
                title: 'Thông báo',
                description: 'Vui lòng đăng nhập',
                status: 'warning',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
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

    // HANDLE ANIMATIONS

    // Imperative
    const controls = useAnimation();
    function handleMouseEnterControls() {
        controls.start('hover');
    }

    function handleMouseLeaveControls() {
        controls.start('initial');
    }
    return (
        <div
            id={`product_${idProduct}`}
            className="group product-hover overflow-hidden"
            onMouseEnter={handleMouseEnterControls}
            onMouseLeave={handleMouseLeaveControls}
        >
            <div className="relative">
                <div className="action-product absolute z-[21] top-[22%] right-2">
                    <motion.div
                        onClick={() => {
                            if (checkProductInWishlist(idProduct)) {
                                alert('Xoa khoi danh sach');
                            } else {
                                WishlistService.createWishlist({ id_product: idProduct, quantity: 1 })
                                    .then((res: any) => {
                                        if (res.statusCode === 201) {
                                            toast({
                                                title: 'Thông báo',
                                                description: 'Thêm vào danh sách yêu thích',
                                                status: 'success',
                                                position: 'bottom-right',
                                                duration: 3000,
                                                isClosable: true,
                                            });
                                            dispatch(getWishlistAsync(infoUser?.id));
                                        }
                                    })
                                    .catch((err) => console.log(err));
                            }
                        }}
                        className="action-wishlist w-[40px] h-[40px] text-center bg-white leading-[38px] rounded-full shadow-md cursor-pointer"
                        initial="initial"
                        variants={variants}
                        animate={controls}
                        transition={{ type: 'spring', damping: 12, stiffness: 90 }}
                    >
                        {checkProductInWishlist(idProduct) ? (
                            <FaHeart className="text-xl inline-block text-primary" />
                        ) : (
                            <FaRegHeart className="text-xl inline-block text-primary" />
                        )}
                    </motion.div>
                    <motion.div
                        onClick={(e) => handleAddToCart(e, idProduct, type)}
                        className="action-cart w-[40px] h-[40px] text-center bg-white leading-[38px] rounded-full shadow-md mt-2 cursor-pointer"
                        variants={variants}
                        initial="initial"
                        animate={controls}
                        transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                    >
                        <RiShoppingCart2Fill className="text-xl inline-block text-primary" />
                    </motion.div>
                </div>
                <div className="relative">
                    <div className="relative w-full p-[50%] rounded-3xl overflow-hidden">
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
                                <div className="flex justify-center space-x-4 items-center text-sm mb-[10px]">
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
                        <div className="flex items-center justify-between mb-2">
                            <span className="block text-sm font-medium text-[#7d879c]">Thể thao</span>
                            <Rate className="flex space-x-1" average={3.7} />
                        </div>
                        <Link className="block text-base font-semibold text-[#373f50]" to={`/product/${slug}`}>
                            {name}
                        </Link>
                        <div className="mt-4 flex items-center">
                            <span className="text-sm money-change">
                                {Math.min(...moneyArray).toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
