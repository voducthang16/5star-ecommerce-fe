import SizeGuideComp from '~/layouts/components/SizeGuideComp';
import { Helmet } from 'react-helmet-async';
function SizeGuide() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Hướng dẫn chọn Size</title>
            </Helmet>
            <div className="container py-10 lg:py-20">
                <h3 className="text-center text-2xl font-semibold mb-4">Hướng Dẫn Chọn Size</h3>
                <div className="text-center text-lg space-y-4 mb-4">
                    <p className="leading-6">Để biết sản phẩm quý khách lựa chọn có phù hợp với mình không?</p>
                    <p className="leading-6">
                        Quý khách vui lòng tham khảo qua bảng hướng dẫn chọn size theo từng nhóm sản phẩm dưới đây!
                    </p>
                </div>
                <SizeGuideComp />
            </div>
        </>
    );
}

export default SizeGuide;
