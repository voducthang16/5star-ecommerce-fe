import images from '~/assets/images';
import Image from '../Image';

interface LogoProps {
    height?: number;
    width?: number;
    className?: string;
}

function Logo({ className }: LogoProps) {
    return <Image src={images.logoBlack} alt="Logo 5Star" className={`${className} w-3/5`} />;
}

export default Logo;
