import { useEffect } from 'react';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import Navigator from '~/layouts/components/Navigator';
import { AiOutlineArrowUp } from 'react-icons/ai';
interface DefaultLayoutProps {
    Children: React.ComponentType;
}

function DefaultLayout({ Children }: DefaultLayoutProps) {
    const scrollToTop = () => {
        const scrollToTop = document.querySelector('.scroll-to-top');
        const html = document.getElementsByTagName('html')[0];
        scrollToTop!.addEventListener('click', () => {
            html!.classList.add('scroll-smooth');
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
            setTimeout(() => {
                html!.classList.remove('scroll-smooth');
            }, 200);
        });
        document.addEventListener('scroll', () => {
            scrollToTop!.classList.toggle('active', window.scrollY > 300);
        });
    };
    useEffect(() => {
        scrollToTop();
    }, []);
    return (
        <>
            <button
                className="scroll-to-top fixed right-4 bottom-4 z-20 
                min-w-[40px] min-h-[40px] bg-[#fe696a] opacity-0 invisible shadow rounded-lg 
                flex items-center justify-center transition-all"
            >
                <AiOutlineArrowUp className="text-2xl fill-white" />
            </button>
            <Header />
            <main>
                <Children />
            </main>
            <Footer />
            <Navigator />
        </>
    );
}

export default DefaultLayout;
