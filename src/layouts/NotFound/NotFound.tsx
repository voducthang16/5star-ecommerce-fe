import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="pt-[20px] pb-[64px] px-[16px] md:mx-[160px] lg:mx-[264px] lg:pt-[20px] lg:pb-[80px] lg:px-[40px]">
            <div className="text-center">
                <img
                    className="md:w[672px]"
                    src="https://chisnghiax.com/ciseco/static/media/404.c276f8aa5757b2936276.png"
                    alt=""
                />
                <h4 className="mt-[8px] text-[14px] uppercase tracking-wider font-medium">
                    Trang bạn đang tìm kiếm không tồn tại.
                </h4>
                <div className="mt-[8px] pt-[32px]">
                    <Link
                        to="/"
                        className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 capitalize"
                    >
                        Trở lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
