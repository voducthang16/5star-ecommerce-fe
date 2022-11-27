import React from 'react';
import images from '~/assets/images';
const Loading = () => {
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

export default Loading;
