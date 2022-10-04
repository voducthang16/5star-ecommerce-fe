import { TbChevronsRight } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ImFacebook } from 'react-icons/im';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
interface BreadcrumbProps {
    productName?: string;
}

const Breadcrumb = ({ productName }: BreadcrumbProps) => {
    return (
        <div className="breadcrumb my-4">
            <div className="container">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    <div className="flex items-center text-lg">
                        <h5 className="text-primary font-medium">Trang chủ</h5>
                        <h5 className="flex items-center">
                            <span className="text-gray-400 mx-1">
                                <TbChevronsRight />
                            </span>
                            <Link to="">Danh mục</Link>
                        </h5>
                        <h5 className="flex items-center">
                            <span className="text-gray-400 mx-1">
                                <TbChevronsRight />
                            </span>
                            <Link to="">{productName}</Link>
                        </h5>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-700/80">Chia sẻ:</span>
                        <span
                            className="flex items-center space-x-1 px-2 py-0.5 cursor-pointer
                            rounded-md transition-all group hover:bg-[#3b5998] bg-[#dbe1eb]"
                        >
                            <ImFacebook className="fill-[#3b5998] group-hover:fill-white" />
                            <span className="text-[#3b5998] group-hover:text-white">Facebook</span>
                        </span>
                        <span
                            className="flex items-center space-x-1 px-2 py-0.5 cursor-pointer
                            rounded-md transition-all group hover:bg-[#1da1f2] bg-[#ccecff]"
                        >
                            <BsTwitter className="fill-[#1da1f2] group-hover:fill-white" />
                            <span className="text-[#1da1f2] group-hover:text-white">Twitter</span>
                        </span>
                        <span
                            className="flex items-center space-x-1 px-2 py-0.5 cursor-pointer 
                            rounded-md transition-all group hover:bg-[#5851db] bg-[#ffdaf9]"
                        >
                            <BsInstagram className="fill-[#785bb1] group-hover:fill-white" />
                            <span className="text-[#785bb1] group-hover:text-white">Instagram</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
