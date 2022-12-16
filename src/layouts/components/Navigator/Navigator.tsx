import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineFilter } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/app/hooks';
import { getUser } from '~/features/user/userSlice';
import { useToast } from '@chakra-ui/react';
function Navigator() {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const toast = useToast();
    const infoUser: any = useAppSelector(getUser);

    const triggerFilters = () => {
        const filtersWrapper = document.querySelector('.filters-wrapper') as HTMLElement;
        const headerWrapper = document.querySelector('.header-wrapper') as HTMLElement;
        const navigatorWrapper = document.querySelector('.navigator-wrapper') as HTMLElement;
        const rootElement = document.querySelector('#root') as HTMLElement;
        filtersWrapper.classList.toggle('active');
        headerWrapper.classList.toggle('hidden');
        navigatorWrapper.classList.toggle('hidden');
        const div = document.createElement('div');
        div.classList.add('backdrop');
        rootElement.appendChild(div);
        const backdrop = document.querySelector('.backdrop') as HTMLElement;
        const hideFilters = document.querySelector('.hide-filters') as HTMLElement;
        backdrop.addEventListener('click', () => {
            filtersWrapper.classList.toggle('active');
            headerWrapper.classList.toggle('hidden');
            navigatorWrapper.classList.toggle('hidden');
            backdrop.remove();
        });
        hideFilters.addEventListener('click', () => {
            filtersWrapper.classList.remove('active');
            headerWrapper.classList.remove('hidden');
            navigatorWrapper.classList.remove('hidden');
            backdrop.remove();
        });
    };
    return (
        <div className="navigator-wrapper overflow-hidden lg:hidden fixed z-50 left-0 right-0 bottom-0 bg-white border-t border-slate-200 shadow">
            <div className="container">
                <div className="h-20 flex items-center justify-around">
                    {path === '/category' ? (
                        <div
                            onClick={triggerFilters}
                            className="flex flex-col items-center justify-around cursor-pointer px-4"
                        >
                            <div className="icon-header-wrapper">
                                <AiOutlineFilter className="text-2xl" />
                            </div>
                            <h6 className="text-sm font-normal text-gray-500">Filters</h6>
                        </div>
                    ) : (
                        <></>
                    )}
                    {path === '/category' ? <div className="h-20 w-px bg-slate-300"></div> : <></>}
                    <div className="flex flex-col items-center justify-around cursor-pointer px-4">
                        <div
                            onClick={() => {
                                if (infoUser?.length === 0) {
                                    toast({
                                        title: 'Thông báo',
                                        description: 'Bạn phải đăng nhập để xem trang này',
                                        status: 'warning',
                                        position: 'top-right',
                                        duration: 1500,
                                        isClosable: true,
                                    });
                                    setTimeout(() => {
                                        navigate('/login');
                                    }, 1500);
                                } else {
                                    navigate('/my-account/wish-list');
                                }
                            }}
                            className="icon-header-wrapper"
                        >
                            <AiOutlineHeart className="text-2xl" />
                            {infoUser?.length !== 0 && (
                                <span
                                    className="absolute -top-1 -right-1 bg-cyan-500 text-white h-4 w-4 
                                    block text-center rounded-full text-[10px]"
                                >
                                    5
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="h-20 w-px bg-slate-300"></div>
                    <div className="flex flex-col items-center justify-around cursor-pointer px-4">
                        <div
                            onClick={() => {
                                if (infoUser?.length === 0) {
                                    toast({
                                        title: 'Thông báo',
                                        description: 'Bạn phải đăng nhập để xem trang này',
                                        status: 'warning',
                                        position: 'top-right',
                                        duration: 1500,
                                        isClosable: true,
                                    });
                                    setTimeout(() => {
                                        navigate('/login');
                                    }, 1500);
                                } else {
                                    navigate('/cart');
                                }
                            }}
                            className="icon-header-wrapper"
                        >
                            <AiOutlineShoppingCart className="text-2xl" />
                            {infoUser?.length !== 0 && (
                                <span
                                    className="absolute -top-1 -right-1 bg-cyan-500 text-white h-4 w-4 
                                    block text-center rounded-full text-[10px]"
                                >
                                    5
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="h-20 w-px bg-slate-300"></div>
                    <div className="flex flex-col items-center justify-around cursor-pointer px-4">
                        <div
                            onClick={() => {
                                if (infoUser?.length === 0) {
                                    toast({
                                        title: 'Thông báo',
                                        description: 'Bạn phải đăng nhập để xem trang này',
                                        status: 'warning',
                                        position: 'top-right',
                                        duration: 1500,
                                        isClosable: true,
                                    });
                                    setTimeout(() => {
                                        navigate('/login');
                                    }, 1500);
                                } else {
                                    navigate('/my-account');
                                }
                            }}
                            className="icon-header-wrapper"
                        >
                            <AiOutlineUser className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigator;
