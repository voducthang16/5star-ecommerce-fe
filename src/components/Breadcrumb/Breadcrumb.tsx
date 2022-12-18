import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { HiOutlineHome } from 'react-icons/hi';
import { ImFacebook } from 'react-icons/im';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';
import { FacebookShareButton, FacebookIcon } from 'react-share';
interface BreadcrumbProps {
    page?: string;
    share?: boolean;
    category?: boolean;
    parentPage?: string;
    parentLink?: string;
    shareUrl?: string;
}

const Breadcrumb = ({ page, parentPage, parentLink = '/', share = true, shareUrl }: BreadcrumbProps) => {
    return (
        <div className="breadcrumb my-4 bg-[#f8f8f8] py-6">
            <div className="container">
                <div className="grid grid-cols-12 gap-4 md:gap-0">
                    <div className="col-span-12 md:col-span-6 flex items-center text-base ">
                        <h5 className="text-primary font-medium mr-2 flex items-center hover-text">
                            <span className="icon text-lg mr-1">
                                <HiOutlineHome />
                            </span>
                            Trang chủ
                        </h5>
                        {parentPage ? (
                            <>
                                <h5 className="flex items-center mr-2 hover-text">
                                    <span className="text-gray-400 mx-1 text-sm">
                                        <MdOutlineKeyboardArrowRight />
                                    </span>
                                    <Link to={parentLink}>{parentPage}</Link>
                                </h5>
                            </>
                        ) : null}
                        <h5 className="flex items-center hover-text">
                            <span className="text-gray-400 mx-1 text-sm">
                                <MdOutlineKeyboardArrowRight />
                            </span>
                            <Link to="">{page}</Link>
                        </h5>
                    </div>
                    {share ? (
                        <div className="col-span-12 md:col-span-6 flex items-center md:justify-end space-x-2 md:space-x-4 text-sm">
                            <span className="text-gray-700/80">Chia sẻ:</span>
                            <span
                                className="flex items-center space-x-1 px-2 py-0.5 cursor-pointer
                            rounded-md transition-all group hover:bg-[#3b5998] bg-[#dbe1eb]"
                            >
                                <FacebookShareButton url={`https://5starfashion.xyz/product${shareUrl!}`}>
                                    <FacebookIcon size={16} round={true} />
                                </FacebookShareButton>
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
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
