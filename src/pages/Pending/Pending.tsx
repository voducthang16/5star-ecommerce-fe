import { useLocation } from 'react-router-dom';
import images from '~/assets/images';
const Pending = () => {
    const search = useLocation().search;
    const vnpRef = new URLSearchParams(search).get('vnp_TxnRef');
    const vnp_ResponseCode = new URLSearchParams(search).get('vnp_ResponseCode');
    if (vnp_ResponseCode) {
    }
    return (
        <div className="loading fixed bg-white inset-0 z-[99]">
            <img
                src={images.LoadingGif}
                alt=""
                className="w-[100px] absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4"
            />
        </div>
    );
};

export default Pending;
