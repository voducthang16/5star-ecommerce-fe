import { BiSupport } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { IoMdSwap } from 'react-icons/io';
import { MdOutlineLocalShipping } from 'react-icons/md';

export const fourStepAbout = [
    {
        icon: <MdOutlineLocalShipping />,
        title: 'Miễn phí vận chuyển nội thành',
        color: 'text-red-800 bg-red-100',
    },
    {
        icon: <IoMdSwap />,
        title: 'Đổi trả hàng nhanh chóng',
        color: 'text-indigo-800 bg-indigo-100',
    },
    {
        icon: <BiSupport />,
        title: 'Hỗ trợ khách hàng 24/7',
        color: 'text-yellow-800 bg-yellow-100',
    },
    {
        icon: <BsCheckCircle />,
        title: 'Sản phẩm chất lượng',
        color: 'text-purple-800 bg-purple-100',
    },
];
