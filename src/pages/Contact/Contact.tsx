import { Button } from '@chakra-ui/react';
import { BsChevronRight, BsClock, BsEnvelope, BsGeoAlt, BsTelephone } from 'react-icons/bs';
import { MdOutlineAttachEmail } from 'react-icons/md';
import Breadcrumb from '~/components/Breadcrumb';
import { Helmet } from 'react-helmet';

function Contact() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Liên hệ</title>
            </Helmet>
            <div className="contact-comp mb-[20px]">
                <section className="px-[15px] pt-[30px]">
                    <Breadcrumb share={false} page="Liên hệ" />

                    <div className="w-full md:flex md:mx-[-6px] mt-10">
                        <div
                            className="p-[20px] md:w-[calc(100%/2)] mb-[30px] text-center border-solid border-[1px] border-[rgba(0,0,0,.085)] md:mx-[6px]"
                            data-aos="fade-left"
                            data-aos-delay="200"
                        >
                            <BsGeoAlt className="mx-auto mb-[24px] text-primary text-3xl" />
                            <h2 className="mb-[8px] text-[17px] font-medium">Cửa hàng chính</h2>
                            <p className="mb-[16px] text-[14px] text-[#7d879c]">Công viên phần mềm Quang Trung</p>
                            <div className="flex justify-center items-center">
                                <p className=" text-primary text-base">Xem thêm</p>
                                <BsChevronRight className="ml-[6px] w-[18px] h-[18px] text-primary text-3xl" />
                            </div>
                        </div>

                        <div
                            className="p-[20px] md:w-[calc(100%/2)] mb-[30px] text-center border-solid border-[1px] border-[rgba(0,0,0,.085)] md:mx-[6px]"
                            data-aos="fade-left"
                            data-aos-delay="400"
                        >
                            <BsClock className="mx-auto mb-[24px] text-primary text-3xl" />
                            <h2 className="mb-[8px] text-[17px] font-medium">Giờ làm việc</h2>
                            <ul>
                                <li className="mb-[6px] text-[14px] text-[#7d879c]">Thứ 2 - Thứ 7 : 10AM - 7PM</li>
                                <li className="mb-[6px] text-[14px] text-[#7d879c]">Chủ nhật: 6AM - 1PM</li>
                            </ul>
                        </div>

                        <div
                            className="p-[20px] md:w-[calc(100%/2)] mb-[30px] text-center border-solid border-[1px] border-[rgba(0,0,0,.085)] md:mx-[6px]"
                            data-aos="fade-left"
                            data-aos-delay="600"
                        >
                            <BsTelephone className="mx-auto mb-[24px] text-primary text-3xl" />
                            <h2 className="mb-[8px] text-[17px] font-medium">Chăm sóc khách hàng</h2>
                            <ul>
                                <li className="mb-[6px] text-[14px] text-[#7d879c]">Liên hệ: +1 (080) 44 357 260</li>
                                <li className="mb-[6px] text-[14px] text-[#7d879c]">Hỗ trợ: +1 00 33 169 7720</li>
                            </ul>
                        </div>

                        <div
                            className="p-[20px] md:w-[calc(100%/2)] mb-[30px] text-center border-solid border-[1px] border-[rgba(0,0,0,.085)] md:mx-[6px]"
                            data-aos="fade-left"
                            data-aos-delay="800"
                        >
                            <BsEnvelope className="mx-auto mb-[24px] text-primary text-3xl" />
                            <h2 className="mb-[8px] text-[17px] font-medium">Địa chỉ email</h2>
                            <ul>
                                <li className="mb-[6px] text-[14px] text-[#7d879c]">
                                    Cho khác hàng: 5star@fashion.com
                                </li>
                                <li className="mb-[6px] text-[14px] text-[#7d879c]">
                                    Đội ngũ hỗ trợ: support@5starfashion.com
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:mx-[-15px] py-[15px] pt-[24px] md:mt-[24px] md:mb-[48px] text-center">
                        <h2
                            className="mb-[28px] text-3xl font-semibold text-primary"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            Hệ thống cửa hàng
                        </h2>
                        <h4 className="mb-[8px] text-xl font-semibold capitalize " data-aos="fade-up">
                            Hệ thống cửa hàng nổi bật của chúng tôi
                        </h4>

                        <div className="md:flex justify-center">
                            {[1, 2, 3].map((item, index) => (
                                <div
                                    className="store-item pt-[24px] md:px-[15px]"
                                    data-aos="fade-left"
                                    data-aos-delay={index * 200}
                                >
                                    <img
                                        className="rounded-[6px]"
                                        src="https://cartzilla.createx.studio/img/contacts/orlando.jpg"
                                        alt=""
                                    />
                                    <div className="p-[20px] pb-[0] shadow-slate-800 text-left">
                                        <h6 className="mb-[12px] text-[18px] font-semibold">Thành phố Hồ Chí Minh</h6>
                                        <ul>
                                            <li
                                                className="mb-[12px] pb-[16px] flex text-[14px] border-b border-solid border-[#e3e9ef]"
                                                data-aos="fade-up"
                                            >
                                                <BsGeoAlt className="text-primary text-3xl text-[20px]" />
                                                <div className="pl-[16px] text-base">
                                                    <span>Địa chỉ</span>
                                                    <p>603 Quang Trung, Quận Gò Vấp, Thành Phố Hồ Chí Minh</p>
                                                </div>
                                            </li>
                                            <li
                                                className="mb-[12px] pb-[16px] flex text-[14px] border-b border-solid border-[#e3e9ef]"
                                                data-aos="fade-up"
                                            >
                                                <BsTelephone className="text-primary text-3xl text-[20px]" />
                                                <div className="pl-[16px] text-base">
                                                    <span>Liên hệ</span>
                                                    <p>+1 (786) 322 560 40</p>
                                                </div>
                                            </li>
                                            <li
                                                className="mb-[12px] pb-[16px] flex text-[14px] border-b border-solid border-[#e3e9ef ]"
                                                data-aos="fade-up"
                                            >
                                                <MdOutlineAttachEmail className="text-primary text-3xl text-[20px]" />
                                                <div className="pl-[16px] text-base">
                                                    <span>Email</span>
                                                    <p>5star@fashion.com</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="lg:flex justify-between">
                    <section className="lg:w-[50%]">
                        <div className="w-full h-full">
                            <iframe
                                className="h-[400px] md:h-[288px] lg:h-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4435923675846!2d106.6256397144684!3d10.85382636072901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1665586658015!5m2!1svi!2s"
                                width="100%"
                                allowFullScreen
                                style={{ border: 0 }}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </section>

                    <section
                        className="px-[15px] pt-[48px] lg:pt-[15px] lg:w-[50%] lg:px-[24px] lg:py-[48px] lg:border-solid lg:border-[1px] lg:border-[rgba(0,0,0,.085)]"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h2 className="mb-[24px] text-[24px] font-medium">
                            Để lại thông tin cho chúng tôi sẽ liên hệ sớm nhất
                        </h2>
                        <div>
                            <div className="md:flex justify-between">
                                <div className="md:w-[50%]">
                                    <div className="mb-[16px]">
                                        <label
                                            className="font-medium block mb-[14px] md:text-[18px] text-[14px] text-[#07142e]"
                                            htmlFor=""
                                        >
                                            Họ và tên <span className="text-[#f34770]">*</span>
                                        </label>
                                        <input
                                            className="relative md:text-[18px] text-[14px] text-[#85888a] w-full md:py-[15px] py-[14px] px-[16px] border-solid border-[1px] border-[rgba(0,0,0,.085)] bg-[#f8f9fa] outline-none focus:text-[#07142e] focus-visible:border-[#e59700]"
                                            type="text"
                                            placeholder="Nguyễn Văn A"
                                        />
                                    </div>
                                    <div className="mb-[16px]">
                                        <label
                                            className="font-medium block mb-[14px] md:text-[18px] text-[14px] text-[#07142e]"
                                            htmlFor=""
                                        >
                                            Dịa chỉ email <span className="text-[#f34770]">*</span>
                                        </label>
                                        <input
                                            className="relative md:text-[18px] text-[14px] text-[#85888a] w-full md:py-[15px] py-[14px] px-[16px] border-solid border-[1px] border-[rgba(0,0,0,.085)] bg-[#f8f9fa] outline-none focus:text-[#07142e] focus-visible:border-[#e59700]"
                                            type="email"
                                            placeholder="contact@gmail.com"
                                        />
                                    </div>
                                    <div className="mb-[16px]">
                                        <label
                                            className="font-medium block mb-[14px] md:text-[18px] text-[14px] text-[#07142e]"
                                            htmlFor=""
                                        >
                                            Số điện thoại <span className="text-[#f34770]">*</span>
                                        </label>
                                        <input
                                            className="relative md:text-[18px] text-[14px] text-[#85888a] w-full md:py-[15px] py-[14px] px-[16px] border-solid border-[1px] border-[rgba(0,0,0,.085)] bg-[#f8f9fa] outline-none focus:text-[#07142e] focus-visible:border-[#e59700]"
                                            type="text"
                                            placeholder="+1 (212) 00 000 000"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-[50%] md:ml-[20px]">
                                    <div className="mb-[16px]">
                                        <label
                                            className="font-medium block mb-[14px] md:text-[18px] text-[14px] text-[#07142e]"
                                            htmlFor=""
                                        >
                                            Tin nhắn
                                        </label>
                                        <textarea
                                            className="w-full h-[158px] md:h-[300px] border-solid border-[1px] border-[rgba(0,0,0,.085)] text-[14px] p-[16px] bg-[#f8f9fa]"
                                            id="cf-message"
                                            placeholder="Nội dung tin nhắn"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <Button colorScheme="teal" size="lg" padding="0px 40px">
                                Gửi
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Contact;
