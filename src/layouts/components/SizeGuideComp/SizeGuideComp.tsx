import Image from '~/components/Image';
import images from '~/assets/images';
import { useState } from 'react';
import { Select } from '@chakra-ui/react';

function SizeGuideComp() {
    const [imageIndex, setImageIndex] = useState(0);
    const imagesSize = [
        images.size_ao_thun,
        images.size_ao_somi,
        images.size_ao_khoac,
        images.size_ao_polo,
        images.size_quan_short,
        images.size_quan_kaki,
        images.size_quan_tay,
        images.size_quan_jean,
    ];
    return (
        <div>
            <div className="mb-4 flex justify-center">
                <div className="w-[400px] ">
                    <Select
                        onChange={(e) => {
                            setImageIndex(+e.target.value);
                        }}
                        className="mt-2 !border-2 !border-primary"
                    >
                        <option value="0">Áo Thun</option>
                        <option value="1">Áo Sơ Mi</option>
                        <option value="2">Áo Khoác</option>
                        <option value="3">Áo Polo</option>
                        <option value="4">Quần Short</option>
                        <option value="5">Quần Kaki</option>
                        <option value="6">Quần Tây</option>
                        <option value="7">Quần Jean</option>
                    </Select>
                </div>
            </div>
            <div>
                <Image src={imagesSize[imageIndex]} alt="Size Guide" />
            </div>
        </div>
    );
}

export default SizeGuideComp;
